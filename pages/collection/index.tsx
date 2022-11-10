import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import NitButton from "../../src/components/NitButton";
import { DashboardScreenSelection, PrivacyLevel } from "../../src/utils/Types";
import NavBar from "../dashboard/components/NavBar";
import PrivacyLevelButton from "./components/PrivacyLevelButton";
import InputField from "../../src/components/InputField";
import FileRow from "./components/FileRow";
import { Form, Formik } from "formik";
import React from "react";
import { baseUrl, nitrusApi } from "../../src/redux/apiClient";
import { Collection } from "../../src/redux/apiTypes";
import { useRouter } from "next/router";
import axios from "axios";
import store from "../../src/redux/store";
import EditButton from "../../images/user-ic.svg";
import { title } from "process";
import { first } from "cypress/types/lodash";
import { current } from "@reduxjs/toolkit";

interface Friends {
  name: string;
  collections: CollectionDetails[];
}

interface CollectionDetails {
  name: string;
  items: number;
  space: number;
}

const CollectionDetails = () => {
  const router = useRouter();
  const data = router.query;
  const [getCollection, returnCollection] = nitrusApi.endpoints.getCollection.useMutation();
  const [collection, setCollection] = useState<Collection>();
  const [newName, setNewName] = useState<string>();
  const collectionName = useMemo(() => {
    return newName ?? data?.name;
  }, [newName, data?.name]);
  const [privacyLevel, setPrivacyLevel] = useState(returnCollection?.data?.private === "true" ? true : false);
  
  useEffect(() => {
    getCollection(collection?.name as string ?? data.name as string)
    .unwrap()
    .then((currentCollection) => {
      setPrivacyLevel(currentCollection.private === "true" ? true : false);
    });
  }, [collection?.name, data.name]);

  interface CollectionEditableValues {
    collectionName: string;
  }

  const navigateToDash = useCallback(() => {
    router.push("/dashboard");
  }, []); 

  const [updateCollection] =
    nitrusApi.endpoints.updateCollectionDetails.useMutation();
  const onSaveName = useCallback((values: CollectionEditableValues) => {
    let updateQueryName = "";
    if(values.collectionName === "") {
      updateQueryName = data.name as string;
    } else {
      updateQueryName = values.collectionName as string;
    }
    setTimeout(() => {
      updateCollection({
        name: collection?.name ?? data.name as string,
        newName: updateQueryName,
        private: privacyLevel ? "true" : "false",
      }).then(() => {
        setNewName(updateQueryName);
        getCollection(updateQueryName)
          .unwrap()
          .then((currentCollection) => {
            setCollection(currentCollection);
            
            router.push("/dashboard");
          });
      });
    }, 1000)

  }, []);
  const [selectedfile, setSelectedFile] = useState<File>();
  const [fileName, setFileName] = useState("");

  const onPrivacyLevelClick = (level: boolean) => {
    console.log("privacy level " + level);
    updateCollection({
      name: data.name as string,
      newName: data.name as string,
      private: level ? "true" : "false",
    }).then(() => {
      getCollection(data.name as string)
        .unwrap()
        .then((currentCollection) => {
          setCollection(currentCollection);
          router.push("/dashboard");
        });
    });
  };
  const onUpload = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
      setFileName(event.target.files[0].name);
    }
  }, []);
  const [deleteCollection] = nitrusApi.endpoints.deleteCollection.useMutation();
  const [deleteFileMutation] = nitrusApi.endpoints.deleteFile.useMutation();
  const onDeleteCollection = useCallback(() => {
    if (data.name) {
      console.log(collectionName);
      deleteCollection( collectionName as string ?? data.name as string)
        .unwrap()
        .then(() => {
          router.push("/dashboard");
        });
    }
  }, []);
  const hiddenFileInput = React.useRef<HTMLInputElement>(null);

  const uploadFile = () => {
    if (selectedfile) {
      let formData = new FormData();

      const trimmedFile = new File(
        [selectedfile],
        selectedfile.name.substring(0, 30)
      );
      formData.append("document", trimmedFile);
      formData.append("colln", data.name as string);

      formData.append("title", selectedfile.name.substring(0, 30));
      const config = {
        headers: {
          "content-type":
            "multipart/form-data; boundary=----WebKitFormBoundarypoWW2qkMkXwQj3Ik",
          Authorization: `Bearer ${store.getState().auth.authToken}`,
        },
      };
      axios
        .post(baseUrl + "/files/", formData, config)
        .then(() => {
          setSelectedFile(undefined);
          setFileName("");
          getCollection(data.name as string)
            .unwrap()
            .then((currentCollection) => {
              setCollection(currentCollection);
              console.log("set collection upload")
            });
        })
        .catch((error) => {
          setSelectedFile(undefined);
          setFileName("");
          console.warn("API upload error: " + JSON.stringify(error));
        });

      // postUploadedFile(formData)
      //   .unwrap()
      //   .then(() => {
      //     console.log("success on upload file");
      //     setSelectedFile(undefined);
      //     setFileName("");
      //   })
      //   .catch((error) => {
      //     setSelectedFile(undefined);
      //     setFileName("");
      //     console.warn("API upload error: " + JSON.stringify(error));
      //   });
    }
  };

  const deleteFile = useCallback((name: string) => {
    console.log("del file: " + name);
    deleteFileMutation({ colln: collectionName as string, title: name })
      .unwrap()
      .then(() => {
        getCollection(data.name as string)
          .unwrap()
          .then((currentCollection) => {
            setCollection(currentCollection);
            console.log("set collection delete")
          });
      });
  }, []);

  return (
    <div>
      <NavBar
        onCollectionNav={navigateToDash}
        onFriendsNav={navigateToDash}
        selectedScreen={DashboardScreenSelection.Collection}
      />
      <ContentContainer>
        <CollectionDetailsContainer>
          <Title>
            <CollectionName>{collectionName}</CollectionName>
            <NitButton
              buttonText="ChooseFile"
              style={{ flex: 0.3 }}
              onClick={() =>
                hiddenFileInput.current && hiddenFileInput.current.click()
              }
              id="choose_file_button"
            />
            <h3>{fileName}</h3>
            <input
              type="file"
              name="file"
              ref={hiddenFileInput}
              onChange={onUpload}
              style={{ display: "none" }}
            />
            <NitButton
              buttonText="+ Upload File"
              style={{ flex: 0.3 }}
              onClick={uploadFile}
              id="upload_file_button"
            />
          </Title>
          <CollectionSettings>
            <PricacyLevelSelect>
              <PrivacyLevelButton
                level={true}
                selected={privacyLevel}
                onClick={onPrivacyLevelClick}
              />
              <PrivacyLevelButton
                level={false}
                selected={privacyLevel}
                onClick={onPrivacyLevelClick}
              />
            </PricacyLevelSelect>
            <Formik
              initialValues={{
                collectionName: "",
              }}
              onSubmit={onSaveName}
            >
              <Form>
                <InputField
                  heading={"Collection Name"}
                  field={"collectionName"}
                  svg={EditButton}
                />
                <NitButton
                  type={"submit"}
                  buttonText="Save"
                  style={{ width: 100, height: 40 }}
                />
              </Form>
            </Formik>
            <NitButton
              onClick={onDeleteCollection}
              buttonText={"Delete Collection"}
              style={{ width: "40%" }}
              id="delete_collection_button"
            ></NitButton>
          </CollectionSettings>
        </CollectionDetailsContainer>
        {collection?.files_data && (
          <FilesContainer>
            {collection?.files_data?.map((item, index) => (
              <FileRow
                key={item.id}
                file={item}
                onDelete={() => deleteFile(item.title)}
              />
            ))}
          </FilesContainer>
        )}
      </ContentContainer>
    </div>
  );
};

export default CollectionDetails;
const FilesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  flex: 1;
  margin-top: 150px;
`;
const PricacyLevelSelect = styled.div`
  display: flex;
  width: 30%;
  flex-direction: row;
  justify-content: space-between;
`;
const Title = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;
const CollectionDetailsContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
`;
const CollectionSettings = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  flex: 1;
  height: 450px;
  background-color: #e6f5e1;
  border-radius: 25px;
  padding: 30px 60px;
`;
const CollectionName = styled.h1`
  display: flex;
  flex: 1;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 55px;
  flex: 1;

  color: #424f40;
`;
const ContentContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: 100px 200px;
`;

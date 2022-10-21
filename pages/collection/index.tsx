import { ChangeEvent, useCallback, useEffect, useState } from "react";
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
  const [getCollection] = nitrusApi.endpoints.getCollection.useMutation();
  const [collection, setCollection] = useState<Collection>();
  useEffect(() => {
    getCollection(data.name as string)
      .unwrap()
      .then((currentCollection) => {
        setCollection(currentCollection);
      });
  }, [data.name, getCollection]);

  const [postUploadedFile] = nitrusApi.endpoints.postFile.useMutation();
  interface CollectionEditableValues {
    collectionName: string;
  }

  const [privacyLevel, setPrivacyLevel] = useState(PrivacyLevel.FriendsOnly);
  const navigateToDash = useCallback(() => {
    router.push("/dashboard");
  }, []);
  const onSaveName = useCallback((values: CollectionEditableValues) => {
    // TODO: dispatch new name.
    // setCollectionName(values.collectionName);
  }, []);
  const [selectedfile, setSelectedFile] = useState<File>();
  const [fileName, setFileName] = useState("");

  const onPrivacyLevelClick = (level: PrivacyLevel) => {
    setPrivacyLevel(level);
  };
  const onUpload = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
      setFileName(event.target.files[0].name);
    }
  }, []);
  const [deleteCollection] = nitrusApi.endpoints.deleteCollection.useMutation();
  const onDeleteCollection = useCallback(() => {
    console.log("fire del colle" + data.name);
    if (data.name) {
      console.log("fire");
      deleteCollection(data.name as string)
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
      // for (var key of formData.entries()) {
      //   console.log(key[0] + ", " + key[1]);
      // }
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
            <CollectionName>{collection?.name}</CollectionName>
            <NitButton
              buttonText="ChooseFile"
              style={{ flex: 0.3 }}
              onClick={() =>
                hiddenFileInput.current && hiddenFileInput.current.click()
              }
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
            />
          </Title>
          <CollectionSettings>
            <PricacyLevelSelect>
              <PrivacyLevelButton
                level={PrivacyLevel.Private}
                selected={privacyLevel}
                onClick={onPrivacyLevelClick}
              />
              <PrivacyLevelButton
                level={PrivacyLevel.Public}
                selected={privacyLevel}
                onClick={onPrivacyLevelClick}
              />
              <PrivacyLevelButton
                level={PrivacyLevel.FriendsOnly}
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
            ></NitButton>
          </CollectionSettings>
        </CollectionDetailsContainer>
        {collection?.files_data ? (
          <FilesContainer>
            {collection?.files_data?.map((item) => (
              <FileRow key={item.id} file={item} />
            ))}
          </FilesContainer>
        ) : (
          <h2>No files yet!</h2>
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
  width: 100%;
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

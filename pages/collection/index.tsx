import Head from "next/head";
import router from "next/router";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import NitButton from "../../src/components/NitButton";
import { DashboardScreenSelection, PrivacyLevel } from "../../src/utils/Types";
import styles from "../../styles/Home.module.css";
import NavBar from "../dashboard/components/NavBar";
import DefaultProfileImage from "../../images/friends-image-default.svg";
import Image from "next/image";
import PrivacyLevelButton from "./components/PrivacyLevelButton";
import InputField from "../../src/components/InputField";
import FileRow from "./components/FileRow";
import { Form, Formik } from "formik";
import { validateConfig } from "next/dist/server/config-shared";
import React from "react";
import { nitrusApi } from "../../src/redux/apiClient";

interface Friends {
  name: string;
  collections: CollectionDetails[];
}

interface CollectionDetails {
  name: string;
  items: number;
  space: number;
}

export default function Collection() {
  const [getCollections, collections] =
    nitrusApi.endpoints.getCollections.useLazyQuery();
  useEffect(() => {
    getCollections()
      .unwrap()
      .then((res) => {
        console.log("responses:::");
        console.log(res);
      });
  });
  const SAMPLE_COLLECTION = {
    name: "AudioBooks",
    privacyLevel: PrivacyLevel.FriendsOnly,
    files: [
      { name: "doc.txt", id: 1 },
      { name: "doc.txt", id: 2 },
      { name: "doc.txt", id: 3 },
      { name: "doc.txt", id: 4 },
      { name: "doc.txt", id: 5 },
      { name: "doc.txt", id: 6 },
      { name: "doc.txt", id: 7 },
      { name: "doc.txt", id: 8 },
      { name: "kirbygif.gif", id: 8 },
    ],
  };
  const userName = "isaac_parsons";
  const [postUploadedFile] = nitrusApi.endpoints.postFile.useMutation();
  interface CollectionEditableValues {
    collectionName: string;
  }
  const [collectionName, setCollectionName] = useState(SAMPLE_COLLECTION.name);
  const [privacyLevel, setPrivacyLevel] = useState(
    SAMPLE_COLLECTION.privacyLevel
  );
  const navigateToDash = useCallback(() => {
    router.push("/dashboard");
  }, []);
  const onSaveName = useCallback((values: CollectionEditableValues) => {
    // TODO: dispatch new name.
    setCollectionName(values.collectionName);
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
  const hiddenFileInput = React.useRef<HTMLInputElement>(null);

  const uploadFile = () => {
    if (selectedfile) {
      const data = new FormData();
      data.append("document", selectedfile);
      data.append("colln", "there");
      data.append("title", "I_hate_macos");
      // postUploadedFileAxios(data);
      // console.log(data.values);
      //postUploadedFileAxios(selectedfile);
      // todo await call
      postUploadedFile(data)
        .unwrap()
        .then(() => {
          console.log("success");
          setSelectedFile(undefined);
          setFileName("");
        })
        .catch((error) => {
          setSelectedFile(undefined);
          setFileName("");
          console.log("fff");
          console.warn("API upload error: " + JSON.stringify(error));
        });
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
            <CollectionName>{collectionName}</CollectionName>
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
                collectionName: collectionName,
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
              onClick={() => {
                return;
              }}
              buttonText={"Delete Collection"}
              style={{ width: "40%" }}
            ></NitButton>
          </CollectionSettings>
        </CollectionDetailsContainer>
        <FilesContainer>
          {SAMPLE_COLLECTION.files.map((item) => (
            <FileRow key={item.id} name={item.name} />
          ))}
        </FilesContainer>
      </ContentContainer>
    </div>
  );
}
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

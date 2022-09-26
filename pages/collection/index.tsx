import Head from "next/head";
import router from "next/router";
import { useCallback, useState } from "react";
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
    ],
  };
  const userName = "isaac_parsons";
  const [privacyLevel, setPrivacyLevel] = useState(
    SAMPLE_COLLECTION.privacyLevel
  );
  const navigateToDash = useCallback(() => {
    router.push("/dashboard");
  }, []);

  const onPrivacyLevelClick = (level: PrivacyLevel) => {
    setPrivacyLevel(level);
  };

  return (
    <div>
      <NavBar
        userName={userName}
        onCollectionNav={navigateToDash}
        onFriendsNav={navigateToDash}
        selectedScreen={DashboardScreenSelection.Collection}
      />
      <ContentContainer>
        <CollectionDetailsContainer>
          <Title>
            <CollectionName>{SAMPLE_COLLECTION.name}</CollectionName>
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
            {/* <InputField
              heading={"Collection Name"}
              value={SAMPLE_COLLECTION.name}
            /> */}
            <NitButton
              onClick={() => {
                return;
              }}
              buttonText={"Delete Collection"}
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

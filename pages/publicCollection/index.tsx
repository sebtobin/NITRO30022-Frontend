import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import NitButton from "../../src/components/NitButton";
import { DashboardScreenSelection, PrivacyLevel } from "../../src/utils/Types";
import NavBar from "../dashboard/components/NavBar";
import PrivacyLevelButton from "./components/PrivacyLevelButton";
import InputField from "../../src/components/InputField";
import PublicFileRow from "./components/PublicFileRow";
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
  const [getPublicCollection, returnPublicCollection] =
    nitrusApi.endpoints.getPublicCollection.useMutation();
  const [collection, setCollection] = useState<Collection>();
  const [newName, setNewName] = useState<string>();
  const collectionName = useMemo(() => {
    return newName ?? data?.name;
  }, [newName, data?.name]);

  useEffect(() => {
    getPublicCollection({
      name: data.name as string,
      owner: data.owner as string,
    })
      .unwrap()
      .then((currentCollection) => {
        setCollection(currentCollection);
      });
  }, [collection?.name, data.name, data.owner]);

  const navigateToDash = useCallback(() => {
    router.push("/dashboard");
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
            {collectionName && (
              <CollectionName>
                {String(collectionName).substring(0, 20) +
                  (collectionName.length > 20 ? "..." : "")}
              </CollectionName>
            )}
            {data.owner && (
              <CollectionName>{"Owned by: " + data.owner}</CollectionName>
            )}
          </Title>
        </CollectionDetailsContainer>
        {collection?.files_data && (
          <FilesContainer>
            {collection?.files_data?.map((item, index) => (
              <PublicFileRow
                key={item.id}
                file={item}
                onDelete={() => {
                  return;
                }}
                index={index}
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
  margin-right: 20px;
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

import Head from "next/head";
import router from "next/router";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import NitButton from "../../src/components/NitButton";
import { DashboardScreenSelection } from "../../src/utils/Types";
import styles from "../../styles/Home.module.css";
import Collection from "./components/Collection";
import NavBar from "./components/NavBar";
import DefaultProfileImage from "../../images/friends-image-default.svg";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "../../src/redux/store";
import { UserState } from "../../src/redux/apiTypes";
import NitModal from "./components/NitModal";
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

export default function Dashboard() {
  const user = useSelector<RootState, UserState | null>((state) => state.user);
  const [selectedScreen, setSelectedScreen] =
    useState<DashboardScreenSelection>(DashboardScreenSelection.Collection);

  const [trigger, { isLoading, isError, data, error }] =
    nitrusApi.endpoints.getCollections.useLazyQuery();
  const [postCollection] = nitrusApi.endpoints.postCollection.useMutation();
  useEffect(() => {
    trigger()
      .unwrap()
      .then((res) => {
        console.log("responses:");
        console.log(data);
        console.log("hh");
        // console.log(collectionsList.data[0].name);
        // console.log(res.length);
      });
  }, [data, trigger]);
  const [showCollectionsModal, setShowCollectionsModal] = useState(false);

  const onNewCollectionClick = useCallback(() => {
    setShowCollectionsModal(true);
  }, []);

  const onCloseCollectionClick = useCallback(() => {
    setShowCollectionsModal(false);
  }, []);

  const addNewCollection = useCallback(
    (collectionName: string) => {
      postCollection({ name: collectionName })
        .unwrap()
        .then(() => {
          trigger();
        })
        .catch((e) => {
          console.log("error on post collection: " + e);
        });
      // setCollections((collections) => [
      //   ...collections,
      //   { name: "motorcycles", items: 0, space: 0 },
      // ]);
    },
    [postCollection, trigger]
  );

  const onCreateCollectionClick = useCallback(
    (collectionName: string) => {
      addNewCollection(collectionName);
      setShowCollectionsModal(false);
    },
    [addNewCollection]
  );

  const onCollectionNav = useCallback(() => {
    setSelectedScreen(DashboardScreenSelection.Collection);
  }, []);

  const onFriendsNav = useCallback(() => {
    setSelectedScreen(DashboardScreenSelection.Friends);
  }, []);

  const onViewCollection = useCallback(() => {
    router.push("/collection");
  }, []);

  return (
    <div>
      <NavBar
        onCollectionNav={onCollectionNav}
        onFriendsNav={onFriendsNav}
        selectedScreen={selectedScreen}
      />
      <ContentContainer>
        {selectedScreen == DashboardScreenSelection.Collection && (
          <>
            <WelcomeMessage>{`Welcome back to Nitrus, ${user?.username}!\n`}</WelcomeMessage>
            <CollectionContainer>
              <NitButton
                onClick={onNewCollectionClick}
                buttonText={"Add Collection +"}
                style={{ width: 280 }}
              />
            </CollectionContainer>
            <CollectionsSelect>
              {data ? (
                <>
                  {data.map((item) => {
                    <Collection
                      key={item.name}
                      name={item.name + "why"}
                      items={item.num_items}
                      size={item.size}
                      onViewClick={onViewCollection}
                    />;
                  })}
                </>
              ) : (
                <FriendsName>{"No collections yet!"}</FriendsName>
              )}
            </CollectionsSelect>
          </>
        )}
        {selectedScreen == DashboardScreenSelection.Friends && (
          <FriendsContainer>
            {SAMPLE_FRIENDS.map((item) => (
              <>
                <Image src={DefaultProfileImage} alt="" />
                <FriendsName>{item.name}</FriendsName>
                <FriendsCollectionsSelect>
                  {item.collections.map((item) => (
                    <Collection
                      key={item.name}
                      name={item.name}
                      items={item.items}
                      size={item.space}
                      onViewClick={onViewCollection}
                    />
                  ))}
                </FriendsCollectionsSelect>
                <Dividor />
              </>
            ))}
          </FriendsContainer>
        )}
      </ContentContainer>
      <NitModal
        title={"Create Collection"}
        text={
          "Choose a name for your new Collection. The collection can be renamed if need be."
        }
        fieldHeading={"Collection Name"}
        show={showCollectionsModal}
        onCloseClick={onCloseCollectionClick}
        onButtonClick={onCreateCollectionClick}
      />
    </div>
  );
}
const FriendsName = styled.h2`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 36px;
  color: #2a2e2a;
`;
const Dividor = styled.div`
  display: flex;
  width: 100%;
  height: 2px;
  background-color: #a2b29f;
  margin-top: 100px;
  margin-bottom: 100px;
`;
const FriendsContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: space-between;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const FriendsCollectionsSelect = styled.div`
  display: flex;
  width: 100%;
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: space-between;
  justify-content: center;
`;
const CollectionsSelect = styled.div`
  display: flex;
  width: 100%;
  margin-top: 50px;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: space-between;
`;
const CollectionContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  width: 100%;
  margin-top: 55px;
  justify-content: center;
`;
const WelcomeMessage = styled.div`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 43px;
  line-height: 64px;

  color: #2a2e2a;
`;
const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 50px;
`;

const SAMPLE_COLLECTIONS: CollectionDetails[] = [
  { name: "motorcycles", items: 3, space: 213 },
  { name: "cars", items: 34, space: 123 },
  { name: "trains", items: 312, space: 90 },
  { name: "food", items: 13, space: 223 },
  { name: "bicycles", items: 23, space: 32 },
  { name: "moto GP", items: 35, space: 831 },
  { name: "motorcycles", items: 3, space: 213 },
  { name: "cars", items: 34, space: 123 },
  { name: "trains", items: 312, space: 90 },
  { name: "food", items: 13, space: 223 },
  { name: "bicycles", items: 23, space: 32 },
  { name: "moto GP", items: 35, space: 831 },
  { name: "motorcycles", items: 3, space: 213 },
  { name: "cars", items: 34, space: 123 },
  { name: "trains", items: 312, space: 90 },
  { name: "food", items: 13, space: 223 },
  { name: "bicycles", items: 23, space: 32 },
  { name: "moto GP", items: 35, space: 831 },
];
const SAMPLE_FRIENDS: Friends[] = [
  {
    name: "sentar",
    collections: [
      { name: "tf2", items: 13, space: 100 },
      { name: "coding", items: 3, space: 123 },
    ],
  },
  {
    name: "pepu",
    collections: [
      { name: "jest", items: 1, space: 69 },
      { name: "anime", items: 300, space: 1000 },
    ],
  },
];

import router from "next/router";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import NitButton from "../../src/components/NitButton";
import { DashboardScreenSelection } from "../../src/utils/Types";
import NavBar from "./components/NavBar";
import DefaultProfileImage from "../../images/friends-image-default.svg";
import Image from "next/image";
import { useSelector } from "react-redux";
import store, { RootState } from "../../src/redux/store";
import { Collection, UserState } from "../../src/redux/apiTypes";
import NitModal from "./components/NitModal";
import { nitrusApi } from "../../src/redux/apiClient";
import CollectionBubble from "./components/CollectionBubble";

interface Friends {
  name: string;
  collections: Collection[];
}

export default function Dashboard() {
  const [collections, setCollections] = useState<Collection[]>();
  const user = useSelector<RootState, UserState | null>((state) => state.user);
  const [selectedScreen, setSelectedScreen] =
    useState<DashboardScreenSelection>(DashboardScreenSelection.Collection);

  const [postCollection] = nitrusApi.endpoints.postCollection.useMutation();

  const [getCollectionsList, collectionsList] =
    nitrusApi.endpoints.getCollectionsList.useMutation();

  const [showCollectionsModal, setShowCollectionsModal] = useState(false);
  useEffect(() => {
    getCollectionsList()
      .unwrap()
      .then((res) => {
        setCollections(res);
      });
  }, [getCollectionsList]);

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
          getCollectionsList()
            .unwrap()
            .then((res) => {
              setCollections(res);
            });
        })
        .catch((e) => {
          console.log("error on post collection: " + e);
        });
    },
    [getCollectionsList, postCollection]
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
                id="create_collection_button"
              />
            </CollectionContainer>
            <CollectionsSelect id="collections_select">
              {collections ? (
                <>
                  {collections.map((item, index) => (
                    <>
                      <CollectionBubble
                        key={index}
                        items={item.num_items}
                        name={item.name}
                        size={item.size}
                        linkName={item.name}
                        viewButtonID= {"collection_view_button" + index}
                      />
                      ;
                    </>
                  ))}
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
                  {item.collections.map((item, index) => (
                    <CollectionBubble
                      key={index}
                      items={item.num_items}
                      name={item.name}
                      size={item.size}
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
        text={"Please enter a name for the new collection"}
        fieldHeading={"Collection Name"}
        show={showCollectionsModal}
        onCloseClick={onCloseCollectionClick}
        onButtonClick={onCreateCollectionClick}
        inputFieldID="create_collection_modal_input"
        buttonID="create_collection_modal_button"
        backgroundID="create_collection_modal_background"
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

const SAMPLE_FRIENDS: Friends[] = [
  {
    name: "sentar",
    collections: [
      { name: "tf2", num_items: 13, size: 100 },
      { name: "coding", num_items: 3, size: 123 },
    ],
  },
  {
    name: "pepu",
    collections: [
      { name: "jest", num_items: 1, size: 69 },
      { name: "anime", num_items: 300, size: 1000 },
    ],
  },
];

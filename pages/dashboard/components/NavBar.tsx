import router from "next/router";
import { FC, useCallback, useState } from "react";
import styled from "styled-components";
import InputField from "../../../src/components/InputField";
import { DashboardScreenSelection } from "../../../src/utils/Types";
import DashboardButton from "./DashboardButton";
import SearchImage from "../../../images/magnify-ic.svg";
import ProfileDefaultImage from "../../../images/profile-default-ic.svg";
import Image from "next/image";
import Head from "next/head";
import { Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../src/redux/authReducer";
import { RootState } from "../../../src/redux/store";
import { Collection, UserState } from "../../../src/redux/apiTypes";
import { nitrusApi } from "../../../src/redux/apiClient";
import NitButton from "../../../src/components/NitButton";
import Link from "next/link";

interface NavBarProps {
  onCollectionNav: () => void;
  onFriendsNav: () => void;
  selectedScreen?: DashboardScreenSelection;
}
interface searchValues {
  searchTerm: string;
}

const NavBar: FC<NavBarProps> = ({
  onCollectionNav,
  onFriendsNav,
  selectedScreen,
}) => {
  const user = useSelector<RootState, UserState | null>((state) => state.user);
  const dispatch = useDispatch();
  const onLogoutClick = useCallback(() => {
    dispatch(logout());
    router.push("/");
  }, [dispatch]);
  const onProfilePress = useCallback(() => {
    router.push("/profile");
  }, []);
  const onCollectionNavigate = useCallback(() => {
    router.push("/dashboard");
    onCollectionNav();
  }, [onCollectionNav]);
  const onFriendsNavigate = useCallback(() => {
    router.push("/dashboard");
    onFriendsNav();
  }, [onFriendsNav]);

  const [searchItem, searchReturn] =
    nitrusApi.endpoints.searchItem.useMutation();
  const search = useCallback((values: searchValues) => {
    console.log(values.searchTerm);
    searchItem({ searchTerm: values.searchTerm, public: "true" })
      .unwrap()
      .then((res) => {
        setSearchedCollections(res);
        console.log("success: " + JSON.stringify(res));
      })
      .catch((e) => {
        console.log("searchAPI error: " + e);
      });
  }, []);

  const onClearSearchClick = useCallback(() => {
    setSearchedCollections([]);
  }, []);
  const [searchedCollections, setSearchedCollections] = useState<Collection[]>(
    []
  );

  return (
    <NavBarContainer>
      <Head>
        <title>Nitrus</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <ProfileContainer onClick={onProfilePress} id="profile_button">
        <Image src={ProfileDefaultImage} alt="" />
        <UserName>{user?.username}</UserName>
      </ProfileContainer>
      <Formik
        initialValues={{
          searchTerm: "",
        }}
        onSubmit={search}
      >
        <Form>
          <SearchContainer>
            <InputField svg={SearchImage} field={"searchTerm"} />
            <NitButton
              type={"submit"}
              buttonText="Go"
              style={{ height: 40, marginLeft: 10, width: 60 }}
              id={"search_go_button"}
            />
            <NitButton
              buttonText="Clear"
              type="button"
              onClick={onClearSearchClick}
              style={{ height: 40, marginLeft: 10, width: 80 }}
              id={"search_clear_button"}
            />
          </SearchContainer>
        </Form>
      </Formik>
      <SelectionDashboardContainer>
        <DashboardButton
          text={DashboardScreenSelection.Collection}
          selected={selectedScreen === DashboardScreenSelection.Collection}
          onClick={onCollectionNavigate}
          dashboardButtonID="collection_button"
        />
        {/* TODO: implement friends */}
        {/* <DashboardButton
          text={DashboardScreenSelection.Friends}
          selected={selectedScreen === DashboardScreenSelection.Friends}
          onClick={onFriendsNavigate}
          dashboardButtonID="friends_button"
        /> */}
      </SelectionDashboardContainer>

      <LogoutButton onClick={onLogoutClick} id="logout_button">
        Logout
      </LogoutButton>
      <SearchReturnContainer>
        {searchedCollections.slice(0, 5).map((item) => (
          <Link href={{ pathname: `/collection`, query: { name: item.name } }}>
            <CollectionSearchRow onClick={onClearSearchClick}>
              <CollectionSearchText>
                {item.name.substring(0, 20) +
                  (item.name.length > 20 ? "..." : "")}
              </CollectionSearchText>
              <CollectionSearchText>{`${item.num_items} Items`}</CollectionSearchText>
            </CollectionSearchRow>
          </Link>
        ))}
      </SearchReturnContainer>
    </NavBarContainer>
  );
};
const SearchReturnContainer = styled.div`
  position: absolute;
  background-color: #e6f6e1;
  width: 25%;
  top: 10vh;
  left: 18%;
  flex: 1;
  display: flex;
  box-shadow: 6px 6px 6px rgba(0, 0, 0, 0.2);
  flex-direction: column;
  border-radius: 25px;
`;
const CollectionSearchRow = styled.div`
  background-color: #a2b39f;
  flex-direction: row;
  margin: 15px 30px;
  border-radius: 12px;
  justify-content: space-between;
  display: flex;
  :hover {
    cursor: pointer;
  }
`;
const SelectionDashboardContainer = styled.div`
  width: 15vw;
  flex-direction: row;
  display: flex;
`;
const SearchContainer = styled.div`
  flex: 1;
  align-items: center;
  flex-direction: row;
  display: flex;
`;
const CollectionSearchText = styled.h2`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  margin-left: 10px;
  margin-right: 10px;
  color: #f5fef3;
  :hover {
    cursor: pointer;
  }
`;
const UserName = styled.h2`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 26px;
  margin-left: 10px;
  color: #424f40;
`;
const ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  :hover {
    cursor: pointer;
  }
`;
const LogoutButton = styled.h2`
  :hover {
    cursor: pointer;
  }

  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  color: #424f40;
`;

const NavBarContainer = styled.div`
  display: flex;
  position: sticky;
  z-index: 100;
  top: 0;
  box-shadow: 6px 6px 6px rgba(0, 0, 0, 0.2);
  background-color: #e6f5e1;
  width: 100%;
  height: 10%;
  border-radius: 0px 0px 25px 25px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-left: 40px;
  padding-right: 40px;
`;

export default NavBar;

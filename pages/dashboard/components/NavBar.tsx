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
import { UserState } from "../../../src/redux/apiTypes";
import { profile } from "console";

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

  const search = useCallback((values: searchValues) => {
    console.log(values);
  }, []);

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
          <InputField svg={SearchImage} field={"searchTerm"} />
        </Form>
      </Formik>
      <SelectionDashboardContainer>
        <DashboardButton
          text={DashboardScreenSelection.Collection}
          selected={selectedScreen === DashboardScreenSelection.Collection}
          onClick={onCollectionNavigate}
          dashboardButtonID="collection_button"
        />
        <DashboardButton
          text={DashboardScreenSelection.Friends}
          selected={selectedScreen === DashboardScreenSelection.Friends}
          onClick={onFriendsNavigate}
          dashboardButtonID="friends_button"
        />
      </SelectionDashboardContainer>

      <LogoutButton onClick={onLogoutClick} id="logout_button">Logout</LogoutButton>
    </NavBarContainer>
  );
};
const SelectionDashboardContainer = styled.div`
  width: 30vw;
  flex-direction: row;
  display: flex;
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

  @media only screen and (max-width: 770px) {
    background-color: red;
  }
`;

export default NavBar;

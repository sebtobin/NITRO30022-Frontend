import router from "next/router";
import { FC, useCallback, useState } from "react";
import styled from "styled-components";
import InputField from "../../../src/components/InputField";
import { DashboardScreenSelection } from "../../../src/utils/Types";
import DashboardButton from "./DashboardButton";
import SearchImage from "../../../images/magnify-ic.svg";
import ProfileDefaultImage from "../../../images/profile-default-ic.svg";
import Image from "next/image";
interface NavBarProps {
  userName: string;
}

const NavBar: FC<NavBarProps> = () => {
  const [selectedScreen, setSelectedScreen] =
    useState<DashboardScreenSelection>(DashboardScreenSelection.Dashboard);

  const onLogoutClick = useCallback(() => {
    router.push("/");
  }, []);

  return (
    <NavBarContainer>
      <ProfileContainer>
        <Image src={ProfileDefaultImage} alt="" />
        <UserName>isaac_parsons</UserName>
      </ProfileContainer>
      <InputField svg={SearchImage} />
      <SelectionDashboardContainer>
        <DashboardButton
          text={DashboardScreenSelection.Collection}
          selected={selectedScreen === DashboardScreenSelection.Collection}
        />
        <DashboardButton
          text={DashboardScreenSelection.Friends}
          selected={selectedScreen === DashboardScreenSelection.Friends}
        />
      </SelectionDashboardContainer>

      <LogoutButton onClick={onLogoutClick}>Logout</LogoutButton>
    </NavBarContainer>
  );
};
const SelectionDashboardContainer = styled.div`
  width: 25vw;
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

const ButtonContainer = styled.div`
  display: flex;
  background-color: #e6f5e1;
  width: 30%;
  height: 55%;
  align-items: center;
  flex-direction: column;
  border-radius: 25px;
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.1);
  position: absolute;
  right: 10vw;
  top: 280px;
`;
export default NavBar;

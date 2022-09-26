import styled from "styled-components";
import UserImage from "../../images/user-ic.svg";
import KeyImage from "../../images/key-ic.svg";
import MailImage from "../../images/mail-ic.svg";
import InputField from "../../src/components/InputField";
import { useCallback } from "react";
import NitButton from "../../src/components/NitButton";
import NavBar from "../dashboard/components/NavBar";
import { DashboardScreenSelection } from "../../src/utils/Types";

// Profile Page of a User. On this page, they can change their User Details
// (Username, Email, Password) as well as their Profile Picture.
export default function Home() {
  const onSaveClick = useCallback(() => {
    //TODO: this.
    console.log("Save press");
  }, []);

  // Also need to look into adding the script when Change button is clicked.
  return (
    <div>
      <NavBar
        userName="isaac_parsons"
        onCollectionNav={() => {
          return;
        }}
        onFriendsNav={() => {
          return;
        }}
        selectedScreen={DashboardScreenSelection.Collection}
      />
      <Background>
        <ProfileContainer>
          <UserInfoContainerBackground>
            <UserInfoFieldContainer>
              {/* <InputField svg={UserImage} heading={"Username"} />
              <InputField svg={MailImage} heading={"Email"} />
              <InputField svg={KeyImage} heading={"Password"} /> */}
            </UserInfoFieldContainer>
            <NitButton
              onClick={onSaveClick}
              style={{ marginTop: "2.5vw", marginRight: "3vw" }}
              buttonText="Save"
            />
          </UserInfoContainerBackground>

          <ProfilePictureContainer>
            <ProfilePicture></ProfilePicture>
            <ChangeProfilePictureContainer>
              <ChangeText> Change </ChangeText>
            </ChangeProfilePictureContainer>
          </ProfilePictureContainer>
        </ProfileContainer>
      </Background>
    </div>
  );
}

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  align-self: center;
  top: 0;
  left: 0;
  background-color: #d7e8d0;
  align-items: center;
  flex-direction: column;
  display: flex;
  padding-top: 15vw;
`;

const ProfileContainer = styled.div`
  display: flex;
  width: 75%;
  height: 60%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const UserInfoContainerBackground = styled.div`
  display: flex;
  background-color: #e6f5e1;
  width: 55%;
  height: 120%;
  border-radius: 25px;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  align-self: center;
`;

const UserInfoFieldContainer = styled.div`
  display: flex;
  flex: 0.6;
  flex-direction: column;
  justify-content: space-between;
`;

const ProfilePictureContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  align-self: center;
  width: 36%;
  height: 100%;
`;

const ProfilePicture = styled.div`
  display: flex;
  align-items: center;
  align-self: center;
  height: 80%;
  width: auto;
  aspect-ratio: 1;
  background: #424f40;
  border-radius: 50%;
  margin-top: 2vh;
`;

const ChangeProfilePictureContainer = styled.div`
  display: flex;
  align-items: center;
  align-self: center;
  justify-content: center;
  width: 50%;
  height: 7%;
  margin-bottom: 2vh;
`;

const ChangeText = styled.h3`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 26px;
  line-height: 39px;

  color: #424f40;
`;

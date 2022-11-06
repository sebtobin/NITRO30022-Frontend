import styled from "styled-components";
import UserImage from "../../images/user-ic.svg";
import KeyImage from "../../images/key-ic.svg";
import MailImage from "../../images/mail-ic.svg";
import InputField from "../../src/components/InputField";
import { useCallback, useState } from "react";
import NitButton from "../../src/components/NitButton";
import NavBar from "../dashboard/components/NavBar";
import { DashboardScreenSelection } from "../../src/utils/Types";
import { Formik, Form } from "formik";
import { nitrusApi } from "../../src/redux/apiClient";
import { UpdateUserInfoRequest, UpdateUserInfoResponse } from "../../src/redux/apiTypes";
import Image from "next/image";
import DefaultProfileImage from "../../images/friends-image-default.svg";

// Profile Page of a User. On this page, they can change their User Details
// (Email, Password) as well as their Profile Picture.
export default function Home() {

  const [updateUserInfo] = nitrusApi.endpoints.updateUserInfo.useMutation();
  const [updateSuccessful, setUpdateSuccesful] = useState(false);
  const [updateError, setUpdateError] = useState(false);

  const onSaveClick = useCallback(
    (values: UpdateUserInfoRequest) => {
      resetUpdatePrompts();
      if (!values.email && !values.password) {
        setUpdateError(true);
        console.log("Missing Fields");
      } else {
        updateUserInfo(values)
        .unwrap()
        .then((result) => {
          setUpdateSuccesful(true);
          console.log(result);
        })
        .catch((error) => {
          setUpdateError(true);
          console.log("API error: " + error);
        });
      }
    },
    [updateUserInfo]
  );

  const resetUpdatePrompts = useCallback(() => {
    setUpdateError(false);
    setUpdateSuccesful(false);
  }, []);

  // Also need to look into adding the script when Change button is clicked.
  return (
    <div>
      <NavBar
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
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                }}
                onSubmit = {(values, { resetForm }) => {
                  onSaveClick(values);
                  resetForm();
                }}
              >
                <Form>
                  <InputField
                    svg={MailImage} 
                    heading={"Email"}
                    field={"email"}
                    id={"change_details_email"}
                  />
                  <InputField
                    svg={KeyImage} 
                    type={"password"}
                    heading={"Password"}
                    field={"password"}
                    id={"change_details_password"}
                  />
                  {updateSuccessful && (
                    <UpdateResultText>
                      Details updated successfully.
                    </UpdateResultText>
                  )}
                  {updateError && (
                    <UpdateResultText>
                      An error has ocurred. Please try again.
                    </UpdateResultText>
                  )}
                  <NitButton
                    type={"submit"}
                    style={{ marginTop: "2.5vw", marginLeft: "9vw"}}
                    buttonText="Save"
                    id ={"update_details_save_button"}
                  />
                </Form>
              </Formik>
            </UserInfoFieldContainer>
          </UserInfoContainerBackground>

          <ProfilePictureContainer>
            <ProfilePicture>
              <Image src={DefaultProfileImage} alt="" layout="fill" objectFit="contain"/> 
            </ProfilePicture>
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
  position: relative;
  align-items: center;
  align-self: center;
  height: 80%;
  width: auto;
  aspect-ratio: 1;
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

const UpdateResultText = styled.h4`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 10px;
  margin-left: 35%;
  color: #424f40;
`;
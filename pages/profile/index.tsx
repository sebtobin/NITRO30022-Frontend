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
import {
  UpdateUserInfo,
  UpdateUserInfoRequest,
  UpdateUserInfoResponse,
} from "../../src/redux/apiTypes";
import Image from "next/image";
import DefaultProfileImage from "../../images/friends-image-default.svg";

// Profile Page of a User. On this page, they can change their User Details
// (Email, Password) as well as their Profile Picture.
export default function Home() {
  const [updateUserInfo] = nitrusApi.endpoints.updateUserInfo.useMutation();
  const [updateSuccessful, setUpdateSuccesful] = useState(false);
  const [updateError, setUpdateError] = useState(false);
  const [passwordsIdenticalError, setpasswordsIdenticalError] = useState(false);

  const onSaveClick = useCallback(
    (values: UpdateUserInfo) => {
      if (values.password === values.passwordConfirm) {
        resetUpdatePrompts();
        updateUserInfo({
          email: values.email === "" ? undefined : values.email,
          password: values.password === "" ? undefined : values.password,
        })
          .unwrap()
          .then((result) => {
            setUpdateSuccesful(true);
            console.log(result);
          })
          .catch((error) => {
            setUpdateError(true);
            console.log("API error: " + error);
          });
      } else {
        setpasswordsIdenticalError(true);
      }
    },
    [updateUserInfo]
  );

  const resetUpdatePrompts = useCallback(() => {
    setUpdateError(false);
    setUpdateSuccesful(false);
    setpasswordsIdenticalError(false);
  }, []);

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
            <Formik
              initialValues={{
                email: "",
                password: "",
                passwordConfirm: "",
              }}
              onSubmit={(values, { resetForm }) => {
                onSaveClick(values);
                resetForm();
              }}
            >
              <Form>
                <UserInfoFieldContainer>
                  <InputField
                    svg={MailImage}
                    heading={"Email"}
                    field={"email"}
                    id={"change_details_email"}
                  />
                  <InputField
                    svg={KeyImage}
                    type={"password"}
                    heading={"New Password"}
                    field={"password"}
                    id={"change_details_password"}
                  />
                  <InputField
                    svg={KeyImage}
                    type={"password"}
                    heading={"Confirm New Password"}
                    field={"passwordConfirm"}
                    id={"change_details_password_confirm"}
                  />
                  {updateSuccessful && (
                    <UpdateResultText>
                      Details updated successfully. Empty fields were ignored.
                    </UpdateResultText>
                  )}
                  {passwordsIdenticalError && (
                    <UpdateResultText>Passwords do not match.</UpdateResultText>
                  )}
                  {updateError && (
                    <UpdateResultText>
                      Request to change details has failed. This may be due to
                      another account existing with the same email. Please try
                      again.
                    </UpdateResultText>
                  )}
                  <NitButton
                    type={"submit"}
                    buttonText="Save"
                    id={"update_details_save_button"}
                  />
                </UserInfoFieldContainer>
              </Form>
            </Formik>
            <UpdateDetailsInstructionText>
              If you want to change only your email or password, please leave
              the other one empty.
            </UpdateDetailsInstructionText>
          </UserInfoContainerBackground>

          <ProfilePictureContainer>
            <Image
              src={DefaultProfileImage}
              alt=""
              layout="fill"
              objectFit="contain"
            />
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
  @media only screen and (max-width: 1000px) {
    flex-direction: column;
  }
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
  flex-direction: column;
  align-items: center;
`;

const ProfilePictureContainer = styled.div`
  display: flex;

  position: relative;
  height: 80%;
  width: auto;
  aspect-ratio: 1;
`;

const ProfilePicture = styled.div``;

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
  flex: 1;
  width: 75%;
  text-align: center;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  color: #424f40;
`;

const UpdateDetailsInstructionText = styled.p`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  line-height: 39px;
  white-space: pre-line;
  margin-top: 30px;
  color: #424f40;
`;

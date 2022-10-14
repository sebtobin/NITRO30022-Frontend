import Head from "next/head";
import Image from "next/image";
import styled from "styled-components";
import styles from "../styles/Home.module.css";
import LogoImage from "../images/logo.svg";
import UserImage from "../images/user-ic.svg";
import KeyImage from "../images/key-ic.svg";
import MailImage from "../images/mail-ic.svg";
import InputField from "../src/components/InputField";
import { useCallback, useState } from "react";
import NitButton from "../src/components/NitButton";
import router from "next/router";
import { Formik, Form } from "formik";
import { nitrusApi } from "../src/redux/apiClient";
import { LoginRequest, SignUpRequest } from "../src/redux/apiTypes";
import { useDispatch } from "react-redux";
import { setAuthToken } from "../src/redux/authReducer";
import { setUser } from "../src/redux/userReducer";

export default function Home() {
  const dispatch = useDispatch();
  const [loggingIn, setLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [signupError, setSignupError] = useState(false);
  const [registering, setRegistering] = useState(false);
  const [userLogin] = nitrusApi.endpoints.login.useMutation();
  const [userSignup] = nitrusApi.endpoints.signUp.useMutation();
  const [getMe] = nitrusApi.endpoints.getMe.useMutation();

  const getUserState = useCallback(
    (token: string) => {
      dispatch(setAuthToken(token));
      getMe(token)
        .unwrap()
        .then((result) => {
          dispatch(setUser(result));
        });
    },
    [dispatch, getMe]
  );

  const resetErrors = useCallback(() => {
    setLoginError(false);
    setSignupError(false);
  }, []);

  const onLoginClick = useCallback(
    (values: LoginRequest) => {
      resetErrors();
      setLoggingIn(true);
      userLogin(values)
        .unwrap()
        .then((result) => {
          setLoggingIn(false);
          getUserState(result.token);
          router.push("/dashboard");
        })
        .catch((error) => {
          setLoggingIn(false);
          setLoginError(true);
          console.log("API error: " + error);
        });
    },
    [getUserState, resetErrors, userLogin]
  );
  const onRegisterClick = useCallback(
    (values: SignUpRequest) => {
      resetErrors();
      setRegistering(true);
      userSignup(values)
        .unwrap()
        .then((result) => {
          setLoggingIn(false);
          getUserState(result.token);
          router.push("/dashboard");
        })
        .catch((error) => {
          setRegistering(false);
          setSignupError(true);
          console.log("API error: " + error);
        });
    },
    [getUserState, resetErrors, userSignup]
  );

  return (
    <div className={styles.container}>
      <Container>
        <LoginContainer>
          <TitleContainer>
            <Title>Nitrus</Title>
            <Image src={LogoImage} alt="" />
          </TitleContainer>
          <LoginInputContainer>
            <Formik
              initialValues={{
                username: "",
                password: "",
              }}
              onSubmit={onLoginClick}
            >
              <Form>
                <InputField
                  svg={UserImage}
                  heading={"Username"}
                  field={"username"}
                  id = {"login_username"}
                />
                <InputField
                  svg={KeyImage}
                  heading={"Password"}
                  field={"password"}
                  type={"password"}
                  id = {"login_password"}
                />
                <NitButton
                  type={"submit"}
                  loading={loggingIn}
                  style={{ marginTop: "10vw", marginBottom: 55 }}
                  buttonText="Login"
                  id = "login_button"
                />
                {loginError && (
                  <ErrorText>
                    Incorrect username or password. Please try again.
                  </ErrorText>
                )}
              </Form>
            </Formik>
          </LoginInputContainer>
        </LoginContainer>
        <SignUpContainer>
          <TitleContainer>
            <SubTitle>Register</SubTitle>
          </TitleContainer>
          <RegisterInputContainer>
            <Formik
              initialValues={{
                username: "",
                email: "",
                password: "",
              }}
              onSubmit={onRegisterClick}
            >
              <Form>
                <InputField
                  svg={UserImage}
                  heading={"Username"}
                  field={"username"}
                  id = {"register_username"}
                />
                <InputField 
                  svg={MailImage} 
                  heading={"Email"} 
                  field={"email"} 
                  id = {"register_email"}
                />
                <InputField
                  svg={KeyImage}
                  type={"password"}
                  heading={"Password"}
                  field={"password"}
                  id = {"register_password"}
                />

                <NitButton
                  type={"submit"}
                  loading={registering}
                  buttonText="Register"
                  style={{ marginLeft: "54%", width: 220 }}
                  id = {"register_button"}
                />
                {signupError && (
                  <ErrorText>
                    An unexpected error occurred. Please try again.
                  </ErrorText>
                )}
              </Form>
            </Formik>
          </RegisterInputContainer>
        </SignUpContainer>
      </Container>
    </div>
  );
}

const ErrorText = styled.h4`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 10px;
  margin-left: 25%;
  color: #424f40;
`;
const Container = styled.div`
  display: flex;
  flex: 1;
  background-color: #7b9278;
  width: 90%;
  margin-top: 65px;
  border-radius: 25px 25px 0px 0px;
  flex-direction: row;
  align-items: center;

  @media only screen and (max-width: 770px) {
    background-color: red;
    flex-direction: column;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  flex: 0.2;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

const LoginInputContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
  height: 200px;
`;

const RegisterInputContainer = styled.div`
  display: flex;
  flex: 1;
  width: 70%;
  flex-direction: column;
  justify-content: space-between;

  height: 300px;
`;

const LoginContainer = styled.div`
  display: flex;
  background-color: #e6f5e1;
  width: 50%;
  height: 85%;
  margin-left: 65px;
  border-radius: 25px;
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.1);
  z-index: 10;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 60px;
  padding-right: 60px;
  padding-top: 60px;
`;

const SignUpContainer = styled.div`
  display: flex;
  flex: 1;
  background-color: #e6f5e1;
  width: 30%;
  height: 55%;
  align-items: center;
  flex-direction: column;
  border-radius: 25px;
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.1);
  margin-right: 65px;
`;

const Title = styled.h1`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 5pc;
  color: #424f40;
`;

const SubTitle = styled.h2`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 3pc;
  margin-left: 80px;
  color: #424f40;
`;

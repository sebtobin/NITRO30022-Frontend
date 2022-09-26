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
import { LoginRequest } from "../src/redux/apiTypes";
import { useDispatch } from "react-redux";
import { setAuthToken } from "../src/redux/authReducer";

interface RegisterValues {
  username: string;
  password: string;
}

export default function Home() {
  const [loggingIn, setLoggingIn] = useState(false);
  const [registering, setRegistering] = useState(false);
  const [userLogin] = nitrusApi.endpoints.login.useMutation();
  const dispatch = useDispatch();
  const onLoginClick = useCallback(
    (values: LoginRequest) => {
      setLoggingIn(true);
      const { unwrap } = userLogin(values);
      unwrap()
        .then((result) => {
          setLoggingIn(false);
          dispatch(setAuthToken(result.token));
          router.push("/dashboard");
        })
        .catch((error) => {
          // TODO: get error states eg. 401 unauthorised and show error message below error button.
          console.log("API error: " + error);
        });
    },
    [dispatch, userLogin]
  );
  const onRegisterClick = useCallback((values: RegisterValues) => {
    setRegistering(true);
    setTimeout(() => {
      console.log(values);
      setRegistering(false);
    }, 5000);
    setTimeout(() => {
      router.push("/dashboard");
    }, 1000);
  }, []);

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
                />
                <InputField
                  svg={KeyImage}
                  heading={"Password"}
                  field={"password"}
                  type={"password"}
                />
                <NitButton
                  type={"submit"}
                  loading={loggingIn}
                  style={{ marginTop: "10vw", marginBottom: 55 }}
                  buttonText="Login"
                />
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
                />
                <InputField svg={MailImage} heading={"Email"} field={"email"} />
                <InputField
                  svg={KeyImage}
                  type={"password"}
                  heading={"Password"}
                  field={"password"}
                />

                <NitButton
                  type={"submit"}
                  loading={registering}
                  buttonText="Register"
                  style={{ marginLeft: "54%", width: 220 }}
                />
              </Form>
            </Formik>
          </RegisterInputContainer>
        </SignUpContainer>
      </Container>
    </div>
  );
}

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

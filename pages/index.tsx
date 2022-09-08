import Head from "next/head";
import Image from "next/image";
import styled from "styled-components";
import styles from "../styles/Home.module.css";
import LogoImage from "../images/logo.svg";
import UserImage from "../images/user-ic.svg";
import KeyImage from "../images/key-ic.svg";
import MailImage from "../images/mail-ic.svg";
import InputField from "../src/components/InputField";
import { useCallback } from "react";
import NitButton from "../src/components/NitButton";

export default function Home() {
  const onLoginClick = useCallback(() => {
    //TODO: this.
    console.log("Login press");
  }, []);

  const onRegisterClick = useCallback(() => {
    //TODO: this.
    console.log("Register press");
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Nitrus</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Container>
        <SignUpContainer>
          <TitleContainer>
            <SubTitle>Register</SubTitle>
          </TitleContainer>
          <RegisterInputContainer>
            <InputField svg={UserImage} heading={"Username"} />
            <InputField svg={MailImage} heading={"Email"} />
            <InputField svg={KeyImage} heading={"Password"} />
          </RegisterInputContainer>
          <NitButton
            onClick={onRegisterClick}
            buttonText="Register"
            style={{ marginRight: 80, marginTop: 20 }}
          />
        </SignUpContainer>

        <LoginContainer>
          <TitleContainer>
            <Title>Nitrus</Title>
            <Image src={LogoImage} alt="" />
          </TitleContainer>
          <LoginInputContainer>
            <InputField svg={UserImage} heading={"Username"} />
            <InputField svg={KeyImage} heading={"Password"} />
          </LoginInputContainer>
          <NitButton
            onClick={onLoginClick}
            style={{ marginTop: "10vw", marginBottom: 55 }}
            buttonText="Login"
          />
        </LoginContainer>
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
  }
`;

const TitleContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

const LoginInputContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 10vh;
  height: 200px;
`;

const RegisterInputContainer = styled.div`
  display: flex;
  width: 70%;
  flex-direction: column;
  justify-content: space-between;
  height: 270px;
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
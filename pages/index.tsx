import Head from "next/head";
import Image from "next/image";
import styled from "styled-components";
import styles from "../styles/Home.module.css";
import LogoImage from "../images/logo.svg";

export default function Home() {
  return (
    <div className={styles.container}>
      <Container>
        <SignUpContainer></SignUpContainer>
        <LoginContainer>
          <Title>Nitrus</Title>
          <Image src={LogoImage} alt="" />
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

const LoginContainer = styled.div`
  display: flex;
  background-color: #e6f5e1;
  width: 50%;
  height: 85%;
  margin-left: 65px;
  border-radius: 25px;
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.1);
  z-index: 10;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  padding-left: 60px;
  padding-right: 60px;
  padding-top: 60px;
`;
const SignUpContainer = styled.div`
  display: flex;
  background-color: #e6f5e1;
  width: 30%;
  height: 55%;
  margin-left: 65px;
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
  font-size: 4pc;

  color: #424f40;
`;

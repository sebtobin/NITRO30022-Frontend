import { CSSProperties, FC } from "react";
import styled from "styled-components";
import Image from "next/image";
import { blue } from "@material-ui/core/colors";
import { Formik, Field, Form, FormikHelpers } from "formik";
interface InputFieldProps {
  svg?: any;
  heading?: string;
  placeholder?: string;
  field: string;
  type?: string;
  style?: CSSProperties;
  id?: string;
}

const InputField: FC<InputFieldProps> = ({
  svg,
  heading,
  field,
  type,
  placeholder,
  style,
  id
}) => {
  const container: CSSProperties = {
    paddingLeft: "60px",
    backgroundColor: "#d7e8d0",
    borderColor: "transparent",
    height: "55px",
    borderRadius: "12px",
    fontSize: "23px",
    width: "30vw",
    backgroundPositionX: "10px",
    backgroundPositionY: "10px",
    backgroundRepeat: "no-repeat",
    paddingRight: "30px",
    color: " #424f40",
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: 400,
    justifyContent: "center",
  };
  const padding: CSSProperties = {
    paddingLeft: svg ? "60px" : "20px",
  };
  return (
    <Container style = {style}>
      <Heading>{heading}</Heading>
      <FieldContainer>
        <ImageComponent>
          <Image src={svg} alt="" />
        </ImageComponent>
        <Field
          style={{ ...container, ...padding }}
          id={id}
          name={field}
          placeholder={placeholder}
          type={type}
        />
      </FieldContainer>
    </Container>
  );
};

const FieldContainer = styled.div`
  display: flex;
  flex: 1;
  position: relative;
`;

const Container = styled.div`
  flex-direction: column;
  display: flex;
  margin-top: 12px;
  margin-bottom: 12px;
`;

const ImageComponent = styled.div`
  display: flex;
  position: absolute;
  margin-left: 10px;
  top: 0;
  bottom: 0;
  margin-top: auto;
  margin-bottom: auto;
  height: 35px;
`;

const Heading = styled.h4`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  margin: 0px;
  color: #424f40;
`;
const UserInput = styled.input`
  background-color: #d7e8d0;
  border-color: transparent;
  height: 55px;
  border-radius: 12px;
  font-size: 23px;
  width: 30vw;
  background-position-x: 10px;
  background-position-y: 10px;
  background-repeat: no-repeat;
  padding: 30px 30px;
  color: #424f40;
  font-family: Poppins;
  font-style: normal;
  font-weight: 400;
`;

export default InputField;

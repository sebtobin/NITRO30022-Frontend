import { CSSProperties, FC } from "react";
import styled from "styled-components";
import Image from "next/image";
import { blue } from "@material-ui/core/colors";

interface InputFieldProps {
  svg: any;
  heading?: string;
}

const InputField: FC<InputFieldProps> = ({ svg, heading }) => {
  return (
    <Field>
      <Heading>{heading}</Heading>
      <FieldContainer>
        <ImageComponent>
          <Image src={svg} alt="" />
        </ImageComponent>
        <UserInput />
      </FieldContainer>
    </Field>
  );
};

const FieldContainer = styled.div`
  display: flex;
  flex: 1;
  position: relative;
`;

const Field = styled.div`
  flex-direction: column;
  display: flex;
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
  padding-left: 60px;
  color: #424f40;
  font-family: Poppins;
  font-style: normal;
  font-weight: 400;

  :focus {
    outline: none;
  }
`;

export default InputField;

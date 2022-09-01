import { CSSProperties, FC } from "react";
import styled from "styled-components";
import Image from "next/image";
import { blue } from "@material-ui/core/colors";

interface InputFieldProps {
  svg: any;
  heading: string;
}

const InputField: FC<InputFieldProps> = ({ svg, heading }) => {
  return (
    <Field>
      <Heading>{heading}</Heading>
      <FieldContainer>
        <ImageComponent>
          <Image src={svg} alt="" />
        </ImageComponent>
        <input style={inputStyle}></input>
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

const inputStyle: CSSProperties = {
  backgroundColor: " #D7E8D0",
  borderColor: "transparent",
  height: "55px",
  borderRadius: "12px",
  fontSize: "23px",
  width: "30vw",
  backgroundPositionX: "10px",
  backgroundPositionY: "10px",
  backgroundRepeat: "no-repeat",
  paddingLeft: "50px",
  color: "#424F40",
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
};
export default InputField;

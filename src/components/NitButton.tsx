import { CSSProperties, FC } from "react";
import styled from "styled-components";

interface NitButtonProps {
  onClick: () => void;
  buttonText: string;
  style?: CSSProperties;
}

const NitButton: FC<NitButtonProps> = ({ onClick, style, buttonText }) => {
  return (
    <LoginButton onClick={onClick} style={style}>
      <ButtonText>{buttonText}</ButtonText>
    </LoginButton>
  );
};

const LoginButton = styled.div`
  display: flex;
  width: 35%;
  height: 70px;
  border-radius: 12px;
  background-color: #879b82;
  align-items: center;
  justify-content: center;
  transition-duration: 0.4s;

  :hover {
    background-color: #424f40;
    cursor: pointer;
  }
`;

const ButtonText = styled.h3`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 36px;
  color: #f6fef3;
  :hover {
    cursor: pointer;
  }
`;

export default NitButton;

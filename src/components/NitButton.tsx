import { CSSProperties, FC } from "react";
import styled from "styled-components";
import ActivityIndicator from "../../pages/dashboard/components/ActivityIndicator";

interface NitButtonProps {
  onClick?: () => void;
  buttonText: string;
  style?: CSSProperties;
  type?: "button" | "submit" | "reset" | undefined;
  loading?: boolean;
}

const NitButton: FC<NitButtonProps> = ({
  onClick,
  style,
  buttonText,
  type,
  loading,
}) => {
  return (
    <LoginButton type={type} onClick={onClick} style={style}>
      <ButtonText>{buttonText}</ButtonText>
      {loading && (
        <Loading>
          <ActivityIndicator />
        </Loading>
      )}
    </LoginButton>
  );
};

const Loading = styled.div`
  display: flex;
  position: absolute;
  right: 10px;
`;
const LoginButton = styled.button`
  display: flex;
  width: 35%;
  position: relative;
  height: 70px;
  border-radius: 12px;
  background-color: #879b82;
  align-items: center;
  justify-content: center;
  transition-duration: 0.4s;
  border-color: transparent;

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

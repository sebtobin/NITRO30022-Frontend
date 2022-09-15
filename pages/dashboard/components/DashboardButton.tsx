import { FC } from "react";
import { CSSProp } from "styled-components";
import NitButton from "../../../src/components/NitButton";

interface DashboardButtonProps {
  text: string;
  selected: boolean;
}

const DashboardButton: FC<DashboardButtonProps> = ({ text }) => {
  const containerStyle: CSSProp = {
    flex: 1,
    height: "50px",
    marginLeft: "20px",
    marginRight: "20px",
  };
  return (
    <NitButton
      onClick={() => {
        return;
      }}
      style={containerStyle}
      buttonText={text}
    />
  );
};

export default DashboardButton;

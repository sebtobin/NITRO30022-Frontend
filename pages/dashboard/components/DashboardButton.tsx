import { FC } from "react";
import NitButton from "../../../src/components/NitButton";
// import { css, jsx } from "@emotion/core";

interface DashboardButtonProps {
  text: string;
  selected: boolean;
}

const DashboardButton: FC<DashboardButtonProps> = ({ text }) => {
  return (
    <NitButton
      onClick={() => {
        return;
      }}
      style={{
        flex: 1,
        height: "50px",
        marginLeft: "20px",
        marginRight: "20px",
      }}
      buttonText={text}
    />
  );
};

export default DashboardButton;

import { yellow } from "@material-ui/core/colors";
import { FC } from "react";
import { CSSProp } from "styled-components";
import NitButton from "../../../src/components/NitButton";

interface DashboardButtonProps {
  text: string;
  selected: boolean;
  onClick: () => void;
}

const DashboardButton: FC<DashboardButtonProps> = ({
  text,
  onClick,
  selected,
}) => {
  const unSelectedStyle: CSSProp = {
    flex: 0.9,
    height: "50px",
    marginLeft: "20px",
    marginRight: "20px",
  };
  const selectedStyle: CSSProp = {
    flex: 1,
    height: "50px",
    marginLeft: "20px",
    marginRight: "20px",
    borderWidth: "3px",
    borderColor: "#616b5f",
    borderStyle: "solid",
  };
  return (
    <NitButton
      onClick={onClick}
      style={selected ? selectedStyle : unSelectedStyle}
      buttonText={text}
    />
  );
};

export default DashboardButton;

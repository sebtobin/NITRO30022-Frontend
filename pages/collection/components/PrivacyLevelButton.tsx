import { FC } from "react";
import styled, { CSSProperties } from "styled-components";
import { PrivacyLevel } from "../../../src/utils/Types";

interface PrivacyLevelButtonProps {
  level: boolean;
  selected: boolean;
  onClick: (level: boolean) => void;
  id?: string;
}

const PrivacyLevelButton: FC<PrivacyLevelButtonProps> = ({
  level,
  selected,
  onClick,
  id,
}) => {
  const isSelected = level === selected;
  const underLine: CSSProperties = { textDecoration: "underline" };
  return (
    <PricacyLevelButton
      style={isSelected ? underLine : undefined}
      onClick={() => onClick(level)}
      id={id}
    >
      {level === true ? "Private" : "Public"}
    </PricacyLevelButton>
  );
};
const PricacyLevelButton = styled.h3`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  color: #424f40;
  height: 35px;

  :hover {
    cursor: pointer;
  }
`;
export default PrivacyLevelButton;

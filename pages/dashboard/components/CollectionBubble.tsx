import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import styled from "styled-components";
import NitButton from "../../../src/components/NitButton";
import ItemsImage from "../assets/images/items-ic.svg";
import StorageImage from "../assets/images/storage-ic.svg";
interface CollectionProps {
  name: string;
  items: number;
  size: number;
  onViewClick?: () => void;
  linkName?: string;
  viewButtonID?: string;
}

const CollectionBubble: FC<CollectionProps> = ({
  items,
  name,
  size,
  linkName,
  onViewClick,
  viewButtonID,
}) => {
  return (
    <Container>
      <ItemsBubble>
        <ItemsImageContainer>
          <Image src={ItemsImage} alt="" />
        </ItemsImageContainer>
        <ItemsNumber>{items}</ItemsNumber>
      </ItemsBubble>
      <AttributesContainer>
        <CollectionName>{name}</CollectionName>
        <Link href={{ pathname: `/collection`, query: { name: linkName } }}>
          <NitButton
            onClick={onViewClick}
            style={{
              width: 200,
              height: 50,
              alignSelf: "center",
              backgroundColor: "#A2B29F",
              marginTop: 30,
            }}
            buttonText={"View"}
            id={viewButtonID}
          />
        </Link>
      </AttributesContainer>
    </Container>
  );
};
const SpaceText = styled.div`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  color: #e6f5e1;
`;
const Storage = styled.div`
  display: flex;
  margin-top: 40px;
  flex-direction: row;
  align-items: center;
`;
const AttributesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;
const CollectionName = styled.h2`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 25px;
  line-height: 38px;

  color: #e6f5e1;
`;
const ItemsNumber = styled.h4`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  color: #e6f5e1;
`;
const Container = styled.div`
  position: relative;
  display: flex;
  padding: 12px;
  width: 300px;
  height: 300px;
  background-color: #7b9278;
  border-radius: 25px;
  margin-left: 30px;
  margin-top: 30px;
`;
const ItemsImageContainer = styled.div`
  width: 30px;
  height: 30px;
  margin-bottom: -20px;
`;
const ItemsBubble = styled.div`
  display: flex;
  position: absolute;
  flex-direction: column;
  width: 60px;
  height: 60px;
  top: -10px;
  right: -10px;
  align-items: center;
  border-radius: 50px;
  background-color: #a2b29f;
`;

export default CollectionBubble;

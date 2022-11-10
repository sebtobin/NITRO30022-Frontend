import Image from "next/image";
import { FC } from "react";
import styled from "styled-components";
import ViewButton from "../../../images/view-button.svg";
import EditButton from "../../../images/edit-button.svg";
import DeleteButton from "../../../images/delete-button.svg";
import { FileData } from "../../../src/redux/apiTypes";

interface FileRowProps {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  file: FileData;
  index?: number;
}
function setCharAt(str: any, index: any, chr: any) {
  if (index > str.length - 1) return str;
  return str.substring(0, index) + chr + str.substring(index + 1);
}

const PublicFileRow: FC<FileRowProps> = ({
  onView,
  onDelete,
  onEdit,
  file,
  index,
}) => {
  return (
    <FilePill>
      <FileName>
        {file.title.length > 17
          ? file.title.substring(0, 17) + "..."
          : file.title}
      </FileName>
      <FileButtons>
        <FileButton
          href={
            file.document.indexOf(".ap-southeast-3") > 0
              ? setCharAt(
                  file.document,
                  file.document.indexOf(".ap-southeast-3") +
                    ".ap-southeast-3".length -
                    1,
                  "2"
                )
              : file.document
          }
          target="_blank"
          id={"file_view_button" + index}
        >
          <Image src={ViewButton} alt={""} />
        </FileButton>
      </FileButtons>
    </FilePill>
  );
};

const FileButton = styled.a`
  display: flex;
  justify-content: center;
  :hover {
    cursor: pointer;
  }
`;
const FileButtons = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-evenly;
`;
const FileName = styled.h3`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 400;
  font-size: 23px;
  color: #424f40;
  flex: 1;
`;
const FilePill = styled.div`
  display: flex;
  flex-direction: row;
  width: 48%;
  margin-bottom: 10px;
  padding-left: 28px;
  padding-right: 30px;
  background-color: #e6f5e1;
  border-radius: 30px;
`;
export default PublicFileRow;

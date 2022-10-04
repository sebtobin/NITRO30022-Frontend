import { FC } from "react";
import styled from "styled-components";
import NitButton from "../../../src/components/NitButton";
import InputField from "../../../src/components/InputField";
import { Formik, Form } from "formik";
import { useCallback, useRef } from "react";

interface NitModalProps {
  show?: boolean;
  title: string;
  text?: string;
  fieldHeading?: string;
  onCloseClick: () => void;
  onButtonClick: (name: string) => void;
}

const NitModal: FC<NitModalProps> = ({
  show,
  title,
  text,
  fieldHeading,
  onCloseClick,
  onButtonClick,
}) => {
  return show ? (
    <NitModalContainer>
      <NitModalBackground onClick={onCloseClick} />
      <NitModalPopup>
        <NitModalPopUpContentContainer>
          <NitModalPopUpTitle>{title}</NitModalPopUpTitle>
          <NitModalText>{text}</NitModalText>
          <NitModalFormikContainer>
            <Formik
              initialValues={{ collectionName: "" }}
              onSubmit={({ collectionName }) => {
                onButtonClick(collectionName);
              }}
            >
              <Form>
                <InputField
                  heading={fieldHeading}
                  field={"collectionName"}
                  style={{
                    width: "20%",
                    marginTop: 0,
                    alignSelf: "center",
                  }}
                />
                <NitButton
                  type={"submit"}
                  buttonText="Create"
                  style={{
                    width: 200,
                    height: 50,
                    alignSelf: "center",
                    marginLeft: "3.5vw",
                  }}
                />
              </Form>
            </Formik>
          </NitModalFormikContainer>
        </NitModalPopUpContentContainer>
      </NitModalPopup>
    </NitModalContainer>
  ) : (
    <></>
  );
};

const NitModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 101;
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NitModalBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
`;
const NitModalPopup = styled.div`
  position: absolute;
  height: 360px;
  width: 541px;
  aspect-ratio: 16 / 9;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  background: #e6f5e1;
  border-radius: 12px;
`;

const NitModalPopUpContentContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;

  padding-left: 1vw;
  padding-right: 1vw;
`;
const NitModalPopUpTitle = styled.h1`
  top: 20px;

  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 40px;
  line-height: 48px;
  align-self: center;

  color: #424f40;
`;

const NitModalText = styled.h3`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 25px;
  align-self: center;
  text-align: center;

  margin-top: 0;

  color: #424f40;
`;

const NitModalFormikContainer = styled.div`
  height: auto;
  width: 75%;
  display: flex;
  align-self: center;
`;

export default NitModal;

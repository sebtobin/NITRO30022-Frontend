import {FC} from "react";
import styled from "styled-components";
import NitButton from "../../../src/components/NitButton";
import InputField from "../../../src/components/InputField";
import { Formik, Form } from "formik";
import { useCallback, useRef } from "react";

	interface NitModalProps {
		show?: boolean;
		title: string;
		text?: string;
		onCloseClick: () => void;
	}

	const NitModal: FC<NitModalProps> = ({
		show,
		title,
		text,
		onCloseClick
	}) => {
		const onCreateClick = useCallback(() => {
			//TODO: this.
			console.log("Create press");
		}, []);

		return (
			show ? (
				<NitModalContainer>
					<NitModalBackground onClick = {onCloseClick}/>
					<NitModalPopup>
						<NitModalPopUpContentContainer>
							<NitModalPopUpTitle>{title}</NitModalPopUpTitle>
							<NitModalText>{text}</NitModalText>
							<Formik 
								initialValues = {{
									collectionName: "",
								}}
								onSubmit = {onCreateClick} 
							>
								<Form>
									<InputField
										heading = {"Collection Name"}
										field = {"collectionName"}
										style = {{
											width: "20%",
											marginLeft: "2vw",
											marginTop: 0,
											alignSelf: "center",}}
									/>
								</Form>

							</Formik>
							<NitButton
								type = {"submit"}
								buttonText = "Create"
								style={{
									width: 200,
									height: 50,
									alignSelf: "center",
								}}
							/>
						</NitModalPopUpContentContainer>
					</NitModalPopup>
				</NitModalContainer>
			) : <></>
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

	const NitModalBackground = styled.div `
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.9);
	`
	const NitModalPopup = styled.div `
		position: absolute;
		height: 360px;
		width: 541px;
		aspect-ratio: 16 / 9;
		display: flex;
		flex-direction: column;
		align-items: flex-start;

		background: #E6F5E1;
		border-radius: 12px;
	`

	const NitModalPopUpContentContainer = styled.div `
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: space-around;

		padding-left: 1vw;
		padding-right: 1vw;
	`
	const NitModalPopUpTitle = styled.h1 `
		top: 20px;

		font-family: "Poppins";
		font-style: normal;
		font-weight: 600;
		font-size: 40px;
		line-height: 48px;
		align-self: center;


		color: #424F40;
	`

	const NitModalText = styled.h3 `
		font-family: "Poppins";
		font-style: normal;
		font-weight: 600;
		font-size: 14px;
		line-height: 25px;
		align-self: center;
		text-align: center;
		
		margin-top: 0;
	
		color: #424f40;
	`	

	export default NitModal;
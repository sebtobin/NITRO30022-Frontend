export default function Home() {
  
  const onSaveClick = useCallback(() => {
    //TODO: this.
    console.log("Save press");
  }, []);

  return (
    <Background>
      <ProfileContainer>
        <UserInfoContainerBackground>
          <UserInfoContainer>
              <UserInfoFieldContainer>
                <InputField svg={UserImage} heading={"Username"} />
                <InputField svg={MailImage} heading={"Email"} />
                <InputField svg={KeyImage} heading={"Password"} />
              </UserInfoFieldContainer>
              <NitButton 
                 onClick={onSaveClick}
                 style={{ marginTop: "2.5vw", marginRight: "3vw"}}
                 buttonText="Save"
              />
          </UserInfoContainer>
        </UserInfoContainerBackground>

        <ProfilePictureContainer>
          <ProfilePicture>

          </ProfilePicture>
          <ChangeProfilePictureContainer>
            <ChangeText> Change </ChangeText>
          </ChangeProfilePictureContainer>
        </ProfilePictureContainer>

      </ProfileContainer>
    </Background>
  );
}

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  align-self: center;
  top: 0;
  left: 0;
  background-color: #D7E8D0;
  align-items: center;
  flex-direction: column;
  display: flex;
  padding-top: 7.5vw;
`;

const ProfileContainer = styled.div `
  display: flex;
  width: 75%;
  height: 60%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const UserInfoContainerBackground = styled.div `
  display: flex;
  background-color: #E6F5E1;
  width: 55%;
  height: 100%;
  border-radius: 25px;
  justify-content: center;
`

const UserInfoContainer = styled.div `
  display: flex;
  width: 80%;
  height: 76%;
  flex-direction: column;
  align-items: center;
  align-self: center;
`

const UserInfoFieldContainer = styled.div `
  display: flex;
  width: 100%;
  height: 75%;
  flex-direction: column;
  justify-content: space-between;
`

const ProfilePictureContainer = styled.div `
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  align-self: center;
  width: 36%;
  height: 100%;
`

const ProfilePicture = styled.div `
  display: flex;
  align-items: center;
  align-self: center;
  height: 80%;
  width: auto;
  aspect-ratio: 1;
  background: #424F40;
  border-radius: 50%; 
  margin-top: 2vh;
`

const ChangeProfilePictureContainer = styled.div `
  display: flex;
  align-items: center;
  align-self: center;
  justify-content: center;
  width: 50%;
  height: 7%;
  margin-bottom: 2vh;
`

const ChangeText = styled.h3 `
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-size: 26px;
  line-height: 39px;

  color: #424F40;
`
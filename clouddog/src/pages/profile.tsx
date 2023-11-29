import styled from "styled-components";
import Header from "../components/header";
import { useState } from "react";
import { useEffect } from "react";
import { instance } from "@/apis/instance/axios";


//프로필 부분 api 통신 완전 개잘됨

const Home = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const ProfileText = styled.p`
  color: #000;
  text-align: center;
  font-size: 1.15vw;
  font-style: normal;
  font-weight: 400;
  line-height: 170%;
  margin-top: 5.2vw;
  margin-bottom: 5.2vw;
`;

const ProfileSpace = styled.div`
  width: 70%;
  display: flex;
  flex-direction: row;
`;

const ProfilePicture = styled.div<ProfilePictureProps>`
  position: relative;
  width: 21.4vw;
  height: 21.4vw;
  border-radius: 21.4vw;
  border: 1px solid #000;
  background: ${(props) =>
    `url(${props.backgroundImage}) no-repeat center/cover`};
  margin-right: 5vw;
`;

const EditIcon = styled.img`
  position: absolute;
  bottom: 10px;
  right: 12px;
  width: 4.6vw;
  height: 4.6vw;
  cursor: pointer;
`;

const UserFirst = styled.div`
  gap: 1vw;
  display: flex;
  flex-direction: row;
`;

const ProfileInput = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserNickname = styled.input`
  display: flex;
  width: 17.68vw;
  height: 1.2vw;
  padding: 1.05vw 1.15vw;
  align-items: center;
  border-radius: 0.5vw;
  border: 1px solid #000;
  background: #f3f3f3;

  color: #4e4e4e;

  font-size: 1.15vw;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const UserMindIcon = styled.img`
  width: 1.2vw;
  height: auto;
  margin-right: 1.05vw;
`;
const UserMind = styled.input`
  display: flex;
  width: 17.68vw;
  height: 1.2vw;
  padding: 1.05vw 1.15vw 1.05vw 1.15vw;
  align-items: center;
  border-radius: 0.5vw; 
  border: 1px solid #000;
  background: #f3f3f3 url("/info.png") no-repeat right 1.8vw center;
  background-size: 1.8vw 1.8vw;

  font-size: 1.15vw;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  &:disabled {
    background: #f3f3f3 url("/info.png") no-repeat right 1.15vw center;
    background-size: 1.8vw 1.8vw;
  }
`;

const Tooltip = styled.div`
  visibility: hidden;
  background-color: #FFF;
  color: black; 
  width: 10.8vw;
  border-radius: 0.5vw;
  border: 3px solid #FE8F5A;
  padding: 1.3vw 1vw 1.2vw 1vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align:center;
  font-size:1vw;
  position: absolute;
  z-index: 1;
  top: 50%;
  left: 58%;
  opacity: 0;
  transition: opacity 0.3s, visibility 0.3s;
`;

const UserMindContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative; 
  &:hover ${Tooltip} {
    visibility: visible; 
    opacity: 1;
  }
`;

const DogName = styled.input`
  margin-top: 1.05vw;
  padding: 1.05vw 1.15vw;
  width: 38.8vw;
  height: 1.2vw;
  border-radius: 0.5vw;
  border: 1px solid #000;
  background: #f3f3f3;
  font-size: 1.15vw;
  margin-bottom: 1.05vw;
`;

const DogEx = styled.textarea`
  border-radius: 0.5vw;
  padding: 1.05vw 1.15vw;
  border: 1px solid #000;
  background: #f3f3f3;
  width: 38.8vw;
  height: 11vw;
  font-size: 1.15vw;
  resize: none;
`;

const ButtonSpace = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 1.6vw;
  gap: 1vw;
`;

const EditButton = styled.div`
  display: flex;
  width: 12.8vw;
  padding: 1vw 3.6vw;
  justify-content: center;
  align-items: center;
  gap: 0.5vw;
  border-radius: 3vw;
  border: 1px solid #000;
  background: #d0d0d0;
  color: #fff;
  text-align: center;
  font-family: Pretendard;
  font-size: 1.2vw;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  cursor: pointer;
`;

const SaveButton = styled.div`
  display: flex;
  width: 12.8vw;
  padding: 1vw 3.6vw;
  justify-content: center;
  align-items: center;
  gap: 0.5vw;
  border-radius: 3vw;
  border: 1px solid #000;
  background: #fe8f5a;
  color: #fff;
  text-align: center;
  font-family: Pretendard;
  font-size: 1.2vw;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  cursor: pointer;
`;

const Modal = styled.div<ModalProps>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  display: ${(props) => (props.show ? "block" : "none")};
`;

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  width: 67.5vw;
  height: 37.35vw;
  background-color: white;
  border-radius: 12px;
  display: flex;
  padding-left: 5vw;
  padding-right: 5vw;
  position:relative;
`;

const ModalProfile = styled.div<ModalProfileProps>`
  width: 18.75vw;
  height: 18.75vw;
  border-radius: 21.4vw;
  border: 1px solid #000;
  background-size: 75%; 
  background-repeat: no-repeat; 
  background-position: center;
  background: ${(props) =>
    `url(${props.backgroundImage}) no-repeat center/cover`};
   background-color: var(--2, #FEF1DE);
  margin-top: 1vw;
`;

const Modaldiv = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-top: 4vw;
`;


const SmallCircle = styled.div`
  width: 9vw;
  height: 9vw;
  border-radius: 50%;
  border: 1px solid #000;
  background: #fff;
  cursor: pointer;
  background: var(--2, #FEF1DE);
  background-size:80%;
  background-repeat:no-repeat;
  background-position: center;
`;


const Profilename= styled.p`
  font-size:1vw;
  display:flex;
  flex-direction:column;
  align-items: center;
  gap:1vw;
`
const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 3.4165vw;
  gap: 1.5vw;
`;

const SaveButton2Container = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  margin-top: 4vw;
`;

const SaveButton2 = styled.button`
  width: 7.35vw;
  height: 2.5vw;
  border-radius: 3vw;
  border: 1px solid #000;
  background: #fe8f5a;
  color: #fff;

  font-family: Pretendard;
  font-size: 1.2vw;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const CloseButton = styled.div`
  position: absolute;
  width: 36px;
height: 36px;
  top: 15px;
  right: 2px;
  cursor: pointer;
  font-size: 1.5vw;
  color: #000;
`;

const ImageOptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5vw; 
`;

const ImageName = styled.span`
margin-top:0.5vw;
  font-size: 1vw; 
`;

const Row =styled.div`
  display:flex;
  justify-content: center;
  gap:3vw;
`

interface ProfileData { 
  nickName: string;
  petNumber: number;
  petName: string;
  petDescription: string;
  mindCount: string | number;
}

//모달관련 보여줄지 말지 결정
interface ModalProps {
  show: boolean;
}

//모달창에서 이미지 선택한거 불러오기
interface ModalProfileProps {
  backgroundImage: string;
}

//프로필 창 프로필 이미지
interface ProfilePictureProps {
  backgroundImage: string;
}


function Profiles() {

  const handleCloseButtonClick=()=>{//모달 x 버튼
    setModalOpen(false);
  };

  const [profileData, setProfileData] = useState<ProfileData>({//input 칸에 들어가는 데이터들  저장
    nickName: "",
    petNumber: 0,
    petName: "",
    petDescription: "",
    mindCount: "",
  });


  //프로필 이미지 저장 함수
  const [profileImage, setProfileImage] = useState<string>(//프로필 이미지 url 
    "/_포메.png"
  );

  //모달 창이 열려있는지 여부
  const [isModalOpen, setModalOpen] = useState(false);

  //연필 아이콘 클릭시 modal 창 열림
  const handleEditIconClick = () => {
    setModalOpen(true);
  };


  const [selectedImage, setSelectedImage] = useState<string>("");

  const imageOptions = [
    { url: "/_포메.png", name: "포메라니안" },
    { url: "/_흰_푸들.png", name: "푸들" },
    { url: "/_사모.png", name:"사모예드"},
    { url: "/_시츄.png", name:"시츄"},
    { url: "/_골디.png", name:"골든 리트리버"},
    { url: "/비글.png", name:"비글"},
    { url: "/도베르만.png", name:"도베르만"},
    { url: "/_프렌치_불독.png", name:"프렌치 불독"},
  ];

  //프로필 이미지 함수
  const handleImageSelect = (image: string, index: number) => {
    setSelectedImage(image);
    setProfileData(prevData => ({
      ...prevData,
      petNumber: index + 1 // 인덱스에 1을 더해 petNumber 설정
    }));
  };

 
  //수정하기 저장하기 관련 로직
  const [isFormEditable, setFormEditable] = useState(false); //폼 활성화, 비활성화

  useEffect(() => {

    setFormEditable(false)
    // 로컬 스토리지에서 프로필 이미지를 불러오는 코드
    const storedProfileImage = sessionStorage.getItem("profileImage") || "/_포메.png";
    setProfileImage(storedProfileImage);
  
    const storedProfileData = sessionStorage.getItem("profileData");
  if (storedProfileData) {
    setProfileData(JSON.parse(storedProfileData));
  }
    
    const storedSelectedImage = sessionStorage.getItem("selectedImage");
    if (storedSelectedImage) {
      setSelectedImage(storedSelectedImage);
    }
  
   
    const isEditable = sessionStorage.getItem("isFormEditable");
    setFormEditable(isEditable !== "false");
  }, []);
  
  
  const handleProfileImageSave = () => {//프로필 이미지 로컬 스토리지
    if (selectedImage) {
      setProfileImage(selectedImage);
      sessionStorage.setItem("profileImage", selectedImage);
      sessionStorage.setItem("selectedImage", selectedImage); 
      setModalOpen(false);
      alert("프로필 이미지가 저장되었습니다.");
    }
  };


  const loadProfileData = () => {
    const storedData = sessionStorage.getItem("profileData");//프로필 데이터 저장 
    if (storedData) {//json으로 변환
      setProfileData(JSON.parse(storedData));
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
     let finalValue: string | number = value;
    
  
  if (name === 'mindCount') {
    finalValue = value === '' ? '' : Number(value); 
  }
    
    setProfileData((prevData) => ({
      ...prevData,
      [name]: finalValue,
    }));
  };

  const handleEdit = () => {//수정함수
    setFormEditable(true);
  };

  const handleSave = async () => {
    // 모든 필드가 채워져 있는지 확인
    if (
      !profileData.nickName ||
      profileData.petNumber === 0 ||
      !profileData.petName ||
      !profileData.petDescription ||
      (!profileData.mindCount && profileData.mindCount !== 0) 
    ) {
      alert("모든 칸을 입력해주세요.");
      return; 
    }

    console.log('Sending data to API:', {
      nickName: profileData.nickName,
      petNumber: profileData.petNumber,
      petName: profileData.petName,
      petDescription: profileData.petDescription,
      mindCount: profileData.mindCount
    });
  
    try {
      const memberId = sessionStorage.getItem('memberId');
      const response=await instance.put(`/api/v1/${memberId}`, {
        nickName: profileData.nickName,
        petNumber: profileData.petNumber,
        petName: profileData.petName,
        petDescription: profileData.petDescription,
        mindCount: profileData.mindCount
      });
      console.log('Response from API:', response);
      alert("프로필이 저장되었습니다.");
    } catch (error) {
      console.error("프로필 저장 중 오류 발생:", error);
    }
  
    
    sessionStorage.setItem("profileData", JSON.stringify(profileData));
    setFormEditable(false);
  };

  return (
    <>
      <Header />
      <Home>
        <ProfileText>
          강아지와 나의 프로필 입력을 통해
          <br />
          오래도록 기억에 남을 구름을 완성해보세요!
        </ProfileText>

        <ProfileSpace>
          <ProfilePicture backgroundImage={profileImage}>
            <EditIcon src="/edit.png" onClick={handleEditIconClick} />
          </ProfilePicture>
          <ProfileInput>
            <UserFirst>
              <UserNickname
                name="nickName"
                placeholder="사용자 닉네임"
                value={profileData.nickName}
                onChange={handleInputChange}
                disabled={!isFormEditable}
              />
              <UserMindContainer>
                <UserMind
                  name="mindCount"
                  placeholder="마음 회복 기간"
                  value={profileData.mindCount}
                  onChange={handleInputChange}
                  disabled={!isFormEditable}
                />
                <Tooltip>마음 회복 기간은<br/>
                2~3개월을 추천해요!</Tooltip>
              </UserMindContainer>
            </UserFirst>
            <DogName
              name="petName"
              placeholder="반려견 이름"
              value={profileData.petName}
              onChange={handleInputChange}
              disabled={!isFormEditable}
            />
            <DogEx
              name="petDescription"
              placeholder="반려견 설명"
              value={profileData.petDescription}
              onChange={handleInputChange}
              disabled={!isFormEditable}
            />

            <ButtonSpace>
              <EditButton onClick={handleEdit}>수정하기</EditButton>
              <SaveButton onClick={handleSave}>저장하기</SaveButton>
            </ButtonSpace>
          </ProfileInput>
        </ProfileSpace>
        {isModalOpen && (
          <ModalBackdrop>
            <ModalContainer onClick={(e) => e.stopPropagation()}>
              <Modaldiv>
              <CloseButton onClick={handleCloseButtonClick}>X</CloseButton>
                <Profilename>
                <ModalProfile
                  backgroundImage={selectedImage || "/default-profile.png"}
                />
                <p>나의 반려견</p>
                </Profilename>
                <ModalContent>
                <Row>
                  {imageOptions.slice(0, 4).map((option, index) => (
                     <ImageOptionContainer key={index}>
                    <SmallCircle
                      key={index}
                      style={{ backgroundImage: `url(${option.url})` }}
                      onClick={() => handleImageSelect(option.url, index)}
                      />
                      <ImageName>{option.name}</ImageName>
                      </ImageOptionContainer>
                      ))}
                </Row>
                <Row>
                  {imageOptions.slice(4, 8).map((option, index) => (
                   <ImageOptionContainer key={index}>
                   <SmallCircle
                     key={index}
                     style={{ backgroundImage: `url(${option.url})` }}
                      onClick={() => handleImageSelect(option.url, index + 4)} 
                    />
                    <ImageName>{option.name}</ImageName>
                    </ImageOptionContainer>
                    ))}
                    </Row>

                  <SaveButton2Container>
                    <SaveButton2 onClick={handleProfileImageSave}>
                      저장하기
                    </SaveButton2>
                  </SaveButton2Container>
                </ModalContent>
              </Modaldiv>
            </ModalContainer>
          </ModalBackdrop>
        )}
      </Home>
    </>
  );
}

export default Profiles;

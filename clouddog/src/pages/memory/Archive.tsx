import styled from 'styled-components';
import Header from '@/components/header';
import Chip from '@/components/Chip';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { instance } from '@/apis/instance/axios';
import SessionStorage from '@/constants/SessionStorage';

interface ArchiveList {
  memberId: number;
  bdId: number;
  bdTitle: string;
  bdTag: number;
  bdImageUrl: string;
}

const Archive = () => {
  const router = useRouter();

  const chips = [
    {
      label: '산책할 때',
      imageUrl: '/chipImg/pet.png',
      selectedImageUrl: '/chipImg/pet_w.png',
    },
    {
      label: '여행할 때',
      imageUrl: '/chipImg/backpack.png',
      selectedImageUrl: '/chipImg/backpack_w.png',
    },
    {
      label: '훈련할 때',
      imageUrl: '/chipImg/training.png',
      selectedImageUrl: '/chipImg/training_w.png',
    },
    {
      label: '밥먹을 때',
      imageUrl: '/chipImg/eat.png',
      selectedImageUrl: '/chipImg/eat_w.png',
    },
    {
      label: '귀여울 때',
      imageUrl: '/chipImg/cute.png',
      selectedImageUrl: '/chipImg/cute_w.png',
    },
  ];

  const [currentArchiveData, setCurrentArchiveData] = useState<any>(undefined);
  const [selectedChip, setSelectedChip] = useState('산책할 때');
  const memberId = SessionStorage.getItem('memberId');
  const currentArchive: ArchiveList[] | undefined = currentArchiveData?.content;

  console.log(currentArchive?.length === 0);

  useEffect(() => {
    instance.get(`/api/v1/${memberId}/boards/1`).then((data) => {
      setCurrentArchiveData(data.data);
      console.log(data.data.content);
    });
  }, []);

  const fetchChipData = async (chipLabel: string) => {
    switch (chipLabel) {
      case '산책할 때':
        instance.get(`/api/v1/${memberId}/boards/1`).then((data) => {
          setCurrentArchiveData(data.data);
          console.log(data.data);
        });
        break;
      case '여행할 때':
        instance.get(`/api/v1/${memberId}/boards/2`).then((data) => {
          setCurrentArchiveData(data.data);
          console.log(data.data);
        });
        break;
      case '훈련할 때':
        instance.get(`/api/v1/${memberId}/boards/3`).then((data) => {
          setCurrentArchiveData(data.data);
          console.log(data.data);
        });
        break;
      case '밥먹을 때':
        instance.get(`/api/v1/${memberId}/boards/4`).then((data) => {
          setCurrentArchiveData(data.data);
          console.log(data.data);
        });
        break;
      case '귀여울 때':
        instance.get(`/api/v1/${memberId}/boards/5`).then((data) => {
          setCurrentArchiveData(data.data);
          console.log(data.data);
        });
        break;
    }
  };

  const handleChipClick = (chip: {
    label: string;
    imageUrl: string;
    selectedImageUrl: string;
  }) => {
    setSelectedChip(chip.label);
    fetchChipData(chip.label);
  };

  const addPostOnClick = () => {
    router.push('/memory/AddPost');
  };

  return (
    <TotalContainer>
      <Header />
      <H1Text>Archive</H1Text>
      <ChipsContainer>
        {chips.map((chip) => (
          <Chip
            key={chip.label}
            label={chip.label}
            selected={selectedChip === chip.label}
            onClick={() => {
              handleChipClick(chip);
            }}
            imageSrc={chip.imageUrl}
            selectedImageSrc={chip.selectedImageUrl}
          />
        ))}
      </ChipsContainer>
      <AddArchiveBtnContainer>
        <AddArchiveBtn onClick={addPostOnClick}>
          <AddArchiveBtnImg>
            <Image src={'/addPost.png'} alt={'addPost'} fill></Image>
          </AddArchiveBtnImg>
          <AddArchiveBtnText>추억 추가하기</AddArchiveBtnText>
        </AddArchiveBtn>
      </AddArchiveBtnContainer>
      {currentArchive?.length !== 0 ? (
        <ArchiveListContainer>
          {currentArchive?.map((archive) => (
            <ArchiveItem
              key={archive?.bdId}
              imageUrl={archive?.bdImageUrl}
            ></ArchiveItem>
          ))}
        </ArchiveListContainer>
      ) : (
        <AlertText>추억이 없어요.. <br/>추억을 기록해 주세요</AlertText>
      )}
    </TotalContainer>
  );
};

export default Archive;
const TotalContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;

  width: calc(100vw - (100vw - scrollbarWidth));
  height: 100vh;

  gap: 6vh;
`;

const H1Text = styled.h1`
  font-size: 2vw;
  font-weight: bold;
`;

const ChipsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;

  gap: 2vw;
`;

const AddArchiveBtnContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;

  width: 80%;
`;

const AddArchiveBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 12vw;
  height: 3vw;

  border-radius: 0.7vw;
  border: 1px solid black;
  background-color: #fef1de;

  cursor: pointer;
`;

const AddArchiveBtnImg = styled.div`
  position: relative;
  width: 2.5vw;
  height: 1.5vw;
  margin-right: 0.5vw;
`;

const AddArchiveBtnText = styled.div`
  font-size: 1vw;
  font-weight: bold;
`;

const ArchiveListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2vw;
  width: 100%;
  margin-top: 2vw;
`;

const ArchiveItem = styled.div<{ imageUrl: string }>`
  width: 426px;
  height: 426px;
  flex-shrink: 0;
  border-radius: 12px;
  border: 1px solid #000;
  background: url(${(props) => props.imageUrl}), lightgray 50% / cover no-repeat;
  margin-bottom: 2vw;
`;

const AlertText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 30vh;

  text-align: center;
  font-size: 1.5vw;
`;

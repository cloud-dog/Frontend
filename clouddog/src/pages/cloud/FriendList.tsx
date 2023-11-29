import styled from 'styled-components';
import Image, { StaticImageData } from 'next/image';
import BackImg from '@/styles/login.module.css';
import Header from '@/components/header';
import SessionStorage from '@/constants/SessionStorage';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { instance } from '@/apis/instance/axios';

interface FriendContant {
  email: string;
  memberId: number;
  mindCount: number;
  name: string;
  petDescription: string;
  petName: string;
  petNumber: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
  picture: string;
}

const imgMapping = {
  0: '/_포메.png',
  1: '/_흰_푸들.png',
  2: '/_사모.png',
  3: '/_시츄.png',
  4: '/_골디.png',
  5: '/비글.png',
  6: '/도베르만.png',
  7: '/프렌치.png',
};

const FriendList = () => {
  const router = useRouter();
  const memberId = SessionStorage.getItem('memberId');
  const [friendList, setFriendList] = useState<FriendContant[]>([]);

  const addFriendRouter = () => router.push('/cloud/AddFriend');

  useEffect(() => {
    console.log('FriendList');
    instance.get(`/api/v1/${memberId}/friends`).then((res) => {
      console.log(res.data);
      setFriendList(res.data.content);
    });
  }, []);

  const AnimalImage = (src: StaticImageData) => {
    return <Image src={src} alt={'이미지가 나올곳'} />;
  };

  console.log('friend', friendList);
  console.log('friend', friendList[0]?.petNumber);
  return (
    <TotalContainer>
      <Header />
      <ExplainContainer>
        <TitleText>Cloud</TitleText>
        <ExplainText>강아지와 친구를 맺고, 구름을 방문해보세요!</ExplainText>
        <FriednBtn onClick={addFriendRouter}>
          {' '}
          <AddText>+</AddText> 친구 찾기
        </FriednBtn>
      </ExplainContainer>
      <Image
        className={BackImg.img}
        src={'/LoginBackImg.png'}
        alt={'LoginBackImg'}
        fill
      />
      <FriendListContainer>
        {friendList.map((friend) => (
          <FriendPetContainer key={friend?.memberId}>
            <CircleContainer>
              {/* <Image src={`${mapping[friend.content?.petNumber]}`} alt="`" fill /> */}
              <AnimalImage
                src={imgMapping[friend?.petNumber]}
                width={220}
                height={220}
              />
            </CircleContainer>
            <div>{friend?.email.slice(0, -10)}</div>
          </FriendPetContainer>
        ))}
      </FriendListContainer>
    </TotalContainer>
  );
};

export default FriendList;

const TotalContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;

  width: calc(100vw - (100vw - scrollbarWidth));
  height: 100vh;

  gap: 10vh;
`;
const ExplainContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 2.3vh;
`;

const TitleText = styled.div`
  font-size: 2vw;
  font-weight: bold;
`;
const ExplainText = styled.div`
  width: 20.88vw;
  text-align: center;
  font-size: 1vw;
  font-weight: 600;
`;

const FriednBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;

  width: 8.5vw;
  height: 5vh;

  padding-right: 0.2vw;

  gap: 0.5vw;

  border: 0.125rem solid black;
  border-radius: 2vw;

  color: white;
  background-color: #f1824d;

  font-size: 1.1vw;
  font-weight: 600;

  transition: 0.2s;
  &:hover {
    cursor: pointer;
  }

  &:active {
    transition: 0.2s;
    transform: translateY(0.125rem);
  }
`;

const AddText = styled.span`
  text-align: center;
  font-size: 2.5vw;
  font-weight: lighter;
  padding-bottom: 0.5vw;
`;

const FriendListContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;

  gap: 2vw;
`;

const FriendPetContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

`;

const CircleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 16vw;
  height: 16vw;
  border-radius: 14.25vw;

  box-shadow: 0rem 0rem 2rem 2rem white;
  background-color: white;
`;

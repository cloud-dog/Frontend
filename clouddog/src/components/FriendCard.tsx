import styled from 'styled-components';
import SessionStorage from '@/constants/SessionStorage';
import Image from 'next/image';
import { useEffect, useState, MouseEvent } from 'react';
import { instance } from '@/apis/instance/axios';
import { useRouter } from 'next/router';

const FriendCard = () => {
  const router = useRouter();
  const [friendEmail, setFriendEmail] = useState<string>('email');
  const [picture, setPicture] = useState<string>('/face.png');
  const memberId = SessionStorage.getItem('memberId');

  useEffect(() => {
    if (SessionStorage.getItem('picture')) {
      setPicture(SessionStorage.getItem('picture') as string);
    }
    if (SessionStorage.getItem('friendEmail')) {
      setFriendEmail(SessionStorage.getItem('friendEmail') as string);
    }
  }, [friendEmail, picture]);

  const onClickAddFriendBtn = (e:MouseEvent<HTMLElement>) => {
    e.preventDefault();

    instance.post(`/api/v1/${memberId}/friend`, {
      friendEmail: friendEmail,
    }).then((data) => {
      console.log(data);
      alert('친구 추가 완료');
      router.push('/cloud/FriendList');
    });
  };

  return (
    <div>
      <FriendCardContainer>
        <FriendCardImg>
          <Image src={`${picture}`} alt={'friendPicture'} fill></Image>
        </FriendCardImg>
        <FriendEmailText>{friendEmail}</FriendEmailText>
        <AddFriendBtn onClick={onClickAddFriendBtn}>친구 추가</AddFriendBtn>
      </FriendCardContainer>
    </div>
  );
};

export default FriendCard;

const FriendCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 15vw;
  height: 40vh;

  gap: 1vw;

  border: 1px solid black;
  border-radius: 1vw;
`;

const FriendCardImg = styled.div`
  position: relative;

  width: 10vw;
  height: 10vw;

  border-radius: 50%;
  background-color: #f0f0f0;

  overflow: hidden;
`;

const FriendEmailText = styled.div`
  font-size: 1vw;
`;

const AddFriendBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 11vw;
  height: 4vh;

  font-size: 1.1vw;

  border: 1px solid black;
  border-radius: 1vw;

  color: white;
  background-color: #f1824d;

  transition: 0.2s;

  &:hover {
    cursor: pointer;
  }

  &:active {
    transition: 0.2s;
    transform: translateY(2px);
  }
`;

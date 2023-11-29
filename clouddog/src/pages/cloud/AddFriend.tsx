import Header from '@/components/header';
import FriendCard from '@/components/FriendCard';
import styled from 'styled-components';
import SessionStorage from '@/constants/SessionStorage';

import { ChangeEvent, useState, useEffect, FormEvent } from 'react';
import { instance } from '@/apis/instance/axios';

const AddFriedn = () => {
  const [friendEmail, setFriendEmail] = useState<string>('');
  const [friendProfile, setFriendProfile] = useState(null);
  const [myEmail, setMyEmail] = useState<string>('');
  const [isAuth, setIsAuth] = useState(false);
  const memberId = SessionStorage.getItem('memberId');

  useEffect(() => {
    if (SessionStorage.getItem('userEmail')) {
      setMyEmail(SessionStorage.getItem('userEmail') as string);
      setIsAuth(!isAuth);
    } else {
      setIsAuth(false);
    }
  }, []);

  const onChangeFriendEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setFriendEmail(e.target.value);
  };

  const onSubmitSearchBtn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const memberId = SessionStorage.getItem('memberId');
    if (memberId) {
      try {
        const response = await instance.get(`/api/v1/${memberId}/friend/info`, {
          params: { friendEmail: friendEmail }
        });
        console.log(response);
        setFriendProfile(response.data); 
        SessionStorage.setItem('friendEmail', friendEmail);
        SessionStorage.setItem('picture', response.data.picture);
      } catch (error) {
        console.error('Error fetching friend info:', error);
      }
    }
  };

  return (
    <TotalContainer>
      <Header />
      <TitleText>친구 찾기</TitleText>
      <InputContainer>
        <InputBox onSubmit={onSubmitSearchBtn}>
          <FriendEmail
            type="email"
            placeholder="친구 구글 이메일"
            value={friendEmail}
            onChange={onChangeFriendEmail}
          />
          <SerchBtn type="submit">
            <img src="/Search.png" alt="Search" style={{width:"100%", height:"100%"}}/>
          </SerchBtn>
        </InputBox>
        <InputBoxDisable>
          <MyEmailInp type="text" placeholder="내 이메일" disabled />
          <MyEmailTxt>{myEmail}</MyEmailTxt>
        </InputBoxDisable>
      </InputContainer>

      <FriendCard />
    </TotalContainer>
  );
};

export default AddFriedn;

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

const TitleText = styled.div`
  font-size: 2vw;
  font-weight: bold;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 2.3vh;
`;

const InputBox = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;

  width: 40vw;
  height: 2vw;

  padding: 1vw;

  border: 1px solid black;

  &:focus-within {
    border: 2px solid #f1824d;
    ::placeholder {
      color: #f1824d;
    }
  }
`;

const FriendEmail = styled.input`
  all: unset;
  width: 100%;
  height: 100%;

  overflow: hidden;
  white-space: nowrap;
  background: #fff;
  text-align: left;
  font-family: Pretendard;
  font-size: 1.2vw;
`;

const SerchBtn = styled.button`
  width: 2vw;
  height: 2vw;

  border-radius: 50%;
  border: none; 
  cursor: pointer; 
  background-color: #e5e5e5;
`;

const InputBoxDisable = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;

  width: 40vw;
  height: 2vw;

  padding: 1vw;

  border: 1px solid #f1824d;

  background-color: #fef1de;
`;

const MyEmailInp = styled.input`
  all: unset;
  width: 100%;
  height: 100%;

  overflow: hidden;
  white-space: nowrap;
  background: #fef1de;
  text-align: left;

  &::placeholder {
    color: #f1824d;
    font-family: Pretendard;
    font-size: 1.2vw;
    font-style: normal;
    line-height: normal;
  }
`;

const MyEmailTxt = styled.div`
  color: #f1824d;
  font-family: Pretendard;
  font-size: 1.2vw;
  font-style: normal;
  line-height: normal;
`;

import styled from 'styled-components';
import Image from 'next/image';
import BackImg from '@/styles/login.module.css';
import SessionStorage from '@/constants/SessionStorage';
import { auth } from '@/apis/instance/firebase';
import { useRouter } from 'next/router';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Session } from 'inspector';

const Login = () => {
  // 라우터
  const router = useRouter();

  // Popup형식의 구글로그인 함수
  const googleLogin = async () => {
    // Google 제공업체 객체의 인스턴스를 생성합니다
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account',
    });

    // 팝업 사용
    await signInWithPopup(auth, provider);

    // accessToken 넣기
    const accessToken = await auth.currentUser?.getIdToken().then((token) => {
      SessionStorage.setItem('accessToken', token);
      SessionStorage.setItem(
        'userName',
        auth.currentUser?.displayName as string
      );
      SessionStorage.setItem('userEmail', auth.currentUser?.email as string);
      SessionStorage.setItem('userId', auth.currentUser?.uid as string);
    });

    // 로그인 후 페이지 이동
    if (auth.currentUser !== null) {
      router.push('/');
    }
  };
  return (
    <TotalContainer>
      <ExplainContainer>
        <DogImg></DogImg>
        <TitleText>구름멍</TitleText>
        <ExplainText>
          구름멍과 함께 댕댕이와의 추억을 기록하고 헤어짐을 새롭게
          재해석해보세요!
        </ExplainText>
      </ExplainContainer>
      <GoogleLoginBtn onClick={googleLogin}>
        <GoogleLogo>
          <Image
            src={'/Google__G__Logo 1.png'}
            alt={'Google_Logo'}
            fill
          ></Image>
        </GoogleLogo>
        <GoogleText>구글 로그인</GoogleText>
      </GoogleLoginBtn>
      <Image
        className={BackImg.img}
        src={'/LoginBackImg.png'}
        alt={'LoginBackImg'}
        fill
      ></Image>
    </TotalContainer>
  );
};

export default Login;

const TotalContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;

  width: calc(100vw - (100vw - scrollbarWidth));
  height: 100vh;

  gap: 20vh;
`;

const ExplainContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 2.3vh;
`;

const DogImg = styled.div`
  width: 9.5vw;
  height: 9.5vw;

  border-radius: 50%;

  background-color: #f3f3f3;
`;

const TitleText = styled.div`
  font-size: 2vw;
  font-weight: bold;
`;
const ExplainText = styled.div`
  width: 20.88vw;
  text-align: center;
  font-size: 1vw;
  font-weight: bold;
`;

const GoogleLoginBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;

  width: 28.4167vw;
  height: 7.7192vh;
  gap: 0.5vw;

  border: 2px solid black;
  border-radius: 0.7vw;

  background-color: white;

  transition: 0.2s;
  &:hover {
    cursor: pointer;
  }

  &:active {
    transition: 0.2s;
    transform: translateY(2px);
  }
`;

const GoogleLogo = styled.div`
  position: relative;
  width: 2vw;
  height: 4vh;
`;

const GoogleText = styled.div`
  text-align: center;
  font-size: 1.5vw;
  font-weight: bold;
`;

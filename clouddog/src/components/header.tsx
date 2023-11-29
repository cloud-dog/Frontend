import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const HeaderContainer = styled.div`
  margin-top: 1.75vw;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

const HeaderNavBar = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  gap: 2.35vw;
  width: 36.2vw;
  height: 3.4vw;
  border-radius: 1.875rem;
  background: #fff;
  box-shadow: 0px 4px 20px 1px rgba(0, 0, 0, 0.08);
`;

const Headerstyle = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  width: 6.5vw;
  cursor: pointer;
`;

const HeaderP = styled.p`
  color: #464646;
  text-align: center;
  font-family: Pretendard;
  font-size: 1vw;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  align-items: center;
`;

const StyledLink = styled.a`
  text-decoration: none !important;
  color: inherit;

  flex-direction: row;
  display: flex;
  align-items: center;
`;

export default function Header() {
  const router = useRouter();

  const navigateToHome = () => router.push("/");
  const navigateToArchive = () => router.push("/memory/Archive");
  const navigateToCloud = () => router.push("/cloud/FriendList");
  const navigateToProfile = () => router.push("/profile");

  return (
    <>
      <HeaderContainer>
        <HeaderNavBar>
          <Headerstyle onClick={navigateToHome}>
            <Image src="/home.png" alt="메인이미지" width={24} height={24} />
            <HeaderP>Main</HeaderP>
          </Headerstyle>
          <Headerstyle onClick={navigateToArchive}>
            <Image
              src="/bookmark.png"
              alt="북마크이미지"
              width={24}
              height={24}
            />
            <HeaderP>Archive</HeaderP>
          </Headerstyle>
          <Headerstyle onClick={navigateToCloud}>
            <Image
              src="/cloudimo.png"
              alt="클라우드이미지"
              width={24}
              height={24}
            />
            <HeaderP>Cloud</HeaderP>
          </Headerstyle>
          <Headerstyle onClick={navigateToProfile}>
            <Image src="/face.png" alt="프로필이미지" width={24} height={24} />
            <HeaderP>Profile</HeaderP>
          </Headerstyle>
        </HeaderNavBar>
      </HeaderContainer>
    </>
  );
}

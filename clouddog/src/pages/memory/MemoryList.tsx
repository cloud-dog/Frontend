import Header from "@/components/header";
import styled from "styled-components";
import Image from "next/image";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const FirstContainer = styled.div`
  display: flex;
  margin-top: 7.95vw;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1vw;
`;

const ContainerOne = styled.div`
  width: 20vw;
  height: 20vw;
  flex-shrink: 0;
  border-radius: 8px;
  border: 1px solid #000;
  background: var(--4, #F2F2F2);
  position: relative; // 이미지를 중앙에 배치하기 위해 필요
`;

const ContainerTwo = styled.div`
  width: 44.4vw;
  height: 20vw;
  flex-shrink: 0;
  border-radius: 8px;
  border: 1px solid #000;
  background: var(--2, #FEF1DE);
`;

const MemoryList = () => {
  return (
    <>
      <Header />
      <HeaderContainer>
        <FirstContainer>
          <ContainerOne>
            <Image
              src="/Group 2181.png"
              alt="Cloud Plus"
              layout="fill"
              objectFit="contain" // 이미지가 컨테이너에 맞게 조정됩니다.
              objectPosition="center" // 이미지가 중앙에 배치됩니다.
            />
          </ContainerOne>
          <ContainerTwo />
        </FirstContainer>
      </HeaderContainer>
    </>
  );
};

export default MemoryList;

import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';

interface ChipProps {
  label: string;
  selected: boolean;
  onClick: () => void;
  imageSrc: string;
  selectedImageSrc: string;
}

const Chip = ({
  label,
  selected,
  onClick,
  imageSrc,
  selectedImageSrc,
}: ChipProps) => {
  return (
    <ChipButton selected={selected} onClick={onClick}>
      <ImgContainer>
        <Image src={selected ? selectedImageSrc : imageSrc} alt={label} fill />
      </ImgContainer>
      <ChipText>{label}</ChipText>
    </ChipButton>
  );
};

export default Chip;

const ChipButton = styled.button<{ selected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 10vw;
  height: 2.3vw;

  border-radius: 2vw;
  border: 1px solid black;

  background-color: ${(props) => (props.selected ? '#FE8F5A' : 'white')};
  color: ${(props) => (props.selected ? 'white' : 'black')};

  transition: 0.2s;

  &:hover {
    cursor: pointer;
  }

  &:active {
    transition: 0.2s;
    transform: translateY(2px);
  }
`;

const ImgContainer = styled.div`
  position: relative;
  width: 1vw;
  height: 1vw;
  margin-right: 0.5vw;
`;

const ChipText = styled.div`
  font-size: 1vw;
  font-weight: bold;
`;
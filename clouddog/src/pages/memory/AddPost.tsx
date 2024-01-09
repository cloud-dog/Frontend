import Header from '@/components/header';
import styled from 'styled-components';
import { useState, useEffect } from 'react';

const AddPost = () => {
  const [selectedImage, setSelectedImage] = useState('/addPost.png');
  const [selectedTag, setSelectedTag] = useState('1');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target && e.target.files && e.target.files[0]) {
      let reader = new FileReader();

      reader.onload = (e) => {
        if (e.target) {
          setSelectedImage(e.target.result as string);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleTagChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTag(e.target.value);
  };

  return (
    <div>
      <Header />
      <TotalWrapper>
        <Container>
          <Form onSubmit={handleSubmit}>
            <PostWrapper>
              <ImageContainer
                style={{ backgroundImage: `url(${selectedImage})` }}
              >
                <ImageInput type="file" onChange={handleImageChange} />
              </ImageContainer>
              <DescriptionInput>
                <SelectInput>
                  <div>
                    <label htmlFor="date">날짜 </label>
                    <DecInput id="date" type="date" />
                  </div>
                  <div>
                    <label htmlFor="place">장소 </label>
                    <DecInput id="place" type="text" placeholder="장소" />
                  </div>
                  <div>
                    <label htmlFor="tag">태그</label>
                    <SelectTag value={selectedTag} onChange={handleTagChange}>
                      <option value="1">산책</option>
                      <option value="2">여행</option>
                      <option value="3">밥</option>
                      <option value="4">훈련</option>
                      <option value="5">귀여움</option>
                    </SelectTag>
                  </div>
                </SelectInput>
                <TextInput placeholder="설명" />
                <SubmitButton type="submit">저장</SubmitButton>
              </DescriptionInput>
            </PostWrapper>
          </Form>
        </Container>
      </TotalWrapper>
    </div>
  );
};

export default AddPost;

const TotalWrapper = styled.div`
  width: 70rem;
  max-width: 120rem;
  margin: 0 auto;
  padding-top: 5rem;
`;

const Container = styled.div`
  width: 100%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: end;
`;

const PostWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const ImageContainer = styled.div`
  width: 20rem;
  height: 20rem;
  padding: 1rem;
  background-image: url('/addPost.png');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  border: 0.0625rem solid #ddd;
  border-radius: 0.5rem;
`;

const ImageInput = styled.input`
  opacity: 0;
  position: absolute;
  width: 20rem;
  height: 20rem;
  cursor: pointer;
`;

const DescriptionInput = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  width: 45rem;
  height: 20rem;
  padding: 1rem;
  border: 0.0625rem solid #ddd;
  border-radius: 0.5rem;
  background-color: #fef1de;
`;

const SelectInput = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 2rem;
  width: 100%;
  gap: 1rem;
`;

const DecInput = styled.input`
  all: unset;
  height: 1.25rem;
  padding: 0.25rem 0.5rem;
  border-radius: 0.5rem;
  color: white;
  background-color: #fe8f5a;

  cursor: pointer;
  &:hover {
    cursor: pointer;
  }
`;

const TextInput = styled.textarea`
  all: unset;
  width: 100%;
  height: 100%;
`;

const SubmitButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #fe8f5a;
  border: none;
  border-radius: .5rem;

  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  transition-duration: 0.4s;
  cursor: pointer;

  &:hover {
    background-color: white;
    color: black;
  }
`;

const SelectTag = styled.select`
  width: 5rem;
  height: 1.7rem;
  padding: 0.25rem 0.5rem;
  border: 1px solid #fe8f5a;
  border-radius: .5rem;
  color: white;
  background-color: #fe8f5a;
`;

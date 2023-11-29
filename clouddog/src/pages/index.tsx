import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import Image from 'next/image';
import Header from '@/components/header';
import { instance } from '@/apis/instance/axios';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import SessionStorage from '@/constants/SessionStorage';

const blink = keyframes`
  50% { opacity: 0; }
`;

interface GliterImageProps {
  animate: boolean;
}

const GliterImage = styled.img<GliterImageProps>`
  position: absolute;
  width: 2.1vw;
  height: 2.1vw;
  animation: ${(props) =>
    props.animate
      ? css`
          ${blink} 1s ease-in-out infinite
        `
      : 'none'};
`;
const CloudContainer = styled.div`
  width: 100%;
`;

const Main = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3vw;
  margin-bottom: 5vw;
  position: relative;
`;

const CommentContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const CommentInputContainer = styled.div`
  width: 83vw;
  position: relative;
  margin-bottom: 2.5vw;
`;

const CommentBox = styled.input`
  width: 100%;
  height: 4.7vw;
  display: flex;
  border-radius: 1vw;
  border: 1.5px solid #000;
  overflow: hidden;
  white-space: nowrap;
  background: #fff;
  text-align: left;
  justify-content: flex-start;
  padding-left: 1vw;
  font-size: 1.2vw;

  &::placeholder {
    color: #4e4e4e;
    font-family: Pretendard;
    font-size: 1.2vw;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

const SubmitButton = styled.img`
  position: absolute;
  right: 0.5vw;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  width: 3vw;
  height: 3vw;
`;

const Comment = styled.div`
gap:1vw;
  color: #000;
  font-size: 1.3vw;
  border: 1.5px solid #000;
  padding: 1vw 2.5vw;
  padding-right:1vw;
  font-style: normal;
  
  font-weight: 500;
  line-height: 160%;
  min-height: 3.8vw;
  border-radius: 5vw;
  background: #fef1de;
  margin-top: 1.5vw;
  display: flex; // 변경: inline-block 대신 flex 사용
  align-items: center; // 자식 요소들을 세로 중앙에 배치
  justify-content: space-between; // 내용과 아이콘들 사이에 공간을 균등하게 배분
  word-break: break-word;
  overflow-wrap: break-word;
  text-align: left;
`;

const PostContainer = styled.div`
  width: 87%;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: flex-end;
`;

const CommentWithTime = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: flex-end;
  flex-direction: row-reverse;
  width: 90%;
  margin-bottom: 1vw;
`;

const CommentTime = styled.span`
  color: #000;
  font-size: 1vw;
  margin-left: 1vw;
  white-space: nowrap;
`;

const ImageContainer = styled.div`
  width: 48vw;
  height: 20vw;
`;

const CommentIcons = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
`;

const CommentIcon = styled.img`
  cursor: pointer;
  width: 2.1vw;
  height: 2.1vw;
`;

interface CommentType {
  msgContent: string;
  msgTime: string;
  msgId: number;
  memberId:number;
}

interface CommentEdit{

  msgContent: string;
  msgId: number;
  msgTime: string;
}

export default function Home() {
  const [animate, setAnimate] = useState<boolean>(false);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [commentInput, setCommentInput] = useState<string>('');
  const [memberId, setMemberId] = useState(null);

  const router = useRouter();

  const userId = SessionStorage.getItem('userId');
  console.log('dlrjdksla?', userId);

  useEffect(() => {
    // 로그인이 되어있지 않으면 로그인 페이지로 이동
    if (SessionStorage.getItem('accessToken') === null) {
      router.push('/Login');
    }

    const fetchUserInfo = async () => {
      try { //메인 들어왔을때 
        const response = await instance.get('/api/v1/my-info', {
          params: { uid: userId },
        });
        const data = response.data;

        setMemberId(data.memberId); // memberId 상태 업데이트
        SessionStorage.setItem('memberId', data.memberId); // memberId 세션 스토리지에 저장
        SessionStorage.setItem('petNumber', data.petNumber);
        SessionStorage.setItem('petName', data.petName);
        SessionStorage.setItem('petDescription', data.petDescription);
        SessionStorage.setItem('mindCount', data.mindCount);

        // 사용자의 반려동물 정보가 기본값일 경우 프로필 뷰로 이동
        if (
          data.petNumber === 0 &&
          data.petName === null &&
          data.petDescription === null &&
          data.mindCount === 0
        ) {
          router.push('/profile'); // 프로필 뷰 페이지 경로
        }
      } catch (error) {
        console.error('사용자 정보를 가져오는 중 오류 발생:', error);
      }
    };
    fetchUserInfo();
  }, [router]); // router를 종속성 배열에 추가

  // 댓글 목록 가져오기
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const memberId = SessionStorage.getItem('memberId');
        if (memberId) {
          const response = await instance.get(`/api/v1/${memberId}/messages`);
          console.log(response.data);
          setComments(
            response.data.map((msg:CommentType) => ({
              msgId: msg.msgId,
              msgContent: msg.msgContent,
              msgTime: msg.msgTime,
            }))
          );
        }
      } catch (error) {
        console.error('메시지를 불러오는 중 오류 발생:', error);
      }
    };
    fetchMessages();
  }, [memberId]);
  console.log('yes this',comments);

  //수정로직
  const handleEditComment = async (msgId:number) => {
    const memberId = Number(sessionStorage.getItem('memberId'));
    const editedContent = prompt('Edit your comment:');
    console.log("ㅇㅇ",msgId);
    if (editedContent !== null && editedContent.trim() !== '') {
      try {
        const response = await instance.post(`/api/v1/messages/${msgId}`, {
          memberId,
          msgContent: editedContent,
        });

        setComments((currentComments) =>
        currentComments.map((comment) =>
          comment.msgId === msgId ? { ...comment, msgContent: editedContent } : comment
        )
      );

        console.log('Edited Comment:', response.data);
        alert('댓글이 수정되었습니다.');
      } catch (error) {
        console.error('Error editing comment:', error);
        alert('댓글 수정에 실패했습니다.');
      }
    }
  };

  //삭제로직
  const handleDeleteComment = async (msgId: number) => {

    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        await instance.delete(`/api/v1/messages/${msgId}`);

        
        // 로컬 상태에서도 해당 댓글 제거
        setComments((currentComments) =>
          currentComments.filter((comment) => comment.msgId !== msgId)
        );

        alert('댓글이 삭제되었습니다.');
      } catch (error) {
        console.error('댓글 삭제 중 오류 발생:', error);
        console.log('Deleted Comment ID:', msgId);
        alert('댓글 삭제에 실패했습니다.');
      }
    }
  };

  const handleAddComment = async () => {
    if (!commentInput.trim()) {
      alert('댓글 내용을 입력해주세요.');
      return;
    }

    console.log('댓글 생성');

    try {
      const memberId = Number(SessionStorage.getItem('memberId'));
      const currentDate= new Date().toISOString().split('T')[0];

      //여긴 잘 됨
      const response = await instance.post('/api/v1/messages', {
        memberId,
        msgContent: commentInput,
      });
      console.log("댓글 저장 완료", response.data);

      const addedComment= {
        ...response.data,
        msgContent: commentInput,
        msgTime:currentDate,
      };

      setComments(prevComments => [addedComment, ...prevComments]);
    setCommentInput('');

    setAnimate(true);
    setTimeout(() => setAnimate(false), 3000);
    } catch (error) {
      console.error("댓글 저장 중 오류 발생:", error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // 사용자가 엔터 키를 눌렀고, Shift 키가 눌리지 않았을 때만 댓글 추가
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // 엔터 키 기본 동작 방지
      handleAddComment();
    }
  };

  return (
    <div>
      <Header />
      <CloudContainer>
        <Main>
          <GliterImage
            animate={animate}
            src="/Gliter 0.png"
            style={{ width: '2.1vw', height: '2.1vw', top: '5%', left: '23%' }}
          />
          <GliterImage
            animate={animate}
            src="/Gliter 2.png"
            style={{ width: '1.4vw', height: '1.4vw', top: '20%', left: '20%' }}
          />
          <GliterImage
            animate={animate}
            src="/Gliter 3.png"
            style={{
              width: '1.4vw',
              height: '1.4vw',
              top: '10%',
              right: '44%',
            }}
          />
          <GliterImage
            animate={animate}
            src="/Gliter 5.png"
            style={{ width: '1.8vw', height: '1.8vw', top: '5%', right: '25%' }}
          />
          <GliterImage
            animate={animate}
            src="/Gliter 7.png"
            style={{ width: '1vw', height: '1vw', top: '2%', right: '24%' }}
          />
          <ImageContainer>
            <Image
              src="/cloud.png"
              alt="구름"
              width={527}
              height={320}
              layout="responsive"
            />
          </ImageContainer>
          <GliterImage
            animate={animate}
            src="/Gliter 3.png"
            style={{ width: '4vw', height: '4vw', top: '30%', right: '21%' }}
          />
          <GliterImage
            animate={animate}
            src="/Gliter 6.png"
            style={{ width: '2vw', height: '2vw', top: '20%', right: '27%' }}
          />
          <GliterImage
            animate={animate}
            src="/Gliter 4.png"
            style={{ width: '1vw', height: '1vw', top: '80%', left: '25%' }}
          />
          <GliterImage
            animate={animate}
            src="/Gliter 5.png"
            style={{ width: '3.5vw', height: '3.5vw', top: '85%', left: '29%' }}
          />
        </Main>
      </CloudContainer>

      <CommentContainer>
        <CommentInputContainer>
          <CommentBox
            placeholder="댕댕이에게 하고 싶은 말을 입력해보세요"
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            onKeyPress={handleKeyPress}
            maxLength={200}
          />
          <SubmitButton
            src="/comment.png"
            alt="제출"
            onClick={handleAddComment}
          />
        </CommentInputContainer>

        <PostContainer>
          
          
          {comments.map((comment, index) => (
            
            <CommentWithTime key={comment.msgId}>
  <Comment>
    {comment.msgContent}
    <CommentIcons>
      <CommentIcon 
        src="/pencil.png"
        alt="Edit"
        onClick={() => handleEditComment(comment.msgId)}
      />
      <CommentIcon
        src="/trash.png"
        alt="Delete"
        onClick={() => handleDeleteComment(comment.msgId)}
      />
    </CommentIcons>
  </Comment>
  <CommentTime>
    {new Date(comment.msgTime).toLocaleDateString()}
  </CommentTime>
</CommentWithTime>

          ))}
        
        </PostContainer>
      </CommentContainer>
</div>
  );
}
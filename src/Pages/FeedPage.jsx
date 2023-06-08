import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import MainHeader from '../Components/Common/MainHeader';
import BottomNav from '../Components/Common/BottomNav';

const MainFeed = () => {
  const BaseURL = 'https://api.mandarin.weniv.co.kr/';
  const FollowingPOST = 'post/feed';
  const Authorization =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NzZkNzZjYjJjYjIwNTY2MzJjZmZlYiIsImV4cCI6MTY5MDY5NDM4MCwiaWF0IjoxNjg1NTEwMzgwfQ.Bjwk8EyTTxyFP8-QYiY1SlXsAXTAYQ_Fwmi-nJ-NDx4';

  useEffect(() => {
    fetchFeed();
  }, []);

  const [fetchData, setfetchData] = useState(false);
  const [FeedList, setFeedList] = useState([]);

  async function fetchFeed() {
    try {
      const response = await fetch(`${BaseURL + FollowingPOST}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;',
          Authorization: Authorization,
        },
      });
      if (!response.ok) {
        throw new Error('네트워크에 문제가 있습니다.');
      } else {
        const data = await response.json();
        const FeedListArr = [];
        for (let i = 0; i < data.posts.length; i++) {
          FeedListArr.push(data.posts[i]);
        }
        setFeedList(FeedListArr);
        console.log(FeedList);
        setfetchData(true);
      }
    } catch (error) {
      console.error('데이터를 가져오는데 문제가 생겼습니다.', error);
    }
  }

  return (
    <>
      {fetchData === false ? (
        <div>로딩중....</div>
      ) : (
        <div>
          {FeedList.map(item => {
            return (
              <SFeedCard key={item.id}>
                <SAuthor>
                  <SProfileImg src={item.author.image} alt="프사" />
                  <SAccountname>{item.author.accountname}</SAccountname>
                </SAuthor>
                <div>
                  <SContent>{item.content}</SContent>
                </div>
              </SFeedCard>
            );
          })}
        </div>
      )}
    </>
  );
};

const FeedPage = () => {
  const [toggle, setToggle] = useState('feed');
  return (
    <SMain>
      <MainHeader toggle={toggle} setToggle={setToggle} />
      {toggle === 'feed' ? <MainFeed /> : <div>검색창</div>}
      <BottomNav />
    </SMain>
  );
};
export default FeedPage;

const SMain = styled.div`
  max-width: 390px;
  margin: 0 auto;
  background-color: var(--black);
  height: 100vh;
`;

const SContent = styled.div`
  color: var(--white);
`;
const SAccountname = styled.div`
  color: var(--point-color);
`;

const SFeedCard = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid var(--point-color);
  padding: 20px;
  box-sizing: border-box;
`;
const SAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const SProfileImg = styled.img`
  max-width: 46px;
  max-height: 46px;
  width: 100%;
  height: 100%;
`;

import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import homeIcon from '../../assets/icons/home.svg';
import chatIcon from '../../assets/icons/chat.svg';
import postIcon from '../../assets/icons/post.svg';
import profileIcon from '../../assets/icons/profile.svg';

export default function BottomNav() {
  const navItems = ['feed', 'chat', 'post', 'myprofile'];
  const imgs = [homeIcon, chatIcon, postIcon, profileIcon];
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = index => {
    setActiveIndex(index);
  };

  return (
    <SNavLayout>
      <SListStyle>
        {navItems.map((item, index) => (
          <SItemStyle key={index} active={index === activeIndex}>
            <LinkBtn
              url={item}
              src={imgs[index]}
              text={item}
              active={index === activeIndex}
              onClick={() => handleClick(index)}
            />
          </SItemStyle>
        ))}
      </SListStyle>
    </SNavLayout>
  );
}

const LinkBtn = ({ src, text, active, onClick, url }) => {
  return (
    <Link onClick={onClick} to={`/${url}`}>
      <img src={src} alt="" className={active ? 'active' : ''} />
      <p className={active ? 'active' : ''}>
        {text === 'feed'
          ? '홈'
          : '홈' && text === 'chat'
          ? '채팅'
          : '채팅' && text === 'post'
          ? '게시글작성'
          : '게시글작성' && text === 'myprofile'
          ? '프로필'
          : '프로필'}
      </p>
    </Link>
  );
};
const SNavLayout = styled.nav`
  max-width: 390px;
  margin: 0 auto;
  background: var(--black);
  border-top: 0.5px solid var(--darkgray);

  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
`;

const SListStyle = styled.ul`
  display: flex;
  justify-content: space-between;
  padding-inline-start: 0;
`;

const SItemStyle = styled.li`
  a {
    display: inline-block;
    text-align: center;
    width: 84px;
    color: var(--gray);
    padding: 12px 0 6px;
    font-weight: 400;
    line-height: 14px;
    font-size: 10px;
    svg {
    }
    img {
      margin-bottom: 7px;
      &.active {
        color: var(--point-color);
        filter: invert(53%) sepia(7%) saturate(4534%) hue-rotate(95deg) brightness(105%) contrast(78%);
      }
    }
    p {
      &.active {
        color: var(--point-color);
      }
    }
  }
`;

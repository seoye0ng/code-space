import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Modal from '../Components/Common/Modal';

import { useSetRecoilState } from 'recoil';
import { setToken } from '../Atom/atom';

const LoginPage = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const setTokenAtom = useSetRecoilState(setToken);

  const [LoginError, setLoginError] = useState(false);

  const inputHandler = (e) => {
    if (e.target.type === 'email') {
      setUserEmail(e.target.value);
    } else if (e.target.type === 'password') {
      setUserPassword(e.target.value);
    }
  };

  async function LoginSubmit(e) {
    e.preventDefault();
    const url = 'https://api.mandarin.weniv.co.kr';

    try {
      const response = await axios.post(
        url + '/user/login/',
        {
          user: {
            email: userEmail,
            password: userPassword,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const userData = response.data.user;
      console.log(userData.token);
      setTokenAtom(userData.token);
      navigate('/feed'); 
    } catch (error) {
      setLoginError(true);
      console.error(error);
    }
  }

  return (
    <Modal
      title="로그인"
      LoginSubmit={LoginSubmit}
      userEmail={userEmail}
      userPassword={userPassword}
      inputHandler={inputHandler}
      isPasswordValid={isPasswordValid}
      LoginError={LoginError}
    />
  );
};

export default LoginPage;

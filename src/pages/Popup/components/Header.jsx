import axios from 'axios';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setKeywords } from '../../../store/reducers/keywords';
import { getPostCall } from '../api/Apicalls';
import localStorageService from '../api/localStorageService';

const Header = ({
  text,
  link,
  styles,
  showButton = true,
  date = '',
  showBackButton = false,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = localStorageService.getItem('Users');
  const onButton = (linek) => {
    if (text === 'log out') {
      var data = JSON.stringify({
        email: users?.email,
      });
      getPostCall('logout', 'post', data, users?.token)
        .then((e) => {
          chrome.storage.local.set({ Users: null, keywords: [] });
          dispatch(setKeywords([]));
          localStorage.clear();
          window.localStorage.clear();
          console.log(linek);
          chrome.runtime.sendMessage({
            from: 'Header.jsx',
            action: 'SET_BADGE',
            payload: '',
          });
          navigate('/Login');
        })
        .catch((e) => {
          navigate('/Login');
        });
    } else {
      navigate(linek);
    }
  };
  return (
    <div className="bg-[#282828] w-full px-[32px] ">
      <div className="h-[90px] flex justify-between items-center">
        <span className="text-[20px] font-bold">
          <span className="text-[#66DC78] leading-[26px]">Work</span>
          Alert
        </span>
        <div className="flex gap-[24px] items-center ">
          {date && !users?.details && (
            <span className="text-[#999999] uppercase ">
              {' '}
              Valid Till <span>{date}</span>{' '}
            </span>
          )}
          {showBackButton && (
            <button
              onClick={() => navigate(-1)}
              className={`${styles} font-medium uppercase text-[13px] px-[16px] py-[8px] rounded-[4px]`}
            >
              {'Back'}
            </button>
          )}
          {showButton && (
            <button
              onClick={() => onButton(link)}
              className={`${styles} font-medium uppercase text-[13px] px-[16px] py-[8px] rounded-[4px]`}
            >
              {text}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;

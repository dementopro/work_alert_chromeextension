import React from 'react';
import ButtonLG from './ButtonLG';
import Header from './Header';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import localStorageService from '../api/localStorageService';
import { getPostCall } from '../api/Apicalls';
import { useSelector } from 'react-redux';

const GetStarted = () => {
  const [plans, setPlans] = useState({});
  const navigate = useNavigate();
  // const users = localStorageService.getItem('Users');
  const { users } = useSelector((state) => state.users);
  const getPlans = () => {
    var data = '';
    getPostCall('get-paid-plans', 'get', data)
      .then((e) => {
        setPlans(e?.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    getPlans();
    if (users) {
      if (
        users.current_plan ||
        (users.scopebuilder_link && users.scopebuilder_status)
      ) {
        navigate('/KeywordsConnect');
      }
    }
  }, [users]);
  const subscribeNow = () => {
    navigate('/SubscribeNow');
  };
  return (
    <div className="flex flex-col h-full">
      <Header
        text={'Home'}
        link="/KeywordsConnect"
        styles={' bg-[#000000] text-white '}
      />

      <div className="w-full flex flex-col justify-between h-screen px-[32px]">
        <div>
          <div className="my-[32px]">
            <h1 className="uppercase font-medium text-[20px] mb-4">
              {' '}
              Get Started{' '}
            </h1>
            <span className="text-[#999999] font-medium text-[16px]">
              Connect to ScopeBuilder account and use for free!
            </span>
          </div>
          <div>
            <ButtonLG
              styles={'bg-gradient-blue'}
              text={'Connect ScopeBuilder'}
              fill={'#1890ff'}
              link="/ScopeBuilder"
            />
          </div>

          <div className="my-[32px]">
            <h1 className="uppercase font-medium text-[20px] mb-4">
              {' '}
              or subscribe now{' '}
            </h1>
            <span className="text-[#999999] text-[16px]">
              Subscribe for ${plans?.amount} only a month!
            </span>
          </div>
          <button
            // to={'/KeywordsConnect'}
            onClick={() => {
              subscribeNow();
              // console.log(plans?.id);
              // navigate('/KeywordsConnect');
            }}
            className=" py-4 text-[16px] font-medium flex-1 block text-center  uppercase bg-[#282828] rounded-[4px] w-full "
          >
            Subscribe Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;

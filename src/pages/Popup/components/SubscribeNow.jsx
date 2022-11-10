import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUsers } from '../../../store/reducers/userSlice';
import { getPostCall } from '../api/Apicalls';
import Header from './Header';

const SubscribeNow = () => {
  const navigate = useNavigate();
  const [iframeSrc, setIframeSrc] = useState();

  const { users } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    if (users?.token && !iframeSrc) {
      getPostCall('subscribe', 'post', '', users?.token)
        .then((response) => {
          setIframeSrc(response.data?.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [users]);

  useEffect(() => {
    var interval;
    if (users && !interval) {
      interval = setInterval(() => {
        dispatch(fetchUsers());
      }, 2000);
    }
    if (users?.current_plan) {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [users]);

  return (
    <div className="flex flex-col h-full">
      <Header
        link="Login"
        text={'log out'}
        showButton={true}
        styles={'bg-[#000000]'}
      />

      <div className="flex-1 flex flex-col px-[32px] ">
        <div className="flex items-center gap-[16px] ">
          <button
            onClick={() => navigate(-1)}
            className=" rotate-180 w-[57px] h-[57px] bg-[#282828]  flex justify-center items-center rounded-full relative "
          >
            {/* arrow */}
            <svg
              className="relative z-10"
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.0312 19.6042C14.8333 19.6042 14.6354 19.5312 14.4791 19.375C14.177 19.0729 14.177 18.5729 14.4791 18.2708L20.25 12.5L14.4791 6.72917C14.177 6.42708 14.177 5.92708 14.4791 5.625C14.7812 5.32292 15.2812 5.32292 15.5833 5.625L21.9062 11.9479C22.2083 12.25 22.2083 12.75 21.9062 13.0521L15.5833 19.375C15.427 19.5312 15.2291 19.6042 15.0312 19.6042Z"
                fill="white"
              />
              <path
                d="M21.1771 13.2812H3.64587C3.21879 13.2812 2.86462 12.9271 2.86462 12.5C2.86462 12.0729 3.21879 11.7188 3.64587 11.7188H21.1771C21.6042 11.7188 21.9584 12.0729 21.9584 12.5C21.9584 12.9271 21.6042 13.2812 21.1771 13.2812Z"
                fill="white"
              />
            </svg>
          </button>
          <div className="my-[32px]">
            <div className="flex flex-col gap-[8px]">
              <span className="uppercase font-medium text-[20px] ">
                ScopeBuilder
              </span>
            </div>
          </div>
        </div>

        <div className="flex-1 rounded-[10px] flex items-center justify-center">
          <iframe
            src={iframeSrc}
            className="h-full w-full overflow-hidden"
          ></iframe>
        </div>

        <div className="h-[32px]"></div>
      </div>
    </div>
  );
};

export default SubscribeNow;

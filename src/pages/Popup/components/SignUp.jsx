import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPostCall } from '../api/Apicalls';
import Header from './Header';

const SignUp = () => {
  const [data, setData] = useState({
    email: '',
    password: '',
    password_confirmation: '',
    type: 0,
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const onRegister = () => {
    setError('');
    if (data.password !== data?.password_confirmation) {
      alert("Password doesn't Matched");
    } else {
      try {
        getPostCall('register', 'post', data)
          .then((e) => {
            navigate('/Login');
          })
          .catch((e) => {
            setError(e.response.data.errors[0]);
          });
      } catch (e) {
        console.log(e);
      }
    }
  };
  return (
    <div className="flex flex-col h-full">
      <Header
        link="/Login"
        text={'Log in'}
        styles={' border-[#66DC78] border border-[1.5px]  text-[#66DC78] '}
      />

      <div className="w-full flex-1 flex flex-col justify-between px-[32px]">
        <div>
          <h1 className="uppercase font-medium text-[20px] my-[32px]">
            sign up{' '}
          </h1>
          <div className="flex flex-col gap-4">
            <input
              type="email"
              className="p-4 text-[16px] rounded-[4px] bg-[#000000] placeholder-[#999999] border border-[#999999]"
              placeholder="Email Address"
              value={data?.email}
              onChange={(e) =>
                setData({
                  ...data,
                  email: e.target.value,
                })
              }
            />
            <input
              type="password"
              className="p-4 text-[16px] rounded-[4px] bg-[#000000] placeholder-[#999999] border border-[#999999]"
              placeholder="Password"
              value={data?.password}
              onChange={(e) =>
                setData({
                  ...data,
                  password: e.target.value,
                })
              }
            />
            <input
              type="password"
              className="p-4 text-[16px] rounded-[4px] bg-[#000000] placeholder-[#999999] border border-[#999999]"
              placeholder="Confirm Password"
              value={data?.password_confirmation}
              onChange={(e) =>
                setData({
                  ...data,
                  password_confirmation: e.target.value,
                })
              }
            />

            <p style={{ alignSelf: 'center' }}>{error}</p>
          </div>
        </div>
        <div className="flex gap-4 mb-[32px]">
          <button
            className=" py-4 text-[16px] font-medium  flex-1 uppercase bg-[#66DC78] rounded-[4px] "
            onClick={() => onRegister()}
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

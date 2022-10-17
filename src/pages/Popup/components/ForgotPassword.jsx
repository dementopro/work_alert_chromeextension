import React from 'react';
import Header from './Header';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { getPostCall } from '../api/Apicalls';
import Loader from './Loader';

const ForgotPassword = ({ showButton = false }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loader, setLoader] = useState(false);
  const sendEmail = () => {
    if (email === '') {
      alert('Email Address is required!');
    } else {
      setLoader(true);
      var data = JSON.stringify({
        email: email,
      });

      getPostCall('forgot-password', 'post', data)
        .then((e) => {
          setLoader(false);
          console.log(JSON.stringify(e.data));
          // setError(response.data);
          setError(e?.data?.message);
        })
        .catch((e) => {
          setLoader(false);
          console.log('error', error);
          console.log(error?.status);
          console.log(error?.data);
        });
    }
  };
  return (
    <div className="flex flex-col h-full">
      <Header
        showButton={showButton}
        text={'Sign up'}
        styles={' border-[#66DC78] border border-[1.5px] text-[#66DC78] '}
      />
      <Loader isLoading={loader} />
      <div className="w-full flex-1 flex flex-col justify-between px-[32px]">
        <div>
          <h1 className="uppercase font-medium text-[20px] my-[32px]">
            {' '}
            Forgot Password{' '}
          </h1>
          <div className="flex flex-col gap-4">
            <input
              type="email"
              className="p-4 text-[16px] rounded-[4px] bg-[#000000] placeholder-[#999999] border border-[#999999]"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <p style={{ color: 'white', alignSelf: 'center', marginTop: '10px' }}>
            {error}
          </p>
        </div>
        <div className="flex gap-4 mb-[32px]">
          <button
            onClick={() => navigate(-1)}
            className=" text-center py-4 flex-1 text-[16px] font-medium  uppercase bg-[#282828] rounded-[4px] "
          >
            Go back
          </button>
          <button
            onClick={() => sendEmail()}
            // to={'/ResetPassword'}
            className=" text-center py-4  flex-1 text-[16px] font-medium uppercase bg-[#66DC78] rounded-[4px] "
          >
            send email
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

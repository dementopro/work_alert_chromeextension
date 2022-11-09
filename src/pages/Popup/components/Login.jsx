import React from 'react';
import Header from './Header';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import localStorageService from '../api/localStorageService';
import { useEffect } from 'react';
import { getCallBackendURL, getPostCall } from '../api/Apicalls';
import Loader from './Loader';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../../store/reducers/userSlice';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const onSubmit = () => {
    setLoading(true);
    dispatch(
      fetchUsers({
        email,
        password,
      })
    ).then((data) => {
      if (!data.error) {
        navigate('/GetStarted');
      }
      setLoading(false);
    });
  };
  useEffect(() => {
    setLoading(true);
    dispatch(fetchUsers()).then((data) => {
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (users) {
      if (users?.current_plan === null && users?.scopebuilder_status === 0) {
        navigate('/GetStarted');
      } else {
        navigate('/KeywordsConnect');
      }
    } else {
      navigate('/Login');
    }
    return () => {};
  }, [users]);

  return (
    <div className="flex flex-col h-full">
      <Header
        text={'Sign up'}
        link={'/SignUp'}
        styles={' border-[#66DC78] border border-[1.5px] text-[#66DC78] '}
      />
      <Loader isLoading={loading} />
      <div className=" flex-1">
        <div className="flex h-full flex-col justify-between px-[32px]">
          <div>
            <h1 className="uppercase font-medium text-[20px] my-[32px]">
              {' '}
              log in{' '}
            </h1>

            <div className="flex flex-col gap-4">
              <input
                type="email"
                className="p-4 text-[16px] rounded-[4px] bg-[#000000] placeholder-[#999999] border border-[#999999]"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                className="p-4 text-[16px] rounded-[4px] bg-[#000000] placeholder-[#999999] border border-[#999999]"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <p>{error}</p>
          </div>

          <div className="flex gap-4 mb-[32px]">
            <Link
              to={'/ForgotPassword'}
              className=" text-center py-4 flex-1 text-[16px] font-medium  uppercase bg-[#282828] rounded-[4px] "
            >
              forgot password
            </Link>
            <button
              onClick={() => {
                onSubmit();
              }}
              className=" py-4 text-center  flex-1 text-[16px] font-medium uppercase bg-[#66DC78] rounded-[4px] "
            >
              log in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

import React from 'react';
import Header from './Header';
import { useNavigate, useParams } from 'react-router-dom';
import localStorageService from '../api/localStorageService';
import axios from 'axios';
import { useState } from 'react';
import { getPostCall } from '../api/Apicalls';
import { useSelector } from 'react-redux';

const CreateProposal = () => {
  const navigate = useNavigate();
  const params = useParams();
  console.log(params.id);
  const [count, setCount] = React.useState(0);
  const [text, setText] = useState('');
  const { users } = useSelector((state) => state.users);
  // const users = localStorageService.getItem('Users');
  const referral_text =
    'A clear scope increase your projects creation success rate by 92%, Scope Builder makes it easy for you to compile your scope/requirements.';

  const submitProposal = async () => {
    var data = JSON.stringify({
      keyword_id: params.id,
      proposal: text,
    });

    await getPostCall('proposals', 'post', data, users?.token)
      .then((e) => {
        if (e.data.success) {
          navigate(-1);
        } else {
          alert(e?.data?.message);
          navigate(-1);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="flex flex-col h-full">
      <Header
        link="/KeywordsConnect"
        text={'Home'}
        showButton={true}
        styles={' bg-black '}
      />
      <div className="w-full flex-1 h-100%  px-[32px] my-[32px]">
        <div className="h-full flex flex-col  gap-[32px] ">
          <h1 className="text-[20px] font-medium uppercase ">
            Create Proposal
          </h1>
          <div className=" flex-grow relative border border-[#999999] rounded-[4px]">
            <textarea
              placeholder="Enter proposal here…"
              className="w-full h-[150px] outline-none leading-[32px] text-[16px] p-[16px] resize-none text-white  placeholder-[#999999] bg-transparent"
              name="text input"
              cols="30"
              rows="10"
              maxLength="500"
              onChange={(e) => {
                setText(e.target.value);
                setCount(e.target.value.length);
              }}
            ></textarea>
            <span className="text-[#999999] block text-right mx-[16px] ">
              {' '}
              {count}
              <span>/500</span>{' '}
            </span>
            <div className=" m-[16px] p-[16px] bg-[#282828]  border border-[#999999] rounded-[4px] ">
              {referral_text}
              <span className=" font-medium text-[16px] text-[#999999] block uppercase  ">
                {' '}
                Referral Link{' '}
              </span>
              <a className="  text-[16px] rounded-[4px]   text-[#66DC78] block  ">
                {users.scopebuilder_link}
              </a>
            </div>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => navigate(-1)}
              className=" py-4 flex-1  text-[16px] font-medium  uppercase bg-[#282828] rounded-[4px] "
            >
              Cancel
            </button>
            <button
              onClick={() => submitProposal()}
              className=" py-4  flex-1  text-[16px] font-medium uppercase bg-[#66DC78] rounded-[4px] "
            >
              save proposal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProposal;

import React from 'react';
import Header from './Header';
import { useNavigate, useParams } from 'react-router-dom';
import { getPostCall } from '../api/Apicalls';
import localStorageService from '../api/localStorageService';
import { useEffect } from 'react';
import { useState } from 'react';
import Loader from './Loader';
import { copy } from '../utils';
import { useSelector } from 'react-redux';

const ProposalPreview = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [proposalText, setProposalText] = useState('');
  const [proposalId, setProposalId] = useState('');
  const [loader, setLoader] = useState(false);
  // const users = localStorageService.getItem('Users');
  const { users } = useSelector((state) => state.users);
  const referral_text =
    'A clear scope increase your projects creation success rate by 92%, Scope Builder makes it easy for you to compile your scope/requirements.';

  const deleteProposals = () => {
    setLoader(true);
    getPostCall(`proposals/${proposalId}`, 'delete', '', users?.token)
      .then((e) => {
        if (e?.data.error) {
          setLoader(false);
          alert(e.data?.message);
        } else {
          alert(e.data?.message);
          setLoader(false);
          navigate(-1);
        }
      })
      .catch((e) => {
        console.log(e?.data?.message);
      });
  };
  const editProposal = () => {
    setLoader(true);
    const data = JSON.stringify({
      keyword_id: params?.id,
      proposal: proposalText,
    });

    getPostCall(`proposals/${proposalId}`, 'put', data, users?.token)
      .then((e) => {
        if (e.data?.success) {
          setLoader(false);
          alert(e.data?.message);
          navigate(-1);
        } else {
          setLoader(false);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const getProposal = () => {
    const data = '';
    console.log(params.id);
    getPostCall(`proposals?keyword_id=${params?.id}`, 'get', data, users?.token)
      .then((e) => {
        if (e.data?.data.length !== 0) {
          setProposalId(e.data?.data[0].id);
          setProposalText(e?.data?.data[0].details);
          setLoader(false);
        } else {
          alert('There is no proposal on this keyword');
          setLoader(false);
          navigate(-1);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    setLoader(true);
    getProposal();
  }, []);
  return (
    <div className="flex flex-col h-full">
      <Header
        link="Login"
        text={'log out'}
        showButton={true}
        styles={' bg-black '}
      />
      <Loader isLoading={loader} />
      <div className="w-full flex-1 h-100%  px-[32px] my-[32px]">
        <div className="h-full flex flex-col  gap-[32px] ">
          <div className="flex justify-between items-center">
            <h1 className="text-[20px] font-medium uppercase ">
              Proposal Preview
            </h1>
            <div className="">
              <button
                className=" text-[20px] font-medium uppercase text-[#66DC78] mx-[16px]  "
                onClick={() => {
                  copy(
                    proposalText
                      .concat(' ')
                      .concat(referral_text)
                      .concat(' ')
                      .concat(
                        users.scopebuilder_link ? users.scopebuilder_link : ''
                      )
                  );
                }}
              >
                Copy
              </button>
              <button
                className=" text-[20px] font-medium uppercase text-[#66DC78]  "
                onClick={() => editProposal()}
              >
                Edit Proposal
              </button>
            </div>
          </div>
          <div className=" flex-grow relative bg-[#282828] border border-[#999999] rounded-[4px]">
            <textarea
              //   disabled
              placeholder="Enter proposal here…"
              className="w-full h-[150px] outline-none leading-[32px] text-[16px] p-[16px] resize-none text-white  placeholder-[#999999] bg-transparent"
              name=""
              id=""
              cols="30"
              rows="10"
              value={proposalText}
              onChange={(e) => setProposalText(e.target.value)}
            />

            {users.scopebuilder_status && users.scopebuilder_link && (
              <>
                <span className="text-[#999999] block text-right mx-[16px] invisible ">
                  {' '}
                  0<span>/500</span>{' '}
                </span>
                <div className=" m-[16px] p-[16px] bg-[#282828]  border border-[#999999] rounded-[4px]">
                  {referral_text}
                  <span className=" font-medium text-[16px] text-[#999999] block uppercase">
                    {' '}
                    Referral Link{' '}
                  </span>
                  <a className="  text-[16px] rounded-[4px]  text-[#66DC78] block  ">
                    {users.scopebuilder_link}
                  </a>
                </div>
              </>
            )}
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => navigate(-1)}
              className=" py-4 text-[16px] font-medium flex-1 text-  uppercase bg-[#282828] rounded-[4px] "
            >
              go back
            </button>
            <button
              onClick={() => deleteProposals()}
              className=" py-4  text-[16px] font-medium  flex-1 uppercase bg-[#66DC78] rounded-[4px] "
            >
              delete proposal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProposalPreview;

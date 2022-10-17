import request from './Request';

const baseUrl = 'https://workalert.m2mbeta.com/api';
const xApiKey = 'base64:4tb9r8P9+GXKtWEN/SFb1k3CEV1FYjsbbNuoco9xYpE=';

export const login = ({ data }) => {
  console.log(data);
  request({
    url: `${baseUrl}/login`,
    method: 'POST',
    headers: {
      'x-api-key': 'base64:4tb9r8P9+GXKtWEN/SFb1k3CEV1FYjsbbNuoco9xYpE=',
      'Content-Type': 'application/json',
    },
    data: JSON.stringify(data),
  });
};
export const register = (data) =>
  request({
    url: `${baseUrl}/auth/register`,
    method: 'POST',
    data,
  });

export const acceptInvite = (data, inviteToken) =>
  request({
    url: `${baseUrl}/auth/invite/accept/${inviteToken}`,
    method: 'POST',
    data,
  });

export const me = (token) =>
  request({
    url: `${baseUrl}/auth/me`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const sendResetEmail = (data) =>
  request({
    url: `${baseUrl}/auth/forgot-password`,
    method: 'POST',
    data,
  });

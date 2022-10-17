import axios from 'axios';

import { backendUrl, scopeBuilderUrl } from './url';
export async function getPostCall(url, method, data, authToken) {
  return new Promise((resolve, reject) => {
    try {
      var config = {
        method: method,
        url: backendUrl + url,
        headers: {
          'x-api-key': 'base64:4tb9r8P9+GXKtWEN/SFb1k3CEV1FYjsbbNuoco9xYpE=',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        data: data,
      };
      axios(config)
        .then((e) => {
          resolve(e);
        })
        .catch((e) => {
          reject(e);
        });
    } catch (e) {
      reject(e);
    }
  });
}
export async function getCall(url, method, authToken) {
  return new Promise((resolve, reject) => {
    try {
      var config = {
        method: method,
        url: scopeBuilderUrl + url,
        headers: {
          'x-api-key': 'base64:4tb9r8P9+GXKtWEN/SFb1k3CEV1FYjsbbNuoco9xYpE=',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      };
      axios(config)
        .then((e) => {
          resolve(e);
        })
        .catch((e) => {
          reject(e);
        });
    } catch (e) {
      reject(e);
    }
  });
}

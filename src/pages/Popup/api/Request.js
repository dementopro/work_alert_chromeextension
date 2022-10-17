import axios from 'axios';

const request = axios.create();

const requestHandler = (req) => {
  return req;
};

const responseHandler = (response) => {
  console.debug('Request Successful!', response);

  if (Array.isArray(response.data)) {
    return { status: response.status, data: response.data };
  }

  return { status: response.status, ...response.data };
};

const errorHandler = (error) => {
  console.error('Request Failed:', error.config);
  if (error.response) {
    const { status, data, headers, config } = error.response;

    switch (status) {
      case 404:
        console.error(
          `Resource: On ${config.url} does not exist, status code 404`
        );
        // eslint-disable-next-line prefer-promise-reject-errors
        return Promise.reject({
          status: error.response.status,
          data: error.response.data,
        });

      case 422:
        // eslint-disable-next-line prefer-promise-reject-errors
        return Promise.reject({
          status: error.response.status,
          data: error.response.data,
        });
      default:
    }

    console.error('---------Unhandled Response---------');
    console.error('Status:', status);
    console.error('Data:', data);
    console.error('Headers:', headers);
    console.error('---------Unhandled Response End---------');
  } else {
    // Something else happened while setting up the request
    // triggered the error
    console.error('Error Message(NO RESPONSE):', error.message);
  }

  return Promise.reject(error.response || error.message);
};

request.interceptors.request.use(
  (req) => requestHandler(req),
  (error) => errorHandler(error)
);

request.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => errorHandler(error)
);

export default request;

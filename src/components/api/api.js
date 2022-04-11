import axios from "axios";

const getinitialized = (contetType, responseType) =>{
    let api = axios.create({
        headers : {
          'Access-Control-Allow-Origin': '*'
        },
      });
      return api;
};

export const postRequest = (url, data, headers) =>{
    return getinitialized('application/json', headers).post(url, data, headers).catch(errorHandler || defaultErrorHandler)
};

export const getRequest = (url, headers) =>{
  return getinitialized('application/json', headers).get(url, headers).catch(errorHandler || defaultErrorHandler)
};

export const defaultErrorHandler = error => {
    return Promise.reject(error);
};
  export const errorHandler = error => {
    return Promise.reject(error.response);
};
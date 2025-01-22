import axios from 'axios';
import { API_BASE_URL } from './constant';
import { userData } from './common';  
const userInfo  = userData()
var requestOptions = {
  headers: {
    'Content-Type': 'application/json', 
    'access-token': userInfo?userInfo['token'] : ''
  },
};
 
const getOption = (token) =>{
  return {
    headers: {
      'Content-Type': 'application/json',
      'access-token': token,
    },
  };
}
export const postApi = (url, data) => {  
  return new Promise((resolve, reject) => {
    axios
      .post(API_BASE_URL + url, data,requestOptions  )
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};
export const publicpostApi = (url, data) => {
  return new Promise((resolve, reject) => {
    axios
      .post( url, data, requestOptions  )
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};
export const getApi = (url,data) => {
  const option_data  = getOption(data.token|| userInfo['token'])
  return new Promise((resolve, reject) => {
    axios
      .get(API_BASE_URL + url, option_data)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const postFormData = (url, dataObject) => {
  return new Promise((resolve, reject) => {
    // Create a new FormData instance
    const formData = new FormData();
    for (let key in dataObject) {
      if (dataObject[key] instanceof File) {
        // If the value is a file, append it as a file
        formData.append(key, dataObject[key]);
      } else {
        // Otherwise, just append it as a regular field
        formData.append(key, dataObject[key]);
      }
    }
    // Send POST request with FormData
    axios
      .post(API_BASE_URL + url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const privetpostApi = (url, data,userObj) => {  
  const option_data  = getOption(userObj.token|| userInfo['token'])
  return new Promise((resolve, reject) => {
    axios
      .post(API_BASE_URL + url, data,option_data  )
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};
export const privetPutApi = (url, data,userObj) => {  
  const option_data  = getOption(userObj.token|| userInfo['token'])
  return new Promise((resolve, reject) => {
    axios
      .put(API_BASE_URL + url, data,option_data  )
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};
export const privetDeleteApi = (url, data,userObj) => {  
  const option_data  = getOption(userObj.token|| userInfo['token'])
  return new Promise((resolve, reject) => {
    axios
      .delete(API_BASE_URL + url, option_data  )
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};
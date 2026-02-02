import axios from "axios";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_PROD_URL,
  withCredentials: true,
});

// // Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Check if the error has a response
    if (error.response) {
      const { status, data } = error.response;

      if (data.logout && status == 401) {
        alert(data.message);
        localStorage.removeItem("userInfo");
        window.location.href = "/";
      };

      switch (status) {
        case 429:
          toast.error(data.error || "Too many requests, please try again later");
          break;
        // case 500:
        //   toast.error("Server error, please try again later");
        //   break;
        // default:
        //   toast.error(data.error || "Something went wrong");
      }
    }
    // else if (error.request) {
    //   // Request was made but no response received
    //   toast.error("No response from server");
    // } else {
    //   // Something happened in setting up the request
    //   toast.error("Error setting up request");
    // }

    return Promise.reject(error);
  }
);

const getApi = (url) => {
  return axiosInstance.get(url);
};

const getApiForBlob = (url) => {
  return axiosInstance.get(url, { responseType: 'blob' });
};

const getApiById = (url, id) => {
  return axiosInstance.get(`${url}/${id}`);
};

const postApi = (url, data) => {
  return axiosInstance.post(url, data);
};

const patchApi = (url, id, data) => {
  return axiosInstance.patch(`${url}/${id}`, data);
};

const putApi = (url, id, data) => {
  return axiosInstance.put(`${url}/${id}`, data);
};

const deleteApi = (url, id) => {
  return axiosInstance.delete(`${url}/${id}`);
};

export { getApi, getApiForBlob, getApiById, postApi, patchApi, putApi, deleteApi };

import axios from 'axios';

const axiosSecure = axios.create({
  baseURL: 'https://blood-donation-server-nu-lyart.vercel.app',
});

const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;

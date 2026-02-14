import axios from 'axios';

const axiosSecure = axios.create({
  baseURL: 'https://blood-donation-server-snowy-six.vercel.app',
  withCredentials: true,
});

const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;

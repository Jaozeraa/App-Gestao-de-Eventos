import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const baseURL = 'http://192.168.15.11:3333';

const api = axios.create({
  baseURL,
});

api.interceptors.response.use(undefined, async error => {
  if (
    error.config &&
    error.response &&
    error.response.status === 401 &&
    error.response.data.message === 'invalid JWT token'
  ) {
    try {
      const oldRefreshToken = AsyncStorage.getItem('@GoTickets:refreshToken');

      const response = await axios.put(`${baseURL}/sessions`, {
        refreshToken: oldRefreshToken,
      });

      const { newRefreshToken: refreshToken, accessToken } = response.data;

      AsyncStorage.setItem('@GoTickets:refreshToken', refreshToken);
      AsyncStorage.setItem('@GoTickets:accessToken', accessToken);

      error.config.headers.authorization = `Bearer ${accessToken}`;

      return axios.request(error.config);
    } catch (error) {
      AsyncStorage.removeItem('@NeedU/refreshToken');
      AsyncStorage.removeItem('@NeedU/accessToken');
      AsyncStorage.removeItem('@NeedU/user');
      return;
    }
  }

  return Promise.reject(error);
});

export default api;

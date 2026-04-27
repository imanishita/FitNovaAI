import axios from 'axios';

// ✅ Gateway runs on port 8080
const BASE_URL = 'http://localhost:8080/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  return {
    Authorization: `Bearer ${token}`,
    'X-User-ID': userId,
  };
};

export const getActivities = async () => {
  return axios.get(`${BASE_URL}/activities`, {
    headers: getAuthHeaders(),
  });
};

export const addActivity = async (activity) => {
  return axios.post(`${BASE_URL}/activities`, activity, {
    headers: getAuthHeaders(),
  });
};

export const getActivityDetail = async (id) => {
  return axios.get(`${BASE_URL}/activities/${id}`, {
    headers: getAuthHeaders(),
  });
};

export const registerUser = async (userPayload) => {
  return axios.post(`${BASE_URL}/users/register`, userPayload, {
    headers: getAuthHeaders(),
  });
};

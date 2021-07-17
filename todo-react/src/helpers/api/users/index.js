import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1';

export const getUserFactory = ({ fetch, url = '' }) => async ({ id = '', token = '' }) => fetch.get(`${url}/users/${id}`, {
  headers: {
    authorization: `Bearer ${token}`,
  },
}) || {};

export const getUser = getUserFactory({ fetch: axios, url: API_URL });

import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1';

export const fetchUserFactory = ({ fetch, url = '' }) => async ({ id = '', token = '' }) => fetch.get(`${url}/users/${id}`, {
  headers: {
    authorization: `Bearer ${token}`,
  },
}) || {};

export const fetchUser = fetchUserFactory({ fetch: axios, url: API_URL });

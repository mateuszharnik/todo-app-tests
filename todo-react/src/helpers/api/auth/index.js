import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1';

export const signInUserFactory = ({ fetch, url = '' }) => async ({ data = {} }) => fetch.post(`${url}/auth/sign-in`, data) || {};

export const signUpUserFactory = ({ fetch, url = '' }) => async ({ data = {} }) => fetch.post(`${url}/auth/sign-up`, data) || {};

export const signInUser = signInUserFactory({ fetch: axios, url: API_URL });
export const signUpUser = signUpUserFactory({ fetch: axios, url: API_URL });

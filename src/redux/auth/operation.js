import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://project-lucky7.onrender.com/api/',
});

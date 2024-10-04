import axios from 'axios';

const nginxBaseUrl = 'http://localhost:30889/api/v1/';
export const api = axios.create({
    baseURL: nginxBaseUrl,
});

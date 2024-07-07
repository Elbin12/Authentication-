import axios from 'axios';

const BASE_URL = "http://localhost:8000/";
const api = axios.create({ 
    baseURL: BASE_URL,
    withCredentials: true 
 });

const api_key = "356cabade6bf66528dd434b5b92732e8";

export {BASE_URL, api, api_key}
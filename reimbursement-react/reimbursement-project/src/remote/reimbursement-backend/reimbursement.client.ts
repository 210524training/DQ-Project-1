import axios from 'axios';

import dotenv from 'dotenv';

dotenv.config({});

const reimbursementClient = axios.create({
  baseURL: process.env.REACT_APP_ENVIRONMENT === 'local' ? 'http://localhost:3000' : process.env.REIMBURSEMENT_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default reimbursementClient
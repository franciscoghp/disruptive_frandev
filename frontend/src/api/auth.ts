/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from './axios';
import { loginT, userT } from '../types/userT';

// Register Request
export const registerRq = (user: userT) => axios.post(`auth/register`, user);
// Login Request
export const loginRq = (user: loginT) => axios.post(`auth/login`, user);

// Verify Token
export const verifyTokenRq = (token: any) => axios.get(`auth/verify`, token);

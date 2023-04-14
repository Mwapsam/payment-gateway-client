import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const postUser = createAsyncThunk(
    'user/register', async (user: {}) => {
        try{
            const response = await axios.post('http://localhost:3000/api/v1/users', user, {
                withCredentials: true
            });
            const res = await response.data;
                return res;
        } catch(error){
            // throw new Error(error.response.data)
        }
    }
)

export const loginUser = createAsyncThunk(
    'user/login', async (user: {}) => {
        try{
            const response = await axios.post('http://localhost:3000/api/v1/login', user, {
                withCredentials: true // enable sending cookies with the request
            });
            const res = await response.data;
            return res;
        } catch(error){
            // throw new Error(error.response.data)
        }
    }
)

// function login (loginParams) {
//     return fetch(`http://localhost:3000/api/v1/login`, {
//       method: 'POST',
//       credentials: 'include',
//       body: JSON.stringify(user)
//     }).then(res => res.json())
//   }


export const getUsers = createAsyncThunk(
    'user/getUsers', async () => {
        try{
            const response = await axios.get('http://localhost:3000/api/v1/users');
            const res = await response.data;
                return res;
        } catch(error){
            // throw new Error(error.response.data)
        }
    }
)
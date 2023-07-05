import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from './axiosConfig';
import { User, UserLogin, UserId } from '../types';

export const postUser = createAsyncThunk(
  'user/register',
  async (userData: User, { rejectWithValue }) => {        
    try {
      const response = await axios.post('/api/v1/users', { user: userData });
      const res = await response.data;
      return res;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
); 
  
  export const loginUser = createAsyncThunk(
    'user/login',
    async (user: UserLogin, { rejectWithValue }) => {
      try {
        const response = await axios.post('/api/v1/login', user);
        const res = await response.data;
        return res;
      } catch (error: any) {
        return rejectWithValue(error.response.data);
      }
    }
  );


export const getUsers = createAsyncThunk(
    'user/getUsers', async () => {
        try{
            const response = await axios.get('/api/v1/users');
            const res = await response.data;
                return res;
        } catch(error){
            // throw new Error(error.response.data)
        }
    }
)

export const getUser = createAsyncThunk(
  'user/getUser', async () => {
      try{
          const response = await axios.get('/api/v1/current_user');
          const res = await response.data;
          
          return res;
      } catch(error: any){
          throw new Error(error.response.data)
      }
  }
)
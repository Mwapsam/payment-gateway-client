import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createProfile = createAsyncThunk(
  'profile/create',
  async (data: any, { rejectWithValue }) => {
    
    try {
      const response = await axios.post(
        'http://localhost:3000/api/v1/profiles', data,
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error: any) {      
      throw new Error(error.response.data);
    }
  }
);


export const getProfile = createAsyncThunk(
    'profile/get',
    async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/profiles', {
          withCredentials: true
        });
        const res = await response.data;
        return res;
      } catch (error) {
        // throw new Error(error.response.data.error)
      }
    }
  );
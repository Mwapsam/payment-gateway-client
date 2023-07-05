import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createFee = createAsyncThunk(
  'fees/create',
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'http://localhost:3000/api/v1/fees',
        {
          fee: data,
        },
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);


export const getFees = createAsyncThunk(
    'fees/get',
    async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/fees', {
          withCredentials: true
        });
        const res = await response.data;
        return res;
      } catch (error) {
        // throw new Error(error.response.data)
      }
    }
  );

  export const getFee = createAsyncThunk(
    'fee/get',
    async (id, { rejectWithValue }) => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/fees/${id}`, {
          withCredentials: true
        });
        const res = await response.data;
        return res;
      } catch (error: any) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  
export const deleteFee = createAsyncThunk(
    'fees/delete',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://localhost:3000/api/v1/fees/${id}`, {
                withCredentials: true
            });
        const res = await response.data;
        return res;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateFee = createAsyncThunk(
    'fees/update',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://localhost:3000/api/v1/fees/${id}`, {
                withCredentials: true
            });
        const res = await response.data;
        return res;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);
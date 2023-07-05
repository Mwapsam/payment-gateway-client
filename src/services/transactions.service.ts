import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createtransaction = createAsyncThunk(
    'transactions/create', async (method, { rejectWithValue }) => {
        try{
            const response = await axios.post('http://localhost:3000/api/v1/transactions', { method }, {
                withCredentials: true
              })
            const res = await response.data;
            return res;
        } catch(error: any){
            return rejectWithValue(error.response.data);
        }
    }
)

export const gettransactions = createAsyncThunk(
    'transactions/get',
    async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/transactions', {
          withCredentials: true
        });
        const res = await response.data;
        return res;
      } catch (error) {
        // throw new Error(error.response.data)
      }
    }
  );

  export const gettransaction = createAsyncThunk(
    'transaction/get',
    async (id, { rejectWithValue }) => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/transactions/${id}`, {
          withCredentials: true
        });
        const res = await response.data;
        return res;
      } catch (error: any) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  
export const deletetransaction = createAsyncThunk(
    'transactions/delete',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://localhost:3000/api/v1/transactions/${id}`, {
                withCredentials: true
            });
        const res = await response.data;
        return res;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updatetransaction = createAsyncThunk(
    'transactions/update',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://localhost:3000/api/v1/transactions/${id}`, {
                withCredentials: true
            });
        const res = await response.data;
        return res;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);
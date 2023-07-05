import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createPaymentMethod = createAsyncThunk(
    'payments/create', async (method, { rejectWithValue }) => {
        try{
            const response = await axios.post('http://localhost:3000/api/v1/payment_methods', { method }, {
                withCredentials: true
              })
            const res = await response.data;
            return res;
        } catch(error: any){
            return rejectWithValue(error.response.data);
        }
    }
)


export const getPaymentMethods = createAsyncThunk(
    'payments/get',
    async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/payment_methods', {
          withCredentials: true
        });
        const res = await response.data;
        return res;
      } catch (error) {
        // throw new Error(error.response.data)
      }
    }
  );

  export const getPaymentMethod = createAsyncThunk(
    'payment/get',
    async (id, { rejectWithValue }) => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/payment_methods/${id}`, {
          withCredentials: true
        });
        const res = await response.data;
        return res;
      } catch (error: any) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  
export const deletePaymentMethod = createAsyncThunk(
    'payment/delete',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://localhost:3000/api/v1/payment_methods/${id}`, {
                withCredentials: true
            });
        const res = await response.data;
        return res;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updatePaymentMethod = createAsyncThunk(
    'payment/update',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://localhost:3000/api/v1/payment_methods/${id}`, {
                withCredentials: true
            });
        const res = await response.data;
        return res;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);
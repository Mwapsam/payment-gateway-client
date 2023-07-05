import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getCustomers = createAsyncThunk(
    'customers/get', async () => {
        try{
            const response = await axios.get('http://localhost:3000/api/v1/customers',         
              {
                withCredentials: true,
              });
            const res = await response.data;
            return res;
        } catch(error){
            // throw new Error(error.response.data)
        }
    }
)
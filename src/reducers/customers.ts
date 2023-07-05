import { createSlice } from '@reduxjs/toolkit';
import { getCustomers } from '../services/customers.service';

type SliceState = { 
    customers: any[]
    error: string
    loading: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState = {
    customers: [],
    error: "",
    loading: 'idle',
} as SliceState

const customersSlice = createSlice({
    name: 'customers',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCustomers.pending, (state, action) => {
            state.loading = 'pending';
        });

        builder.addCase(getCustomers.rejected, (state, action) => {
            state.loading = 'failed';
            state.error = action.error.message!
        });

        builder.addCase(getCustomers.fulfilled, (state, action) => {
            state.loading = 'succeeded'
            state.customers = action.payload;
        });
    }
})

export default customersSlice.reducer;
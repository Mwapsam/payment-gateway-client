import { createSlice } from '@reduxjs/toolkit';
import { createPaymentMethod, getPaymentMethods } from '../services/payments.service';

type SliceState = { 
    payments: any[]
    error: string
    loading: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState = {
    payments: [],
    error: "",
    loading: 'idle',
} as SliceState

const paymentsSlice = createSlice({
    name: 'payments',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createPaymentMethod.pending, (state, action) => {
            state.loading = 'pending';
        });

        builder.addCase(createPaymentMethod.rejected, (state, action) => {
            state.loading = 'failed';
            state.error = action.error.message!
        });

        builder.addCase(createPaymentMethod.fulfilled, (state, action) => {
            state.loading = 'succeeded'
            state.payments = action.payload;
        });

        builder.addCase(getPaymentMethods.pending, (state, action) => {
            state.loading = 'pending';
        });

        builder.addCase(getPaymentMethods.rejected, (state, action) => {
            state.loading = 'failed';
            state.error = action.error.message!
        });

        builder.addCase(getPaymentMethods.fulfilled, (state, action) => {
            state.loading = 'succeeded'
            state.payments = action.payload;
        });
    }
})

export default paymentsSlice.reducer;
import { createSlice } from '@reduxjs/toolkit';
import { createtransaction, gettransaction, gettransactions } from '../services/transactions.service';

type SliceState = { 
    transaction: null
    transactions: any[]
    error: string
    loading: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState = {
    transaction: null,
    transactions: [],
    error: "",
    loading: 'idle',
} as SliceState

const transactionsSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createtransaction.pending, (state, action) => {
            state.loading = 'pending';
        });

        builder.addCase(createtransaction.rejected, (state, action) => {
            state.loading = 'failed';
            state.error = action.error.message!
        });

        builder.addCase(createtransaction.fulfilled, (state, action) => {
            state.loading = 'succeeded'
            state.transaction = action.payload;
        });

        builder.addCase(gettransaction.pending, (state, action) => {
            state.loading = 'pending';
        });

        builder.addCase(gettransaction.rejected, (state, action) => {
            state.loading = 'failed';
            state.error = action.error.message!
        });

        builder.addCase(gettransaction.fulfilled, (state, action) => {
            state.loading = 'succeeded'
            state.transaction = action.payload;
        });

        builder.addCase(gettransactions.pending, (state, action) => {
            state.loading = 'pending';
        });

        builder.addCase(gettransactions.rejected, (state, action) => {
            state.loading = 'failed';
            state.error = action.error.message!
        });

        builder.addCase(gettransactions.fulfilled, (state, action) => {
            state.loading = 'succeeded'
            state.transactions = action.payload;
        });
    }
})

export default transactionsSlice.reducer;
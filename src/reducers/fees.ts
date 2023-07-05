import { createSlice } from '@reduxjs/toolkit';
import { createFee, getFee, getFees } from '../services/fees.service';

type SliceState = { 
    fee: null
    fees: any[]
    error: string
    loading: 'idle' | 'pending' | 'succeeded' | 'failed'
    showSuccessMessage: boolean
    showErrorMessage: boolean
  }
  
  const initialState = {
    fee: null,
    fees: [],
    error: "",
    loading: 'idle',
    showSuccessMessage: false,
    showErrorMessage: false,
  } as SliceState

const feesSlice = createSlice({
    name: 'fees',
    initialState,
    reducers: {
        setShowSuccessMessage: (state, action) => {
          state.showSuccessMessage = action.payload;
        },
        setShowErrorMessage: (state, action) => {
            state.showErrorMessage = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(createFee.pending, (state, action) => {
            state.loading = 'pending';
            state.showSuccessMessage = false;
            state.showErrorMessage = false;
        });

        builder.addCase(createFee.rejected, (state, action) => {
            state.loading = 'failed';
            state.error = action.error?.message ?? 'An error occurred.';
            state.showSuccessMessage = false;
            state.showErrorMessage = true;
          });          

        builder.addCase(createFee.fulfilled, (state, action) => {
            state.loading = 'succeeded'
            state.fee = action.payload;
            state.showSuccessMessage = true;
            state.showErrorMessage = false;
        });

        builder.addCase(getFee.pending, (state, action) => {
            state.loading = 'pending';
        });

        builder.addCase(getFee.rejected, (state, action) => {
            state.loading = 'failed';
            state.error = action.error.message!
        });

        builder.addCase(getFee.fulfilled, (state, action) => {
            state.loading = 'succeeded'
            state.fee = action.payload;
        });

        builder.addCase(getFees.pending, (state, action) => {
            state.loading = 'pending';
        });

        builder.addCase(getFees.rejected, (state, action) => {
            state.loading = 'failed';
            state.error = action.error.message!
        });

        builder.addCase(getFees.fulfilled, (state, action) => {
            state.loading = 'succeeded'
            state.fees = action.payload;
        });
    }
})

export const { setShowSuccessMessage, setShowErrorMessage } = feesSlice.actions;
export default feesSlice.reducer;
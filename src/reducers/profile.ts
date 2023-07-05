import { createSlice } from '@reduxjs/toolkit';
import { createProfile, getProfile } from '../services/profile.service';

type SliceState = { 
    profile: any[]
    error: string
    loading: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState = {
    profile: [],
    error: "",
    loading: 'idle',
} as SliceState

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createProfile.pending, (state, action) => {
            state.loading = 'pending';
        });

        builder.addCase(createProfile.rejected, (state, action) => {
            state.loading = 'failed';
            console.log(action);
            
            state.error = action.error.message!
        });

        builder.addCase(createProfile.fulfilled, (state, action) => {
            state.loading = 'succeeded'
            state.profile = action.payload;
        });

        builder.addCase(getProfile.pending, (state, action) => {
            state.loading = 'pending';
        });

        builder.addCase(getProfile.rejected, (state, action) => {
            state.loading = 'failed';
            state.error = action.error.message!
        });

        builder.addCase(getProfile.fulfilled, (state, action) => {
            state.loading = 'succeeded'
            state.profile = action.payload;
        });
    }
})

export default profileSlice.reducer;
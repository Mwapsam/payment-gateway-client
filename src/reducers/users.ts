import { createSlice } from '@reduxjs/toolkit';
import { loginUser, getUsers } from '../services/users.service';

type SliceState = { 
    user: any
    users: any[]
    error: string
    isAuthenticated: boolean
    loading: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState = {
    user: null,
    users: [],
    isAuthenticated: false,
    error: "",
    loading: 'idle',
} as SliceState

const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state, action) => {
            state.loading = 'pending';
            state.isAuthenticated = false;
        });

        builder.addCase(loginUser.rejected, (state, action) => {
            state.loading = 'failed';
            state.isAuthenticated = false;
            state.error = action.error.message!
        });

        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.loading = 'succeeded'
            state.isAuthenticated = true;
            state.user = action.payload;
        });

        builder.addCase(getUsers.pending, (state, action) => {
            state.loading = 'pending';
            state.isAuthenticated = false;
        });

        builder.addCase(getUsers.rejected, (state, action) => {
            state.loading = 'failed';
            state.isAuthenticated = false;
            state.error = action.error.message!
        });

        builder.addCase(getUsers.fulfilled, (state, action) => {
            state.loading = 'succeeded'
            state.isAuthenticated = true;
            state.users = action.payload;
        });

        // builder.addCase(logoutUser.rejected, (state, action) => {
        //     state.loading = 'failed';
        //     state.isAuthenticated = true;
        //     state.error = action.error.message!
        //     window.history.pushState({}, '', '/');
        //     window.location.reload();
        // });

        // builder.addCase(logoutUser.fulfilled, (state, action) => {
        //     state.loading = 'succeeded'
        //     state.isAuthenticated = false;
        //     state.user = action.payload;
        //     window.history.pushState({}, '', '/');
        //     window.location.reload();
        // });
    }
})

export default sessionSlice.reducer;
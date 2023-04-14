import { createSlice } from '@reduxjs/toolkit';
import { createProject, getProjects } from '../services/projects.service';

type SliceState = { 
    projects: any[]
    error: string
    loading: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState = {
    projects: [],
    error: "",
    loading: 'idle',
} as SliceState

const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createProject.pending, (state, action) => {
            state.loading = 'pending';
        });

        builder.addCase(createProject.rejected, (state, action) => {
            state.loading = 'failed';
            state.error = action.error.message!
        });

        builder.addCase(createProject.fulfilled, (state, action) => {
            state.loading = 'succeeded'
            state.projects = action.payload;
        });

        builder.addCase(getProjects.pending, (state, action) => {
            state.loading = 'pending';
        });

        builder.addCase(getProjects.rejected, (state, action) => {
            state.loading = 'failed';
            state.error = action.error.message!
        });

        builder.addCase(getProjects.fulfilled, (state, action) => {
            state.loading = 'succeeded'
            state.projects = action.payload;
        });
    }
})

export default projectsSlice.reducer;
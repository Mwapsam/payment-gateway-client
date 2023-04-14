import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createProject = createAsyncThunk(
    'projects/create', async (project: {}) => {
        try{
            const response = await axios.post('http://localhost:3000/api/v1/projects', {name: project}, {
                withCredentials: true
            })
            const res = await response.data;
                return res;
        } catch(error){
            // throw new Error(error.response.data)
        }
    }
)






export const getProjects = createAsyncThunk(
    'projects/getProjects', async () => {
        try{
            const response = await axios.get('http://localhost:3000/api/v1/projects');
            const res = await response.data;
                return res;
        } catch(error){
            // throw new Error(error.response.data)
        }
    }
)
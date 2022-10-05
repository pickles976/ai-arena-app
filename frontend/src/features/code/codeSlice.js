import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import codeService from './codeService'

const initialState = {
    code: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Create new code
export const createCode = createAsyncThunk('code/create', async (codeData, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token
        return await codeService.createCode(codeData, token)
    }catch (error) {
        const message = 
            (error.response && 
            error.response.data && 
            error.response.data.message) || 
            error.message || 
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Get user code
export const getCode = createAsyncThunk('code/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await codeService.getCode(token)
    }catch (error){
        const message = 
            (error.response && 
            error.response.data && 
            error.response.data.message) || 
            error.message || 
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Create new code
export const deleteCode = createAsyncThunk('code/delete', async (id, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token
        return await codeService.deleteCode(id, token)
    }catch (error) {
        const message = 
            (error.response && 
            error.response.data && 
            error.response.data.message) || 
            error.message || 
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const codeSlice = createSlice({
    name: 'code',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
        .addCase(createCode.pending, (state) => {
            state.isLoading = true
        })
        .addCase(createCode.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.code.push(action.payload)
        })
        .addCase(createCode.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(getCode.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getCode.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.code = action.payload
        })
        .addCase(getCode.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(deleteCode.pending, (state) => {
            state.isLoading = true
        })
        .addCase(deleteCode.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.code = state.code.filter((code) => code._id !== action.payload.id)
        })
        .addCase(deleteCode.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
    }
})

export const {reset} = codeSlice.actions
export default codeSlice.reducer
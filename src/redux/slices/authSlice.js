import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ username, password }, thunkAPI) => {
    const MOCK_USERNAME = 'testuser';
    const MOCK_PASSWORD = 'password123';

    if (username === MOCK_USERNAME && password === MOCK_PASSWORD) {
      console.log('Using mock authentication credentials.');
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { user: { username: MOCK_USERNAME, email: 'test@example.com' }, token: 'mock-token-123' };
    }
    try {
      const response = await axios.post('https://dummyjson.com/auth/login', {
        username,
        password,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Login failed';
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from '@/types/store';
import { User } from '@/types/auth';
import { authApi } from '@/lib/api';

// Initial state
const initialState: AuthState = {
  user: null,
  isLoading: false,
  isAuthenticated: false,
};

// Async thunk for login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ pid, password }: { pid: string; password: string }, { rejectWithValue }) => {
    try {
      const result = await authApi.login(pid, password);
      if (result.success && result.user) {
        return result.user;
      } else {
        return rejectWithValue('Invalid credentials');
      }
    } catch (error) {
      return rejectWithValue('Login failed');
    }
  }
);

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Logout action
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
    },
    // Set user (for persisted state restoration)
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      state.isLoading = false;
    },
    // Clear auth state
    clearAuth: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login pending
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      // Login fulfilled
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      // Login rejected
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

// Export actions
export const { logout, setUser, clearAuth } = authSlice.actions;

// Export selectors
export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated;
export const selectIsLoading = (state: { auth: AuthState }) => state.auth.isLoading;

// Export reducer
export default authSlice.reducer;
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import {
  getUserApi,
  loginUserApi,
  registerUserApi,
  logoutApi,
  updateUserApi,
  TLoginData,
  TRegisterData
} from '@api';
import { setCookie, deleteCookie } from '../../utils/cookie';

interface UserState {
  user: TUser | null;
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  loginError: string | null;
  registerError: string | null;
}

const initialState: UserState = {
  user: null,
  isAuthChecked: false,
  isAuthenticated: false,
  loginError: null,
  registerError: null
};

export const checkUserAuth = createAsyncThunk('user/checkAuth', async () => {
  const data = await getUserApi();
  return data.user;
});

export const loginUser = createAsyncThunk(
  'user/login',
  async (loginData: TLoginData) => {
    const data = await loginUserApi(loginData);
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.user;
  }
);

export const registerUser = createAsyncThunk(
  'user/register',
  async (registerData: TRegisterData) => {
    const data = await registerUserApi(registerData);
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.user;
  }
);

export const logoutUser = createAsyncThunk('user/logout', async () => {
  await logoutApi();
  deleteCookie('accessToken');
  localStorage.removeItem('refreshToken');
});

export const updateUser = createAsyncThunk(
  'user/update',
  async (userData: Partial<TRegisterData>) => {
    const data = await updateUserApi(userData);
    return data.user;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // checkUserAuth
      .addCase(checkUserAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      })
      .addCase(checkUserAuth.rejected, (state) => {
        state.isAuthChecked = true;
        state.isAuthenticated = false;
        state.user = null;
      })
      // loginUser
      .addCase(loginUser.pending, (state) => {
        state.loginError = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loginError = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginError = action.error.message || 'Login failed';
      })
      // registerUser
      .addCase(registerUser.pending, (state) => {
        state.registerError = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.registerError = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registerError = action.error.message || 'Registration failed';
      })
      // logoutUser
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      })
      // updateUser
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  }
});

export const selectUser = (state: { user: UserState }) => state.user.user;
export const selectIsAuthChecked = (state: { user: UserState }) =>
  state.user.isAuthChecked;
export const selectIsAuthenticated = (state: { user: UserState }) =>
  state.user.isAuthenticated;
export const selectUserName = (state: { user: UserState }) =>
  state.user.user?.name || '';
export const selectLoginError = (state: { user: UserState }) =>
  state.user.loginError;
export const selectRegisterError = (state: { user: UserState }) =>
  state.user.registerError;

export default userSlice.reducer;

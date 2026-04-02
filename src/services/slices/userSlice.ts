<<<<<<< Updated upstream
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  registerUserApi,
  loginUserApi,
  getUserApi,
  updateUserApi,
  logoutApi,
  TLoginData,
  TRegisterData
} from '../../utils/burger-api';
import { setCookie } from '../../utils/cookie';
import { TUser } from '@utils-types';

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (data: TRegisterData, { rejectWithValue }) => {
    try {
      const response = await registerUserApi(data);
      setCookie('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      return response.user;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return rejectWithValue(message);
    }
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (data: TLoginData, { rejectWithValue }) => {
    try {
      const response = await loginUserApi(data);
      setCookie('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      return response.user;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return rejectWithValue(message);
    }
  }
);

export const getUser = createAsyncThunk(
  'user/getUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUserApi();
      return response.user;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return rejectWithValue(message);
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (data: Partial<TRegisterData>, { rejectWithValue }) => {
    try {
      const response = await updateUserApi(data);
      return response.user;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return rejectWithValue(message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await logoutApi();
      localStorage.removeItem('refreshToken');
      document.cookie = 'accessToken=;max-age=0';
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return rejectWithValue(message);
    }
  }
);

interface IUserState {
  user: TUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

const initialState: IUserState = {
  user: null,
  isLoading: false,
  isAuthenticated: false,
  error: null
};

=======
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

>>>>>>> Stashed changes
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
<<<<<<< Updated upstream
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = String(action.payload) || 'Ошибка при регистрации';
        state.isAuthenticated = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = String(action.payload) || 'Ошибка при входе';
        state.isAuthenticated = false;
      })
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          String(action.payload) || 'Ошибка при получении пользователя';
        state.isAuthenticated = false;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = String(action.payload) || 'Ошибка при обновлении профиля';
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = String(action.payload) || 'Ошибка при выходе';
=======
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
>>>>>>> Stashed changes
      });
  }
});

<<<<<<< Updated upstream
=======
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

>>>>>>> Stashed changes
export default userSlice.reducer;

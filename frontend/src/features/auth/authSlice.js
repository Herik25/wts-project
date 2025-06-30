import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUser, loginUser, checkAuth, logOut, resetPasswordRequest, resetPassword } from "./authApi";

const initialState = {
  loggedInUserToken: null,
  status: "idle",
  error: null,
  userChecked: false,
  mailSent: false,
  mailStatus: "idle",
  passwordReset: false,
  passResetStatus: "idle"
};

export const createUserAsync = createAsyncThunk(
  "user/createUser",
  async (userData) => {
    const response = await createUser(userData);
    return response.data;
  }
);

export const loginUserAsync = createAsyncThunk(
  "user/loginUser",
  async (loginInfo, { rejectWithValue }) => {
    try {
      const response = await loginUser(loginInfo);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const logOutAsync = createAsyncThunk("user/logOut", async () => {
  const response = await logOut();
  return response.data;
});

export const checkAuthAsync = createAsyncThunk("user/checkAuth", async () => {
  try {
    const response = await checkAuth();
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const resetPasswordRequestAsync = createAsyncThunk(
  "user/resetPasswordRequest",
  async (email) => {
    try {
      const response = await resetPasswordRequest(email);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const resetPasswordtAsync = createAsyncThunk(
  "user/resetPassword",
  async (data) => {
    try {
      const response = await resetPassword(data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = action.payload;
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = action.payload;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      })
      .addCase(logOutAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logOutAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = null;
      })
      .addCase(checkAuthAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkAuthAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = action.payload;
        state.userChecked = true;
      })
      .addCase(checkAuthAsync.rejected, (state, action) => {
        state.status = "idle";
        state.userChecked = true;
      })
      .addCase(resetPasswordRequestAsync.pending, (state) => {
        state.status = "loading";
        state.mailStatus = "loading"
      })
      .addCase(resetPasswordRequestAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.mailStatus = "idle";
        state.mailSent = true;
      })
      .addCase(resetPasswordtAsync.pending, (state) => {
        state.status = "loading";
        state.passResetStatus = "loading";
      })
      .addCase(resetPasswordtAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.passwordReset = true;
        state.passResetStatus = "idle";
      })
      .addCase(resetPasswordtAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
        state.passResetStatus = "rejected";
      })
  },
});

export const selectLoggedInUser = (state) => state.auth.loggedInUserToken;
export const selectError = (state) => state.auth.error;
export const selectUserChecked = (state) => state.auth.userChecked;
export const selectMailSent = (state) => state.auth.mailSent;
export const selectMailStatus = (state) => state.auth.mailStatus;
export const selectPasswordReset = (state) => state.auth.passwordReset;
export const selectPasswordResetStatus = (state) => state.auth.passResetStatus;

export default authSlice.reducer;

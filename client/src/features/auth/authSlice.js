import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import authService from "./authServices";

const initialState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  error: false,
  loading: false,
  success: false,
  message: "",
};

export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const signUp = createAsyncThunk(
  "auth/sign-up",
  async (user, thunkAPI) => {
    try {
      return await authService.signUp(user);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (thunkAPI) => {
  try {
    return await authService.logout();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const updateCustomerProfile = createAsyncThunk(
  "auth/update-customer-profile",
  async (customer, thunkAPI) => {
    try {
      return await authService.updateCustomerProfile(customer);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const blockUser = createAsyncThunk(
  "auth/block-user",
  async (user, thunkAPI) => {
    try {
      return await authService.blockUser(user);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.error = false;
        state.loading = false;
        state.success = true;
        state.user = action.payload;
        state.message = "success";
      })
      .addCase(login.rejected, (state, action) => {
        state.error = true;
        state.success = false;
        state.message = action.payload;
        state.loading = false;
      })
      .addCase(signUp.pending, (state) => {
        state.loading = true;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.error = false;
        state.loading = false;
        state.success = true;
        state.newAccount = action.payload;
        state.message = "success";
      })
      .addCase(signUp.rejected, (state, action) => {
        state.error = true;
        state.success = false;
        state.message = action.payload;
        state.loading = false;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.error = false;
        state.loading = false;
        state.success = true;
        state.user = null;
        state.message = action.payload;
      })
      .addCase(logout.rejected, (state, action) => {
        state.error = true;
        state.success = false;
        state.message = action.payload;
        state.loading = false;
      })
      .addCase(blockUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(blockUser.fulfilled, (state, action) => {
        state.error = false;
        state.loading = false;
        state.success = true;
        state.message = action.payload;
      })
      .addCase(blockUser.rejected, (state, action) => {
        state.error = true;
        state.success = false;
        state.message = action.error;
        state.loading = false;
      })
      .addCase(updateCustomerProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCustomerProfile.fulfilled, (state, action) => {
        state.error = false;
        state.loading = false;
        state.success = true;
        state.user.gender = action.payload[0].gender;
        state.user.address = action.payload[0].address;
        state.user.birthday = action.payload[0].birthday;
        state.user.phoneNumber = action.payload[0].phoneNumber;
        state.user.name = action.payload[0].name;
        state.message = "success";
      })
      .addCase(updateCustomerProfile.rejected, (state, action) => {
        state.error = true;
        state.success = false;
        state.message = action.payload;
        state.loading = false;
      });
  },
});

export default authSlice.reducer;

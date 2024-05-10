import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const apiUrl = process.env.REACT_APP_NODE_BACKEND_BASEURL;
const SECURE_API = axios.create({
  baseURL: process.env.REACT_APP_NODE_BACKEND_BASEURL,
});

SECURE_API.interceptors.request.use(
  (config) => {
    const unParesdToken = localStorage.getItem("access_token");
    const parsedToken = unParesdToken && JSON.parse(unParesdToken);

    if (parsedToken) {
      config.headers.Authorization = `Bearer ${parsedToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const signWithGoogle = (result) =>
  SECURE_API.post("/auth/google-login", result);

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmpassword: "",
  age: "",
  user: {},
  token: "",
  loading: false,
  error: null,
  otpScreen: false,
  confirmPasswordScreen: false,
};

export const signUpUser = createAsyncThunk(
  "auth/signUpUser",
  async ({ values, action }) => {
    try {
      const response = await axios.post(`${apiUrl}/api/auth/register`, values);
      toast.success("User Register Successfully..");
      action && action();
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

export const signInUser = createAsyncThunk(
  "auth/signInUser",
  async ({ values, action }) => {
    try {
      const response = await axios.post(`${apiUrl}/api/auth/login`, values);
      localStorage.setItem("access_token", response.data.access_token);
      if (response.data.status === "success") {
        action && action();
        toast.success("Login Successfully..");
        return response.data.user;
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      if (
        error?.response?.data?.message ===
        "Cannot read properties of null (reading 'forgetPassword')"
      ) {
        toast.error("Invalid Email");
      } else {
        toast.error("Invalid Password");
      }
    }
  }
);

export const forgetPassword = createAsyncThunk(
  "auth/forgetPassword",
  async ({ values, action }, { dispatch }) => {
    try {
      const response = await axios.post(
        `${apiUrl}/api/auth/reset-password-request`,
        values
      );
      dispatch(setEmail(values));
      toast.success(response.data.message);
      action && action();
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
);

export const confirmResetPassword = createAsyncThunk(
  "auth/confirmResetPassword",
  async ({ password, action, email }) => {
    try {
      const response = await axios.post(`${apiUrl}/api/auth/reset-password`, {
        password,
        email,
      });
      toast.success("Password reset successfully.");
      action && action();
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      toast.error("Something went wrong");
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (action) => {
  try {
    localStorage.removeItem("access_token");
    action && action();
    toast.success("Logout Successfully...");
  } catch (error) {
    console.log(error);
  }
});

export const GoogleSignUp = createAsyncThunk(
  "/auth/google-login",
  async ({ values, extra }) => {
    const { action } = extra;
    try {
      const res = await signWithGoogle(values);
      toast.success(res.data.message);
      action && action();
      return res.data;
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  }
);

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addToken: (state, action) => {
      state.token = localStorage.getItem("token");
    },
    addUser: (state, action) => {
      state.user = localStorage.getItem("user");
    },
    showOTPScreen: (state) => {
      state.otpScreen = true;
    },
    showConfirmPasswordScreen: (state) => {
      state.confirmPasswordScreen = true;
    },

    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    //signin
    builder
      .addCase(signInUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload;
        state.token = action.payload;
      })

      .addCase(signInUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
      });

    //signup
    builder
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log("Pending State:", state);
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload;
        state.token = action.payload;
        console.log("Fulfilled State:", state);
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.error;
        state.msg = "";
        console.log("Rejected State:", state);
      });
    // forget password
    builder
      .addCase(forgetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.otpScreen = true;
      })
      .addCase(forgetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
      });

    // confirm reset password
    builder
      .addCase(confirmResetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(confirmResetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.confirmPasswordScreen = false;
      })
      .addCase(confirmResetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
      });
  },
});

export const {
  addToken,
  addUser,
  showOTPScreen,
  showConfirmPasswordScreen,
  setEmail,
  setUser,
} = authSlice.actions;
export default authSlice.reducer;

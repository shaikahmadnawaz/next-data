import axios from "@/utils/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export const fetchData = createAsyncThunk(
  "/api/v1/data/all",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/v1/data");
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const addData = createAsyncThunk(
  "/api/v1/data/add",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/v1/data", data);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const updateData = createAsyncThunk(
  "/api/v1/data/update",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/api/v1/data/${data._id}`, data);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const deleteData = createAsyncThunk(
  "/api/v1/data/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/api/v1/data/${id}`);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const sendEmail = createAsyncThunk(
  "/api/v1/data/sendEmail",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/v1/data/sendEmail", data);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const dataSlice = createSlice({
  name: "data",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload.data.allData;
      toast.success(action.payload.message);
    });
    builder.addCase(fetchData.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      toast.error(action.payload.message);
    });

    builder.addCase(addData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload.data.allData;
      toast.success(action.payload.message);
    });
    builder.addCase(addData.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      toast.error(action.payload.message);
    });

    builder.addCase(updateData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload.data.allData;
      toast.success(action.payload.message);
    });
    builder.addCase(updateData.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      toast.error(action.payload.message);
    });

    builder.addCase(deleteData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload.data.allData;
      toast.success(action.payload.message);
    });
    builder.addCase(deleteData.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      toast.error(action.payload.message);
    });

    builder.addCase(sendEmail.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(sendEmail.fulfilled, (state, action) => {
      state.isLoading = false;
      toast.success(action.payload.message);
    });
    builder.addCase(sendEmail.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      toast.error(action.payload.message);
    });
  },
});

export default dataSlice.reducer;

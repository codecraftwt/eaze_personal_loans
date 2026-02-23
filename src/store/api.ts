import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

/* =============================
   TYPES
=============================== */
interface SalesforceState {
  salesforceToken: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

interface MainApplicationPayload {
//   accountId: string;
  userData: Record<string, any>;
}

const SF_BASE_URL = "https://eazeconsulting.my.salesforce.com";

/* =============================
   ERROR HANDLER
=============================== */
const handleApiError = (error: any) => {
  const message = error.response?.data?.message || error.message || "Unknown Error";
  toast.error(message);
  return message;
};

/* =========================================================
   1. FETCH TOKEN
========================================================= */
export const fetchSalesforceToken = createAsyncThunk(
  "salesforce/fetchToken",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_TOKEN_URL}/api/token`, {
        SF_INSTANCE: import.meta.env.VITE_API_URL,
        CLIENT_ID: import.meta.env.VITE_SF_CLIENT_ID,
        CLIENT_SECRET: import.meta.env.VITE_SF_CLIENT_SECRET,
      });
      return response.data.access_token;
    } catch (error: any) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

/* =========================================================
   2. SEND MAIN APPLICATION DATA
========================================================= */
export const sendMainApplicationData = createAsyncThunk(
  "salesforce/sendData",
  async ({ accountId, userData }: any, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { salesforce: SalesforceState };
      const token = state.salesforce.salesforceToken;

      if (!token) throw new Error("No active session. Please authenticate.");

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/services/apexrest/salesforce/mainapplication/api/senddata`,
        { accountId, jsonbody: userData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Application data sent successfully!");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

/* =============================
   SLICE
=============================== */
const salesforceSlice = createSlice({
  name: "salesforce",
  initialState: {
    salesforceToken: null,
    status: "idle",
    error: null,
  } as SalesforceState,
  reducers: {
    resetSalesforceState: (state) => {
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Token Handling
      .addCase(fetchSalesforceToken.pending, (state) => { state.status = "loading"; })
      .addCase(fetchSalesforceToken.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.salesforceToken = action.payload;
      })
      .addCase(fetchSalesforceToken.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      // Send Data Handling
      .addCase(sendMainApplicationData.pending, (state) => { state.status = "loading"; })
      .addCase(sendMainApplicationData.fulfilled, (state) => { state.status = "succeeded"; })
      .addCase(sendMainApplicationData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { resetSalesforceState } = salesforceSlice.actions;
export default salesforceSlice.reducer;
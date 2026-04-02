import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/* =============================
   TYPES
=============================== */
interface SalesforceState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

/**
 * Dev / `vite`: use same-origin path so Vite proxies (avoids CORS to Salesforce from localhost).
 * Production build: browser calls Salesforce directly (origin must be CORS-allowed there).
 */
const SF_PUBLIC_API_URL = import.meta.env.PROD
  ? "https://eazeconsulting.my.salesforce-sites.com/api/services/apexrest/public-api/"
  : "/api/salesforce-public";

const handleApiError = (error: unknown) => {
  const err = error as { response?: { data?: { message?: string } }; message?: string };
  return err.response?.data?.message || err.message || "Unknown Error";
};

/* =========================================================
   SEND MAIN APPLICATION DATA
========================================================= */
export const sendMainApplicationData = createAsyncThunk(
  "salesforce/sendData",
  async ({ accountId, userData }: { accountId: string; userData: Record<string, unknown> }, { rejectWithValue }) => {
    try {
      const payload = { accountId, jsonbody: userData };
      const response = await axios.post(SF_PUBLIC_API_URL, payload, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error: unknown) {
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
      .addCase(sendMainApplicationData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(sendMainApplicationData.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(sendMainApplicationData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { resetSalesforceState } = salesforceSlice.actions;
export default salesforceSlice.reducer;

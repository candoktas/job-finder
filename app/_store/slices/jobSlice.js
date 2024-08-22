import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchDataWithAuth } from "@/app/_api/authApi";
import { removeAppliedJob } from "@/app/_store/slices/authSlice";

export const fetchJobs = createAsyncThunk(
  "jobs/fetchJobs",
  async (_, { dispatch, getState, rejectWithValue }) => {
    try {
      const url = "https://novel-project-ntj8t.ampt.app/api/jobs";

      const response = await fetchDataWithAuth(url, dispatch, getState);

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Something went wrong");
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      return rejectWithValue("An unexpected error occurred.");
    }
  },
);

export const fetchJobById = createAsyncThunk(
  "jobs/fetchJobById",
  async (id, { dispatch, getState, rejectWithValue }) => {
    try {
      const url = `https://novel-project-ntj8t.ampt.app/api/jobs/${id}`;
      const response = await fetchDataWithAuth(url, dispatch, getState);

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Something went wrong");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue("An unexpected error occurred.");
    }
  },
);

export const applyForJob = createAsyncThunk(
  "jobs/applyForJob",
  async (jobId, { dispatch, getState, rejectWithValue }) => {
    try {
      const state = getState();
      const accessToken = state.auth.accessToken;
      const url = `https://novel-project-ntj8t.ampt.app/api/jobs/${jobId}/apply`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(
          errorData.message || "Failed to apply for the job",
        );
      }

      const data = await response.json();
      return data.message;
    } catch (error) {
      return rejectWithValue("An unexpected error occurred.");
    }
  },
);

export const withdrawFromJob = createAsyncThunk(
  "jobs/withdrawFromJob",
  async (jobId, { dispatch, getState, rejectWithValue }) => {
    try {
      const state = getState();
      const accessToken = state.auth.accessToken;
      const url = `https://novel-project-ntj8t.ampt.app/api/jobs/${jobId}/withdraw`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(
          errorData.message || "Failed to withdraw from the job",
        );
      }

      const data = await response.json();
      dispatch(removeAppliedJob(jobId));
      return data.message;
    } catch (error) {
      return rejectWithValue("An unexpected error occurred.");
    }
  },
);

export const jobSlice = createSlice({
  name: "jobs",
  initialState: {
    jobs: [],
    selectedJob: null,
    loading: false,
    loadingJobId: null,
    applyLoading: false,
    error: null,
  },
  reducers: {
    selectJob: (state, action) => {
      state.selectedJob = action.payload;
    },
    clearSelectedJob: (state) => {
      state.selectedJob = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchJobById.pending, (state, action) => {
        state.loadingJobId = action.meta.arg;
        state.error = null;
      })
      .addCase(fetchJobById.fulfilled, (state, action) => {
        state.loadingJobId = null;
        state.selectedJob = action.payload;
      })
      .addCase(fetchJobById.rejected, (state, action) => {
        state.loadingJobId = null;
        state.error = action.payload;
      })
      .addCase(applyForJob.pending, (state) => {
        state.applyLoading = true;
        state.error = null;
      })
      .addCase(applyForJob.fulfilled, (state) => {
        state.applyLoading = false;
      })
      .addCase(applyForJob.rejected, (state, action) => {
        state.applyLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSelectedJob, selectJob } = jobSlice.actions;

export default jobSlice.reducer;

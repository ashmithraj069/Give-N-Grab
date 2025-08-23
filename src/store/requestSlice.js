import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "requests",
  initialState: {
    requests: [],
  },
  reducers: {
    addRequest: (state, action) => {
      state.requests.push(action.payload);
    },
    updateRequest: (state, action) => {
      const index = state.requests.findIndex(r => r.id === action.payload.id);
      if (index !== -1) state.requests[index] = action.payload;
    },
    removeRequest: (state, action) => {
      state.requests = state.requests.filter(r => r.id !== action.payload);
    },
  },
});

export const { addRequest, updateRequest, removeRequest } = requestSlice.actions;
export default requestSlice.reducer;

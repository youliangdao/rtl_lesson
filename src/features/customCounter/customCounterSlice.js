import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const sleep = (msec) => {
  const start = new Date();
  while (new Date() - start < msec);
};

export const fetchDummy = createAsyncThunk("fetch/dummy", async (num) => {
  await sleep(2000);
  return num;
});

export const fetchJSON = createAsyncThunk("fetch/api", async (num) => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/users/1"
  );
  const { username } = response.data;
  return username;
});

const initialState = {
  value: 0,
  mode: 0,
  username: "",
};

export const customCounterSlice = createSlice({
  name: "customCounter",
  initialState,
  reducers: {
    increment: (state) => {
      switch (state.mode) {
        case 0:
          state.value += 1;
          break;
        case 1:
          state.value += 100;
          break;
        case 2:
          state.value += 10000;
          break;
        default:
          break;
      }
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      switch (state.mode) {
        case 0:
          state.value += action.payload;
          break;
        case 1:
          state.value += 100 * action.payload;
          break;
        case 2:
          state.value += 10000 * action.payload;
          break;
        default:
          break;
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchDummy.fulfilled, (state, action) => {
        state.value = 100 + action.payload;
      })
      .addCase(fetchDummy.rejected, (state, action) => {
        state.value = 100 - action.payload;
      })
      .addCase(fetchJSON.fulfilled, (state, action) => {
        state.username = action.payload;
      });
  },
});

export const { increment, decrement, incrementByAmount } =
  customCounterSlice.actions;

export const selectCount = (state) => state.customCounter.value;
export const selectUser = (state) => state.customCounter.username;

export default customCounterSlice.reducer;

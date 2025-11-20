import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface Test {
  id: number;
  name: string;
  status: string;
  species: string;
}

interface TestState {
  tests: Test[];
}

const initialState: TestState = {
  tests: [],
};

export const TestSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
    getTest: (state, action: PayloadAction<Test[]>) => {
      state.tests = action.payload;
    },
    addTest: (state, action: PayloadAction<Test>) => {
      state.tests = [...state.tests, action.payload];
    },
    deleteTest: (state, action: PayloadAction<number>) => {
      state.tests = state.tests.filter((test) => test.id !== action.payload);
    },
    editTest: (state, action: PayloadAction<Test>) => {
      const index = state.tests.findIndex(
        (test) => test.id === action.payload.id
      );
      if (index !== -1) {
        state.tests[index] = action.payload;
      }
    },
  },
});

export const { getTest, addTest, deleteTest, editTest } = TestSlice.actions;
export default TestSlice.reducer;

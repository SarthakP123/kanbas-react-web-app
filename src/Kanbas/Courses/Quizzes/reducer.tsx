import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Quiz } from "./types";

interface QuizState {
  quizzes: Quiz[];
  loading: boolean;
  error: string | null;
  selectedQuiz: Quiz | null;
}

const initialState: QuizState = {
  quizzes: [],
  loading: false,
  error: null,
  selectedQuiz: null,
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setQuizzes: (state, action: PayloadAction<Quiz[]>) => {
      state.quizzes = action.payload;
      state.loading = false;
    },
    setSelectedQuiz: (state, action: PayloadAction<Quiz | null>) => {
      state.selectedQuiz = action.payload;
    },
    addQuiz: (state, action: PayloadAction<Quiz>) => {
      state.quizzes.push(action.payload);
    },
    updateQuizInList: (state, action: PayloadAction<Quiz>) => {
      const index = state.quizzes.findIndex(q => q._id === action.payload._id);
      if (index !== -1) {
        state.quizzes[index] = action.payload;
      }
    },
    removeQuiz: (state, action: PayloadAction<string>) => {
      state.quizzes = state.quizzes.filter(q => q._id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setQuizzes,
  setSelectedQuiz,
  addQuiz,
  updateQuizInList,
  removeQuiz,
  setLoading,
  setError,
} = quizSlice.actions;

export default quizSlice.reducer;
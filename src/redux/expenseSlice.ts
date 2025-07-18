import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface Expense {
  id: string;
  payer: string;
  amount: number;
  description: string;
}

const initialState: Expense[] = [];

const expenseSlice = createSlice({
  name: 'expense',
  initialState,
  reducers: {
    addExpense: (state, action: PayloadAction<Expense>) => {
      state.push(action.payload);
    },
    removeExpense: (state, action: PayloadAction<string>) => {
      return state.filter(exp => exp.id !== action.payload);
    },
  },
});

export const { addExpense, removeExpense } = expenseSlice.actions;
export const expenseReducer = expenseSlice.reducer;


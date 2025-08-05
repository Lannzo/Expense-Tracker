import { createSlice} from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import type { EventState, Expense } from './types';

const initialState: EventState = {
  name: '',
  date: '', // Add default value for date
  participants: [],
  expenses: [],
};

const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    createEvent: (state, action: PayloadAction<{ name: string; participants: { name: string }[] }>) => { // Create a new event with a name and participants
      state.name = action.payload.name; // Set the event name
      state.participants = action.payload.participants.map(p => ({ ...p, id: uuidv4() })); // Assign unique IDs to participants
      state.expenses = []; // Reset expenses for new event
    },
    addExpense: (state, action: PayloadAction<Omit<Expense, 'id'>>) => {
      state.expenses.push({ ...action.payload, id: uuidv4() });// Add a new expense with a unique ID
    },
    resetEvent: (state) => { // Reset the event state
      state.name = ''; 
      state.date = '';
      state.participants = [];
      state.expenses = [];
    }
  },
});

export const { createEvent, addExpense, resetEvent } = eventSlice.actions;
export default eventSlice.reducer;
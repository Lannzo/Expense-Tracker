import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface EventState {
  name: string;
  date: string;
  participants: string[];
}

const initialState: EventState = {
  name: '',
  date: '',
  participants: [],
};

const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    createEvent: (state, action: PayloadAction<EventState>) => {
        state.name = action.payload.name;
        state.date = action.payload.date;
        state.participants = action.payload.participants;
    },
  },
});

export const { createEvent } = eventSlice.actions;
export default eventSlice.reducer;

import {configureStore} from '@reduxjs/toolkit';
import eventReducer from './eventSlice';
import { expenseReducer } from './expenseSlice';

export const store = configureStore({
  reducer: {
    event: eventReducer,
    expense: expenseReducer,
  },
});

// Export RootState and AppDispatch for typed useSelector and useDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
import React from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { useNavigate } from 'react-router-dom';
import AddExpenseForm from '../components/AddExpenseForm';
import ExpenseList from '../components/ExpenseList';
import ExpenseSummary from '../components/ExpenseSummary';
import { resetEvent } from '../features/event/eventSlice';
import { toast } from 'react-toastify';

const EventPage = () => {
  const event = useAppSelector((state) => state.event);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleEndEvent = () => {
    dispatch(resetEvent());
    toast.info("Event has been successfully ended!");
    navigate('/');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-secondary">{event.name}</h2>
        <button
          onClick={handleEndEvent}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
        >
          End Event & Start New
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <AddExpenseForm />
        </div>
        <div>
          <ExpenseSummary />
        </div>
      </div>

      <div className="mt-8">
        <ExpenseList />
      </div>
    </div>
  );
};

export default EventPage;
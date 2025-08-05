import { useAppSelector } from '../app/hooks';

const ExpenseList = () => {
  const { expenses, participants } = useAppSelector((state) => state.event);

  const getParticipantName = (id: string) => {
    return participants.find(p => p.id === id)?.name || 'Unknown';
  };

  if (expenses.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-lg text-center text-gray-500">
        <h3 className="text-xl font-bold mb-2 text-primary">Expense Log</h3>
        <p>No expenses added yet. Use the form to add your first expense!</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-xl font-bold mb-4 text-primary">Expense Log</h3>
      <div className="space-y-3">
        {expenses.map((expense) => (
          <div key={expense.id} className="p-4 border border-light-gray rounded-lg">
            <div className="flex justify-between items-center">
              <p className="font-semibold text-lg">{expense.description}</p>
              <p className="font-bold text-xl text-secondary">₱{expense.amount.toFixed(2)}</p>
            </div>
            <p className="text-sm text-gray-600">
              Paid by: <span className="font-medium">{getParticipantName(expense.paidBy)}</span>
            </p>
            <p className="text-sm text-gray-600">
              Shared by: {expense.sharedBy.map(getParticipantName).join(', ')}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseList;
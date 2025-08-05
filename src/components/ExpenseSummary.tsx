import { useMemo } from 'react';
import { useAppSelector } from '../app/hooks';

const ExpenseSummary = () => { 
  const { participants, expenses } = useAppSelector((state) => state.event); // Get participants and expenses from the Redux store

  const { balances, totalSpent } = useMemo(() => { // Calculate balances and total spent using useMemo for performance optimization
    const balances: { [key: string]: number } = {}; // Initialize balances object
    let totalSpent = 0; 

    participants.forEach(p => { // Initialize each participant's balance to zero
      balances[p.id] = 0;
    });

    expenses.forEach(expense => { // Iterate through each expense to calculate balances
      totalSpent += expense.amount;
      const amountPerPerson = expense.amount / expense.sharedBy.length;
      
      // The person who paid gets the full amount credited to their balance
      balances[expense.paidBy] += expense.amount; 

      // Each person who shared the expense gets their share debited
      expense.sharedBy.forEach(participantId => {
        balances[participantId] -= amountPerPerson;
      });
    });

    return { balances, totalSpent };
  }, [participants, expenses]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-xl font-bold mb-4 text-primary">Final Summary</h3>
      <div className="mb-4 text-center">
          <p className="text-lg text-gray-600">Total Event Spending:</p>
          <p className="text-3xl font-bold text-secondary">₱{totalSpent.toFixed(2)}</p>
      </div>
      <div className="space-y-2">
        {participants.map(p => {
          const balance = balances[p.id];
          return (
            <div key={p.id} className={`flex justify-between p-3 rounded-lg ${balance > 0 ? 'bg-green-100' : 'bg-red-100'}`}>
              <span className="font-medium">{p.name}</span>
              <span className={`font-bold ${balance > 0 ? 'text-green-700' : 'text-red-700'}`}>
                {balance > 0 ? `Gets back ₱${balance.toFixed(2)}` : `Owes ₱${Math.abs(balance).toFixed(2)}`}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExpenseSummary;
export interface Participant {
  id: string;
  name: string;
}

export interface Expense {
  id: string;
  description: string;
  amount: number;
  paidBy: string; // Participant ID
  sharedBy: string[]; // Array of Participant IDs
}

export interface EventState {
  name: string;
  date: string;
  participants: Participant[];
  expenses: Expense[];
}
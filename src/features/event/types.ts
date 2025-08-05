export interface Participant {
  id: string;
  name: string;
}

export interface Expense { // Define the structure of an expense
  id: string;
  description: string;
  amount: number;
  paidBy: string; // Participant ID
  sharedBy: string[]; // Array of Participant IDs
}

export interface EventState { // Define the structure of the event state
  name: string;
  date: string;
  participants: Participant[];
  expenses: Expense[];
}
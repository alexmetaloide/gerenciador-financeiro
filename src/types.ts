export type Transaction = {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
  wallet_id?: string;
  created_at: string;
  type: 'income' | 'expense';
};

export type Wallet = {
  id: string;
  name: string;
  type: string;
  balance: number;
  description?: string;
  created_at: string;
};

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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

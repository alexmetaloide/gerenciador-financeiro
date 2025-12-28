import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, Transaction, Wallet } from '../services/supabase';

interface FinanceContextType {
    transactions: Transaction[];
    wallets: Wallet[];
    loading: boolean;
    balance: number;
    income: number;
    expense: number;
    fetchTransactions: () => Promise<void>;
    addTransaction: (transaction: Omit<Transaction, 'id' | 'created_at'>) => Promise<void>;
    deleteTransaction: (id: string) => Promise<void>;
    fetchWallets: () => Promise<void>;
    addWallet: (wallet: Omit<Wallet, 'id' | 'created_at'>) => Promise<void>;
    deleteWallet: (id: string) => Promise<void>;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export const FinanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [wallets, setWallets] = useState<Wallet[]>([]);
    const [loading, setLoading] = useState(true);

    const balance = transactions.reduce((acc, curr) => {
        return curr.type === 'income' ? acc + Number(curr.amount) : acc - Number(curr.amount);
    }, 0);

    const income = transactions
        .filter(t => t.type === 'income')
        .reduce((acc, curr) => acc + Number(curr.amount), 0);

    const expense = transactions
        .filter(t => t.type === 'expense')
        .reduce((acc, curr) => acc + Number(curr.amount), 0);

    const fetchTransactions = async () => {
        try {
            const { data, error } = await supabase
                .from('expenses') // Using 'expenses' table for transactions based on previous context
                .select('*')
                .order('date', { ascending: false });

            if (error) throw error;
            setTransactions(data || []);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    };

    const addTransaction = async (transaction: Omit<Transaction, 'id' | 'created_at'>) => {
        try {
            const { data, error } = await supabase
                .from('expenses')
                .insert([transaction])
                .select()
                .single();

            if (error) throw error;
            setTransactions(prev => [data, ...prev]);
        } catch (error) {
            console.error('Error adding transaction:', error);
            throw error;
        }
    };

    const deleteTransaction = async (id: string) => {
        try {
            const { error } = await supabase
                .from('expenses')
                .delete()
                .eq('id', id);

            if (error) throw error;
            setTransactions(prev => prev.filter(t => t.id !== id));
        } catch (error) {
            console.error('Error deleting transaction:', error);
            throw error;
        }
    };

    const fetchWallets = async () => {
        try {
            const { data, error } = await supabase
                .from('wallets')
                .select('*')
                .order('created_at', { ascending: true });

            if (error) throw error;
            setWallets(data || []);
        } catch (error) {
            console.error('Error fetching wallets:', error);
        }
    };

    const addWallet = async (wallet: Omit<Wallet, 'id' | 'created_at'>) => {
        try {
            const { data, error } = await supabase
                .from('wallets')
                .insert([wallet])
                .select()
                .single();

            if (error) throw error;
            setWallets(prev => [...prev, data]);
        } catch (error) {
            console.error('Error adding wallet:', error);
            throw error;
        }
    };

    const deleteWallet = async (id: string) => {
        try {
            const { error } = await supabase
                .from('wallets')
                .delete()
                .eq('id', id);

            if (error) throw error;
            setWallets(prev => prev.filter(w => w.id !== id));
        } catch (error) {
            console.error('Error deleting wallet:', error);
            throw error;
        }
    };

    useEffect(() => {
        const init = async () => {
            setLoading(true);
            await Promise.all([fetchTransactions(), fetchWallets()]);
            setLoading(false);
        };
        init();
    }, []);

    return (
        <FinanceContext.Provider
            value={{
                transactions,
                wallets,
                loading,
                balance,
                income,
                expense,
                fetchTransactions,
                addTransaction,
                deleteTransaction,
                fetchWallets,
                addWallet,
                deleteWallet,
            }}
        >
            {children}
        </FinanceContext.Provider>
    );
};

export const useFinance = () => {
    const context = useContext(FinanceContext);
    if (context === undefined) {
        throw new Error('useFinance must be used within a FinanceProvider');
    }
    return context;
};

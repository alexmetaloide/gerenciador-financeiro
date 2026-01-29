import React, { createContext, useContext, useEffect, useState } from 'react';
import { Transaction, Wallet } from '../types';

interface FinanceContextType {
    transactions: Transaction[];
    wallets: Wallet[];
    loading: boolean;
    balance: number;
    income: number;
    expense: number;
    fetchTransactions: () => void;
    addTransaction: (transaction: Omit<Transaction, 'id' | 'created_at'>) => void;
    deleteTransaction: (id: string) => void;
    fetchWallets: () => void;
    addWallet: (wallet: Omit<Wallet, 'id' | 'created_at'>) => void;
    deleteWallet: (id: string) => void;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

const TRANSACTIONS_KEY = 'finance_transactions';
const WALLETS_KEY = 'finance_wallets';

// Helper function to generate unique IDs
const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

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

    const fetchTransactions = () => {
        try {
            const stored = localStorage.getItem(TRANSACTIONS_KEY);
            if (stored) {
                const parsed = JSON.parse(stored) as Transaction[];
                // Sort by date descending
                parsed.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                setTransactions(parsed);
            }
        } catch (error) {
            console.error('Error loading transactions:', error);
        }
    };

    const addTransaction = (transaction: Omit<Transaction, 'id' | 'created_at'>) => {
        const newTransaction: Transaction = {
            ...transaction,
            id: generateId(),
            created_at: new Date().toISOString(),
        };

        const updated = [newTransaction, ...transactions];
        setTransactions(updated);
        localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(updated));
    };

    const deleteTransaction = (id: string) => {
        const updated = transactions.filter(t => t.id !== id);
        setTransactions(updated);
        localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(updated));
    };

    const fetchWallets = () => {
        try {
            const stored = localStorage.getItem(WALLETS_KEY);
            if (stored) {
                const parsed = JSON.parse(stored) as Wallet[];
                setWallets(parsed);
            }
        } catch (error) {
            console.error('Error loading wallets:', error);
        }
    };

    const addWallet = (wallet: Omit<Wallet, 'id' | 'created_at'>) => {
        const newWallet: Wallet = {
            ...wallet,
            id: generateId(),
            created_at: new Date().toISOString(),
        };

        const updated = [...wallets, newWallet];
        setWallets(updated);
        localStorage.setItem(WALLETS_KEY, JSON.stringify(updated));
    };

    const deleteWallet = (id: string) => {
        const updated = wallets.filter(w => w.id !== id);
        setWallets(updated);
        localStorage.setItem(WALLETS_KEY, JSON.stringify(updated));
    };

    useEffect(() => {
        setLoading(true);
        fetchTransactions();
        fetchWallets();
        setLoading(false);
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

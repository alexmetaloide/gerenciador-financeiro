
import React from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from './BottomNav';
import { useFinance } from '../src/contexts/FinanceContext';

const Transactions: React.FC = () => {
    const navigate = useNavigate();
    const { transactions, deleteTransaction } = useFinance();

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(value);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('pt-BR', {
            day: '2-digit',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Excluir esta transação?')) {
            await deleteTransaction(id);
        }
    };

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white overflow-x-hidden min-h-screen relative pb-24 transition-colors duration-200 max-w-md mx-auto">
            <header className="flex items-center justify-between p-4 sticky top-0 z-30 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50">
                <button onClick={() => navigate(-1)} className="flex items-center justify-center size-10 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors group">
                    <span className="material-symbols-outlined text-slate-700 dark:text-white group-hover:-translate-x-0.5 transition-transform">arrow_back_ios_new</span>
                </button>
                <h1 className="text-lg font-bold tracking-tight">Transações</h1>
                <div className="size-10"></div>
            </header>

            <div className="px-4 pb-2 pt-2">
                <div className="flex items-center justify-between bg-surface-light dark:bg-surface-dark p-1 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800/60">
                    <button onClick={() => console.log('Previous month')} className="p-3 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-slate-500 dark:text-slate-400">
                        <span className="material-symbols-outlined">chevron_left</span>
                    </button>
                    <div onClick={() => console.log('Open month selector')} className="flex flex-col items-center cursor-pointer py-1 px-4 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                        <span className="text-base font-bold text-slate-900 dark:text-white leading-tight">Mês Atual</span>
                    </div>
                    <button onClick={() => console.log('Next month')} className="p-3 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-slate-500 dark:text-slate-400">
                        <span className="material-symbols-outlined">chevron_right</span>
                    </button>
                </div>
            </div>

            <div className="flex flex-col gap-6 px-4 mt-2">
                <div className="flex flex-col gap-2.5">
                    <div className="flex items-center justify-between px-1">
                        <h4 className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">Histórico</h4>
                    </div>
                    <div className="flex flex-col gap-2">
                        {transactions.length === 0 ? (
                            <div className="text-center text-slate-500 py-8">
                                Nenhuma transação encontrada.
                            </div>
                        ) : (
                            transactions.map(transaction => (
                                <div key={transaction.id} className="flex items-center gap-4 p-4 bg-surface-light dark:bg-surface-dark rounded-xl overflow-hidden shadow-sm border border-slate-200/60 dark:border-slate-800/60 relative group">
                                    <div className={`flex items-center justify-center rounded-xl shrink-0 size-12 ${transaction.type === 'income' ? 'bg-emerald-100 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400' : 'bg-slate-100 dark:bg-[#2A3445] text-slate-700 dark:text-slate-300'}`}>
                                        <span className="material-symbols-outlined text-[24px]">
                                            {transaction.type === 'income' ? 'attach_money' : 'receipt_long'}
                                        </span>
                                    </div>
                                    <div className="flex flex-col justify-center flex-1 min-w-0">
                                        <p className="text-slate-900 dark:text-white text-base font-bold leading-tight truncate">
                                            {transaction.description || transaction.category}
                                        </p>
                                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium truncate">{transaction.category}</p>
                                    </div>
                                    <div className="shrink-0 text-right">
                                        <p className={`text-base font-bold ${transaction.type === 'income' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-900 dark:text-white'}`}>
                                            {transaction.type === 'income' ? '+' : '-'} {formatCurrency(Number(transaction.amount))}
                                        </p>
                                        <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">{formatDate(transaction.created_at)}</p>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDelete(transaction.id);
                                            }}
                                            className="text-red-500 text-xs font-bold hover:underline mt-1"
                                        >
                                            Excluir
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            <button onClick={() => navigate('/transaction-new')} className="fixed bottom-24 right-6 size-14 bg-primary text-white rounded-full shadow-lg shadow-primary/40 flex items-center justify-center z-40 hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary/20">
                <span className="material-symbols-outlined text-[28px]">add</span>
            </button>
            <BottomNav />
        </div>
    );
};

export default Transactions;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from './BottomNav';
import { useFinance } from '../src/contexts/FinanceContext';

const ManageAccounts: React.FC = () => {
    const navigate = useNavigate();
    const { wallets, balance, deleteWallet } = useFinance();
    const [isBalanceVisible, setIsBalanceVisible] = useState(true);

    const toggleBalanceVisibility = () => {
        setIsBalanceVisible(!isBalanceVisible);
    };

    const handleDeleteWallet = async (id: string, name: string) => {
        if (window.confirm(`Tem certeza que deseja excluir a conta "${name}"?`)) {
            await deleteWallet(id);
        }
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(value);
    };

    return (
        <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden pb-24 max-w-md mx-auto">
            <header className="sticky top-0 z-10 flex items-center justify-between bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md p-4 pt-6 pb-2">
                <div className="w-12"></div>
                <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] text-center flex-1">Gerenciar Contas</h2>
                <div className="flex w-12 items-center justify-end">
                    <button onClick={() => navigate('/connect-account')} className="flex items-center justify-center rounded-full size-10 text-primary hover:bg-primary/10 transition-colors">
                        <span className="material-symbols-outlined font-bold">add</span>
                    </button>
                </div>
            </header>

            <section className="flex flex-col items-center justify-center pt-8 pb-8 px-4">
                <div className="flex items-center gap-2 mb-2 opacity-70">
                    <p className="text-sm font-medium uppercase tracking-wider">Saldo Total</p>
                    <button onClick={toggleBalanceVisibility} className="text-slate-400 dark:text-slate-500 hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-[18px]">{isBalanceVisible ? 'visibility' : 'visibility_off'}</span>
                    </button>
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-primary tracking-tight">{isBalanceVisible ? formatCurrency(balance) : 'R$ ••••••'}</h1>
                <div className="mt-8 grid grid-cols-2 gap-4 w-full max-w-sm">
                    <button onClick={() => navigate('/transaction-new')} className="flex items-center justify-center gap-2 bg-primary text-white py-3 px-6 rounded-2xl shadow-lg shadow-primary/20 font-bold text-sm active:scale-95 transition-transform">
                        <span className="material-symbols-outlined text-[20px]">add_circle</span>
                        Nova Receita
                    </button>
                    <button onClick={() => navigate('/transaction-new')} className="flex items-center justify-center gap-2 bg-card-light dark:bg-card-dark text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 py-3 px-6 rounded-2xl shadow-sm font-bold text-sm active:scale-95 transition-transform">
                        <span className="material-symbols-outlined text-[20px]">remove_circle</span>
                        Nova Despesa
                    </button>
                </div>
            </section>

            <main className="flex-1 px-4 w-full max-w-md mx-auto">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold">Minhas Contas</h3>
                </div>
                <div className="space-y-3">
                    {wallets.length === 0 ? (
                        <div className="text-center text-slate-500 py-8">
                            Nenhuma conta encontrada.
                        </div>
                    ) : (
                        wallets.map(wallet => (
                            <div key={wallet.id} className="group flex items-center gap-4 bg-card-light dark:bg-card-dark p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800/50 hover:border-primary/50 transition-colors cursor-pointer relative overflow-hidden">
                                <div className="relative shrink-0 flex items-center justify-center bg-slate-200 dark:bg-slate-700/50 rounded-xl size-12 shadow-sm text-slate-600 dark:text-white font-bold text-xl">
                                    <span className="material-symbols-outlined">account_balance_wallet</span>
                                </div>
                                <div className="flex flex-col flex-1 min-w-0">
                                    <p className="text-base font-bold leading-tight truncate">{wallet.name}</p>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium truncate">{wallet.type}</p>
                                </div>
                                <div className="text-right shrink-0">
                                    <p className="text-base font-bold text-slate-900 dark:text-white">{isBalanceVisible ? formatCurrency(Number(wallet.balance)) : 'R$ ••••••'}</p>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDeleteWallet(wallet.id, wallet.name);
                                        }}
                                        className="text-red-500 text-xs font-bold hover:underline mt-1 z-10 relative"
                                    >
                                        Excluir
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                <button onClick={() => navigate('/connect-account')} className="mt-6 w-full py-4 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl text-slate-500 hover:text-primary hover:border-primary hover:bg-primary/5 transition-all flex items-center justify-center gap-2 font-bold">
                    <span className="material-symbols-outlined">add</span>
                    Adicionar nova conta
                </button>
            </main>
            <BottomNav />
        </div>
    );
};

export default ManageAccounts;

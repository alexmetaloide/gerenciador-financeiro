
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BottomNav from './BottomNav';
import { useAuth } from '../src/contexts/AuthContext';
import { useFinance } from '../src/contexts/FinanceContext';

const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const { transactions, wallets, balance, loading, deleteTransaction } = useFinance();
    const { user } = useAuth();
    const [isBalanceVisible, setIsBalanceVisible] = useState(true);

    const toggleBalanceVisibility = () => {
        setIsBalanceVisible(!isBalanceVisible);
    };

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

    // Get user data or fallbacks
    const userName = user?.user_metadata?.full_name || 'Usuário';
    const userAvatar = user?.user_metadata?.avatar_url || user?.user_metadata?.picture;

    if (loading) {
        return <div className="flex items-center justify-center h-screen">Carregando...</div>;
    }

    return (
        <div className="max-w-md mx-auto bg-background-light dark:bg-background-dark pb-24">
            <header className="sticky top-0 z-30 flex items-center justify-between p-4 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        {userAvatar ? (
                            <div className="bg-center bg-no-repeat bg-cover rounded-full size-10 border-2 border-primary/20" style={{ backgroundImage: `url("${userAvatar}")` }}></div>
                        ) : (
                            <div className="flex items-center justify-center size-10 rounded-full bg-primary text-white font-bold border-2 border-primary/20">
                                {userName.charAt(0).toUpperCase()}
                            </div>
                        )}
                        <div className="absolute bottom-0 right-0 size-2.5 bg-green-500 rounded-full border-2 border-background-light dark:border-background-dark"></div>
                    </div>
                    <div>
                        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 leading-none mb-1">Bem vindo,</p>
                        <h2 className="text-lg font-bold leading-none tracking-tight">{userName}</h2>
                    </div>
                </div>
                <button onClick={() => navigate('/notifications')} className="flex items-center justify-center size-10 rounded-full hover:bg-slate-200 dark:hover:bg-surface-dark transition-colors relative">
                    <span className="material-symbols-outlined text-slate-700 dark:text-white" style={{ fontSize: '24px' }}>notifications</span>
                    <span className="absolute top-2.5 right-2.5 size-2 bg-red-500 rounded-full border border-background-light dark:border-background-dark"></span>
                </button>
            </header>

            <main className="flex flex-col gap-6 px-4">
                <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-[#0f46b3] p-6 shadow-lg shadow-primary/20 text-white">
                    <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl"></div>
                    <div className="absolute -left-10 -bottom-10 h-32 w-32 rounded-full bg-white/10 blur-2xl"></div>
                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-medium text-blue-100">Saldo Total</p>
                            <button onClick={toggleBalanceVisibility} className="text-blue-100 hover:text-white transition-colors">
                                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>{isBalanceVisible ? 'visibility' : 'visibility_off'}</span>
                            </button>
                        </div>
                        <h1 className="text-4xl font-extrabold tracking-tight mb-6">{isBalanceVisible ? formatCurrency(balance) : 'R$ ••••••'}</h1>
                        <div className="flex gap-3">
                            <button onClick={() => navigate('/transaction-new')} className="flex-1 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm h-10 rounded-lg text-sm font-bold transition-all border border-white/10">
                                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_upward</span>
                                <span className="text-green-300">Receita</span>
                            </button>
                            <button onClick={() => navigate('/transaction-new')} className="flex-1 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm h-10 rounded-lg text-sm font-bold transition-all border border-white/10">
                                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_downward</span>
                                <span className="text-red-300">Despesa</span>
                            </button>
                        </div>
                    </div>
                </section>

                <section className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold tracking-tight">Minhas Contas</h3>
                        <Link to="/accounts" className="text-primary text-sm font-bold hover:underline">Ver todas</Link>
                    </div>
                    <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 -mx-4 px-4 snap-x">
                        {wallets.length === 0 ? (
                            <div className="text-center text-slate-500 w-full py-4 text-sm">
                                Nenhuma conta cadastrada
                            </div>
                        ) : (
                            wallets.map(wallet => (
                                <div key={wallet.id} className="flex-shrink-0 w-[240px] snap-center p-4 rounded-xl bg-white dark:bg-surface-dark border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col justify-between h-[140px] cursor-pointer">
                                    <div className="flex justify-between items-start">
                                        <div className="size-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-state-600 dark:text-slate-400" style={{ fontSize: '24px' }}>account_balance_wallet</span>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-slate-500 dark:text-slate-400 text-xs font-medium mb-1">{wallet.name}</p>
                                        <p className="text-xl font-bold">{isBalanceVisible ? formatCurrency(Number(wallet.balance)) : 'R$ ••••••'}</p>
                                    </div>
                                </div>
                            ))
                        )}
                        <Link to="/connect-account" className="flex-shrink-0 w-[80px] snap-center p-4 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 flex flex-col items-center justify-center h-[140px] cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                            <span className="material-symbols-outlined text-slate-400" style={{ fontSize: '32px' }}>add</span>
                        </Link>
                    </div>
                </section>

                <section className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold tracking-tight">Orçamento Mensal</h3>
                        <Link to="/budgets" className="text-primary text-sm font-bold hover:underline">Ver detalhes</Link>
                    </div>
                    <div className="flex flex-col gap-4 bg-white dark:bg-surface-dark p-5 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between text-sm font-semibold">
                                <div className="flex items-center gap-2">
                                    <div className="size-2 rounded-full bg-primary"></div>
                                    <span>Alimentação</span>
                                </div>
                                <span className="text-slate-500 dark:text-slate-400">R$ 840 / R$ 1.200</span>
                            </div>
                            <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-primary w-[70%] rounded-full"></div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between text-sm font-semibold">
                                <div className="flex items-center gap-2">
                                    <div className="size-2 rounded-full bg-amber-400"></div>
                                    <span>Lazer</span>
                                </div>
                                <span className="text-slate-500 dark:text-slate-400">R$ 200 / R$ 500</span>
                            </div>
                            <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-amber-400 w-[40%] rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold tracking-tight">Últimas Transações</h3>
                        <Link to="/transactions" className="text-primary text-sm font-bold hover:underline">Ver extrato</Link>
                    </div>
                    <div className="flex flex-col gap-3">
                        {transactions.slice(0, 5).map(transaction => (
                            <div key={transaction.id} onClick={() => console.log('View Transaction', transaction.id)} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-surface-dark transition-colors cursor-pointer group relative">
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center justify-center size-10 rounded-full bg-slate-100 dark:bg-surface-dark group-hover:bg-white dark:group-hover:bg-slate-800 transition-colors">
                                        <span className="material-symbols-outlined text-slate-600 dark:text-slate-400" style={{ fontSize: '20px' }}>
                                            {transaction.type === 'income' ? 'attach_money' : 'receipt_long'}
                                        </span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold">{transaction.description || transaction.category}</span>
                                        <span className="text-xs text-slate-500 dark:text-slate-400">{formatDate(transaction.created_at)}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className={`text-sm font-bold ${transaction.type === 'income' ? 'text-green-500' : 'text-slate-900 dark:text-white'}`}>
                                        {transaction.type === 'income' ? '+' : '-'} {formatCurrency(Number(transaction.amount))}
                                    </span>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (window.confirm('Tem certeza que deseja excluir esta transação?')) {
                                                deleteTransaction(transaction.id);
                                            }
                                        }}
                                        className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                                        title="Excluir"
                                    >
                                        <span className="material-symbols-outlined text-[18px]">delete</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                        {transactions.length === 0 && (
                            <div className="text-center text-slate-500 py-4 text-sm">
                                Nenhuma transação recente
                            </div>
                        )}
                    </div>
                </section>
            </main>
            <BottomNav />
        </div>
    );
};

export default Dashboard;

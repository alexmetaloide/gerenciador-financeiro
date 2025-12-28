
import React, { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useFinance } from '../src/contexts/FinanceContext';

const Authorizing: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { addWallet } = useFinance();
    const processed = useRef(false);

    const bank = location.state?.bank || { name: 'Banco', logo: 'B', color: 'bg-primary' };

    useEffect(() => {
        if (processed.current) return;
        processed.current = true;

        const createWallet = async () => {
            try {
                // Simulate connection delay
                await new Promise(resolve => setTimeout(resolve, 3000));

                await addWallet({
                    name: bank.name,
                    type: 'Conta Bancária', // Could be dynamic based on bank details
                    balance: Math.floor(Math.random() * 5000) + 1000, // Mock initial balance
                    description: bank.details
                });

                navigate('/success');
            } catch (error) {
                console.error('Error connecting bank', error);
                alert('Erro ao conectar banco. Tente novamente.');
                navigate('/connect-account');
            }
        };

        createWallet();
    }, [navigate, addWallet, bank]);

    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden max-w-md mx-auto bg-background-light dark:bg-background-dark shadow-2xl">
            <div className="flex items-center px-4 pt-6 pb-2 justify-between">
                <button onClick={() => navigate(-1)} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full active:bg-slate-200 dark:active:bg-slate-800 transition-colors">
                    <span className="material-symbols-outlined text-slate-900 dark:text-white" style={{ fontSize: '24px' }}>arrow_back_ios_new</span>
                </button>
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Conexão</div>
                <div className="w-10"></div>
            </div>
            <div className="flex w-full flex-row items-center justify-center gap-2 py-4">
                <div className="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-slate-700"></div>
                <div className="h-1.5 w-8 rounded-full bg-primary"></div>
                <div className="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-slate-700"></div>
            </div>
            <div className="flex-1 flex flex-col px-6">
                <div className="flex items-center justify-center gap-4 py-10">
                    <div className="relative group">
                        <div className="w-20 h-20 rounded-2xl bg-white dark:bg-[#1c2533] flex items-center justify-center shadow-lg border border-slate-100 dark:border-slate-800 z-10 relative">
                            <span className="material-symbols-outlined text-primary text-4xl">savings</span>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center text-primary relative px-2">
                        <div className="absolute inset-0 flex items-center justify-center opacity-20">
                            <div className="w-full h-0.5 border-t-2 border-dashed border-primary"></div>
                        </div>
                        <div className="bg-background-light dark:bg-background-dark px-2 z-10">
                            <span className="material-symbols-outlined animate-pulse text-primary" style={{ fontSize: '28px' }}>sync_alt</span>
                        </div>
                    </div>
                    <div className="relative group">
                        <div className="absolute -inset-1 rounded-2xl bg-primary/20 blur-md opacity-50 group-hover:opacity-100 transition duration-500"></div>
                        <div className="w-20 h-20 rounded-2xl bg-red-600 flex items-center justify-center shadow-lg border border-slate-100 dark:border-slate-800 z-10 relative overflow-hidden text-white font-bold text-lg">
                            BANCO X
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-1 border-2 border-background-light dark:border-background-dark z-20 flex items-center justify-center">
                            <span className="material-symbols-outlined text-white text-[10px]">lock</span>
                        </div>
                    </div>
                </div>
                <h2 className="text-slate-900 dark:text-white tracking-tight text-2xl font-bold leading-tight text-center pb-4">
                    Conectando ao Banco X
                </h2>
                <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-relaxed text-center pb-8">
                    Vamos te levar para o aplicativo do seu banco para confirmar sua identidade. Você retornará automaticamente.
                </p>
                <div className="bg-white dark:bg-[#17202e] rounded-xl p-5 border border-slate-100 dark:border-slate-800 shadow-sm mb-6">
                    <div className="space-y-4">
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                <span className="material-symbols-outlined text-primary text-sm">login</span>
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">Faça login</p>
                                <p className="text-xs text-slate-500 dark:text-slate-500 mt-0.5">Acesse sua conta no app do Banco X.</p>
                            </div>
                        </div>
                        <div className="w-full h-px bg-slate-100 dark:bg-slate-800/50 ml-12"></div>
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">Confirme o acesso</p>
                                <p className="text-xs text-slate-500 dark:text-slate-500 mt-0.5">Autorize o compartilhamento de dados.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-grow"></div>
                <div className="flex items-center justify-center gap-2 pb-6 opacity-70">
                    <span className="material-symbols-outlined text-slate-400 dark:text-slate-500 text-sm">verified_user</span>
                    <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">Open Finance Secure Connection</span>
                </div>
            </div>
        </div>
    );
};

export default Authorizing;

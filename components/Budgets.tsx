
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Budgets: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-background-light dark:bg-background-dark font-display antialiased text-gray-900 dark:text-white min-h-screen flex flex-col max-w-md mx-auto">
            <div className="sticky top-0 z-50 bg-background-light dark:bg-background-dark/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
                <div className="flex items-center p-4 justify-between h-16">
                    <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">
                        <span className="material-symbols-outlined text-gray-600 dark:text-white" style={{ fontSize: '24px' }}>arrow_back_ios_new</span>
                    </button>
                    <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] text-center flex-1">Orçamentos</h2>
                    <button onClick={() => console.log('Add new budget')} className="flex items-center justify-center rounded-lg h-10 w-10 bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                        <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>add</span>
                    </button>
                </div>
            </div>

            <main className="flex-1 flex flex-col gap-6 p-4 overflow-y-auto">
                <section>
                    <div className="rounded-xl bg-white dark:bg-card-dark p-5 shadow-sm border border-gray-100 dark:border-transparent">
                        <div className="flex flex-col gap-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-gray-500 dark:text-text-secondary text-sm font-medium mb-1">Visão Geral Mensal</p>
                                    <h3 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">R$ 2.450,00</h3>
                                    <p className="text-gray-500 dark:text-text-secondary text-sm mt-1">de R$ 3.000,00 limite</p>
                                </div>
                                <div className="h-10 w-10 flex items-center justify-center rounded-full bg-primary/10">
                                    <span className="material-symbols-outlined text-primary" style={{ fontSize: '24px' }}>account_balance_wallet</span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="flex justify-between items-end">
                                    <span className="text-sm font-bold text-primary">81%</span>
                                    <span className="text-xs text-gray-400">R$ 550,00 restantes</span>
                                </div>
                                <div className="h-3 w-full rounded-full bg-gray-100 dark:bg-[#324467] overflow-hidden">
                                    <div className="h-full rounded-full bg-primary transition-all duration-1000 ease-out" style={{ width: '81%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="flex flex-col gap-4">
                    <h3 className="text-xl font-bold px-1">Categorias</h3>
                    <div onClick={() => console.log('View Alimentação budget details')} className="flex flex-col gap-3 p-4 rounded-xl bg-white dark:bg-card-dark shadow-sm border border-gray-100 dark:border-transparent hover:bg-gray-50 dark:hover:bg-[#232d3f] transition-colors cursor-pointer group">
                        <div className="flex items-center gap-4 justify-between">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center justify-center rounded-lg bg-orange-100 dark:bg-[#3a2e25] text-orange-600 dark:text-orange-400 shrink-0 h-12 w-12 transition-transform group-hover:scale-105">
                                    <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>restaurant</span>
                                </div>
                                <div className="flex flex-col justify-center">
                                    <p className="text-base font-bold leading-normal">Alimentação</p>
                                    <p className="text-gray-500 dark:text-text-secondary text-sm font-medium">R$ 800 / R$ 1.200</p>
                                </div>
                            </div>
                            <div className="shrink-0 text-right">
                                <span className="material-symbols-outlined text-gray-400" style={{ fontSize: '20px' }}>chevron_right</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 mt-1">
                            <div className="flex-1 h-2 rounded-full bg-gray-100 dark:bg-[#324467] overflow-hidden">
                                <div className="h-full rounded-full bg-orange-500" style={{ width: '66%' }}></div>
                            </div>
                            <p className="text-sm font-bold text-gray-700 dark:text-white w-8 text-right">66%</p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Budgets;

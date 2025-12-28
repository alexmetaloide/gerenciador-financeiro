
import React from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from './BottomNav';

const Analysis: React.FC = () => {
    const navigate = useNavigate();

    const categories = [
        { name: 'Alimentação', icon: 'restaurant', amount: '840,00', percentage: 45, color: 'bg-orange-500' },
        { name: 'Transporte', icon: 'directions_car', amount: '320,50', percentage: 22, color: 'bg-blue-500' },
        { name: 'Lazer', icon: 'sports_esports', amount: '410,00', percentage: 18, color: 'bg-purple-500' },
        { name: 'Moradia', icon: 'home', amount: '230,00', percentage: 15, color: 'bg-green-500' },
    ];

    return (
        <div className="max-w-md mx-auto bg-background-light dark:bg-background-dark pb-24 min-h-screen">
            <header className="sticky top-0 z-30 flex items-center justify-between p-4 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md">
                <button onClick={() => navigate('/')} className="flex items-center justify-center size-10 rounded-full hover:bg-slate-200 dark:hover:bg-surface-dark transition-colors">
                    <span className="material-symbols-outlined text-slate-700 dark:text-white">arrow_back_ios_new</span>
                </button>
                <h1 className="text-lg font-bold">Análise Financeira</h1>
                <button onClick={() => console.log('Show more options')} className="flex items-center justify-center size-10 rounded-full hover:bg-slate-200 dark:hover:bg-surface-dark transition-colors">
                    <span className="material-symbols-outlined text-slate-700 dark:text-white">more_horiz</span>
                </button>
            </header>

            <main className="flex flex-col gap-6 px-4">
                <section>
                    <div className="flex items-center justify-between bg-white dark:bg-surface-dark p-1.5 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
                        <button onClick={() => console.log('Previous month')} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-slate-500 dark:text-slate-400">
                            <span className="material-symbols-outlined">chevron_left</span>
                        </button>
                        <span className="font-bold text-sm">Este Mês</span>
                        <button onClick={() => console.log('Next month')} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-slate-500 dark:text-slate-400">
                            <span className="material-symbols-outlined">chevron_right</span>
                        </button>
                    </div>
                </section>

                <section className="grid grid-cols-2 gap-4">
                    <div className="bg-white dark:bg-surface-dark p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
                        <div className="flex items-center gap-3">
                            <div className="size-10 flex items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-500 dark:text-emerald-400">
                                <span className="material-symbols-outlined">arrow_upward</span>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 dark:text-slate-400">Receitas</p>
                                <p className="font-bold text-lg">R$ 5.000,00</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-surface-dark p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
                        <div className="flex items-center gap-3">
                            <div className="size-10 flex items-center justify-center rounded-full bg-red-100 dark:bg-red-900/50 text-red-500 dark:text-red-400">
                                <span className="material-symbols-outlined">arrow_downward</span>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 dark:text-slate-400">Despesas</p>
                                <p className="font-bold text-lg">R$ 2.450,00</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <div className="bg-white dark:bg-surface-dark p-5 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
                        <h3 className="font-bold text-lg mb-4">Gastos por Categoria</h3>
                        <div className="space-y-4">
                            {categories.map((category) => (
                                <div key={category.name}>
                                    <div className="flex justify-between items-center mb-1.5">
                                        <div className="flex items-center gap-3">
                                            <div className="size-9 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                                                <span className="material-symbols-outlined text-lg">{category.icon}</span>
                                            </div>
                                            <span className="font-semibold text-sm">{category.name}</span>
                                        </div>
                                        <span className="font-bold text-sm">R$ {category.amount}</span>
                                    </div>
                                    <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                        <div className={`h-full ${category.color} rounded-full`} style={{ width: `${category.percentage}%` }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section>
                    <div className="bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800/50 p-4 rounded-xl flex items-center gap-4">
                        <div className="size-10 flex-shrink-0 flex items-center justify-center rounded-full bg-white dark:bg-surface-dark text-emerald-500 dark:text-emerald-400">
                            <span className="material-symbols-outlined">trending_down</span>
                        </div>
                        <div>
                            <h4 className="font-bold text-emerald-900 dark:text-emerald-200">Bom trabalho!</h4>
                            <p className="text-sm text-emerald-700 dark:text-emerald-300">Você gastou <span className="font-bold">R$ 350 a menos</span> que no mês passado.</p>
                        </div>
                    </div>
                </section>
            </main>

            <BottomNav />
        </div>
    );
};

export default Analysis;

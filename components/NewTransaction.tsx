
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFinance } from '../src/contexts/FinanceContext';

const categories = [
    { name: 'Alimentação', icon: 'restaurant' },
    { name: 'Transporte', icon: 'directions_car' },
    { name: 'Lazer', icon: 'sports_esports' },
    { name: 'Moradia', icon: 'home' },
    { name: 'Saúde', icon: 'health_and_safety' },
    { name: 'Educação', icon: 'school' },
    { name: 'Trabalho', icon: 'work' },
    { name: 'Outros', icon: 'category' }
];

const NewTransaction: React.FC = () => {
    const navigate = useNavigate();
    const { addTransaction } = useFinance();
    const [selectedCategory, setSelectedCategory] = useState(categories[0].name);
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState<'expense' | 'income'>('expense');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSave = async () => {
        if (!amount || isNaN(Number(amount.replace(',', '.')))) {
            alert('Por favor, insira um valor válido.');
            return;
        }

        setIsSubmitting(true);
        try {
            await addTransaction({
                amount: Number(amount.replace(',', '.')),
                category: selectedCategory,
                description: description || selectedCategory,
                date: new Date().toISOString(),
                type: type
            });
            navigate('/');
        } catch (error) {
            console.error('Error saving transaction', error);
            alert('Erro ao salvar transação. Tente novamente.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="relative flex h-full min-h-screen w-full flex-col mx-auto max-w-md bg-background-light dark:bg-background-dark overflow-hidden shadow-2xl">
            <header className="flex items-center px-4 py-4 justify-between bg-transparent relative z-10">
                <button onClick={() => navigate(-1)} className="text-gray-900 dark:text-white flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-surface-dark transition-colors">
                    <span className="material-symbols-outlined text-[24px]">close</span>
                </button>
                <h2 className="text-gray-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] text-center">Nova Transação</h2>
                <div className="size-10"></div>
            </header>

            <div className="flex-1 flex flex-col overflow-y-auto overflow-x-hidden pb-4">
                <div className="px-6 py-2">
                    <div className="flex h-12 w-full items-center justify-center rounded-xl bg-gray-200 dark:bg-surface-dark p-1">
                        <label className={`group flex cursor-pointer h-full flex-1 items-center justify-center overflow-hidden rounded-lg px-2 transition-all duration-200 ${type === 'expense' ? 'bg-white dark:bg-[#2c3b55] shadow-sm' : ''}`}>
                            <span className={`truncate font-bold text-sm ${type === 'expense' ? 'text-primary' : 'text-gray-500 dark:text-text-secondary'}`}>Despesa</span>
                            <input
                                className="invisible w-0 absolute"
                                name="transaction_type"
                                type="radio"
                                value="expense"
                                checked={type === 'expense'}
                                onChange={() => setType('expense')}
                            />
                        </label>
                        <label className={`group flex cursor-pointer h-full flex-1 items-center justify-center overflow-hidden rounded-lg px-2 transition-all duration-200 ${type === 'income' ? 'bg-white dark:bg-[#2c3b55] shadow-sm' : ''}`}>
                            <span className={`truncate font-bold text-sm ${type === 'income' ? 'text-green-500' : 'text-gray-500 dark:text-text-secondary'}`}>Receita</span>
                            <input
                                className="invisible w-0 absolute"
                                name="transaction_type"
                                type="radio"
                                value="income"
                                checked={type === 'income'}
                                onChange={() => setType('income')}
                            />
                        </label>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center py-8 px-4">
                    <span className="text-gray-400 dark:text-text-secondary text-sm font-medium mb-2">Valor da transação</span>
                    <div className="relative flex items-baseline">
                        <span className="text-gray-400 dark:text-gray-500 text-2xl font-semibold mr-2">R$</span>
                        <input
                            autoFocus
                            className="bg-transparent text-gray-900 dark:text-white text-6xl font-extrabold text-center w-full focus:outline-none placeholder-gray-700 caret-primary p-0 border-none focus:ring-0 max-w-[280px]"
                            inputMode="decimal"
                            type="number"
                            placeholder="0,00"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </div>
                </div>

                <div className="px-4 space-y-6">
                    <div>
                        <div className="flex justify-between items-center mb-3 px-1">
                            <p className="text-gray-500 dark:text-text-secondary text-sm font-medium">Categoria</p>
                            <button onClick={() => console.log('Show all categories')} className="text-primary text-xs font-semibold hover:underline">Ver todas</button>
                        </div>
                        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 -mx-4 px-4">
                            {categories.map(category => {
                                const isSelected = selectedCategory === category.name;
                                return (
                                    <div key={category.name} onClick={() => setSelectedCategory(category.name)} className="flex flex-col items-center gap-2 cursor-pointer min-w-[72px]">
                                        <div className={`flex size-14 items-center justify-center rounded-full transition-all ${isSelected ? 'bg-primary text-white shadow-lg shadow-primary/30 ring-2 ring-primary ring-offset-2 ring-offset-background-light dark:ring-offset-background-dark' : 'bg-gray-200 dark:bg-surface-dark text-gray-600 dark:text-white'}`}>
                                            <span className="material-symbols-outlined text-[24px]">{category.icon}</span>
                                        </div>
                                        <span className={`text-xs font-bold transition-colors ${isSelected ? 'text-primary' : 'text-gray-600 dark:text-text-secondary'}`}>{category.name}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="relative group">
                            <label className="absolute -top-2 left-3 bg-background-light dark:bg-background-dark px-1 text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-text-secondary">Data</label>
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="material-symbols-outlined text-gray-400 dark:text-gray-500">calendar_today</span>
                            </div>
                            <input className="block w-full pl-10 pr-3 py-3.5 border-none rounded-xl bg-gray-100 dark:bg-surface-dark text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm font-medium transition-all" type="date" defaultValue={new Date().toISOString().split('T')[0]} />

                        </div>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="material-symbols-outlined text-gray-400 dark:text-gray-500">edit_note</span>
                            </div>
                            <input
                                className="block w-full pl-10 pr-3 py-3.5 border-none rounded-xl bg-gray-100 dark:bg-surface-dark text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm font-medium transition-all"
                                placeholder="Descrição (opcional)"
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-4 bg-background-light dark:bg-background-dark border-t border-gray-200 dark:border-surface-dark mt-auto z-20">
                <button
                    onClick={handleSave}
                    disabled={isSubmitting}
                    className="w-full h-12 bg-primary hover:bg-blue-600 text-white rounded-xl font-bold text-base shadow-lg shadow-primary/25 transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? (
                        <span>Salvando...</span>
                    ) : (
                        <>
                            <span className="material-symbols-outlined text-[20px]">check</span>
                            Salvar Transação
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

export default NewTransaction;

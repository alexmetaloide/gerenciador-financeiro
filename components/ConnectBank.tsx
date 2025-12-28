
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const banks = [
    { name: 'Nubank', details: 'Conta Corrente e Cartão', logo: 'Nu', color: 'bg-[#820AD1]' },
    { name: 'Itaú', details: 'Conta Corrente e Poupança', logo: 'it', color: 'bg-[#EC7000]' },
    { name: 'Bradesco', details: 'Conta Corrente', logo: 'B', color: 'bg-[#CC092F]' },
    { name: 'Banco do Brasil', details: 'Conta Corrente e Cartão', logo: 'BB', color: 'bg-[#0033A1]' },
    { name: 'Santander', details: 'Conta Corrente', logo: 'S', color: 'bg-[#EC0000]' },
    { name: 'Caixa', details: 'Poupança e Financiamento', logo: 'CX', color: 'bg-[#0065A4]' },
    { name: 'Inter', details: 'Conta Digital e Investimentos', logo: 'in', color: 'bg-[#FF7A00]' },
];


const ConnectBank: React.FC = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [selectedBank, setSelectedBank] = useState(banks[0]);
    const [searchTerm, setSearchTerm] = useState('');

    const handleBankClick = (bank: typeof banks[0]) => {
        setSelectedBank(bank);
        setShowModal(true);
    };

    const filteredBanks = useMemo(() => {
        return banks.filter(bank =>
            bank.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            bank.details.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm]);

    return (
        <div className="relative flex min-h-screen flex-col w-full max-w-md mx-auto bg-background-light dark:bg-background-dark shadow-2xl">
            <header className="sticky top-0 z-10 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 px-4 h-14 flex items-center justify-between">
                <button onClick={() => navigate(-1)} className="flex items-center justify-center p-2 -ml-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 text-text-primary-light dark:text-text-primary-dark transition-colors">
                    <span className="material-symbols-outlined text-2xl">arrow_back_ios_new</span>
                </button>
                <h1 className="text-lg font-bold text-text-primary-light dark:text-text-primary-dark tracking-tight">Conectar Banco</h1>
                <div className="w-10"></div>
            </header>

            <main className="flex-1 flex flex-col w-full max-w-md mx-auto px-4 pt-6 pb-12">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark mb-2">Escolha sua instituição</h2>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark text-base font-medium leading-relaxed">
                        Selecione o banco que deseja conectar para importar seus dados automaticamente.
                    </p>
                </div>

                <div className="relative mb-8">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="material-symbols-outlined text-text-secondary-light dark:text-text-secondary-dark text-xl">search</span>
                    </div>
                    <input
                        className="block w-full pl-10 pr-3 py-3.5 bg-surface-light dark:bg-surface-dark border-none rounded-xl text-text-primary-light dark:text-text-primary-dark placeholder-text-secondary-light dark:placeholder-text-secondary-dark focus:ring-2 focus:ring-primary shadow-sm text-base transition-all"
                        placeholder="Buscar banco, corretora ou fintech..."
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex flex-col gap-3">
                    <h3 className="text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider px-2 mb-1">Bancos</h3>
                    {filteredBanks.map((bank) => (
                        <button key={bank.name} onClick={() => handleBankClick(bank)} className="group flex items-center justify-between p-4 bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm hover:shadow-md border border-transparent hover:border-primary/20 transition-all duration-200">
                            <div className="flex items-center gap-4">
                                <div className={`relative w-12 h-12 rounded-full overflow-hidden ${bank.color} flex items-center justify-center text-white font-bold text-xl shrink-0`}>{bank.logo}</div>
                                <div className="text-left">
                                    <p className="text-text-primary-light dark:text-text-primary-dark font-semibold text-base">{bank.name}</p>
                                    <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mt-0.5">{bank.details}</p>
                                </div>
                            </div>
                            <span className="material-symbols-outlined text-gray-400 group-hover:text-primary transition-colors">chevron_right</span>
                        </button>
                    ))}
                </div>
            </main>

            <footer className="bg-surface-light dark:bg-surface-dark border-t border-gray-200 dark:border-gray-800 py-4 px-6">
                <div className="flex items-center justify-center gap-2 text-text-secondary-light dark:text-text-secondary-dark opacity-80">
                    <span aria-hidden="true" className="material-symbols-outlined text-lg">lock</span>
                    <p className="text-xs font-medium">Conexão 100% segura via Open Finance</p>
                </div>
            </footer>

            {showModal && (
                <div className="absolute inset-0 z-50 flex items-end justify-center">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>
                    <div className="w-full bg-white dark:bg-[#1e2736] rounded-t-3xl p-6 pb-10 shadow-2xl z-50">
                        <div className="w-12 h-1.5 bg-slate-200 dark:bg-slate-600 rounded-full mx-auto mb-6"></div>
                        <div className="flex flex-col items-center gap-4 mb-6">
                            <div className={`w-16 h-16 rounded-full ${selectedBank.color} flex items-center justify-center shadow-lg ring-4 ring-white dark:ring-[#1e2736]`}>
                                <p className="text-white font-bold text-2xl">{selectedBank.logo}</p>
                            </div>
                            <div className="text-center">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Conectar com {selectedBank.name}</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Você será redirecionado para autorizar o acesso.</p>
                            </div>
                        </div>
                        <div className="bg-slate-50 dark:bg-black/20 rounded-xl p-4 mb-6">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">O que vamos acessar</h4>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3">
                                    <div className="mt-0.5 p-1 rounded-full bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                                        <span className="material-symbols-outlined text-[16px] block">check</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-slate-800 dark:text-slate-200">Dados da conta e saldo</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">Para organizar suas finanças.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="mt-0.5 p-1 rounded-full bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                                        <span className="material-symbols-outlined text-[16px] block">check</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-slate-800 dark:text-slate-200">Cartão de Crédito</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">Para controlar seus gastos.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="flex flex-col gap-3">
                            <button onClick={() => navigate('/authorizing', { state: { bank: selectedBank } })} className="w-full h-12 bg-primary hover:bg-blue-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-colors">
                                <span>Continuar para o App</span>
                                <span className="material-symbols-outlined text-sm">open_in_new</span>
                            </button>
                            <button onClick={() => setShowModal(false)} className="w-full h-12 bg-transparent text-slate-500 dark:text-slate-400 font-medium rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ConnectBank;

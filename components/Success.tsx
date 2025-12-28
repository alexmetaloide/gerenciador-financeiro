
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Success: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="relative flex h-full min-h-screen w-full flex-col items-center justify-between overflow-x-hidden p-6 max-w-md mx-auto">
            <div className="flex-1"></div>
            <div className="flex w-full flex-col items-center justify-center gap-6">
                <div className="relative flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl scale-150"></div>
                    <div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full bg-primary shadow-lg" style={{ boxShadow: '0 0 60px -10px rgba(19, 91, 236, 0.4)' }}>
                        <span className="material-symbols-outlined text-5xl text-white">check</span>
                    </div>
                </div>
                <div className="relative mt-8 flex w-full items-center justify-center">
                    <div className="flex -space-x-4">
                        <div className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border-4 border-background-light bg-white dark:border-background-dark dark:bg-[#1C2535]">
                           <div className="h-full w-full bg-[#820AD1] flex items-center justify-center text-white font-bold text-xl">Nu</div>
                        </div>
                        <div className="z-20 flex h-14 w-14 items-center justify-center rounded-full border-4 border-background-light bg-primary text-white dark:border-background-dark">
                            <span className="material-symbols-outlined text-xl">sync_alt</span>
                        </div>
                        <div className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border-4 border-background-light bg-white dark:border-background-dark dark:bg-[#1C2535]">
                             <div className="h-full w-full bg-[#EC7000] flex items-center justify-center text-white font-bold text-xl">it</div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2 text-center mt-2">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Conexão Realizada!</h1>
                    <p className="max-w-[280px] text-base font-normal text-gray-500 dark:text-gray-400 mx-auto leading-relaxed">
                        Suas contas foram conectadas e seus dados já estão sendo sincronizados automaticamente.
                    </p>
                </div>
                <div className="mt-4 flex w-full flex-col gap-2 rounded-xl bg-white p-4 shadow-sm dark:bg-[#1C2535]/50 border border-gray-100 dark:border-gray-800">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Instituições</span>
                        <span className="text-sm font-bold text-gray-900 dark:text-white">2 Conectadas</span>
                    </div>
                    <div className="h-px w-full bg-gray-100 dark:bg-gray-800"></div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</span>
                        <div className="flex items-center gap-1.5 text-emerald-500">
                            <span className="material-symbols-outlined text-sm">wifi_tethering</span>
                            <span className="text-sm font-bold">Ativo</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex-1"></div>
            <div className="flex w-full flex-col gap-3 pb-4 pt-8">
                <button onClick={() => navigate('/')} className="flex h-12 w-full cursor-pointer items-center justify-center rounded-xl bg-primary px-6 text-base font-bold text-white shadow-lg shadow-primary/25 transition-transform active:scale-[0.98]">
                    Ir para o Dashboard
                </button>
                <button onClick={() => navigate('/accounts')} className="flex h-12 w-full cursor-pointer items-center justify-center rounded-xl bg-gray-100 dark:bg-[#1C2535] px-6 text-base font-bold text-gray-900 dark:text-white transition-transform active:scale-[0.98] hover:bg-gray-200 dark:hover:bg-[#253045]">
                    Gerenciar Contas
                </button>
            </div>
        </div>
    );
};

export default Success;

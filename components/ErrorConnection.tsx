
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorConnection: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden max-w-md mx-auto">
            <div className="flex items-center px-4 py-3 justify-between sticky top-0 z-10 bg-background-light dark:bg-background-dark">
                <button onClick={() => navigate(-1)} aria-label="Voltar" className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer text-slate-900 dark:text-white">
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-10">Conexão Open Finance</h2>
            </div>
            <div className="flex flex-1 flex-col items-center justify-center px-6 pb-12 w-full max-w-md mx-auto">
                <div className="relative mb-8 group">
                    <div className="absolute inset-0 rounded-full bg-red-500/20 blur-xl scale-110"></div>
                    <div className="relative flex size-32 items-center justify-center rounded-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 shadow-xl border border-slate-200 dark:border-slate-700">
                        <span className="material-symbols-outlined text-red-500 dark:text-red-400 text-[56px] drop-shadow-sm" data-icon="link_off">link_off</span>
                    </div>
                    <div className="absolute bottom-0 right-0 flex items-center justify-center size-10 rounded-full bg-background-light dark:bg-background-dark border-4 border-background-light dark:border-background-dark">
                        <span className="material-symbols-outlined text-orange-500 text-xl" style={{fontVariationSettings: "'FILL' 1"}}>warning</span>
                    </div>
                </div>
                <h1 className="text-slate-900 dark:text-white tracking-tight text-[28px] font-extrabold leading-tight text-center mb-4">
                    Falha na conexão
                </h1>
                <p className="text-slate-600 dark:text-slate-400 text-base font-medium leading-relaxed text-center max-w-[320px]">
                    Não conseguimos sincronizar os dados com o <strong>Nubank</strong>. Suas permissões podem ter expirado ou o serviço está temporariamente indisponível.
                </p>
                <div className="mt-8 flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-200/50 dark:bg-slate-800/50 border border-slate-300/30 dark:border-slate-700/30">
                    <span className="material-symbols-outlined text-slate-500 dark:text-slate-400 text-sm">wifi_off</span>
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Verifique sua conexão com a internet</span>
                </div>
            </div>
            <div className="w-full px-4 py-6 bg-background-light dark:bg-background-dark sticky bottom-0 z-10">
                <div className="flex flex-col gap-3 max-w-[480px] mx-auto">
                    <button onClick={() => navigate('/connect-account')} className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 px-5 bg-primary hover:bg-primary/90 active:scale-[0.98] transition-all text-white text-base font-bold leading-normal tracking-[0.015em] shadow-lg shadow-primary/25">
                        <span className="truncate">Tentar Novamente</span>
                    </button>
                    <button onClick={() => console.log('Contacting support...')} className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 px-5 bg-transparent border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-[0.98] transition-all text-slate-900 dark:text-white text-base font-bold leading-normal tracking-[0.015em]">
                        <span className="truncate">Falar com Suporte</span>
                    </button>
                </div>
                <p className="text-slate-400 dark:text-slate-600 text-xs font-medium text-center mt-6 font-mono tracking-widest uppercase opacity-60">
                    Erro: OF-503
                </p>
            </div>
        </div>
    );
};

export default ErrorConnection;

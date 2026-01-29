import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../src/contexts/AuthContext';

const Login: React.FC = () => {
    const { signIn, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    const handleSignIn = () => {
        signIn();
        navigate('/');
    };

    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background-light dark:bg-background-dark p-6 transition-colors duration-200">
            <div className="w-full max-w-sm flex flex-col items-center gap-8">
                {/* Logo / Branding */}
                <div className="flex flex-col items-center gap-4">
                    <div className="flex size-20 items-center justify-center rounded-3xl bg-primary shadow-xl shadow-primary/30">
                        <span className="material-symbols-outlined text-4xl text-white">account_balance_wallet</span>
                    </div>
                    <div className="text-center">
                        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Finanças</h1>
                        <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">Gerencie seu dinheiro com inteligência</p>
                    </div>
                </div>

                {/* Login Card */}
                <div className="w-full bg-white dark:bg-card-dark rounded-3xl shadow-2xl p-8 border border-slate-100 dark:border-slate-800/50">
                    <div className="space-y-6">
                        <div className="text-center">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Bem-vindo!</h2>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Seus dados são salvos localmente no navegador.</p>
                        </div>

                        <button
                            onClick={handleSignIn}
                            className="w-full h-14 bg-primary hover:bg-primary/90 rounded-xl flex items-center justify-center gap-3 transition-all shadow-lg shadow-primary/30 group"
                        >
                            <span className="material-symbols-outlined text-white text-2xl">login</span>
                            <span className="font-bold text-white text-base">Começar</span>
                        </button>

                        <div className="relative flex items-center gap-4 py-2 opacity-50">
                            <div className="flex-grow h-px bg-slate-200 dark:bg-slate-700"></div>
                            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">100% Offline</span>
                            <div className="flex-grow h-px bg-slate-200 dark:bg-slate-700"></div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <p className="text-xs text-slate-400 dark:text-slate-500 text-center px-8 leading-relaxed">
                    Seus dados são armazenados apenas neste dispositivo. Limpar o cache do navegador apagará seus dados.
                </p>
            </div>
        </div>
    );
};

export default Login;

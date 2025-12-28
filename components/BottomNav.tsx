
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const BottomNav: React.FC = () => {
    const location = useLocation();
    const isActive = (path: string) => location.pathname === path;

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-[#101622]/90 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 pb-safe pt-2 px-6 flex justify-around items-center z-50 h-20 max-w-md mx-auto">
            <Link to="/" className={`flex flex-col items-center gap-1 w-16 transition-colors ${isActive('/') ? 'text-primary' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'}`}>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: isActive('/') ? "'FILL' 1" : "'FILL' 0", fontSize: '24px' }}>grid_view</span>
                <span className="text-[10px] font-bold">Início</span>
            </Link>
            <Link to="/analysis" className={`flex flex-col items-center gap-1 w-16 transition-colors ${isActive('/analysis') ? 'text-primary' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'}`}>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: isActive('/analysis') ? "'FILL' 1" : "'FILL' 0", fontSize: '24px' }}>pie_chart</span>
                <span className="text-[10px] font-medium">Análise</span>
            </Link>
            <div className="relative -top-6">
                <Link to="/transaction-new" className="flex items-center justify-center size-14 rounded-full bg-primary text-white shadow-lg shadow-primary/40 hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>qr_code_scanner</span>
                </Link>
            </div>
            <Link to="/accounts" className={`flex flex-col items-center gap-1 w-16 transition-colors ${isActive('/accounts') ? 'text-primary' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'}`}>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: isActive('/accounts') ? "'FILL' 1" : "'FILL' 0", fontSize: '24px' }}>account_balance_wallet</span>
                <span className="text-[10px] font-medium">Carteira</span>
            </Link>
            <Link to="/profile" className={`flex flex-col items-center gap-1 w-16 transition-colors ${isActive('/profile') ? 'text-primary' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'}`}>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: isActive('/profile') ? "'FILL' 1" : "'FILL' 0", fontSize: '24px' }}>person</span>
                <span className="text-[10px] font-medium">Perfil</span>
            </Link>
        </nav>
    );
};

export default BottomNav;

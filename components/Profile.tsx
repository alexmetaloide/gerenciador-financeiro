
import React from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from './BottomNav';
import { useAuth } from '../src/contexts/AuthContext';

const Profile: React.FC = () => {
    const navigate = useNavigate();
    const { user, signOut } = useAuth();

    const handleSignOut = async () => {
        await signOut();
    };

    const menuItems = [
        { icon: 'edit', text: 'Editar Perfil', action: () => console.log('Edit Profile') },
        { icon: 'notifications', text: 'Notificações', action: () => navigate('/notifications') },
        { icon: 'security', text: 'Segurança', action: () => console.log('Security') },
        { icon: 'help_outline', text: 'Ajuda e Suporte', action: () => console.log('Help & Support') },
    ];

    // Get user data or fallbacks
    const userName = user?.user_metadata?.full_name || 'Usuário';
    const userEmail = user?.email || 'email@exemplo.com';
    // Use Google placeholder picture if available, or a generic initial avatar
    const userAvatar = user?.user_metadata?.avatar_url || user?.user_metadata?.picture;

    return (
        <div className="max-w-md mx-auto bg-background-light dark:bg-background-dark pb-24 min-h-screen">
            <header className="sticky top-0 z-30 flex items-center justify-center p-4 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md">
                <h1 className="text-lg font-bold">Meu Perfil</h1>
            </header>

            <main className="flex flex-col gap-8 px-4 py-6">
                <section className="flex flex-col items-center gap-3">
                    <div className="relative">
                        {userAvatar ? (
                            <div className="bg-center bg-no-repeat bg-cover rounded-full size-24 border-4 border-white dark:border-surface-dark shadow-md" style={{ backgroundImage: `url("${userAvatar}")` }}></div>
                        ) : (
                            <div className="flex items-center justify-center size-24 rounded-full bg-primary text-white text-4xl font-bold border-4 border-white dark:border-surface-dark shadow-md">
                                {userName.charAt(0).toUpperCase()}
                            </div>
                        )}
                        <button onClick={() => console.log('Edit profile picture')} className="absolute bottom-0 right-0 flex items-center justify-center size-8 bg-primary text-white rounded-full border-2 border-white dark:border-surface-dark hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-base">edit</span>
                        </button>
                    </div>
                    <div className="text-center">
                        <h2 className="text-xl font-bold">{userName}</h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{userEmail}</p>
                    </div>
                </section>

                <section className="bg-white dark:bg-surface-dark p-2 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
                    <ul className="divide-y divide-slate-100 dark:divide-slate-800">
                        {menuItems.map((item, index) => (
                            <li key={index} onClick={item.action} className="flex items-center justify-between p-3 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-lg transition-colors">
                                <div className="flex items-center gap-4">
                                    <span className="material-symbols-outlined text-slate-500 dark:text-slate-400">{item.icon}</span>
                                    <span className="font-semibold">{item.text}</span>
                                </div>
                                <span className="material-symbols-outlined text-slate-400">chevron_right</span>
                            </li>
                        ))}
                    </ul>
                </section>

                <section>
                    <button onClick={handleSignOut} className="w-full flex items-center justify-center gap-2 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 py-3 px-4 rounded-xl font-bold hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors">
                        <span className="material-symbols-outlined">logout</span>
                        <span>Sair</span>
                    </button>
                </section>
            </main>

            <BottomNav />
        </div>
    );
};

export default Profile;

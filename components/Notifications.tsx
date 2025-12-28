
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const initialNotifications = [
    {
        id: 1,
        icon: 'warning',
        color: 'text-amber-500 bg-amber-100 dark:bg-amber-900/50',
        title: 'Alerta de Orçamento',
        description: 'Você atingiu 90% do seu orçamento de Alimentação.',
        time: 'Agora mesmo',
        unread: true,
    },
    {
        id: 2,
        icon: 'credit_card',
        color: 'text-blue-500 bg-blue-100 dark:bg-blue-900/50',
        title: 'Nova transação suspeita',
        description: 'Uma compra de R$ 1.500,00 foi feita em uma loja desconhecida.',
        time: '5 min atrás',
        unread: true,
    },
    {
        id: 3,
        icon: 'savings',
        color: 'text-green-500 bg-green-100 dark:bg-green-900/50',
        title: 'Meta de Poupança Atingida',
        description: 'Parabéns! Você alcançou sua meta de "Viagem de Férias".',
        time: '2 horas atrás',
        unread: false,
    },
    {
        id: 4,
        icon: 'task_alt',
        color: 'text-primary bg-primary/10',
        title: 'Sincronização Concluída',
        description: 'Suas contas do Nubank foram sincronizadas com sucesso.',
        time: 'Ontem',
        unread: false,
    },
    {
        id: 5,
        icon: 'security',
        color: 'text-red-500 bg-red-100 dark:bg-red-900/50',
        title: 'Alerta de Segurança',
        description: 'Um novo dispositivo acessou sua conta. Verifique sua atividade.',
        time: '2 dias atrás',
        unread: false,
    },
];

const Notifications: React.FC = () => {
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState(initialNotifications);

    const handleClear = () => {
        setNotifications([]);
    };

    const handleNotificationClick = (id: number) => {
        setNotifications(prev => 
            prev.map(n => n.id === id ? { ...n, unread: false } : n)
        );
        console.log(`Notification ${id} marked as read.`);
    };

    return (
        <div className="max-w-md mx-auto bg-background-light dark:bg-background-dark min-h-screen">
            <header className="sticky top-0 z-30 flex items-center justify-between p-4 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
                <button onClick={() => navigate(-1)} className="flex items-center justify-center size-10 rounded-full hover:bg-slate-200 dark:hover:bg-surface-dark transition-colors">
                    <span className="material-symbols-outlined text-slate-700 dark:text-white">arrow_back_ios_new</span>
                </button>
                <h1 className="text-lg font-bold">Notificações</h1>
                <button onClick={handleClear} className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled={notifications.length === 0}>
                    Limpar
                </button>
            </header>

            <main className="flex flex-col">
                {notifications.length > 0 ? (
                    notifications.map((notification) => (
                        <div key={notification.id} onClick={() => handleNotificationClick(notification.id)} className={`flex items-start gap-4 p-4 border-b border-slate-100 dark:border-slate-800 cursor-pointer hover:bg-slate-50 dark:hover:bg-surface-dark transition-colors ${notification.unread ? 'bg-primary/5 dark:bg-primary/10' : ''}`}>
                            <div className={`flex-shrink-0 size-10 flex items-center justify-center rounded-full ${notification.color}`}>
                                <span className="material-symbols-outlined">{notification.icon}</span>
                            </div>
                            <div className="flex-1">
                                <p className="font-bold text-sm">{notification.title}</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{notification.description}</p>
                                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1.5">{notification.time}</p>
                            </div>
                            {notification.unread && (
                                <div className="flex-shrink-0 size-2.5 bg-primary rounded-full mt-1.5"></div>
                            )}
                        </div>
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center text-center p-16">
                        <span className="material-symbols-outlined text-6xl text-slate-300 dark:text-slate-700">notifications_off</span>
                        <h3 className="text-lg font-bold mt-4">Tudo limpo!</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Você não tem novas notificações.</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Notifications;

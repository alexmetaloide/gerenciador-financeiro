
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import ErrorConnection from './components/ErrorConnection';
import ConnectBank from './components/ConnectBank';
import Budgets from './components/Budgets';
import Authorizing from './components/Authorizing';
import NewTransaction from './components/NewTransaction';
import Success from './components/Success';
import ManageAccounts from './components/ManageAccounts';
import Transactions from './components/Transactions';
import Analysis from './components/Analysis';
import Profile from './components/Profile';
import Notifications from './components/Notifications';

import { FinanceProvider } from './src/contexts/FinanceContext';
import { AuthProvider, useAuth } from './src/contexts/AuthContext';
import Login from './components/Login';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background-light dark:bg-background-dark">
                <div className="size-10 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
            </div>
        );
    }

    if (!user) {
        return <Login />;
    }

    return <>{children}</>;
};

const App: React.FC = () => {
    return (
        <AuthProvider>
            <FinanceProvider>
                <HashRouter>
                    <Routes>
                        <Route path="/login" element={<Login />} />

                        {/* Protected Routes */}
                        <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                        <Route path="/error-connection" element={<PrivateRoute><ErrorConnection /></PrivateRoute>} />
                        <Route path="/connect-account" element={<PrivateRoute><ConnectBank /></PrivateRoute>} />
                        <Route path="/budgets" element={<PrivateRoute><Budgets /></PrivateRoute>} />
                        <Route path="/authorizing" element={<PrivateRoute><Authorizing /></PrivateRoute>} />
                        <Route path="/transaction-new" element={<PrivateRoute><NewTransaction /></PrivateRoute>} />
                        <Route path="/success" element={<PrivateRoute><Success /></PrivateRoute>} />
                        <Route path="/accounts" element={<PrivateRoute><ManageAccounts /></PrivateRoute>} />
                        <Route path="/transactions" element={<PrivateRoute><Transactions /></PrivateRoute>} />
                        <Route path="/notifications" element={<PrivateRoute><Notifications /></PrivateRoute>} />

                        {/* Placeholder routes for nav items */}
                        <Route path="/analysis" element={<PrivateRoute><Analysis /></PrivateRoute>} />
                        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
                    </Routes>
                </HashRouter>
            </FinanceProvider>
        </AuthProvider>
    );
};

export default App;

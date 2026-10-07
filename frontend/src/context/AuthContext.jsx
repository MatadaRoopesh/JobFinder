import React from "react";
import { createContext, useContext, useState } from 'react';
import api from '../services/api';
const C = createContext();
export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => { const x = localStorage.getItem('jobfinder_user'); return x ? JSON.parse(x) : null });
    const login = async d => { const { data } = await api.post('/auth/login', d); localStorage.setItem('jobfinder_token', data.token); localStorage.setItem('jobfinder_user', JSON.stringify(data)); setUser(data) };
    const register = async d => { const { data } = await api.post('/auth/register', d); localStorage.setItem('jobfinder_token', data.token); localStorage.setItem('jobfinder_user', JSON.stringify(data)); setUser(data) };
    const logout = () => { localStorage.removeItem('jobfinder_token'); localStorage.removeItem('jobfinder_user'); setUser(null) }; return <C.Provider value={{ user, login, register, logout }}>{children}</C.Provider>
}
export const useAuth = () => useContext(C);

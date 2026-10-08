import React, { createContext, useContext, useState } from "react";
import api from "../services/api";

const C = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const x = localStorage.getItem("jobfinder_user");
        return x ? JSON.parse(x) : null;
    });

    // Step 1: email + password
    const login = async (data) => {
        const response = await api.post("/auth/login", data);

        return response.data;
    };

    // Step 2: verify OTP
    const verifyLoginOtp = async (data) => {
        const response = await api.post(
            "/auth/verify-login-otp",
            data
        );

        const userData = response.data;

        localStorage.setItem(
            "jobfinder_token",
            userData.token
        );

        localStorage.setItem(
            "jobfinder_user",
            JSON.stringify(userData)
        );

        setUser(userData);

        return userData;
    };

    const register = async (data) => {
        const response = await api.post(
            "/auth/register",
            data
        );

        const userData = response.data;

        localStorage.setItem(
            "jobfinder_token",
            userData.token
        );

        localStorage.setItem(
            "jobfinder_user",
            JSON.stringify(userData)
        );

        setUser(userData);

        return userData;
    };

    const logout = () => {
        localStorage.removeItem("jobfinder_token");
        localStorage.removeItem("jobfinder_user");
        setUser(null);
    };

    return (
        <C.Provider
            value={{
                user,
                login,
                verifyLoginOtp,
                register,
                logout,
            }}
        >
            {children}
        </C.Provider>
    );
}

export const useAuth = () => useContext(C);
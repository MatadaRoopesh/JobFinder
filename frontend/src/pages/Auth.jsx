import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Auth({ mode }) {
    const isLogin = mode === "login";

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [otp, setOtp] = useState("");
    const [otpStep, setOtpStep] = useState(false);

    const [err, setErr] = useState("");
    const [loading, setLoading] = useState(false);

    const {
        login,
        verifyLoginOtp,
        register,
    } = useAuth();

    const nav = useNavigate();

    const submitLogin = async (e) => {
        e.preventDefault();

        setErr("");
        setLoading(true);

        try {
            await login({
                email: form.email,
                password: form.password,
            });

            // Login credentials are correct.
            // Backend has sent the OTP.
            setOtpStep(true);

        } catch (error) {
            console.error("Login error:", error);

            setErr(
                error.response?.data?.message ||
                "Invalid email or password."
            );
        } finally {
            setLoading(false);
        }
    };

    const submitOtp = async (e) => {
        e.preventDefault();

        setErr("");
        setLoading(true);

        try {
            await verifyLoginOtp({
                email: form.email,
                otp: otp,
            });

            nav("/dashboard");

        } catch (error) {
            console.error("OTP verification error:", error);

            setErr(
                error.response?.data?.message ||
                "Invalid or expired OTP."
            );
        } finally {
            setLoading(false);
        }
    };

    const submitRegister = async (e) => {
        e.preventDefault();

        setErr("");
        setLoading(true);

        try {
            await register(form);

            nav("/dashboard");

        } catch (error) {
            console.error("Registration error:", error);

            setErr(
                error.response?.data?.message ||
                "Registration failed. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    // OTP screen
    if (isLogin && otpStep) {
        return (
            <main className="auth-page">
                <div className="auth-card">

                    <h1>Verify your email</h1>

                    <p>
                        We sent a 6-digit OTP to:
                    </p>

                    <strong>{form.email}</strong>

                    {err && (
                        <div className="error">
                            {err}
                        </div>
                    )}

                    <form
                        className="auth-form"
                        onSubmit={submitOtp}
                    >
                        <div>
                            <label htmlFor="otp">
                                Verification Code
                            </label>

                            <input
                                id="otp"
                                type="text"
                                inputMode="numeric"
                                maxLength={6}
                                placeholder="Enter 6-digit OTP"
                                required
                                value={otp}
                                onChange={(e) =>
                                    setOtp(
                                        e.target.value
                                            .replace(/\D/g, "")
                                            .slice(0, 6)
                                    )
                                }
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading || otp.length !== 6}
                        >
                            {loading
                                ? "Verifying..."
                                : "Verify OTP"}
                        </button>
                    </form>

                    <div className="auth-footer">
                        <button
                            type="button"
                            className="link-button"
                            onClick={() => {
                                setOtpStep(false);
                                setOtp("");
                                setErr("");
                            }}
                        >
                            ← Back to Login
                        </button>
                    </div>

                </div>
            </main>
        );
    }

    // Normal Login/Register screen
    return (
        <main className="auth-page">

            <div className="auth-card">

                <h1>
                    {isLogin
                        ? "Welcome back"
                        : "Create your account"}
                </h1>

                <p>
                    {isLogin
                        ? "Search jobs and track your applications."
                        : "Build your personal job search workspace."}
                </p>

                {err && (
                    <div className="error">
                        {err}
                    </div>
                )}

                <form
                    className="auth-form"
                    onSubmit={
                        isLogin
                            ? submitLogin
                            : submitRegister
                    }
                >

                    {!isLogin && (
                        <div>
                            <label htmlFor="name">
                                Full name
                            </label>

                            <input
                                id="name"
                                type="text"
                                placeholder="Enter your full name"
                                required
                                value={form.name}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        name: e.target.value,
                                    })
                                }
                            />
                        </div>
                    )}

                    <div>
                        <label htmlFor="email">
                            Email
                        </label>

                        <input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            required
                            value={form.email}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    email: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div>
                        <label htmlFor="password">
                            Password
                        </label>

                        <input
                            id="password"
                            type="password"
                            placeholder="Password (6+ characters)"
                            required
                            minLength={6}
                            value={form.password}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    password: e.target.value,
                                })
                            }
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading
                            ? "Please wait..."
                            : isLogin
                                ? "Login"
                                : "Create account"}
                    </button>

                </form>

                <div className="auth-footer">

                    {isLogin ? (
                        <>
                            New here?{" "}
                            <Link to="/register">
                                Create account
                            </Link>
                        </>
                    ) : (
                        <>
                            Already have an account?{" "}
                            <Link to="/login">
                                Login
                            </Link>
                        </>
                    )}

                </div>

            </div>

        </main>
    );
}
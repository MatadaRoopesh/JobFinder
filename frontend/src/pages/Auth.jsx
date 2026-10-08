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

    const [err, setErr] = useState("");
    const [loading, setLoading] = useState(false);

    const { login, register } = useAuth();
    const nav = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        setErr("");
        setLoading(true);

        try {
            if (isLogin) {
                await login({
                    email: form.email,
                    password: form.password,
                });
            } else {
                await register(form);
            }

            nav("/dashboard");
        } catch (x) {
            setErr(
                x.response?.data?.message ||
                "Request failed. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="auth-page">
            <div className="auth-card">

                <h1>
                    {isLogin ? "Welcome back" : "Create your account"}
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
                    onSubmit={submit}
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
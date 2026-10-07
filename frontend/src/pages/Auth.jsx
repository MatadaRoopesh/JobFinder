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

  const { login, register } = useAuth();
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErr("");

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
      setErr(x.response?.data?.message || "Request failed");
    }
  };

  return (
    <div className="auth">
      <div className="authbox">
        <h1>{isLogin ? "Welcome back" : "Create your account"}</h1>

        <p className="muted">
          {isLogin
            ? "Search jobs and track your applications."
            : "Build your personal job search workspace."}
        </p>

        {err && <div className="error">{err}</div>}

        <form onSubmit={submit}>
          {!isLogin && (
            <input
              placeholder="Full name"
              required
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />
          )}

          <input
            type="email"
            placeholder="Email"
            required
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password (6+ characters)"
            required
            minLength="6"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <button className="primary full">
            {isLogin ? "Login" : "Create account"}
          </button>
        </form>

        <p className="switch">
          {isLogin ? (
            <>
              New here? <Link to="/register">Create account</Link>
            </>
          ) : (
            <>
              Already have an account? <Link to="/login">Login</Link>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
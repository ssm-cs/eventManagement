import React, { useState } from "react";

interface LoginProps {
  onSwitch?: () => void;
  onClose?: () => void;
}

const Login: React.FC<LoginProps> = ({ onSwitch, onClose }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "Login failed");
        setLoading(false);
        return;
      }
      window.location.href = "/";
    } catch {
      setError("Network error");
    }
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <button style={styles.closeBtn} onClick={onClose} aria-label="Close">&times;</button>
      <h2 style={styles.heading}>Sign In</h2>
      <form style={styles.form} onSubmit={handleSubmit} autoComplete="off">
        <div style={styles.inputGroup}>
          <label style={styles.label} htmlFor="login-email">Email Address</label>
          <input
            style={styles.input}
            id="login-email"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            required
            autoComplete="off"
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label} htmlFor="login-password">Password</label>
          <input
            style={styles.input}
            id="login-password"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            required
            autoComplete="current-password"
          />
        </div>
        {error && <div style={styles.error}>{error}</div>}
        <button style={styles.button} type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Login"}
        </button>
      </form>
      <div style={styles.link}>
        Don't have an account?{" "}
        <button style={styles.switchBtn} onClick={onSwitch}>Register</button>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: 340,
    minWidth: 340,
    margin: "0 auto",
    padding: "36px 36px 28px 36px",
    background: "linear-gradient(120deg, #f8fafc 0%, #e3f2fd 100%)",
    borderRadius: 20,
    boxShadow: "0 8px 32px rgba(25, 118, 210, 0.13)",
    position: "relative",
    height: "80vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    transition: "box-shadow 0.2s",
    border: "1.5px solid #e3f2fd",
  },
  closeBtn: {
    position: "absolute",
    top: 16,
    right: 22,
    background: "none",
    border: "none",
    fontSize: 30,
    color: "#1976d2",
    cursor: "pointer",
    zIndex: 2,
    transition: "color 0.2s",
    fontWeight: 700,
    lineHeight: 1,
  },
  heading: {
    textAlign: "center",
    marginBottom: 28,
    color: "#1976d2",
    fontWeight: 800,
    fontSize: 32,
    letterSpacing: 1,
    fontFamily: "inherit",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
  },
  label: {
    fontWeight: 600,
    color: "#1976d2",
    marginBottom: 2,
    fontSize: 15.5,
    letterSpacing: 0.2,
    textAlign: "left",
  },
  input: {
    padding: "13px 16px",
    borderRadius: 8,
    border: "1.5px solid #b3c6e0",
    fontSize: 17,
    background: "#f7fbff",
    outline: "none",
    transition: "border 0.2s",
    fontFamily: "inherit",
    boxSizing: "border-box",
  },
  button: {
    padding: "14px 0",
    borderRadius: 8,
    border: "none",
    background: "linear-gradient(90deg, #1976d2 60%, #42a5f5 100%)",
    color: "#fff",
    fontWeight: 700,
    fontSize: 20,
    cursor: "pointer",
    marginTop: 10,
    boxShadow: "0 2px 8px rgba(25, 118, 210, 0.08)",
    transition: "background 0.2s",
    fontFamily: "inherit",
    letterSpacing: 0.5,
  },
  error: {
    color: "#d32f2f",
    fontSize: 16,
    textAlign: "center",
    marginTop: 4,
    fontWeight: 500,
  },
  link: {
    marginTop: 22,
    textAlign: "center",
    fontSize: 16,
    color: "#1976d2",
    fontWeight: 500,
    letterSpacing: 0.2,
  },
  switchBtn: {
    background: "none",
    border: "none",
    color: "#1976d2",
    textDecoration: "underline",
    cursor: "pointer",
    fontSize: 16,
    fontWeight: 700,
    padding: 0,
    marginLeft: 4,
    fontFamily: "inherit",
  },
};

export default Login;

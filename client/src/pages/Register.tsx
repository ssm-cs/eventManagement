import React, { useState } from "react";

interface RegisterProps {
  onSwitch?: () => void;
  onClose?: () => void;
}

const Register: React.FC<RegisterProps> = ({ onSwitch, onClose }) => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Registration failed");
        setLoading(false);
        return;
      }
      setSuccess("Registration successful! You can now login.");
      setForm({ name: "", email: "", password: "" });
    } catch {
      setError("Network error");
    }
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <button style={styles.closeBtn} onClick={onClose} aria-label="Close">&times;</button>
      <h2 style={styles.heading}>Sign Up</h2>
      <form style={styles.form} onSubmit={handleSubmit} autoComplete="off">
        <div style={styles.inputGroup}>
          <label style={styles.label} htmlFor="register-name">Full Name</label>
          <input
            style={styles.input}
            id="register-name"
            type="text"
            name="name"
            placeholder="Enter your name"
            value={form.name}
            onChange={handleChange}
            required
            autoComplete="off"
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label} htmlFor="register-email">Email Address</label>
          <input
            style={styles.input}
            id="register-email"
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
          <label style={styles.label} htmlFor="register-password">Password</label>
          <input
            style={styles.input}
            id="register-password"
            type="password"
            name="password"
            placeholder="Create a password"
            value={form.password}
            onChange={handleChange}
            required
            autoComplete="new-password"
          />
        </div>
        {error && <div style={styles.error}>{error}</div>}
        {success && <div style={styles.success}>{success}</div>}
        <button style={styles.button} type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
      <div style={styles.link}>
        Already have an account?{" "}
        <button style={styles.switchBtn} onClick={onSwitch}>Login</button>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: 400,
    minWidth: 340,
    width: "100%",
    margin: "0 auto",
    padding: "36px 36px 28px 36px",
    background: "linear-gradient(120deg, #f8fafc 0%, #e3f2fd 100%)",
    borderRadius: 20,
    boxShadow: "0 8px 32px rgba(25, 118, 210, 0.13)",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    minHeight: 420,
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
  success: {
    color: "#388e3c",
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

export default Register;

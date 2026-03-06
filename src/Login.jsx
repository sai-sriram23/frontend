import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const submit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/login`, data);
            localStorage.setItem("user", JSON.stringify(res.data));
            navigate("/dashboard");
        } catch (err) {
            const errMsg = err.response?.data?.message || err.response?.data || "Login failed. Please try again.";
            alert(errMsg);
        }
    };

    return (
        <div style={{ padding: "2rem", maxWidth: "400px", margin: "auto" }}>
            <h2>Login</h2>
            <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <input
                    onChange={handleChange}
                    name="email"
                    type="email"
                    placeholder="Enter email"
                    required
                    style={{ padding: "0.5rem" }}
                />
                <input
                    onChange={handleChange}
                    name="password"
                    type="password"
                    placeholder="Enter password"
                    required
                    style={{ padding: "0.5rem" }}
                />
                <button type="submit" style={{ padding: "0.5rem", background: "#007BFF", color: "white", border: "none" }}>
                    Login
                </button>
            </form>
            <p style={{ marginTop: "1rem" }}>
                Don't have an account? <a href="/register">Register here</a>
            </p>
        </div>
    );
}

export default Login;

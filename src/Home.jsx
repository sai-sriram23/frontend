import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
    const navigate = useNavigate();

    // ----- Login State -----
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    const handleLoginChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const submitLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/login`, loginData);
            localStorage.setItem("user", JSON.stringify(res.data));
            navigate("/dashboard"); // Successful login -> redirect to dashboard
        } catch (err) {
            let errMsg = "Login failed. Please try again.";
            if (err.response?.data) {
                if (typeof err.response.data.message === "string") {
                    errMsg = err.response.data.message;
                } else if (typeof err.response.data === "string") {
                    errMsg = err.response.data;
                } else {
                    errMsg = "Invalid request or server error.";
                }
            }
            alert(errMsg);
            navigate("/"); // Else home page
        }
    };

    // ----- Register State -----
    const [regData, setRegData] = useState({
        username: "",
        email: "",
        password: "",
        role: "student",
    });

    const handleRegChange = (e) => {
        setRegData({ ...regData, [e.target.name]: e.target.value });
    };

    const submitReg = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/register`, regData);
            const msg = typeof res.data === "object" ? res.data.message : res.data;
            alert(msg);
            // Clear registration form on success
            setRegData({ username: "", email: "", password: "", role: "student" });
        } catch (err) {
            let errMsg = "Registration failed. Please try again.";
            if (err.response?.data) {
                if (typeof err.response.data.message === "string") {
                    errMsg = err.response.data.message;
                } else if (typeof err.response.data === "string") {
                    errMsg = err.response.data;
                } else {
                    errMsg = "Invalid registration details. Please ensure password is at least 6 characters.";
                }
            }
            alert(errMsg);
        }
    };

    return (
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "2rem", fontFamily: "sans-serif" }}>
            <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>Cab System Portal</h1>

            <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap", justifyContent: "center" }}>

                {/* LOGIN FORM */}
                <div style={{ flex: "1 1 300px", background: "#f8f9fa", padding: "2rem", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
                    <h2 style={{ marginTop: 0 }}>Login</h2>
                    <form onSubmit={submitLogin} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                        <input
                            onChange={handleLoginChange}
                            name="email"
                            type="email"
                            placeholder="Enter email"
                            required
                            style={{ padding: "0.5rem" }}
                        />
                        <input
                            onChange={handleLoginChange}
                            name="password"
                            type="password"
                            placeholder="Enter password"
                            required
                            style={{ padding: "0.5rem" }}
                        />
                        <button type="submit" style={{ padding: "0.5rem", background: "#007BFF", color: "white", border: "none", cursor: "pointer" }}>
                            Login
                        </button>
                    </form>
                </div>

                {/* REGISTER FORM */}
                <div style={{ flex: "1 1 300px", background: "#f8f9fa", padding: "2rem", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
                    <h2 style={{ marginTop: 0 }}>Register</h2>
                    <form onSubmit={submitReg} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                        <input
                            onChange={handleRegChange}
                            name="username"
                            value={regData.username}
                            type="text"
                            placeholder="Enter username"
                            required
                            style={{ padding: "0.5rem" }}
                        />
                        <input
                            onChange={handleRegChange}
                            name="email"
                            value={regData.email}
                            type="email"
                            placeholder="Enter email"
                            required
                            style={{ padding: "0.5rem" }}
                        />
                        <input
                            onChange={handleRegChange}
                            name="password"
                            value={regData.password}
                            type="password"
                            placeholder="Enter password"
                            required
                            style={{ padding: "0.5rem" }}
                        />
                        <select
                            name="role"
                            onChange={handleRegChange}
                            value={regData.role}
                            style={{ padding: "0.5rem" }}
                        >
                            <option value="student">Student</option>
                            <option value="teacher">Teacher</option>
                            <option value="principal">Principal</option>
                            <option value="non teaching staff">Non Teaching Staff</option>
                        </select>
                        <button type="submit" style={{ padding: "0.5rem", background: "#28A745", color: "white", border: "none", cursor: "pointer" }}>
                            Register
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
}

export default Home;
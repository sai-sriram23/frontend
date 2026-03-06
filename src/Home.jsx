import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    return (
        <div style={{ padding: "2rem", textAlign: "center" }}>
            <h1>Welcome to Cab System</h1>
            <p>Your reliable cab booking platform.</p>

            <div style={{ marginTop: "2rem", display: "flex", gap: "1rem", justifyContent: "center" }}>
                <button onClick={() => navigate("/login")} style={{ padding: "10px 20px" }}>
                    Login
                </button>
                <button onClick={() => navigate("/register")} style={{ padding: "10px 20px" }}>
                    Register
                </button>
            </div>
        </div>
    );
}

export default Home;
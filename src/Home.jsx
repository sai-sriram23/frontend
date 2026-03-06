import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Welcome to Cab System</h1>
            <p>Your reliable cab booking platform.</p>
            <button onClick={() => navigate("/register")}>Register</button>
        </div>
    );
}

export default Home;
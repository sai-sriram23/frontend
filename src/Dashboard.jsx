import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (!userData) {
            navigate("/login");
            return;
        }
        const parsed = JSON.parse(userData);
        setUser(parsed);

        // If principal, fetch all users
        if (parsed.role === "principal") {
            axios.get(`${process.env.REACT_APP_API_URL}/users`)
                .then(res => setAllUsers(res.data))
                .catch(err => console.error("Error fetching users:", err));
        }
    }, [navigate]);

    const logout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };

    if (!user) return <div>Loading...</div>;

    return (
        <div style={{ padding: "2rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
                <h2>Welcome, {user.username}!</h2>
                <button onClick={logout} style={{ padding: "0.5rem 1rem", background: "#DC3545", color: "white", border: "none" }}>
                    Logout
                </button>
            </div>

            <div style={{ padding: "1rem", background: "#f8f9fa", borderRadius: "5px", marginBottom: "2rem" }}>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Role:</strong> {user.role}</p>
            </div>

            {user.role === "principal" && (
                <div>
                    <h3>Principal Dashboard: All Users</h3>
                    <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "1rem" }}>
                        <thead>
                            <tr style={{ background: "#e9ecef" }}>
                                <th style={{ padding: "0.5rem", border: "1px solid #dee2e6" }}>ID</th>
                                <th style={{ padding: "0.5rem", border: "1px solid #dee2e6" }}>Username</th>
                                <th style={{ padding: "0.5rem", border: "1px solid #dee2e6" }}>Email</th>
                                <th style={{ padding: "0.5rem", border: "1px solid #dee2e6" }}>Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allUsers.map((u) => (
                                <tr key={u.id}>
                                    <td style={{ padding: "0.5rem", border: "1px solid #dee2e6", textAlign: "center" }}>{u.id}</td>
                                    <td style={{ padding: "0.5rem", border: "1px solid #dee2e6" }}>{u.username}</td>
                                    <td style={{ padding: "0.5rem", border: "1px solid #dee2e6" }}>{u.email}</td>
                                    <td style={{ padding: "0.5rem", border: "1px solid #dee2e6", textAlign: "center" }}>{u.role}</td>
                                </tr>
                            ))}
                            {allUsers.length === 0 && (
                                <tr>
                                    <td colSpan="4" style={{ textAlign: "center", padding: "1rem", border: "1px solid #dee2e6" }}>
                                        Loading users...
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {user.role === "student" && (
                <div>
                    <h3>Student Dashboard</h3>
                    <p>Welcome to your student portal. Here you can view your schedule and assignments.</p>
                </div>
            )}

            {user.role === "teacher" && (
                <div>
                    <h3>Teacher Dashboard</h3>
                    <p>Welcome to the teacher portal. Here you can manage your classes and grading.</p>
                </div>
            )}

            {user.role === "non teaching staff" && (
                <div>
                    <h3>Staff Dashboard</h3>
                    <p>Welcome to the staff portal. Here you can manage administrative tasks and requests.</p>
                </div>
            )}
        </div>
    );
}

export default Dashboard;

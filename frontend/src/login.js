import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import API_URL from "./config/api";
import './styling/login.css';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${API_URL}/users/login`, {
                email,
                password,
            });

            console.log("Login response:", res.data);
            
            // Store token and user ID correctly
            localStorage.setItem("token", res.data.access_token);
            localStorage.setItem("userId", res.data.user_id);
            localStorage.setItem("displayName", res.data.display_name);
            
            console.log("Token stored:", localStorage.getItem("token"));
            console.log("User ID stored:", localStorage.getItem("userId"));
            console.log("Display Name stored:", localStorage.getItem("displayName"));
            
            // Dispatch event to notify navbar
            window.dispatchEvent(new Event('storage'));
            
            console.log("Login success");
            navigate("/"); // Redirect after successful login
        } catch (err) {
            console.error("Login error details:", err.response ? err.response.data : err.message);
            setError("Invalid email or password.");
        }
    };
    
    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <div className="login-footer">
                <p>Don't have an account? <Link to="/register">Register Now</Link></p>
            </div>
            
            {/* Guest Access Info Box */}
            <div className="guest-access-box">
                <h3>Want Guest Access?</h3>
                <p>If you'd like to test out RunwAI with our sample images please log in with the credentials below.</p>
                <div className="guest-credentials">
                    <p><strong>Email:</strong> ruwnwaiguest@gmail.com</p>
                    <p><strong>Password:</strong> GuestAccess</p>
                </div>
            </div>
        </div>
    );
}

export default Login;
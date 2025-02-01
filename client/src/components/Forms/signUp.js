import React, { useState } from "react";
import axios from "axios";
import "./signIn.css";
import { useNavigate ,Link } from "react-router-dom";

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      axios.post("http://localhost:5000/signup", {
        username,
        password,
      });
      navigate("/");
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="signin-container">
      <form onSubmit={handleSubmit} className="signin-form">
        <h2>Sign Up</h2>

        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Sign Up</button>
        <p>Already have an account? <Link to="/">Sign In</Link></p>
        {error && <p>Registration failed. Please try again.</p>}
      </form>
      <a ></a>
    </div>
  );
}

export default SignUp;

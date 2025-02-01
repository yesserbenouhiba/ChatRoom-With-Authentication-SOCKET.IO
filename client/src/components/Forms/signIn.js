import React, { useState } from "react";
import axios from "axios";
import "./signIn.css";
import Cookies from "js-cookie";
import {useNavigate,Link} from "react-router-dom";

function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/signin", { username, password }).then((response) => {
      Cookies.set("token", response.data.token);
      localStorage.clear();
      localStorage.setItem("token", response.data.token);
      navigate(`/Dashboard?username=${username}`);
    }).catch((err) => {
      setError(true);
    });
  };

  return (
    <div className="signin-container">
      <form onSubmit={handleSubmit} className="signin-form">
        <h2>Sign In</h2>

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
          <button type="submit">Sign In</button>
        <p>Dont have an account? <Link to="/signUp">Sign Up</Link></p>
        {error && <p>Invalid username or password</p>}
      </form>
    </div>
  );
}

export default SignIn;

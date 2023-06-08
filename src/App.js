import React, { useState } from "react";
import axios from "axios";
import "./App.css";

axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

function App() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  const validateEmail = (email) => {
    // Validate email format
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = {};

    if (username.length < 5)
      errors.username = "Username must be at least 5 characters long";
    if (!validateEmail(email)) errors.email = "Email is not valid";
    if (password.length < 6)
      errors.password = "Password must be at least 6 characters long";

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
    } else {
      try {
        const response = await axios.post(
          "http://127.0.0.1:5000/api/signup",
          new URLSearchParams({ username, email, password })
        );
        if (response.status === 200) {
          // if the response is successful, redirect to the logged page
          window.location.href = "/loggedPage";
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          // if there are server-side validation errors
          setErrors(error.response.data);
        }
      }
    }
  };

  return (
    <div className="container">
      {/* head */}
      <head>
        <title>Sign up for Vaepr | Vaepr.io</title>
        <link rel="icon" href="/favicon.ico" />
      </head>

      <main className="main">
        <h1 className="title">
          Sign up for <a href="/">Vaepr</a>
        </h1>

        <p className="description">
          Sign up now to be notified when our next
          <span className="code">amazing project</span>
          launches.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="grid">
            <div className="card">
              <div className="label">
                <label htmlFor="username">Username</label>
                <div>{errors.username}</div>
              </div>
              <div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="label">
                <label htmlFor="email">Email</label>
                <div>{errors.email}</div>
              </div>
              <div>
                <input
                  id="email"
                  name="email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="label">
                <label htmlFor="password">Password</label>
                <div>{errors.password}</div>
              </div>
              <div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <br />
              <button type="submit">Sign up!</button>
            </div>
          </div>
        </form>
      </main>

      <footer className="footer">
        Powered by <span>Vaepr | ware</span>
      </footer>
    </div>
  );
}

export default App;

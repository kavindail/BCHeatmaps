import "./Signup.css";
import { useState } from "react";
import axios from "axios";

const Signup = () => {
  //TODO: Implement react toastify to indicate whether success or failure and the status code

  const [email, setEmail] = useState("");
  const [name, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function handleSignup(e: any) {
    e.preventDefault();
    try {
      //TODO: Use the environment variable here for the url
      const response = await axios.post(
        "http://localhost:3000/auth/signup",
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );
      console.log(response);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div className="signup">
      <div className="signup-container">
        <h2 id="SignupHeader">Signup</h2>
        <form onSubmit={handleSignup}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};
export default Signup;

import "./Signup.css";
import { useState } from "react";
import axios from "axios";
const apiUrl: string | undefined = import.meta.env.VITE_API_URL as string;
import { useNavigate } from "react-router-dom";
import { useAuthProvider } from "../AuthProvider/AuthProviderWrapper.tsx";

const Signup: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { setIsAuthenticated } = useAuthProvider();
  let navigate = useNavigate();

  async function handleSignup(e: any) {
    e.preventDefault();

    console.log("Signing up user");

    try {
      console.log("Signing up user");
      const response = await axios.post(
        apiUrl + "/auth/signup",
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
      console.log("Response in signup: ", response);
      setIsAuthenticated(true);
      navigate("/");
    } catch (error) {
      //TODO: Add a react toastify thing here
      console.error("Error In Signup:", error);
      setIsAuthenticated(false);
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

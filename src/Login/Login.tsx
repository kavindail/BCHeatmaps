import "./Login.css";
import { useState } from "react";
import "./Login.css";
import axios from "axios";
const apiUrl: string | undefined = import.meta.env.VITE_API_URL as string;
import { useNavigate } from "react-router-dom";
import { useAuthProvider } from "../AuthProvider/AuthProviderWrapper.tsx";

const Login: React.FC = () => {
  const { setIsAuthenticated } = useAuthProvider();
  const navigate = useNavigate();

  //TODO: Implement react toastify to indicate whether success or failure and the status code
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  async function handleLogin(e: any) {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await axios.post(
        apiUrl + "/auth/login",
        {
          email: formData.email,
          password: formData.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );
      console.log("response: ", response);
      setIsAuthenticated(true);
      navigate("/");
    } catch (error) {
      console.error("Error: ", error);
      setIsAuthenticated(false);
    }
  }

  return (
    <div className="login">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">Username (Email)</label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={(e) =>
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  email: e.target.value,
                }))
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={(e) =>
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  password: e.target.value,
                }))
              }
            />
          </div>
          <button
            type="submit"
            className="login-button"
            disabled={!formData.email || !formData.password}
          >
            <p>Login</p>
          </button>
        </form>
      </div>
    </div>
  );
};
export default Login;

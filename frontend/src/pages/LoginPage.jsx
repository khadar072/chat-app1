import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(UserContext);
  const navigator =useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login({ email, password });
  };

  return (
    <div className="mt-10 md:mt-24">
      <div className="w-full flex flex-row gap-10 items-center justify-center">
        <div>
          <form
            onSubmit={handleSubmit}
            className="fieldset bg-base-200 border-base-300 rounded-box w-md border py-16 px-10"
          >
            <p className="fieldset-legend text-2xl">Login</p>

            <label className="label">Email</label>
            <input
              type="email"
              className="input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label className="label">Password</label>
            <input
              type="password"
              className="input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit" className="btn btn-neutral mt-4">
              Login
            </button>

            <p className="mt-3 px-1">
              Don't have an account?{" "}
              <span onClick={()=>navigator('/register')} className="text-blue-300 cursor-pointer">Register</span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

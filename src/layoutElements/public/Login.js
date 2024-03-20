import { useRef, useState, useEffect, useContext } from "react";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";

import axios from "../../api/axios";
const LOGIN_URL = "/login";

//console.log(LOGIN_URL);
export function Login() {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "dashboard";

  const userEmailRef = useRef();
  const errRef = useRef();

  const [email, setUserEmail] = useState("StafAdmin@boozenow.hu");
  const [password, setPassword] = useState("StafAdminBo0ze-nOOOw!");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userEmailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        LOGIN_URL,
        { email: email, password: password },
        {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
          },
        }
        );
        const accessToken = response?.data?.access_token;
        const roles = response?.data?.user.role_code;
      //  console.log(`AccessToken: ${accessToken}', roles:${roles}`);
      setAuth({email, password, roles, accessToken});
      setUserEmail("");
      setPassword("");
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 401) {
        setErrMsg("Invalid Username or Password");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
      } else if (err.response?.status === 500) {
        setErrMsg("Internal Server Error");
      } else if (err.response?.status === 405) {
        setErrMsg("Method Not Allowed");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <section>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          ref={userEmailRef}
          autoComplete="off"
          onChange={(e) => setUserEmail(e.target.value)}
          value={email}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
        <button>Sign In</button>
      </form>
      <p>
        Need an Account?
        <br />
        <span className="line">
          <Link to="/register">Sign Up</Link>
        </span>
      </p>
    </section>
  );
}

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

//import { useTranslation } from "../contexts/TranslationContext";
import { useUser } from "../contexts/UserContext";
// import { useTheme } from '../contexts/ThemeContext';
import { useMessages } from "../contexts/MessagesContext";
import axiosService from "../models/axiosService.js";
import { Button } from "react-bootstrap";

const Login = () => {
  // const { __ } = useTranslation();
  const { user, login /*, logout*/ } = useUser();
  const { addMessage } = useMessages();
  const navigate = useNavigate();

  // State variables to store email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (user) {
    navigate('/');
    console.log("Nav")
  } else {
    console.log("No user")
  }

  // const { toggleTheme } = useTheme();

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Here you can perform validation, authentication, etc.

    axiosService
      .post("login", { email: email, password: password })
      .then((response) => {
        const user = response.data.user;
        console.log(user);
        login(user);
        setEmail("");
        setPassword("");
        navigate("/");
      })
      .catch((error) => {
        // console.log(error.response.data);
        // error.response.status == 401
        addMessage("danger", error.response.data.error);
      });
    // addMessage("info", "You have been logged in, :name", { name: email });

    // console.log("Submitted:", { email, password });
    // Reset the form fields after submission
  };

  return (

    <div className="container">
      {user}
      <div className="row justify-content-center">
        <div className="col-lg-5">
          <div className="card shadow-lg border-0 rounded-lg mt-5">
            <div className="card-header"><h3 className="text-center font-weight-light my-4">Login</h3></div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                  <input className="form-control" id="email" type="email"
                    value={email} onChange={(event) => setEmail(event.target.value)} placeholder="name@example.com" />
                  <label htmlFor="email">Email address</label>
                </div>
                <div className="form-floating mb-3">
                  <input className="form-control" id="password" type="password"
                    value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" />
                  <label htmlFor="password">Password</label>
                </div>
                {/* <div className="form-check mb-3">
                            <input className="form-check-input" id="rememberPassword" type="checkbox" value="" />
                            <label className="form-check-label" htmlFor="rememberPassword">Remember Password</label>
                        </div> */}
                <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                  <Link className="small" to="/password">Forgot Password?</Link>
                  <Button type="submit" variant="primary" >Login</Button>
                </div>
              </form>
            </div>
            <div className="card-footer text-center py-3">
              <div className="small"><a href="register.html">Need an account? Sign up!</a></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
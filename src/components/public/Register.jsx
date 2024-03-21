import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";


import { useApi } from "../../contexts/ApiContext.js";
import { useTranslation } from "../../contexts/TranslationContext.js";
// import { useTheme } from '../contexts/ThemeContext';
import { useMessages } from "../../contexts/MessagesContext";
import "./register.css";

import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const REGISTER_URL = "/register";

export default function Register() {
  const { __ } = useTranslation();
  const navigate = useNavigate();
  const { post } = useApi();

  const userRef = useRef();
  const emailRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);
  useEffect(() => {
    const result = USER_REGEX.test(user);
    console.log(result);
    console.log(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    console.log(result);
    console.log(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = PASSWORD_REGEX.test(pwd);
    console.log(pwd);
    console.log(matchPwd);
    console.log(result);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(user);
    const v2 = PASSWORD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await post(
        REGISTER_URL,
        {
          name: user,
          email: email,
          password: pwd,
          password_confirmation: matchPwd,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: false,
        }
      );
      console.log(response?.data);
      console.log(response?.accessToken);
      console.log(JSON.stringify(response));
      setSuccess(true);
      //clear state and controlled inputs
      //need value attrib on inputs for this
      setUser("");
      setPwd("");
      setMatchPwd("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg(__("No Server Response"));
      } else if (err.response?.status === 422) {
        setErrMsg(__("Username Taken"));
      } else {
        setErrMsg(__("Registration Failed"));
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>
            <a href="#">{__("Sign In")}</a>
          </p>
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>

          <h1>{__("Register")}</h1>
          <form onSubmit={handleSubmit}>
            <div class="mb-3">
              <label for="username" class="form-label">
                {" "}
                {__("Username:")}
                <span className={validName ? "valid" : "hide"}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={validName || !user ? "hide" : "invalid"}>
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </label>

              <input
                type="text"
                class="form-control"
                id="username"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                required
                airia-invalid={validName ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
              />
              <p
                id="uidnote"
                className={
                  userFocus && user && !validName ? "instructions" : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />4 to 24 characters.
                Must begin with a letter. Letters, numbers, underscores, hyphens allowed.
              </p>
            </div>

            <div class="mb-3">
              <label for="email" class="form-label">
                {" "}
                {__("Email:")}
                <span className={validEmail ? "valid" : "hide"}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={validEmail || !email ? "hide" : "invalid"}>
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </label>
              <input
                type="email"
                class="form-control"
                id="email"
                ref={emailRef}
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                airia-invalid={validEmail ? "false" : "true"}
                aria-describedby="emailnote"
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
              />
              <p
                id="emailnote"
                className={
                  emailFocus && email && !validEmail
                    ? "instructions"
                    : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                Please enter a valid email address in the format
                Must begin with : example@example.com.
              </p>
            </div>

            <div class="mb-3">
              <label for="passwword" class="form-label">
                {__(" Password:")}
                <span className={validPwd ? "valid" : "hide"}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={validPwd || !pwd ? "hide" : "invalid"}>
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </label>

              <input
                type="password"
                class="form-control"
                id="password"
                placeholder="Enter your password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
                aria-invalid={validPwd ? "false" : "true"}
                aria-describedby="pwdnote"
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
              />
              <p
                id="pwdnote"
                className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                8 to 24 characters.
                Must include uppercase and lowercase letters, a number and a
                special character.
                Allowed special characters:{" "}
                <span aria-label="exclamation mark">!</span>{""}
                <span aria-label="at symbol">@</span>{""}
                <span aria-label="hashtag">#</span>{""}
                <span aria-label="dollar sign">$</span>{""}
                <span aria-label="percent">%</span>
              </p>
            </div>
            <div class="mb-3">
              <label for="confirm_pwd" class="form-label">
                {__(" Confirm Password:")}
              </label>
              <input
                type="password"
                class="form-control"
                id="confirm_pwd"
                placeholder="Confirm Password"
                onChange={(e) => setMatchPwd(e.target.value)}
                value={matchPwd}
                required
                aria-invalid={validMatch ? "false" : "true"}
                aria-describedby="confirmnote"
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
              />
              <p
                id="confirmnote"
                className={
                  matchFocus && !validMatch ? "instructions" : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                {__(" Must match the first password input field.")}
              </p>
            </div>
            <div class="mb-3 form-check ">
              <input
                type="checkbox"
                class="form-check-input"
                id="exampleCheck1"
              />
              <label class="form-check-label check "  for="exampleCheck1">
                {__("I am not a robot")}
              </label>
            </div>
           
            <button
              type="submit"
              class="btn btn-primary"
              disabled={!validName || !validPwd || !validMatch ? true : false}
            >
              {__("Sign Up")}
            </button>
          </form>
        </section>
      )}
    </>
  );
}

import { useState, useRef, useContext } from "react";

import classes from "./AuthForm.module.css";
import AuthContext from "../../store/Auth-context";

const AuthForm = () => {
  const EnterEmail = useRef();
  const EnterPwd = useRef();
  const [isLogin, setIsLogin] = useState(true);
  const [IsLoding, setIsLoading] = useState(false);
  const AuthCtx = useContext(AuthContext);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const SubmitHandler = (event) => {
    event.preventDefault();
    const InputMail = EnterEmail.current.value;
    const InputPwd = EnterPwd.current.value;
    console.log(InputMail, InputPwd);

    setIsLoading(true);
    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDmMLvE2cBrpSYlZ4FIpFgSRVsMOLkkytQ";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDmMLvE2cBrpSYlZ4FIpFgSRVsMOLkkytQ";
    }

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: InputMail,
        password: InputPwd,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errMsg = "Authentication failed!";
            // if (data && data.error && data.error.message) {
            //   errMsg = data.error.message;
            // }
            throw new Error(errMsg);
          });
        }
      })
      .then((data) => {
        AuthCtx.login(data.idToken);
        console.log(data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={SubmitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={EnterEmail} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" required ref={EnterPwd} />
        </div>
        <div className={classes.actions}>
          {!IsLoding && <button>{isLogin ? "LogIn" : "Create Account"}</button>}
          {IsLoding && <p>Sending Request.....!</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;

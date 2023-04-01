import { useState, useRef } from "react";

import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const EnterEmail = useRef();
  const EnterPwd = useRef();
  const [isLogin, setIsLogin] = useState(true);
  const [IsLoding, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const SubmitHandler = (event) => {
    event.preventDefault();
    const InputMail = EnterEmail.current.value;
    const InputPwd = EnterPwd.current.value;
    console.log(InputMail, InputPwd);

    setIsLoading(true);
    if (isLogin) {
      // do something
    } else {
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDmMLvE2cBrpSYlZ4FIpFgSRVsMOLkkytQ",
        {
          method: "POST",
          body: JSON.stringify({
            email: InputMail,
            password: InputPwd,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => {
        setIsLoading(true);
        if (res.ok) {
          //do something
        } else {
          return res.json().then((data) => {
            let errMsg = "Authentication failed!";
            if (data && data.error && data.error.message) {
              errMsg = data.error.message;
            }
            alert(errMsg);
            //do something
            console.log(data);
          });
        }
      });
    }
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

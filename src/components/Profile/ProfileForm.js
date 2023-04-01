import React, { useRef, useContext } from "react";
import classes from "./ProfileForm.module.css";
import AuthContext from "../../store/Auth-context";

const ProfileForm = () => {
  const enteredPwd = useRef();
  const AuthCtx = useContext(AuthContext);

  const SubmitHandler = (event) => {
    event.preventDefault();
    const newPwd = enteredPwd.current.value;
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDmMLvE2cBrpSYlZ4FIpFgSRVsMOLkkytQ",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: AuthCtx.token,
          password: newPwd,
          returnSecureToken: false,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      // a
    });
  };

  return (
    <form className={classes.form} onSubmit={SubmitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          ref={enteredPwd}
          minLength="7"
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;

import { Link } from "react-router-dom";
import { useContext } from "react";
import classes from "./MainNavigation.module.css";
import AuthContext from "../../store/Auth-context";

const MainNavigation = () => {
  const AuthCtx = useContext(AuthContext);
  const IsLoggedIn = AuthCtx.IsLoggedIn;
  const logoutHandler = () => {
    AuthCtx.logout();
  };
  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!IsLoggedIn && (
            <li>
              <Link to="/auth">Login</Link>
            </li>
          )}
          {IsLoggedIn && (
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          )}
          {IsLoggedIn && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;

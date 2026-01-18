import { Link, useNavigate } from "react-router-dom";
// import { useContext } from "react";
import classes from "./MainNavigation.module.css";
import AuthContext from "../../store/auth-context";
import { useContext } from "react";
import userService from "../../services/UserService";

const MainNavigation: React.FC = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  const isLoggedIn = authCtx.isLoggedIn;
  const isAdmin = authCtx.isAdmin;

  const logoutHandler = async () => {
    try {
      const response = await userService.logout(token);
    } catch (error) {
      // error
    }
    authCtx.logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>Bam</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}

          {isLoggedIn && isAdmin && (
            <li>
              <Link to="/manage">Manage Reqs</Link>
            </li>
          )}

          {isLoggedIn && isAdmin && (
            <li>
              <Link to="/history">Req History</Link>
            </li>
          )}

          {isLoggedIn && (
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          )}

          {isLoggedIn && (
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

import { useState, useContext } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./AuthForm.module.css";
import AuthContext from "../../store/auth-context";
import useInput from "../../hooks/use-input";
import userService from "../../services/UserService";

const isNotEmpty = (value: string) => value.trim() !== "";
const isEmail = (value: string) => value.includes("@");
const isSevenDigitNumber = (value: string) => /^\d{7}$/.test(value);
const isNineLength = (value: string) => value.length >= 7;

const AuthForm: React.FC = () => {
  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
  } = useInput(isNineLength);

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput(isEmail);

  const {
    value: enteredPersonalNumber,
    isValid: enteredPersonalNumberIsValid,
    hasError: personalNumberInputHasError,
    valueChangeHandler: personalNumberChangeHandler,
    inputBlurHandler: personalNumberBlurHandler,
    reset: resetPersonalNumberInput,
  } = useInput(isSevenDigitNumber);

  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput(isNotEmpty);

  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  let formIsValid = false;

  if (!isLogin) {
    if (
      enteredPasswordIsValid &&
      enteredEmailIsValid &&
      enteredPersonalNumberIsValid &&
      enteredNameIsValid
    ) {
      formIsValid = true;
    }
  } else {
    if (enteredPasswordIsValid && enteredEmailIsValid) {
      formIsValid = true;
    }
  }

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
    resetPasswordInput();
    resetEmailInput();
    resetPersonalNumberInput();
    resetNameInput();
  };

  const goToForgotPasswordPage = () => {
    navigate("/forgot");
  };

  const sendPostRequest = async () => {
    setIsError(false);
    try {
      // Send the POST request using await
      const response = isLogin
        ? await userService.login({
            email: enteredEmail,
            password: enteredPassword,
          })
        : await userService.createUser({
            name: enteredName,
            email: enteredEmail,
            personalNumber: enteredPersonalNumber,
            password: enteredPassword,
            isAdmin: false,
          });
      setIsLoading(false);
      authCtx.login(response.data.data.token, response.data.data.user);
      navigate("/home", { replace: true });
    } catch (error) {
      setIsError(true);
    }
    setIsLoading(false);
    resetPasswordInput();
    resetEmailInput();
    resetPersonalNumberInput();
    resetNameInput();
  };

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }
    setIsLoading(true);
    sendPostRequest();
  };

  const passwordInputClasses = passwordInputHasError
    ? classes.control + " " + classes.invalid
    : classes.control;

  const emailInputClasses = emailInputHasError
    ? classes.control + " " + classes.invalid
    : classes.control;

  const personalNumberInputClasses = personalNumberInputHasError
    ? classes.control + " " + classes.invalid
    : classes.control;

  const nameInputClasses = nameInputHasError
    ? classes.control + " " + classes.invalid
    : classes.control;

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        {!isLogin && (
          <div className={nameInputClasses}>
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              value={enteredName}
              onChange={nameChangeHandler}
              onBlur={nameBlurHandler}
            />
            {nameInputHasError && (
              <p className={classes["error-text"]}>
                Please enter a valid name.
              </p>
            )}
          </div>
        )}
        <div className={emailInputClasses}>
          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
          />
          {emailInputHasError && (
            <p className={classes["error-text"]}>Please enter a valid email.</p>
          )}
        </div>
        {!isLogin && (
          <div className={personalNumberInputClasses}>
            <label htmlFor="personalNumber">Your Personal Number</label>
            <input
              type="text"
              id="personalNumber"
              value={enteredPersonalNumber}
              onChange={personalNumberChangeHandler}
              onBlur={personalNumberBlurHandler}
            />
            {personalNumberInputHasError && (
              <p className={classes["error-text"]}>
                Please enter a valid personal number.
              </p>
            )}
          </div>
        )}
        <div className={passwordInputClasses}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
          />
          {passwordInputHasError && (
            <p className={classes["error-text"]}>
              Please enter a valid password.
            </p>
          )}
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button disabled={!formIsValid}>
              {isLogin ? "Login" : "Create Account"}
            </button>
          )}
          {isLoading && <p>loading...</p>}
          {isError && (
            <p className={classes["error-text"]}>
              email or password is incorrect
            </p>
          )}
          {isLogin && (
            <button
              type="button"
              className={classes.toggle}
              onClick={goToForgotPasswordPage}
            >
              forgot password?
            </button>
          )}
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

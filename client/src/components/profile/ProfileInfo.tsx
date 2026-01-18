import classes from "./ProfileInfo.module.css";
import soldierPicture from "../../assets/soldierProfile.png";
import AuthContext from "../../store/auth-context";
import { useContext, useState, type FormEvent } from "react";
import useInput from "../../hooks/use-input";
import userService from "../../services/UserService";

const isNotEmpty = (value: string) => value.trim() !== "";
const isEmail = (value: string) => value.includes("@");
const isSevenDigitNumber = (value: string) => /^\d{7}$/.test(value);

const ProfileInfo: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const authCtx = useContext(AuthContext);
  const user = authCtx.user;

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput(isEmail, user?.email);

  const {
    value: enteredPersonalNumber,
    isValid: enteredPersonalNumberIsValid,
    hasError: personalNumberInputHasError,
    valueChangeHandler: personalNumberChangeHandler,
    inputBlurHandler: personalNumberBlurHandler,
    reset: resetPersonalNumberInput,
  } = useInput(isSevenDigitNumber, user?.personalNumber);

  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput(isNotEmpty, user?.name);

  let formIsValid = false;

  if (
    enteredEmailIsValid &&
    enteredPersonalNumberIsValid &&
    enteredNameIsValid
  ) {
    formIsValid = true;
  }

  const emailInputClasses = emailInputHasError
    ? classes.control + " " + classes.invalid
    : classes.control;

  const personalNumberInputClasses = personalNumberInputHasError
    ? classes.control + " " + classes.invalid
    : classes.control;

  const nameInputClasses = nameInputHasError
    ? classes.control + " " + classes.invalid
    : classes.control;

  const startEditing = () => {
    setIsEditing((prevState) => !prevState);
    resetEmailInput();
    resetNameInput();
    resetPersonalNumberInput();
  };

  const sendPatchRequest = async (url: string) => {
    const dataToSend = {
      name: enteredName,
      email: enteredEmail,
      personalNumber: enteredPersonalNumber,
    };
    try {
      const response = await userService.update(authCtx.token, dataToSend, url);
      authCtx.update(response.data);
    } catch (error) {
      // error
    }
    resetEmailInput();
    resetPersonalNumberInput();
    resetNameInput();
  };

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }
    const id = authCtx.user?._id;
    let url = "http://localhost:3000/user/update/" + id;
    sendPatchRequest(url);
    startEditing();
  };

  return (
    <>
      <section className={classes.auth}>
        Profile
        <img
          className={classes.profilePic}
          src={soldierPicture}
          alt="profile picture"
        />
        {!isEditing && (
          <div className={classes.centering}>
            <p className={classes.title}>
              Your Name: <br /> {user?.name}
            </p>
            <p className={classes.title}>
              Your Email: <br /> {user?.email}
            </p>
            <p className={classes.title}>
              Your Personal Number: <br /> {user?.personalNumber}
            </p>
            <button onClick={startEditing} className={classes.button}>
              Edit
            </button>
          </div>
        )}
        {isEditing && (
          <form onSubmit={submitHandler} className={classes.form}>
            <div className={nameInputClasses}>
              <label htmlFor="name">Your Name:</label>
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
            <div className={emailInputClasses}>
              <label htmlFor="email">Your Email:</label>
              <input
                type="email"
                id="email"
                value={enteredEmail}
                onChange={emailChangeHandler}
                onBlur={emailBlurHandler}
              />
              {emailInputHasError && (
                <p className={classes["error-text"]}>
                  Please enter a valid email.
                </p>
              )}
            </div>
            <div className={personalNumberInputClasses}>
              <label htmlFor="personalNumber">Your Personal Number:</label>
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
            <div className={classes['button-container']}>
              <button
                type="button"
                onClick={startEditing}
                className={classes.button}
              >
                Stop Editing
              </button>
              <button
                disabled={!formIsValid}
                type="submit"
                className={classes.button}
              >
                Confirm
              </button>
            </div>
          </form>
        )}
      </section>
    </>
  );
};

export default ProfileInfo;

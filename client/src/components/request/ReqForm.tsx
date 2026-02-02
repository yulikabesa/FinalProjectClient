import ReactDOM from "react-dom";
import Card from "../PopUp/Card";
import { Backdrop } from "../PopUp/StatusConfirmPopUp";
import classes from "./ReqForm.module.css";
import useInput from "../../hooks/use-input";
import { useContext, useState, type ChangeEvent, type FormEvent } from "react";
import bamReqService from "../../services/BamReqService";
import AuthContext from "../../store/auth-context";
import { useNavigate } from "react-router-dom";

const isNotEmpty = (value: string) => value.trim() !== "";

const ModalOverlay: React.FC<{
  onConfirm: () => void;
}> = (props) => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    value: enteredTitle,
    isValid: enteredTitleIsValid,
    hasError: titleInputHasError,
    valueChangeHandler: titleChangeHandler,
    inputBlurHandler: titleBlurHandler,
    reset: resetTitleInput,
  } = useInput(isNotEmpty);

  const {
    value: enteredSubmitReason,
    isValid: enteredSubmitReasonIsValid,
    hasError: submitReasonInputHasError,
    valueChangeHandler: submitReasonChangeHandler,
    inputBlurHandler: submitReasonBlurHandler,
    reset: resetSubmitReasonInput,
  } = useInput(isNotEmpty);

  const [selectedType, setSelectedTypet] = useState("השחרה");

  const handleTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedTypet(event.target.value);
  };

  let formIsValid = false;

  if (enteredSubmitReasonIsValid && enteredTitleIsValid) {
    formIsValid = true;
  }

  const sendPostRequest = async () => {
    try {
      const response = await bamReqService.createNewBamReq({
            title: enteredTitle,
            type: selectedType,
            submitReason: enteredSubmitReason,
            openedBy: authCtx.user!._id,
            status: "PENDING"
          }, authCtx.token!);
          navigate(0); // This forces a full page reload of the current location
    } catch (error) {
      // error
    }
    resetSubmitReasonInput();
    resetTitleInput();
  };

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }
    sendPostRequest();
    props.onConfirm();
  };

  const titleInputClasses = titleInputHasError
    ? classes.control + " " + classes.invalid
    : classes.control;

  const submitReasonInputClasses = submitReasonInputHasError
    ? classes.control + " " + classes.invalid
    : classes.control;

  return (
    <Card className={classes.modal}>
      <p className={classes.title}>פתיחת בקשה חדשה</p>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={titleInputClasses}>
          <label htmlFor="title">Request Title</label>
          <input
            type="text"
            id="title"
            value={enteredTitle}
            onChange={titleChangeHandler}
            onBlur={titleBlurHandler}
          />
          {titleInputHasError && (
            <p className={classes["error-text"]}>
              Please enter a valid request title.
            </p>
          )}
        </div>

        <label className={classes.control}>
          Type:
          <select value={selectedType} onChange={handleTypeChange}>
            <option value="השחרה">השחרה</option>
            <option value="כניסה רגלית">כניסה רגלית</option>
            <option value="כניסה רכובה">כניסה רכובה</option>
            <option value="קידוד חוגר">קידוד חוגר</option>
            <option value="חתימה על שוס">חתימה על שו"ס</option>
          </select>
        </label>

        <div className={submitReasonInputClasses}>
          <label htmlFor="submitReason">Submit Reason</label>
          <input
            type="text"
            id="submitReason"
            value={enteredSubmitReason}
            onChange={submitReasonChangeHandler}
            onBlur={submitReasonBlurHandler}
          />
          {submitReasonInputHasError && (
            <p className={classes["error-text"]}>
              Please enter a valid submit reason.
            </p>
          )}
        </div>

        <button className={classes.submitBtn} disabled={!formIsValid}>
          create
        </button>
      </form>
    </Card>
  );
};

const portalElement: HTMLElement = document.getElementById("overlays")!;

const ReqForm: React.FC<{
  onConfirm: () => void;
}> = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onConfirm={props.onConfirm} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay onConfirm={props.onConfirm} />,
        portalElement
      )}
    </>
  );
};

export default ReqForm;

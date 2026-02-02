import Card from "./Card";
import Button from "./Button";
import classes from "./StatusConfirmPopUp.module.css";
import ReactDOM from "react-dom";
import bamReqService from "../../services/BamReqService";
import {
  useContext,
  useState,
  type ChangeEvent,
  type ChangeEventHandler,
} from "react";
import AuthContext from "../../store/auth-context";

export const Backdrop: React.FC<{ onConfirm: () => void }> = (props) => {
  return <div className={classes.backdrop} onClick={props.onConfirm} />;
};

const ModalOverlay: React.FC<{
  title: string;
  message: string;
  onConfirm: () => void;
  newStatus: string;
  reqId: string;
}> = (props) => {
  // to do
  // send the status
  const authCtx = useContext(AuthContext);

  const onSend = async () => {
    let toSend = undefined;
    if (props.newStatus === "reject" && enteredReason === "") {
      return;
    }
    if (props.newStatus === "reject"){ 
      toSend = enteredReason;
    }
    try {
      //todo here
      const response = await bamReqService.changeReqStatus(
        props.reqId,
        props.newStatus as "approve" | "reject",
        authCtx.token!,
        toSend,
      );
    } catch (error) {
      // error
      console.log(error);
    }
    props.onConfirm();
  };

  const [enteredReason, setEnteredReason] = useState("");
  const enteredReasonChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    // Update the state with the current value of the textarea
    setEnteredReason(event.target.value);
  };

  return (
    <Card className={classes.modal}>
      <header className={classes.header}>
        <h2>{props.title}</h2>
      </header>
      <div className={classes.content}>
        <p>{props.message}</p>
        {props.newStatus === "reject" && (
          <>
            <p>reject reason:</p>
            <textarea
              id="submitReason"
              className={classes.submitInput}
              value={enteredReason}
              placeholder="Type here..."
              onChange={enteredReasonChangeHandler}
              rows={4}
              cols={50}
            ></textarea>
            {/* <input
            className={classes.submitInput}
            type="text"
            id="submitReason"
            value={enteredReason}
            placeholder="Type here..."
            onChange={enteredReasonChangeHandler}
          /> */}
          </>
        )}
      </div>
      <footer className={classes.actions}>
        <Button className={classes["reject-button"]} onClick={onSend}>
          Im sure
        </Button>
      </footer>
    </Card>
  );
};

const portalElement: HTMLElement = document.getElementById("overlays")!;

const StatusConfirmPopUp: React.FC<{
  onConfirm: () => void;
  message: string;
  title: string;
  newStatus: string;
  reqId: string;
}> = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onConfirm={props.onConfirm} />,
        portalElement,
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          onConfirm={props.onConfirm}
          message={props.message}
          title={props.title}
          newStatus={props.newStatus}
          reqId={props.reqId}
        />,
        portalElement,
      )}
    </>
  );
};

export default StatusConfirmPopUp;

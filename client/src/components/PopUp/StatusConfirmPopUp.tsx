import Card from "./Card";
import Button from "./Button";
import classes from "./StatusConfirmPopUp.module.css";
import ReactDOM from "react-dom";
import bamReqService from "../../services/BamReqService";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";

export const Backdrop: React.FC<{onConfirm: () => void}> = (props) => {
  return <div className={classes.backdrop} onClick={props.onConfirm} />;
};

const ModalOverlay: React.FC<{title: string; message: string; onConfirm: () => void; newStatus: string; reqId: string}> = (props) => {
  // to do 
  // send the status 
  const authCtx = useContext(AuthContext);

  const onSend = async () => {
    try {
      const response = await bamReqService.changeReqStatus(props.reqId, props.newStatus as 'approve' | 'reject', authCtx.token!);
    
    } catch (error) {
      // error 
    }
    props.onConfirm();
  };

  return (
    <Card className={classes.modal}>
      <header className={classes.header}>
        <h2>{props.title}</h2>
      </header>
      <div className={classes.content}>
        <p>{props.message}</p>
      </div>
      <footer className={classes.actions}>
        <Button className={classes["reject-button"]} onClick={onSend}>Im sure</Button>
      </footer>
    </Card>
  );
};

const portalElement: HTMLElement = document.getElementById('overlays')!;

const StatusConfirmPopUp: React.FC<{onConfirm: () => void; message: string ; title: string; newStatus: string; reqId: string}> = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onConfirm={props.onConfirm} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay onConfirm={props.onConfirm} message={props.message} title={props.title} newStatus={props.newStatus} reqId={props.reqId} />,
        portalElement
      )}
    </>
  );
};

export default StatusConfirmPopUp;

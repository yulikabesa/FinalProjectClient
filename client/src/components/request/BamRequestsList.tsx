import classes from "./ReqTableLine.module.css";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import ReqTable from "./ReqTable";
import "react-datepicker/dist/react-datepicker.css";

export type IBamRequest = {
  createdAt: string;
  openedBy: {
    email: string;
    isAdmin: boolean;
    name: string;
    personalNumber: string;
    __v: number;
    _id: string;
  };
  status: string;
  submitReason: string;
  title: string;
  type: string;
  updatedAt: string;
  __v: number;
  _id: string;
  rejectReason?: string;
};

const BamRequestsList: React.FC = () => {
  const authCtx = useContext(AuthContext);
  const isAdmin = authCtx.isAdmin;

  return (
    <>
      <p className={classes.title}>הבקשות שלי</p>
      <ReqTable id={authCtx.user?._id} />
    </>
  );
};

export default BamRequestsList;

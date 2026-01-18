import classes from "./ReqTableLine.module.css";
import type { IBamRequest } from "./BamRequestsList";
import soldierPicture from "../../assets/soldierProfile.png";
import SeeMore from "./SeeMore";

const ReqTableLine: React.FC<{
  bamReq: IBamRequest;
  isReqsForApproval?: boolean;
  onStatusClick? : (bamReq: IBamRequest, status: string) => void;
}> = (props) => {
  return (
    <>
      <td>{props.bamReq.title}</td>
      <td>{props.bamReq.type}</td>
      <td><SeeMore text={props.bamReq.submitReason} charactersLimit={20} /> </td>
      <td>
        <img
          className={classes.profilePic}
          src={soldierPicture}
          alt="profile picture"
        />
        {props.bamReq.openedBy.name}
      </td>
      <td>{new Date(props.bamReq.createdAt).toLocaleDateString()}</td>
      {props.isReqsForApproval ? (
        <td>
          <div className={classes['button-container']}>
            <button className={classes.approve} onClick={() => props.onStatusClick!(props.bamReq, "approve")}>APPROVE</button>
            <button className={classes.reject} onClick={() => props.onStatusClick!(props.bamReq, "reject")}>REJECT</button>
          </div>
        </td>
      ) : (
        <td className={classes[props.bamReq.status]}>{props.bamReq.status}</td>
      )}
    </>
  );
};

export default ReqTableLine;

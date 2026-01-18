import { useContext, useEffect, useState } from "react";
import type { IBamRequest } from "./BamRequestsList";
import ReqTableLine from "./ReqTableLine";
import classes from "./ReqTableLine.module.css";
import StatusConfirmPopUp from "../PopUp/StatusConfirmPopUp";
import bamReqService from "../../services/BamReqService";
import AuthContext from "../../store/auth-context";

const ReqTable: React.FC<{
  type?: string; // means it wants reqs for approval
  reqsHistory?: boolean; // means it wants reqs history (All)
  startDate?: Date | null;
  endDate?: Date | null;
  id?: string; //means it wants reqs for specific user
}> = (props) => {
  const [bamRequests, setBamRequests] = useState<IBamRequest[]>([]);
  const [wasBamRequestClicked, setWasBamRequestClicked] = useState(false);
  const [currentBamRequest, setCurrentBamRequest] =
    useState<IBamRequest | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const [newStatus, setNewStatus] = useState("PENDING");

  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  const stopPopUp = () => {
    setWasBamRequestClicked(false);
    reload();
  };

  const handleStatusClick = (bamReq: IBamRequest, status: string) => {
    console.log("clicked " + bamReq + " " + status);
    setNewStatus(status);
    setCurrentBamRequest(bamReq);
    setWasBamRequestClicked(true);
  };

  const reload = async () => {
    try {
      setIsLoading(true);
      let bamRequestsResponse;
      if (props.type != undefined) {
        bamRequestsResponse = await bamReqService.getBamReqs(
          token!,
          currentPage,
          { type: props.type, status: "PENDING" }
        );
        // console.log("currentPage", currentPage);
        // console.log(bamRequestsResponse.data.data.bamRequests);
      } else if (props.id != undefined) {
        bamRequestsResponse = await bamReqService.getReqsByUserId(
          token!,
          props.id,
          currentPage
        );
        console.log(bamRequestsResponse);
      } else {
        // means it wants the all req history
        bamRequestsResponse = await bamReqService.getBamReqs(
          token!,
          currentPage,
          { endDate: props.endDate!, startDate: props.startDate! }
        );
      }
      setBamRequests(bamRequestsResponse.data.data.bamRequests);
      setTotalPages(bamRequestsResponse.data.data.totalPages);
      setIsLoading(false);
    } catch (error) {
      // handle error in fetching
      setIsError(true);
      setIsLoading(false);
    }
  };

  //   useEffect(() => {
  //     reload();
  //   }, []);
  useEffect(() => {
    reload();
  }, [props.type, currentPage, props.endDate, props.startDate]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };
  /////lhkhilgiugliug
  return (
    <>
      {wasBamRequestClicked && (
        <StatusConfirmPopUp
          title={`are you sure u wish to ${newStatus} "${
            currentBamRequest!.title
          }" ?`}
          message={`submit reason: ${currentBamRequest!.submitReason}`}
          onConfirm={stopPopUp}
          newStatus={newStatus}
          reqId={currentBamRequest!._id}
        />
      )}
      {isLoading && !isError && <p>Loading......</p>}
      {!isLoading && isError && <p>an error has accured</p>}
      {!isLoading &&
        !isError &&
        bamRequests.length == 0 && props.endDate != undefined &&
        props.startDate != undefined && <p>no reqs were created in those dates</p>}
      {!isLoading &&
        !isError &&
        bamRequests.length == 0 &&
        props.type != undefined && <p>no reqs has this type</p>}
      {!isLoading && !isError && bamRequests.length !== 0 && (
        <>
          <div className={classes["table-container"]}>
            <table className={classes["styled-table"]}>
              <thead>
                <tr>
                  <th>title</th>
                  <th>type</th>
                  <th>submitReason</th>
                  <th>openedBy</th>
                  <th>createdAt</th>
                  <th>status</th>
                </tr>
              </thead>
              <tbody>
                {bamRequests.map((bamReq: IBamRequest, index) => (
                  <tr key={index}>
                    <ReqTableLine
                      bamReq={bamReq}
                      onStatusClick={handleStatusClick}
                      isReqsForApproval={props.type !== undefined}
                    />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages !== 1 && (
            <div>
              <button
                className={classes.arrow}
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                {"<"}
              </button>
              <span>
                {" "}
                Page {currentPage} of {totalPages}{" "}
              </span>
              <button
                className={classes.arrow}
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                {">"}
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ReqTable;

import { useState } from "react";
import BamRequestsList from "../components/request/BamRequestsList";
import classes from "../components/request/ReqTableLine.module.css";
import ReqForm from "../components/request/ReqForm";

const Home: React.FC = () => {
  const [wasNewBamReqClicked, setWasNewBamReqClicked] = useState(false);

  const handleNewBamReqClick = () => {
    setWasNewBamReqClicked(true);
  };

  const stopPopUp = () => {
    setWasNewBamReqClicked(false);
  };

  return (
    <>
      <div style={{ padding: "0 6rem" , overflowY: 'auto' }}>
        <BamRequestsList />
        <div className={classes.add} onClick={handleNewBamReqClick}>
          + New Bam Request
        </div>
        {wasNewBamReqClicked && <ReqForm onConfirm={stopPopUp} />}
      </div>
    </>
  );
};

export default Home;

import { useContext, useEffect, useState } from "react";
import AuthContext from "../store/auth-context";
import { useNavigate } from "react-router-dom";
import BamRequestsList from "../components/request/BamRequestsList";
import classes from "../components/request/ReqTableLine.module.css";
import ReqForm from "../components/request/ReqForm";

const Home: React.FC = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const navigate = useNavigate();
  const [wasNewBamReqClicked, setWasNewBamReqClicked] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login", { replace: true });
    }
  }, [isLoggedIn]);

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

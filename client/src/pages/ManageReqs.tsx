import { useContext, useEffect, useState } from "react";
import AuthContext from "../store/auth-context";
import { useNavigate } from "react-router-dom";
import classes from "../components/request/ReqTableLine.module.css";
import ReqForm from "../components/request/ReqForm";
import ReqTable from "../components/request/ReqTable";
import FilterButton from "../components/request/FilterButton";

const buttonsData: { id: number; label: string }[] = [
  { id: 1, label: "הכל" },
  { id: 2, label: "השחרה" },
  { id: 3, label: "כניסה רגלית" },
  { id: 4, label: "כניסה רכובה" },
  { id: 5, label: "קידוד חוגר" },
  { id: 6, label: 'חתימה על שו"ס' },
];

const ManageReqs: React.FC = () => {
  const authCtx = useContext(AuthContext);
  const isAdmin = authCtx.isAdmin;
  const [activeButtonId, setActiveButtonId] = useState<number>(1);
  const navigate = useNavigate();
  const [wasNewBamReqClicked, setWasNewBamReqClicked] = useState(false);

  useEffect(() => {
    if (!isAdmin) {
      navigate("/home", { replace: true });
    }
  }, [isAdmin]);

  const handleTypeFilterClick = (id: number) => {
    setActiveButtonId(id);
  };

  const handleNewBamReqClick = () => {
    setWasNewBamReqClicked(true);
  };

  const stopPopUp = () => {
    setWasNewBamReqClicked(false);
  };

  return (
    <>
      <div style={{ padding: "0 6rem", overflowY: "auto" }}>
        {isAdmin && (
          <>
            <p className={classes.title}>בקשות פתוחות לאישור</p>
            <div className={classes.filters}>
              {buttonsData.map((button) => (
                <FilterButton
                  key={button.id}
                  button={button}
                  isActive={activeButtonId === button.id}
                  onClick={handleTypeFilterClick}
                  classes={{chosen: classes.chosen , button: classes.button}}
                />
              ))}
            </div>
            <ReqTable
              type={
                buttonsData.find((item) => item.id === activeButtonId)!.label
              }
            />
          </>
        )}
        <div className={classes.add} onClick={handleNewBamReqClick}>
          + New Bam Request
        </div>
        {wasNewBamReqClicked && <ReqForm onConfirm={stopPopUp} />}
      </div>
    </>
  );
};

export default ManageReqs;

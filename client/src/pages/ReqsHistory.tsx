import DatePicker from "react-datepicker";
import ReqTable from "../components/request/ReqTable";
import { useState } from "react";
import classes from "../components/request/ReqTableLine.module.css";
import "react-datepicker/dist/react-datepicker.css";
import ReqForm from "../components/request/ReqForm";

const ReqsHistory: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [wasNewBamReqClicked, setWasNewBamReqClicked] = useState(false);

  const onDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    console.log("start", start?.toString());
    console.log("end", end?.toString());
    setStartDate(start);
    setEndDate(end);
  };
  const handleNewBamReqClick = () => {
    setWasNewBamReqClicked(true);
  };

  const stopPopUp = () => {
    setWasNewBamReqClicked(false);
  };

  return (
    <div style={{ padding: "0 6rem", overflowY: "auto" }}>
      <p className={classes.title}>היסטוריית בקשות</p>
      <div className={classes.dateDiv}>
        <p className={classes.dates}>בטווח התאריכים:</p>
        <DatePicker
          className={classes.datePicker}
          selected={startDate}
          onChange={onDateChange}
          startDate={startDate}
          endDate={endDate}
          selectsRange // Enables date range selection
          dateFormat="MM/dd/yyyy" // Ensures only date is displayed and handled
          placeholderText="Select a date range"
          isClearable={true}
        />
      </div>
      <ReqTable reqsHistory={true} startDate={startDate} endDate={endDate}/>
      <div className={classes.add} onClick={handleNewBamReqClick}>
          + New Bam Request
        </div>
        {wasNewBamReqClicked && <ReqForm onConfirm={stopPopUp} />} 
    </div>
  );
};

export default ReqsHistory;

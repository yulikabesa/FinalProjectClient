import React from "react";
import classes from "./HelpToolTip.module.css";

const HelpTooltip: React.FC<{
  helpText: string | undefined;
}> = (props) => {
  return (
    <div className={classes['tooltip-container']}>
      <span className={classes["help-icon"]}>?</span>
      <span className={classes['tooltip-text']}>reject reason:<br /> {props.helpText}</span>
    </div>
  );
};

export default HelpTooltip;

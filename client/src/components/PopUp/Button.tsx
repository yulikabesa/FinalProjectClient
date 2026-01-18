import React, { type ReactNode } from "react";
import classes from "./Button.module.css";

const Button: React.FC<{children?: ReactNode; type?: "button" | "submit" | undefined; onClick?: () => void, className?: string}> = (props) => {
  const btnClass = `${classes.button} ${props.className}`;
  return (
    <button
      className={btnClass}
      type={props.type || "button"}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;

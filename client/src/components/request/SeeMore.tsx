import { useState } from "react";

const SeeMore: React.FC<{ text: string; charactersLimit: number }> = (
  props
) => {
  const [isClicked, setIsClicked] = useState(false);
  const onClickHandler = () => {
    setIsClicked((prevIsOn) => !prevIsOn);
  };
  return (
    <>
      {props.text.length < props.charactersLimit ? (
        <p style={{ margin: "0" }}>{props.text}</p>
      ) : (
        <>
          <p style={{ display: "block", margin: "0" }}
            >
            {isClicked
              ? props.text
              : props.text.substring(0, props.charactersLimit) + "..."}{" "}
          </p>
          <p
            style={{ textDecoration: "underline", color: "blue", margin: "0" }}
            onClick={onClickHandler}
          >
            {isClicked ? "see less" : "see more"}
          </p>
        </>
      )}
    </>
  );
};

export default SeeMore;

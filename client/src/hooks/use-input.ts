import { useReducer, type ChangeEvent, type FocusEvent } from "react";

const inputStateReducer = (
  state: { value: string; isTouched: boolean },
  action:
    | {
        type: "INPUT" | "BLUR" | "RESET";
        value: string;
      }
    | { type: "INPUT" | "BLUR" | "RESET" }
) => {
  if (action.type === "INPUT" && "value" in action) {
    return { value: action.value, isTouched: state.isTouched };
  }
  if (action.type === "BLUR") {
    return { isTouched: true, value: state.value };
  }
  if (action.type === "RESET" && "value" in action) {
    return { isTouched: false, value: action.value };
  }
  return state;
};

const useInput = (
  validateValue: (value: string) => boolean,
  initionalValue?: string
) => {

  const initialInputState = {
    value:  initionalValue? initionalValue : "",
    isTouched: false,
  };

  const [inputState, dispatch] = useReducer(
    inputStateReducer,
    initialInputState
  );

  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const valueChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "INPUT", value: event.target.value });
  };

  const inputBlurHandler = (event: FocusEvent<HTMLInputElement>) => {
    dispatch({ type: "BLUR" });
  };

  const reset = () => {
    dispatch({ type: "RESET", value: initionalValue? initionalValue : "" });
  };

  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;

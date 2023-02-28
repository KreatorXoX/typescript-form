import { useCallback, useReducer } from "react";
type GeneralTaskType = {
  [key: string]: { value: string; isValid: boolean };
};
type State = {
  inputs: GeneralTaskType;
  isValid: boolean;
};
type Action =
  | { type: "INPUT_CHANGE"; inputId: string; value: string; isValid: boolean }
  | { type: "SET_DATA"; inputs: GeneralTaskType; validity: boolean };

const formReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      for (let inputId in state.inputs) {
        if (state.inputs[inputId] === undefined) continue;
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };
    case "SET_DATA":
      return {
        inputs: {
          ...state.inputs,
          ...action.inputs,
        },
        isValid: action.validity,
      };
    default:
      return state;
  }
};

export const useForm = (
  initialInputs: GeneralTaskType,
  initialValidity: boolean
) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: initialValidity,
  });

  const inputHandler = useCallback(
    (id: string, value: string, isValid: boolean) => {
      dispatch({
        type: "INPUT_CHANGE",
        inputId: id,
        value: value,
        isValid: isValid,
      });
    },
    []
  );
  const dropdownHandler = useCallback(
    (id: string, value: string, isValid: boolean) => {
      dispatch({
        type: "INPUT_CHANGE",
        inputId: id,
        value: value,
        isValid: isValid,
      });
    },
    []
  );

  const SetData = useCallback(
    (newInputs: GeneralTaskType, newValidity: boolean) => {
      dispatch({
        type: "SET_DATA",
        inputs: newInputs,
        validity: newValidity,
      });
    },
    []
  );

  return { formState, inputHandler, dropdownHandler, SetData };
};

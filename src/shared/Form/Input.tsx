import React, { useReducer, useEffect } from "react";
import { Validators } from "../../utils/validators";
import { validate } from "../../utils/validators";
import MultiSelect from "./MultiSelect";

type State = {
  value: string | string[];
  isValid: boolean;
  isTouched: boolean;
};

type Action =
  | { type: "CHANGE"; val: string; validators: Validators[] }
  | { type: "SELECT"; val: Option; validators: Validators[] }
  | { type: "TOUCH" };

const inputReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case "SELECT":
      if (action.val.label === "clear") {
        if (action.val.value === "all") {
          return {
            ...state,
            value: [],
            isValid: validate([], action.validators),
          };
        } else {
          const newValues = (state.value as string[]).filter(
            (val) => val !== action.val.value
          );
          return {
            ...state,
            value: newValues,
            isValid: validate(newValues, action.validators),
          };
        }
      } else if (state.value.includes(action.val.value)) {
        const newValues = (state.value as string[]).filter(
          (val) => val !== action.val.value
        );
        return {
          ...state,
          value: newValues,
          isValid: validate(newValues, action.validators),
        };
      } else
        return {
          ...state,
          value: [...state.value, action.val.value],
          isValid: validate(action.val.value, action.validators),
        };
    case "TOUCH":
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
};

function FormInput(props: GeneralInputProps) {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || "",
    isValid: props.initialValid || false,
    isTouched: false,
  });

  const { id, onInputChange } = props;
  const { value, isValid } = inputState;
  useEffect(() => {
    onInputChange(id, value, isValid);
  }, [id, value, isValid, onInputChange]);

  const changeHandler = (
    event:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    dispatch({
      type: "CHANGE",
      val: event.target.value,
      validators: props.validators,
    });
  };
  const selectHandler = (element: Option) => {
    dispatch({
      type: "SELECT",
      val: element,
      validators: props.validators,
    });
  };

  const touchHandler = () => {
    dispatch({
      type: "TOUCH",
    });
  };

  let component =
    props.element === "text" ? (
      <input
        id={props.id}
        className={props.classes}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
        disabled={props.disabled}
      />
    ) : props.element === "textarea" ? (
      <textarea
        id={props.id}
        className={props.classes}
        rows={props.rows || 3}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
        disabled={props.disabled}
      />
    ) : props.element === "select" ? (
      <select
        id={props.id}
        className={props.classes}
        name={props.id}
        onChange={changeHandler}
        onBlur={touchHandler}
        defaultValue={"default"}
        disabled={props.disabled}
      >
        {props.options}
      </select>
    ) : (
      <MultiSelect
        id={props.id}
        className={props.classes!}
        onChange={selectHandler}
        onBlur={touchHandler}
        disabled={props.disabled}
        options={props.multiSelectOpts!}
        value={inputState.value}
      />
    );

  return (
    <div className="flex justify-center items-start w-full">
      <div className="w-full form-controller">
        <label htmlFor={props.id}>{props.label}</label>
        {component}
        <div className="errorLabel">
          {!inputState.isValid && inputState.isTouched && (
            <span className="text-red-600 text-xs font-semibold italic">
              {props.errorText}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default FormInput;

/*
Usage : export the validate function and then export the validator function you want.
wherever you wanna get the true or false validation execute the validate function like:
validate(inputState,VALIDATOR_REQUIRE());
validate(inputState,VALIDATOR_MIN(1));
*/

const VALIDATOR_TYPE_REQUIRE = "REQUIRE";
const VALIDATOR_TYPE_REQUIRE_SELECT = "SELECTREQUIRE";
const VALIDATOR_TYPE_MINLENGTH = "MINLENGTH";
const VALIDATOR_TYPE_MAXLENGTH = "MAXLENGTH";
const VALIDATOR_TYPE_MIN = "MIN";
const VALIDATOR_TYPE_MAX = "MAX";
const VALIDATOR_TYPE_EMAIL = "EMAIL";
const VALIDATOR_TYPE_FILE = "FILE";

export type Validators = {
  type: string;
  val?: string | number;
};

export const VALIDATOR_REQUIRE = () => ({ type: VALIDATOR_TYPE_REQUIRE });
export const VALIDATOR_REQUIRE_SELECT = () => ({
  type: VALIDATOR_TYPE_REQUIRE_SELECT,
});
export const VALIDATOR_FILE = () => ({ type: VALIDATOR_TYPE_FILE });
export const VALIDATOR_EMAIL = () => ({ type: VALIDATOR_TYPE_EMAIL });

export const VALIDATOR_MINLENGTH = (val: string | number) => ({
  type: VALIDATOR_TYPE_MINLENGTH,
  val: val,
});
export const VALIDATOR_MAXLENGTH = (val: string | number) => ({
  type: VALIDATOR_TYPE_MAXLENGTH,
  val: val,
});
export const VALIDATOR_MIN = (val: string | number) => ({
  type: VALIDATOR_TYPE_MIN,
  val: val,
});
export const VALIDATOR_MAX = (val: string | number) => ({
  type: VALIDATOR_TYPE_MAX,
  val: val,
});

export const validate = (value: string | number, validators: Validators[]) => {
  let isValid = true;
  for (const validator of validators) {
    if (validator.type === VALIDATOR_TYPE_REQUIRE) {
      isValid = isValid && (value as string).trim().length > 0;
    }
    if (validator.type === VALIDATOR_TYPE_REQUIRE_SELECT) {
      isValid = isValid && value !== "default";
    }
    if (validator.type === VALIDATOR_TYPE_MINLENGTH) {
      isValid = isValid && (value as string).trim().length >= validator.val!;
    }
    if (validator.type === VALIDATOR_TYPE_MAXLENGTH) {
      isValid = isValid && (value as string).trim().length <= validator.val!;
    }
    if (validator.type === VALIDATOR_TYPE_MIN) {
      isValid = isValid && +value >= validator.val!;
    }
    if (validator.type === VALIDATOR_TYPE_MAX) {
      isValid = isValid && +value <= validator.val!;
    }
    if (validator.type === VALIDATOR_TYPE_EMAIL) {
      isValid =
        isValid &&
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value as string);
    }
  }
  return isValid;
};

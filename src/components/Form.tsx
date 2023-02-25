import { FormEvent } from "react";
import { useForm } from "../shared/Form/form-hook";
import FormInput from "../shared/Form/Input";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE_SELECT,
} from "../utils/validators";
type Props = {};

const arr = ["red", "blue", "purple", "orange"];
const typeers = arr.map((item, idx) => <option key={idx}>{item}</option>);
const Form = (props: Props) => {
  const { formState, inputHandler } = useForm(
    {
      firstName: { value: "", isValid: false },
      favoriteColor: { value: "", isValid: false },
      email: { value: "", isValid: false },
      password: { value: "", isValid: false },
      description: { value: "", isValid: false },
    },
    false
  );

  const formSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    if (formState.isValid) console.log(formState.inputs);
    else return;
  };
  return (
    <form
      onSubmit={formSubmitHandler}
      className="px-5 py-7 flex flex-col items-center rounded-lg border space-y-12 w-[40rem] text-slate-200"
    >
      <h2 className="font-bold text-2xl mb-10">Form Title</h2>
      <div className="w-full flex md:flex-row flex-col gap-4">
        {/* classic text input */}
        <FormInput
          element="text"
          type="text"
          id="firstName"
          label="First Name"
          placeholder="Your name goes here"
          value={formState.inputs.firstName.value}
          errorText="Name must be at least 3 chars"
          validators={[VALIDATOR_MINLENGTH(3)]}
          onInputChange={inputHandler}
        />

        {/* select-option input */}
        <FormInput
          element="select"
          id="favoriteColor"
          label="Favorite Color"
          onInputChange={inputHandler}
          options={[
            <option key="123" value="default">
              Select One
            </option>,
            ...typeers,
          ]}
          value={formState.inputs.favoriteColor.value}
          validators={[VALIDATOR_REQUIRE_SELECT()]}
          errorText="Selection is Required"
        />
      </div>
      <div className="w-full flex md:flex-row flex-col gap-4">
        {/* email text input */}
        <FormInput
          element="text"
          type="email"
          id="email"
          label="E-mail"
          placeholder="example@gmail.com"
          value={formState.inputs.email.value}
          errorText="Must be a valid email"
          validators={[VALIDATOR_EMAIL()]}
          onInputChange={inputHandler}
        />
        {/* password text input */}
        <FormInput
          element="text"
          type="password"
          id="password"
          label="Password"
          placeholder="********"
          value={formState.inputs.password.value}
          errorText="Password must be at least 6 chars"
          validators={[VALIDATOR_MINLENGTH(6)]}
          onInputChange={inputHandler}
        />
      </div>
      <div className="w-full">
        {/* textarea input */}
        <FormInput
          element="textarea"
          id="description"
          label="Description"
          onInputChange={inputHandler}
          value={formState.inputs.description.value}
          validators={[VALIDATOR_MINLENGTH(20)]}
          errorText="Description must be at least 20 chars"
        />
      </div>

      <button
        disabled={!formState.isValid}
        type="submit"
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition-colors duration-200
        text-white rounded disabled:bg-gray-500"
      >
        Submit the form
      </button>
    </form>
  );
};

export default Form;

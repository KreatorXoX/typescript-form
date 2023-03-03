type Option = {
  label: string;
  value: string;
};

type MultiSelect = {
  id: string;
  value: string | string[];
  onChange: (option: Option) => void;
  onBlur: () => void;
  disabled?: boolean;
  options: Option[];
  className: string;
};

type GeneralInputProps = {
  classes?: string;
  initialValue?: string;
  initialValid?: boolean;
  element: "select" | "textarea" | "text" | "multi";
  type?: "text" | "email" | "password" | "url" | "number";
  id: string;
  label?: string;
  placeholder?: string;
  value: string | string[];
  options?: JSX.Element[];
  multiSelectOpts?: Option[];
  rows?: number;
  disabled?: boolean;
  errorText: string;
  validators: Validators[];
  onInputChange: (
    id: string,
    value: string | string[],
    isValid: boolean
  ) => void;
};

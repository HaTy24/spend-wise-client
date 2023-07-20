import { ChangeEvent, FC, HTMLInputTypeAttribute } from "react";
import { DebounceInput } from "./DebounceInput";

interface Props {
  id: string;
  name: string;
  debounce?: boolean;
  label?: string;
  type?: HTMLInputTypeAttribute | undefined;
  value: string | number | Date;
  positiveNumber?: boolean;
  min?: number;
  handleChange: (e: ChangeEvent<any>) => void;
  error?: string;
}
export const FormInput: FC<Props> = ({
  id,
  name,
  label,
  debounce,
  type = "text",
  value,
  positiveNumber,
  min,
  handleChange,
  error,
}) => {
  return (
    <>
      {label && (
        <label htmlFor={id} className="form-label">
          {label}
        </label>
      )}
      {debounce ? (
        <DebounceInput
          handleChange={handleChange}
          id={id}
          name={name}
          type={type}
          positiveNumber={positiveNumber}
          min={min}
          error={error}
        />
      ) : (
        <>
          <input
            id={id}
            name={name}
            type={type}
            className="form-control"
            onChange={handleChange}
            value={value as string}
          />
          {error && <div className="form-text text-danger">{error}</div>}
        </>
      )}
    </>
  );
};

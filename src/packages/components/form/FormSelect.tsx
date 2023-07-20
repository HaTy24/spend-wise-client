import { ChangeEvent, FC, HTMLInputTypeAttribute } from "react";

interface Props {
  id: string;
  name: string;
  label?: string;
  value: string;
  options: [{ label: string; value: string }];
  handleChange: (e: ChangeEvent<any>) => void;
  className?: string;
}
export const FormSelect: FC<Props> = ({
  id,
  name,
  label,
  options,
  value,
  handleChange,
  className,
}) => {
  return (
    <>
      {label && (
        <label htmlFor={id} className="form-label">
          {label}
        </label>
      )}
      <select
        name={name}
        id={id}
        className={`form-select ${className}`}
        value={value}
        onChange={handleChange}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
};

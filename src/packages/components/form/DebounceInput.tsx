"use client";

import {
  ChangeEvent,
  FC,
  HTMLInputTypeAttribute,
  useEffect,
  useState,
} from "react";

interface Props {
  id: string;
  value?: string;
  name: string;
  handleChange: (e: ChangeEvent<any>) => void;
  positiveNumber?: boolean;
  min?: number;
  type: HTMLInputTypeAttribute | undefined;
  error?: string;
}
export const DebounceInput: FC<Props> = ({
  id,
  type,
  name,
  positiveNumber,
  min,
  value,
  handleChange,
  error,
}) => {
  const [inputValue, setInputValue] = useState<ChangeEvent<any> | any>();

  const handleInputChange = (event: ChangeEvent<any>) => {
    setInputValue(event);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleChange(inputValue);
    }, 500);
    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue, 500]);

  if (type === "number" && (positiveNumber || min)) {
    return (
      <>
        <input
          type={type}
          className="form-control"
          id={id}
          min={min || 0}
          value={value}
          onChange={handleInputChange}
        />
        {error && <div className="form-text text-danger">{error}</div>}
      </>
    );
  }

  return (
    <>
      <input
        id={id}
        name={name}
        type={type}
        className="form-control"
        value={value}
        onChange={handleInputChange}
      />
      {error && <div className="form-text text-danger">{error}</div>}
    </>
  );
};

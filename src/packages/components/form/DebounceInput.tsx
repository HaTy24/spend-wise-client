"use client";

import {
  FC,
  HTMLInputTypeAttribute,
  SetStateAction,
  useEffect,
  useState,
} from "react";

interface Props {
  id?: string;
  defaultValue?: string;
  onChange: (value: any) => void;
  positiveNumber?: boolean;
  min?: number;
  type?: HTMLInputTypeAttribute | undefined;
}
export const DebounceInput: FC<Props> = ({
  id,
  type,
  positiveNumber,
  min,
  defaultValue,
  onChange,
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onChange(inputValue);
    }, 500);
    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue, 500]);

  if (type === "number" && (positiveNumber || min)) {
    return (
      <input
        type={type}
        className="form-control"
        id={id}
        min={min || 0}
        defaultValue={defaultValue}
        onChange={handleInputChange}
      />
    );
  }

  return (
    <input
      type={type}
      className="form-control"
      id={id}
      defaultValue={defaultValue}
      onChange={handleInputChange}
    />
  );
};

import { FC } from "react";

interface Props {
  text: string;
  isSubmitting: boolean;
  disable: boolean;
  type?: "button" | "reset" | "submit" | undefined;
}
export const Button: FC<Props> = ({
  text,
  isSubmitting,
  disable,
  type = "button",
}) => {
  return (
    <button type={type} className="btn btn-primary" disabled={disable}>
      {isSubmitting ? (
        <div className="spinner-border spinner-border-sm" role="status" />
      ) : (
        text
      )}
    </button>
  );
};

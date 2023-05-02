import React, { FC } from "react";

interface SpinnerProps {
  size?: "md" | "lg";
}

const Spinner: FC<SpinnerProps> = ({ size = "sm" }) => {
  return (
    <span
      className={`animate-spin inline-block ${
        size === "lg" ? "w-8 h-8" : "w-3 h-3"
      } mr-3 border-4 border-y-0`}
      role="status"
      style={{ borderRadius: "100%" }}
    ></span>
  );
};

export default Spinner;

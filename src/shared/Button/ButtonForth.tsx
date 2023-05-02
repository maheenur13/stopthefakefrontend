import Button, { ButtonProps } from "shared/Button/Button";
import React from "react";

export interface ButtonForthProps extends ButtonProps {}

const ButtonForth: React.FC<ButtonForthProps> = ({
  className = "text-neutral-700 border border-neutral-200 dark:text-neutral-200 dark:border-neutral-700 forth-btn",
  ...args
}) => {
  return <Button className={`ttnc-ButtonForth ${className}`} {...args} />;
};

export default ButtonForth;

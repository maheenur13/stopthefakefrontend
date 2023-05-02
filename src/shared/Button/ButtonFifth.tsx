import Button, { ButtonProps } from "shared/Button/Button";
import React from "react";

export interface ButtonFifthProps extends ButtonProps {}

const ButtonFifth: React.FC<ButtonFifthProps> = ({
  className = "text-neutral-700 border border-neutral-200 dark:text-neutral-200 dark:border-neutral-700 fifth-btn",
  ...args
}) => {
  return <Button className={`ttnc-ButtonFifth ${className}`} {...args} />;
};

export default ButtonFifth;

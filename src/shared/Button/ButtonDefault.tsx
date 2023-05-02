import Button, { ButtonProps } from "shared/Button/Button";
import React from "react";

export interface ButtonDefaultProps extends ButtonProps {}

const ButtonDefault: React.FC<ButtonDefaultProps> = ({
  className = "text-neutral-700 border border-neutral-200 dark:text-neutral-200 dark:border-neutral-700 defaultBorderColor",
  ...args
}) => {
  return <Button className={`ttnc-ButtonDefault ${className}`} {...args} />;
};

export default ButtonDefault;

import React, { FC } from "react";

export interface TermsAndConditionsCardProps {
  sr: number;
  title: string;
  desc: string;
}

const TermsAndConditionsCard: FC<TermsAndConditionsCardProps> = ({
  sr,
  title,
  desc,
}) => {
  return (
    <div style={{ marginBottom: "15px" }}>
      <h3 style={{ marginBottom: "10px", fontWeight: "bolder" }}>
        {sr + ". " + title}
      </h3>
      <p>{desc}</p>
    </div>
  );
};

export default TermsAndConditionsCard;

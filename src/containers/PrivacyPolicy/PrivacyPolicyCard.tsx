import React, { FC } from "react";

export interface PrivacyPolicyCardProps {
  title: string;
  description: string;
}

const PrivacyPolicyCard: FC<PrivacyPolicyCardProps> = ({
  title,
  description,
}) => {
  return (
    <div style={{ marginBottom: "15px" }}>
      <h3 style={{ marginBottom: "10px", fontWeight: "bolder" }}>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default PrivacyPolicyCard;

import React, { FC } from "react";

export interface FAQCardProps {
  question: string;
  answer: string;
}

const FAQCard: FC<FAQCardProps> = ({ question, answer }) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <h2
        style={{ fontWeight: "bolder", marginBottom: "10px", fontSize: "20px" }}
      >
        {question}
      </h2>
      <p>{answer}</p>
    </div>
  );
};

export default FAQCard;

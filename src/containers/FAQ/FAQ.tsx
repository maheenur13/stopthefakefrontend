import HeaderLogged from "components/Header/HeaderLogged";
import Heading from "components/Heading/Heading";
import React, { FC } from "react";
import { Helmet } from "react-helmet";
import Footer from "shared/Footer/Footer";
import FAQCard from "./FAQCard";

export interface FAQProps {}

export const faqs = [
  {
    sr: 1,
    question: "How accurate are your results ?",
    answer:
      "Our team is made up of only the best legit checkers within the industry. We have strict standards of procedure on the checking process, and submissions go through our comprehensive AI database before results are shared with you.",
  },
  {
    sr: 2,
    question: "How long do I need to wait to see my results ?",
    answer:
      "We have three options depending on how urgently you need to hear back, if we reply with late, you need you refer of article 18",
  },
  {
    sr: 3,
    question: "What brands can you verify ?",
    answer:
      "We can verify all articles ( sneakers, clothings and many accesories) off all brands. You can legit check your Lacoste t -shirt like your off white sneakers, we work with many shop of Fabrot street on Aix-en-Provence.",
  },
  {
    sr: 4,
    question:
      "My submission is missing one or more of the required pictures. Can you still verify my sneakers ?",
    answer:
      "We legit check only on the pictures you send on our website, the quality of our services is in relation with the pictures of your send. We will refund your credits if we are unable to authenticate your sneakers. (on our knowledge, not refund if it's impossible to verify because you not put or put very bad pictures)",
  },
  {
    sr: 5,
    question: "How does the legit check process work?",
    answer:
      "First, we scan your submitted data through our AI database, which points out any potential discrepancies and compares your sneakers with authenticated versions. Then, two of our experts will manually verify results based on their expertise and knowledge about your sneakers. They will give a pass/no pass/unable to verify rating.",
  },
  {
    sr: 6,
    question: "My legit check exceeded my requested time frame. ?",
    answer:
      "Delayed results may mean our team require additional images or time for verification, to ensure as accurate as possible results. Once we exceed your selected time frame, we will fully refund your credits with new credit on your account, not refund with money.",
  },
  {
    sr: 7,
    question: "What forms of payment do you accept ?",
    answer:
      "We accept VISA and MASTERCARD at the moment. Other forms of payment will be available soon.",
  },
  {
    sr: 8,
    question: "How will I know when my results are ready ?",
    answer:
      "Once your legit check is complete, results will be displayed under “My Check Requests”. Turn on notifications for immediate updates.",
  },
  {
    sr: 9,
    question: "Other platforms are giving me results different from yours. ?",
    answer:
      "Although rare, this is not an impossible occurrence. We are happy to help our users with any further authentication to support their claim.",
  },
  {
    sr: 10,
    question: "Do you have any bulk credit purchase options ?",
    answer: "Please email us at contact@stopthefake.fr",
  },
];

const FAQ: FC<FAQProps> = () => {
  return (
    <>
      <HeaderLogged />
      <Helmet>
        <title>Stopthefake - Legit-check your item</title>
      </Helmet>
      <div className="overflow-hidden relative">
        <div className="container">
          <Heading
            style={{ margin: "40px 0px", textTransform: "uppercase" }}
            isCenter
          >
            Frequently Asked Questions
          </Heading>
          <div>
            {faqs.map((item, index) => (
              <FAQCard
                question={item.question}
                answer={item.answer}
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FAQ;

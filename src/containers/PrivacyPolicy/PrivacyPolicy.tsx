import HeaderLogged from "components/Header/HeaderLogged";
import Heading from "components/Heading/Heading";
import React, { FC } from "react";
import { Helmet } from "react-helmet";
import Footer from "shared/Footer/Footer";
import PrivacyPolicyCard from "./PrivacyPolicyCard";

export interface PrivacyPolicyProps {}

const policies = [
  {
    sr: 1,
    title: "Our commitment to your privacy",
    description:
      'The Stopthefake website and services are owned and operated by Stopthefake. At Stopthefake, we understand that you value your privacy and we want to help you make your experience with our site and our services (collectively referred to in this policy as "Services") satisfactory and safe. This policy describes our collection of information, including personal information, in relation to our Services, and explains how we use and let\'s disclose this information.',
  },
  {
    sr: 2,
    title: "Personal information",
    description:
      '"Personal Information", as used in this policy, is information that may be used to identify a person, such as name, email address or credit card number credit of a person.',
  },
  {
    sr: 3,
    title: "How we collect personal information",
    description:
      "We collect personal information in connection with the provision of our Services, including through your optional and voluntary submissions, such as information you give to us provide when you register for our Services, or through your use of our Services. When you sign up with us for an account, we may collect information such as your name and email address. You can also provide us with personal information by other means, for example by requesting user assistance. We may receive personal information from third parties about their users, and may combine this information along with other personal information that we keep about you. If we do, this policy also governs the combined information.",
  },
  {
    sr: 4,
    title: "How we use personal information",
    description:
      "We use the personal information we collect to provide, improve and develop our services, to personalize your user experience, to respond to your requests or requests, to prevent or investigate fraudulent or inappropriate use of our services, for research and development, to analyze trends, and for other purposes described in this policy. In addition, we may use your email address to provide product information and marketing messages. You can opt out of receiving these marketing messages by following the instructions provided in messages to unsubscribe from communication by e-mail or by sending an e- email to the address provided at the end of this policy.",
  },
  {
    sr: 5,
    title: "How we share personal information",
    description:
      'We may also provide personal information to our subsidiaries, affiliates and others trusted companies or persons for the purpose of providing our services and for other purposes described in this policy. We limit the personal information shared with these third parties to what is necessary to perform these functions. We may share personal information with third parties (including authorities regulatory or law enforcement) in order to respond to a user\'s request or if we believe it is legally required or in our best interests to protect our property or others legal rights (including, but not limited to, the enforcement of our agreements), or rights or property of others. If you post any of your information in a public area of ​​our Services, please be aware that it is not plus "personal information" for the purposes of this policy, and that we or any other person can use this information without restriction. If you give access to personal information or others, including your email address or name, to a limited number of other users through any of our privacy controls or other settings, please understand that Stopthefake has no control over how others may collect, use or disclose this information.',
  },
  {
    sr: 6,
    title: "Non-personal information we collect and how we use it",
    description:
      "We may also collect information that is not personally identifiable, and may aggregate personal information or otherwise make it anonymous (i.e. no personally identifiable). We may use non-personally identifiable information that we collect to provide, improve and develop our services and otherwise to personalize your user experience, to prevent or investigate fraudulent or inappropriate use of our services, for research and development, and for other purposes described in this policy. We may use this anonymous information for various purposes and share it with third parties. You will find below are some examples of the types of non-personal information we collect and the specific examples of how we use this information: Usage monitoring. We may collect non-personal information from your use of our Services. For example, we may collect information about user traffic and usage patterns on our site, as well as similar information regarding the use of our Services. We may also track click information, such as IP addresses, from messages we send to our users. We use the information we collect from these ways to, for example, improve our services, develop new products and services, evaluate the effectiveness of our marketing campaigns, discourage and fight against abusive and fraudulent use of our services, and to help our users with troubleshooting issues. Collection methods. We passively collect non-personal information using technologies such as standard server logs, cookies and clear GIFs (also called “Web beacons”). When you visit our site or use our services, we may send an or several cookies - a small file containing a string of characters - on your computer that identifies uniquely your browser or recognizes a cookie that is already on your computer. We use cookies to improve the quality of our service by storing user preferences and tracking user trends, and to personalize your experience. Most of browsers are initially set to accept cookies, but you can reset your browser to refuse all cookies or to indicate when a cookie is being sent. However, some services may not function properly if your cookies are disabled. Know also that third parties may install cookies on your hard drive or use other means of passively collect information about your use of their services or content. We have neither access or control over these third party passive data collection means. If we directly combine non-personal information collected by passive means with personal information, we treat the combined information as personal information personal data under this policy. Otherwise, we use information collected by passive means in aggregate or non-personally identifiable forms.",
  },
  {
    sr: 7,
    title: "Our commitment to data security",
    description:
      "In an effort to prevent unauthorized access, maintain data accuracy and ensure the correct use of the information, we have put in place physical, electronic and management to protect and secure the information we collect online. Know however that no data transmission over the Internet or other networks can be 100% guaranteed. Through Therefore, we cannot guarantee or guarantee the security or integrity of any information you give us. transmit. You provide information to us at your own risk. Once we receive personal information, we make reasonable efforts to protect it from access, unauthorized disclosure, alteration or destruction. But we cannot represent nor guarantee that personal information will not be viewed, disclosed, modified or destroyed. If stopthefake learns of a security systems breach, we may attempt to notify you. electronically so that you can take appropriate protective measures. Stopthefake may post a notice via the Services in the event of a security breach. If this happens, you will need a web browser allowing you to access the Services. Stopthefake can also send you an e- mail to the email address you provided to us in these circumstances. Depending on where you live, you may have a legal right to receive notice of a security breach in writing.",
  },
  {
    sr: 8,
    title: "Third-party sites and services",
    description:
      "Our services may contain links to and interact with third party sites and services. All links or interoperability with third party sites or services are provided solely for your convenience, and we have no control over the content or the privacy and security practices and policies of these third. Any personal information you provide to another third party is subject to the the privacy practices and policies of that third party, and not this policy. We encourage you to learn about their privacy and security practices and policies before providing them with personal informations.",
  },
  {
    sr: 9,
    title: "Business transfers",
    description:
      "Information about our users, including personal information, may be disclosed in connection with any merger, acquisition, debt financing, sale of company assets or similar transaction, as well as in the unlikely event of insolvency, bankruptcy or bankruptcy in receivership in which the information would be transferred as one of our business assets.",
  },
  {
    sr: 10,
    title: "International visitors",
    description:
      "The Services are hosted and provided from France . If you use our Services from other regions with laws governing the collection and use of data which may differ from France.Please note that you are transferring your personal data in France. By providing your personal information, you consent to the transfer of your data personal information to France and the use of your personal information, in accordance with this Politics.",
  },
  {
    sr: 11,
    title: "Retention and disposal of information",
    description:
      "We can keep personal information for as long as we need it. commercial or when applicable laws or regulations or government orders oblige to keep them. In addition, the Service may allow you (or other users) to record information, including information that you have made public or that you have authorized to some users to access or view.",
  },
  {
    sr: 12,
    title: "Changes and Updates",
    description:
      "We may occasionally update this policy. When we do, we'll revise also the “ldescritionast updated” date at the top of this policy. We encourage you to periodically review this policy to stay informed of our collection, use and disclosure of personal information.",
  },
  {
    sr: 13,
    title: "How to contact us",
    description:
      "If you have any other questions or concerns regarding this privacy policy, please contact us using the following coordinates: contact@stopthefake.fr",
  },
];

const PrivacyPolicy: FC<PrivacyPolicyProps> = () => {
  return (
    <>
      <HeaderLogged />
      <Helmet>
        <title>Stopthefake - Legit-check your item</title>
      </Helmet>
      <div className="container">
        <Heading
          desc="Last Updated: April 15, 2021"
          isCenter
          style={{ marginTop: "40px" }}
        >
          PRIVACY POLICY
        </Heading>
        <div style={{ marginTop: "40px" }}>
          {policies.map((item, index) => (
            <PrivacyPolicyCard
              title={item.title}
              description={item.description}
              key={index}
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;

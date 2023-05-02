import HeaderLogged from "components/Header/HeaderLogged";
import Heading from "components/Heading/Heading";
import { FC } from "react";
import { Helmet } from "react-helmet";
import Footer from "shared/Footer/Footer";
import TermsAndConditionsCard from "./TermsAndConditionsCard";

export interface TermsAndConditionsProps {}

const terms = [
  {
    sr: 1,
    title: "Welcome to stopthefake",
    desc: "By accessing stopthefake's website, mobile application or computer (collectively, the “Service”), you are bound by these Terms of Service (this “Agreement”), whether you create or not a stopthefake account. If you would like to create a stopthefake account and use the service, please read these Terms of Service. These Terms govern your rights and obligations (whether as a guest or registered user) regarding access and / or use of the website, or any internet service of stopthefake (including any related software provided by stopthefake ) (collectively the “Platform”) under the control or ownership of stopthefake. These Conditions constitute a binding legal agreement between stopthefake and you, the user of the Platform and / or the Service.",
  },
  {
    sr: 2,
    title: "Application license",
    desc: "2.1 Subject to your compliance with these Terms, we grant you a limited, non-exclusive, non-transferable license to download and install a copy of the App on your mobile device and to run that copy of the App solely for your personal use. 2.2 Your use of stopthefake does not confer on you any rights with respect to our intellectual property rights (including, without limitation, copyrights, trademarks, logos, graphics, photographs, animations, videos and texts or rights in and application and applications) or the intellectual property of our business or advertising partners, other than the non-transferable personal right to use and receive the Services in accordance with these Terms. 2.3 You must not license, sublicense, sell, resell, transfer, assign, distribute or commercially exploit or make available to a third party the Services or the App in any way; modify or create derivative works based on the Services or the Application; create Internet “links” to the Services or “frame” or “mirror” any application on any other wireless or Internet-based server or device; reverse engineer or access the application to design or build a competitive product or service, design or create a product using similar ideas, features, functions or graphics of the services or application, or copy any ideas, features, functions or graphics from the Services or Application, or launch any automated program or script, including, but not limited to, web spiders, web crawlers, web robots, web ants, web indexers, bots, viruses or worms, or any program that may make multiple server requests per second, or excessively load or interfere with the operation and / or performance of the Services or The App will remove any copyright, trademark or other proprietary notice from any part of the Services attempting to gain unauthorized access to or alter any aspect of the Services or its associated systems or networks.",
  },
  {
    sr: 3,
    title:
      "For stopthefake, we believe consumers always come first with sponsored posts. Therefore, brands and checklists must ensure that no campaign or post is false or misleading. No advertising of illicit products or services is accepted via our website or our various networks, in accordance with each other's international rights.",
    desc: "",
  },
  {
    sr: 4,
    title: "Account deletion.",
    desc: "This agreement will remain in full force and effect while you use the service and / or have an account registered with stopthefake. The Company may terminate or suspend your account at any time without notice if the Company believes that you have violated this Agreement, or for any other reason, with or without cause, in its sole discretion. Upon such termination or suspension, you will not be entitled to any refund of any unused charges for in-app purchases. The Company is under no obligation to disclose, and may be prohibited by law from disclosing, the reason for terminating or suspending your account. After termination of your account for any reason, all terms of this Agreement survive such termination and remain in full force, except for terms which by their nature expire or are fully satisfied..",
  },
  {
    sr: 5,
    title: "Your responsibility",
    desc: "5.1 You are responsible for your use of the Services, for any Content you post on the Services and for its consequences. Most of the content that you submit, post or display through the service will be available to other users and to others with whom you can share it. You should only provide Content that you are comfortable sharing with others under these Terms. 5.2 You may only use the Services if you can enter into a binding contract with stopthefake and are not a person prohibited from receiving services under French law or another applicable jurisdiction. You acknowledge that you are at least 16 years old. If you agree to these Terms and use the Services on behalf of a business, organization, government, or other legal entity, you represent and warrant that you are authorized to do so. You may only use the Services in accordance with these Terms and all applicable local, regional, national and international laws, rules and regulations. 5.3 The services provided by stopthefake are constantly evolving and the form and nature of the services provided by stopthefake may change from time to time without notice. In addition, stopthefake may cease (permanently or temporarily) to provide the Services to you (or any functionality of the Services) or to users in general and may not be able to provide you with prior notice. We also reserve the right to create usage and storage limits at our sole discretion at any time without notice.",
  },
  {
    sr: 6,
    title: "Confidentiality",
    desc: "Any information that you or other users provide to stopthefake is subject to our privacy policy, which governs our collection and use of your information. You understand that by using the Services, you consent to the collection and use (as set out in the Privacy Policy) of such information, including the transfer, storage, processing and use by stopthefake. In connection with providing the Services, we may need to provide you with certain communications, such as service announcements, notifications, and administrative messages. These communications are considered part of the Services and of your account, which you may not be able to opt out of receiving.",
  },
  {
    sr: 7,
    title: "Login and passwords on our website",
    desc: '7.1 You must take all necessary measures to protect your login information (username and password) for the Service and keep them secret. We encourage you to use "strong" passwords (passwords that use a combination of upper and lower case letters, numbers and symbols) with your account. You received not to give your login information to already allow to use your login information or your account. 7.2 If you fail to keep your login details secret, or if you share your login details or account with someone else (whether intentionally or not), you are fully responsible for the consequences of this (including any unauthorized purchase or sale) and to fully indemnify us for any loss or damage that may arise. 7.3 We will not be liable to you for any loss you suffer as a result of an unauthorized person accessing your account and using our Services and we accept no liability for any loss or damage resulting from its unauthorized use, whether fraudulently or not.',
  },
  {
    sr: 8,
    title: "Content on services and private messages via social networks",
    desc: "All content, whether posted publicly or transmitted privately, is the sole responsibility of the person who made that content. We may not be able to monitor or control every piece of content posted through the Services and we cannot take responsibility for that content. Any use of or reliance on any Content or material posted through the Services or that you have obtained through the Services is at your own risk. We cannot and cannot endorse, support, represent or warrant the completeness, truthfulness, accuracy or reliability of any content or communication posted through the Services or endorse any opinion expressed through the Services. You understand that by using the Services, you may be exposed to Content that may be offensive, harmful, inaccurate or otherwise inappropriate, or in some cases, posts that have been mislabeled or that are otherwise misleading. Under no circumstances will stopthefake be responsible in any way for any content, including, but not limited to, errors or omissions in any content, or for any loss or damage of any kind incurred as a result of the use of any published content, sent by email. , transmitted or otherwise made available through the Services or disseminated elsewhere. You are responsible for your use of the Services, any Content you provide and its consequences. stopthefake will not be responsible for any use of your content in accordance with these terms. You represent and warrant that you have all the intellectual and proprietary rights, powers and authorities necessary to grant the rights granted herein on any content you submit..",
  },
  {
    sr: 9,
    title: "Your rights",
    desc: "You retain your rights to any Content that you submit, post or display on or through the Services. By submitting, posting or displaying Content on or through the Services, you grant stopthefake a worldwide, non-exclusive, royalty-free license to use, process, transmit and distribute such Content in association with the marketing and promotion of the stopthefake Services. We will never license or sublicense your work without your express permission..",
  },
  {
    sr: 10,
    title: "Your license to use the services",
    desc: "When creating your contact, stopthefake gives you a personal, worldwide, royalty-free, non-transferable, and non-exclusive license to use the software provided to you by stopthefake as part of the Services. The sole purpose of this license is to enable you to use and enjoy the services provided by stopthefake, in the manner permitted by these Terms.",
  },
  {
    sr: 11,
    title: "Jurisdiction in case of dispute",
    desc: "These conditions are governed by and interpreted in accordance with French laws You and we agree to submit to the exclusive jurisdiction of the French courts with regard to any dispute or question arising from these Conditions.",
  },
  {
    sr: 12,
    title: "Disclaimer and exclusion of liability",
    desc: 'You acknowledge that: 12.1 - By accessing the Services, you have relied on your own skill and judgment in the use to determine its sufficiency for the use and the results you envision. 12.2 - No promise, representation or guarantee has been made by stopthefake with regard to profitability, benefits or any other consequence in the use of the site, or with regard to the suitability of the site for operations, activities or to the needs of. 12.3 - The Services are provided "as is", and stopthefake hereby expressly disclaims any warranty of any kind, express, implied or statutory. stopthefake does not warrant or represent that the site will be bug-free or that use of the site will be uninterrupted or error-free, and stopthefake makes no other representations regarding the use, or results of use, of the site in terms accuracy, reliability or otherwise. 12.4 - Stopthefake will not be responsible for any loss of use or goodwill, business interruption, loss or inaccuracy of information or commercial data, loss of profits, cost of purchasing substitute services, or any other indirect, special, incidental, exemplary or consequential damages of any kind whatever the form of the action, whether contractual, tort (including negligence), strict product liability or otherwise, even if it has been informed of the possibility of such damage. 12.5 - Under no circumstances will stopthefake, its agents, successors, subsidiaries, affiliates or assigns, and each of their respective officers, directors, employees, be liable to any user of the site or any other person or entity for any direct, indirect right, special, incidental, punitive, consequential or exemplary damages (including, but not limited to, damages for loss of profit, loss of data or loss of use) resulting from use or inability to use the site or any information or image contained therein or stored or maintained by stopthefake, whether on the basis of a warranty, contract, tort or otherwise, even if stopthefake has been informed or would have should have known about the possibility of such damage or loss. 12.6 - Under no circumstances will the total liability of stopthefake, its agents, successors, subsidiaries, affiliates or assigns, and each of their respective officers, directors, employees, for all damages, losses and causes of action resulting from User\'s use of The Site, whether contractual, tort (including, but not limited to negligence) or otherwise, exceeds the amount paid to stopthefake for the applicable license. Without limiting the foregoing, in no event will stopthefake, its divisions, agents, successors, subsidiaries, affiliates or assigns, and each of their respective officers, directors, employees, shall have any liability for damages or losses arising from or otherwise incurred in connection with the loss of any image, data or information contained in a user account or otherwise stored by or on behalf of stopthefake. 12.7 - The rights and obligations of each of the parties under this paragraph (Disclaimer and exclusion of liability) will survive the expiration or termination of these Terms of Use. .',
  },
  {
    sr: 13,
    title: "Legit check system.",
    desc: '13.1 All products sent to our site or website are checked against the photos only and only the photos in your legit check form. However, if in the comment section an advertisement link is given, we will take this one and the resulting information into account for our authentication response. 13.2 We advise you to put as many photos and details as possible in your form, which is not sent in maximum or acceptable conditions (example blurry photos, form with 1 photo, etc.) to obtain a response from reliable authentication, stopthefake reserves the right to estimate the item "impossible to verify", in this case no refund will be made. 13.3 Whatever the answer to your legit check, no refund will be made, you remain responsible for sending the form and the information you have placed in it. By agreeing to purchase our service through the credit system, you agree to receive no refund if an unsatisfactory response is given. 13.4 Unless there are exceptions as seen before, all your requests for legit checks obtain the mention PASS or Not pass, these being based only on the photos and comments that you send, its thermal baths do not mean that in100%a Not pass article or vice versa is not authentic, but if it does not pass our rigorous criteria to obtain the Pass label, we judge the products only via your information, our criteria are therefore strict for do not leave any false article on our site. 13.5 If the response time to which you have subscribed is exceeded, we will reimburse you by adding the credits used by the said form to your account, no monetary reimbursement is possible. 13.6 The payments are secured by the presence of padlocks in your URL, 25% of the price of the service is put in the security of the payment.',
  },
  {
    sr: 14,
    title: "Harm to our moral person",
    desc: "Defamation, misrepresentation, insult, false advertising etc ... All acts, such as sending messages to our customers and partners, harming our service, company, people etc ... by writing insults, false experiences as cleints, racism, denigration of services, false accusations and all other illicit actions, will immediately trigger several legal actions and legal proceedings before the French courts only.",
  },
  {
    sr: 15,
    title: "Copyright ©",
    desc: "The photos sent must be free of rights or sent with the agreement of the owner of these, stopthefake will not be responsible for the publication of these on its website since you are solely responsible for the photos you send. in your legitimate verification form. In the event that a post-form complaint concerning image rights is carried out, the holder of the photos where the person establishing the request for legitimate verification must send a letter to assert his request for image retraction, this procedure may be chargeable. , a maximum amount of € 1 to cover the costs of processing your error.",
  },
  {
    sr: 16,
    title: "Number Siret",
    desc: "In the course of attribution on provision of articles R. 123-220 to R. 123-234 of the Commercial Code",
  },
  {
    sr: 17,
    title: "Credits.",
    desc: "Your credits are neither exchangeable nor refundable, they have a lifespan of 20 years on our site, after the day following the purchase of these..",
  },
  {
    sr: 18,
    title: "Protocol in case of delay.",
    desc: "In the event of a delay in our response times, no refund will be made. The stopthefake site to counter this inconvenience will reimburse the interested party by remitting the number of credit used for the delayed legit check to the account of the person concerned (offer of reimbursement in credit), for this the person will have to contact our team by email with the proof that our response arrived late and assert your right by mentioning article 18.",
  },
  {
    sr: 19,
    title: "Opening hours.",
    desc: "Our legit check service is open 7 days a week from 8:00 a.m. to 11:59 p.m. local French time (Paris). All requests for verifications of authenticity sent during closing hours cannot benefit in any case from the rights referred to in all the previous articles. No credit refund will be made and our response times will not be subject to any limitation.",
  },
];

const TermsAndConditions: FC<TermsAndConditionsProps> = () => {
  return (
    <>
      <HeaderLogged />
      <Helmet>
        <title>Stopthefake - Legit-check your item</title>
      </Helmet>
      <div className="container">
        <Heading
          desc="Last Updated: April 17, 2021"
          isCenter
          style={{ marginTop: "40px" }}
        >
          TERMS AND CONDITIONS
        </Heading>
        <div style={{ marginTop: "40px" }}>
          {terms.map((item, index) => (
            <TermsAndConditionsCard
              key={index}
              sr={item.sr}
              title={item.title}
              desc={item.desc}
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TermsAndConditions;

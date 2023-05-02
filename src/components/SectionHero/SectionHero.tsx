import { FC, ReactNode } from "react";
import ButtonForth from "shared/Button/ButtonForth";
import "./sectionHero.css";

export interface SectionHeroProps {
  className?: string;
  heading?: ReactNode;
  subHeading?: string;
}

const SectionHero: FC<SectionHeroProps> = ({
  className = "",
  heading = "REAL OR REPLICA? GET INSTANT AUTHENTIFICATION",
  subHeading = "Check the authenticity of all your items by fashion professionals scrutinizing the smallest details.",
}) => {
  return (
    <div
      className={`nc-SectionHero relative ${className}`}
      data-nc-id="SectionHero"
    >
      <div className="flex flex-col lg:flex-row space-y-14 lg:space-y-0 lg:space-x-10 items-center relative heroSection-adjust">
        <div className="w-screen max-w-full xl:max-w-xl space-y-2 lg:space-y-7">
          <h2 className="text-xl sm:text-2xl !leading-tight font-semibold text-neutral-900 md:text-4xl xl:text-5xl dark:text-neutral-100 heading-space hero-text">
            REAL OR REPLICA? GET INSTANT AUTHENTICATION.
          </h2>
          <span className="block text-base text-sm xl:text-lg text-neutral-6000 dark:text-neutral-400 max-w-lg desc-space hero-sub-text">
            Check the authenticity of all your items by fashion professionals
            scrutinizing the smallest details.
          </span>
          <div className="pt-7 flex  space-x-4 btn-space">
            <ButtonForth href="/page-upload-item">
              <span>Legit-check now</span>
              <svg className="w-5 h-5 ml-2.5" viewBox="0 0 24 24" fill="none">
                <path
                  d="M13.26 3.59997L5.04997 12.29C4.73997 12.62 4.43997 13.27 4.37997 13.72L4.00997 16.96C3.87997 18.13 4.71997 18.93 5.87997 18.73L9.09997 18.18C9.54997 18.1 10.18 17.77 10.49 17.43L18.7 8.73997C20.12 7.23997 20.76 5.52997 18.55 3.43997C16.35 1.36997 14.68 2.09997 13.26 3.59997Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11.89 5.05005C12.32 7.81005 14.56 9.92005 17.34 10.2"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3 22H21"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </ButtonForth>
          </div>
        </div>
        {/* <div className="flex-grow">
          <img className="w-full" src={rightImg} alt="" />
        </div> */}
      </div>
    </div>
  );
};

export default SectionHero;

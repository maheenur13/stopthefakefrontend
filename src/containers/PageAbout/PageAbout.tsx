import rightImg from "images/about-hero-right.png";
import React, { FC, useEffect } from "react";
import SectionFounder from "./SectionFounder";
import SectionStatistic from "./SectionStatistic";
import { Helmet } from "react-helmet";
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import SectionHero from "./SectionHero";
import Footer from "shared/Footer/Footer";
import HeaderLogged from "components/Header/HeaderLogged";
import SectionProcess from "./SectionProcess";
import ReactGA from "react-ga4";
import SectionWhy from "./SectionWhy";

export interface PageAboutProps {
  className?: string;
}

const PageAbout: FC<PageAboutProps> = ({ className = "" }) => {
  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: window.location.hostname + window.location.search,
      title: "About Page",
    });
  }, []);

  return (
    <>
      <HeaderLogged />
      <div
        className={`nc-PageAbout overflow-hidden relative ${className}`}
        data-nc-id="PageAbout"
      >
        <Helmet>
          <title>About || Stopthefake Legit-check your items</title>
        </Helmet>

        {/* ======== BG GLASS ======== */}
        <BgGlassmorphism />

        <div className="container py-16 lg:py-28 space-y-16 lg:space-y-28">
          <SectionHero
            rightImg={rightImg}
            heading="Authentification Process:"
            btnText=""
            subHeading="Stopthefake, following the explosion of quality counterfeits sold as genuine products on the internet, makes it possible to secure your purchases of streetwear or luxury items via the internet, thanks to an online legit check process from only 1,90€."
          />
          <SectionProcess/>
          
          <SectionWhy />

          <SectionFounder />

          <SectionStatistic />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PageAbout;

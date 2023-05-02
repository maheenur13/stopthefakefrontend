import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import CardCategory5 from "components/CardCategory5/CardCategory5";
import HeaderLogged from "components/Header/HeaderLogged";
import Heading from "components/Heading/Heading";
import { montions } from "components/SectionSliderCategories/SectionSliderCategories";
import React from "react";
import { Helmet } from "react-helmet";
import Footer from "shared/Footer/Footer";

const Collaborations = () => {
  const heading = "@MENTION STOPTHEFAKE.FR";
  const subHeading =
    "Thanks to all supporters. Let's work together to fix the replica problem for the community.";

  return (
    <>
      <HeaderLogged />
      <div className="nc-PageHome relative overflow-hidden">
        <Helmet>
          <title>Collaborations || Stopthefake Legit-check your item</title>
        </Helmet>

        <BgGlassmorphism />

        {/* <div className="container py-16 lg:py-28 space-y-16 lg:space-y-28"> */}
        <div className="container py-10">
          <Heading desc={subHeading}>{heading}</Heading>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {montions.map((item, index) => (
              <div key={index}>
                <CardCategory5
                  name={item.name}
                  youtube_link={item.youtube_link}
                  index={index}
                  desc={item.desc}
                  featuredImage={item.img}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Collaborations;

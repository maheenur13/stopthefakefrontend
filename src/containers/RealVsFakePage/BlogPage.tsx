import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import HeaderLogged from "components/Header/HeaderLogged";
import Heading from "components/Heading/Heading";
import React from "react";
import { Helmet } from "react-helmet";
import Footer from "shared/Footer/Footer";
import RealVsFakeCard from "./RealVsFakeCard";

// DEMO DATA
const realVsFakeData = [
  {
    img: "/realvsfake/page-de-garde.png",
    title: "Real vs Fake How yo can spot fake item in 2022",
    desc: "Around the world millions of soccer jerseys are sold every year. Cristiano Ronaldo highlights his figure with more than 400,000 jerseys sold in a few hours after his return to Manchester United. PR Marketing informs us that over the last period 2010 to 2018, at 1.85 million jerseys on average per season per BPL club. Football shirts therefore have an important part in popular culture, which is why it is necessary not to be ripped off, namely that more than one in two shirts for sale on sites between private individuals are counterfeit.",
    by: "Admin",
    date: "1 Jan, 2020",
  },
  {
    img: "/realvsfake/aj1.png",
    title: "HOW YOU CAN SPOT FAKE AIR JORDAN1",
    desc: "To spot the fake Air Jordan 1 pair, you will need to closely inspect the text on the tongue tag. If the text is unclear, wavy (slanted) or too thin, then you’re looking at a fake — have a look at our fake vs real visual comparison below. Besides, inspect the Air Jordan logo for any inconsistency such as: overlapping elements, too much space between elements, uneven letters.",
    by: "Admin",
    date: "20 Mar, 2020",
  },
  {
    img: "/realvsfake/yzy350-v2.png",
    title: "HOW YOU CAN SPOT FAKE AIR YEEZY 350 V2",
    desc: "Are your Adidas Yeezy Boost 350 V2 real or fake? This is a complete Yeezy fake vs real guide to authenticating Kanye West’s Yeezy 350 V2 sneakers and it works for every colourway.In short, to spot a fake Yeezy 350 V2, you need to look out for inconsistencies on the size tag: that means any fuzzy line, the ® text touching the “adidas” text, or a misplaced letter. Besides, make sure the barcode test is passed. To get a visual explanation of all these, check our real vs fake comparisons below.",
    by: "Admin",
    date: "20 Mar, 2020",
  },
  {
    img: "/realvsfake/dunk-low.png",
    title: "HOW YOU CAN SPOT FAKE NIKE DUNK LOW",
    desc: "In this real vs fake Nike Dunk article, you will learn how to spot fake Nike Dunk Low sneakers in just a few basic steps which will always help you authenticate the fake vs real Nike Dunk sneakers.To put it shortly, the quickest way to spot fake Nike Dunk Low sneakers is to check the interior tongue label with multiple lines of text and search for any flaws in terms of font-weight, shape, and positioning of the letters.",
    by: "Admin",
    date: "20 Mar, 2020",
  },
  {
    img: "/realvsfake/vapor-waffle.png",
    title: "HOW YOU CAN SPOT FAKE NIKE SACAI LD WAFFLE",
    desc: "We recommend you be sure that you marked the insole prints and the two Swooshes on your list when you are checking the authenticity of a Nike Sacai Waffle pair because we consider these two being elementary spots to check.Also, keep in mind that the rear “NIKE sacai” text inscription is the best spot to look at when checking the real vs fake Nike Sacai Waffle sneakers since replica manufacturers never managed to get this inscription right.",
    by: "Admin",
    date: "20 Mar, 2020",
  },
  {
    img: "/realvsfake/aj4.png",
    title: "HOW YOU CAN SPOT FAKE AIR AIR JORDAN 4",
    desc: "he quickest way to spot fake Air Jordan 4 Bred sneakers is to check the text on the size tag because the replica Air Jordan manufacturers never manage to get the printings inside the sneakers correctly.Besides the size tag of the real vs fake Air Jordan 4 sneakers, we have also linked other good reliable signs of authenticity",
    by: "Admin",
    date: "20 Mar, 2020",
  },
  {
    img: "/realvsfake/aj11.png",
    title: "HOW YOU CAN SPOT FAKE AIR JORDAN 11",
    desc: "Then, you can observe how, on the fake Air Jordan 11 sneakers, the Jumpman’s upper arm (the left one) is looking thicker on the lower side of it and on the upper part (near the ball), it seems to be thinner.On the other hand, the legit Air Jordan 11 sneakers have their left arm looking on the same thickness all over it.",
    by: "Admin",
    date: "20 Mar, 2020",
  },
  {
    img: "/realvsfake/supreme-bogo.png",
    title: "HOW YOU CAN SPOT FAKE SUPREME BOX-LOGO",
    desc: "Wondering how to spot a fake Supreme Box Logo (bogo) hoodie? Then you are in the right place because we have prepared this article with the best spots you have to analyze in order to learn how to spot fake Supreme Bogo hoodies.Below the fake vs real Supreme Box Logos images, we are going to explain the flaws of the fake Supreme Bogo, and so, you can easily compare any Supreme Box Logos",
    by: "Admin",
    date: "20 Mar, 2020",
  },
  {
    img: "/realvsfake/supreme-bag.png",
    title: "SUPREME BAG",
    desc: "First of all, by looking at the “CORDURA” text, we have noticed how the text on the fake bag’s label uses a different font than the one used to craft the text on the legit bag.The replica Supreme bag has its “CORDURA” text looking too thin and too stretched out, while the legit bag has its text thicker and boxier, as it is smaller than the fake bag’s text.",
    by: "Admin",
    date: "20 Mar, 2020",
  },
  {
    img: "/realvsfake/SACAI-VAPOR-WAFFLE.png",
    title: "HOW YOU CAN SPOT FAKE NIKE SACAI VAPOR WAFFLE",
    desc: "So as to put it shortly, the fastest way to spot fake Nike Sacai Vaporwaffle sneakers is to look at the size tag and at the “NIKE sacai” print on the rear side of the shoes, as no replica pair has these inscriptions at the correct thickness, while all of the authentic Sacai Vaporwaffle pairs are always on point, thanks to their quality.",
    by: "Admin",
    date: "20 Mar, 2020",
  },
  {
    img: "/realvsfake/balenciaga-tee.png",
    title: "HOW YOU CAN SPOT FAKE BALENCIAGA TEE",
    desc: "The quickest way to spot fake Balenciaga Campaign items is to check the wash tag and the neck tag because replica items have their prints improperly font-weighted all the time, and the quality of a fake Balenciaga item does not compare to the real deal.",
    by: "Admin",
    date: "20 Mar, 2020",
  },
];

const RealVsFakePage: React.FC = () => {
  return (
    <>
      <HeaderLogged />
      <div className="nc-BlogPage overflow-hidden relative">
        <Helmet>
          <title>Stopthefake - Legit-check you item</title>
        </Helmet>

        {/* ======== BG GLASS ======== */}
        <BgGlassmorphism />
        {/* ======== ALL SECTIONS ======== */}
        {/* <div className="container relative"> */}
        {/* === SECTION 1 === */}
        {/* <div className="pt-12 pb-16 lg:pb-28"> */}
        {/* <SectionMagazine5 /> */}
        {/* </div> */}

        {/* === SECTION 1 === */}
        {/* <SectionAds /> */}

        {/* === SECTION 8 === */}
        {/* <SectionLatestPosts className="py-16 lg:py-28" /> */}

        {/* === SECTION 1 === */}
        {/* <SectionSubscribe2 className="pb-16 lg:pb-28" /> */}
        {/* </div> */}
        <Heading
          isCenter={true}
          style={{
            margin: "40px 0px",
          }}
        >
          REAL VS FAKE
        </Heading>
        <div className="container grid md:grid-cols-2 grid-cols-1 gap-9">
          {realVsFakeData.map((item, index) => (
            <RealVsFakeCard
              index={index}
              img={item.img}
              title={item.title}
              desc={item.desc}
              by={item.by}
              date={item.date}
              key={index}
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RealVsFakePage;

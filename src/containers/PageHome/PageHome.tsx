import axios from "../../axios";
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import HeaderLogged from "components/Header/HeaderLogged";
import SectionHero from "components/SectionHero/SectionHero";
import SectionHowItWork from "components/SectionHowItWork/SectionHowItWork";
import SectionSliderCategories from "components/SectionSliderCategories/SectionSliderCategories";
import Vector1 from "images/Vector1.png";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import Footer from "shared/Footer/Footer";
import SectionGridFeatureNFT from "./SectionGridFeatureNFT";
import SectionVideos from "./SectionVideos";
import "./pageHome.css";
import ReactGA from "react-ga4";
import { useLocation } from "react-router-dom";
import { GALabel } from "utils/helpers";

function PageHome() {
  const location = useLocation();
  const search = new URLSearchParams(location.search);
  const referrer = search.get("ref") || "";
  const ref_params = [
    "instagram",
    "twitter",
    "tiktok",
    "youtube_channel",
    "youtube_video",
    "marketing_video",
    "google_ads",
  ];

  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: window.location.hostname + window.location.search,
      title: ref_params.includes(referrer)
        ? GALabel(referrer) + " Referrer"
        : "Home Page",
    });
  }, []);

  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const getProductsForHome = async () => {
    await axios
      .get("/products/homepage")
      .then((resp: any) => {
        setLoading(false);
        setProducts(resp.data);
      })
      .catch((err: any) => {
        setLoading(false);
        toast.error(err.message);
      });
  };

  useEffect(() => {
    setLoading(true);
    getProductsForHome();
  }, []);

  return (
    <>
      <HeaderLogged />
      <div className="nc-PageHome relative overflow-hidden">
        <Helmet>
          <title>Stopthefake - Legit-check your item</title>
        </Helmet>
        {/* GLASSMOPHIN */}
        <BgGlassmorphism />

        <div className="section-hero-wrapper">
          <video
            autoPlay
            muted
            loop
            // style={{
            //   minWidth: "100%",
            //   position: "relative",
            //   zIndex: 5,
            // }}
            className="background-video"
            playsInline
          >
            <source src="/bg-video.mp4" type="video/mp4" />
            Your browser does not support HTML5 video.
          </video>
          <div
            className="container relative space-y-20 mt-12 mb-20 sm:space-y-24 sm:my-24 lg:space-y-32 lg:my-32"
            style={{
              height: "100%",
              position: "absolute",
              left: 0,
              top: 0,
              zIndex: 10,
              paddingTop: "75px",
            }}
          >
            {/* SECTION HERO */}
            <SectionHero
              className="pb-10"
              heading={
                <span>
                  Discover 🖼
                  <br /> collect, and sell <br /> extraordinary {` `}
                  <span className="relative pr-3">
                    <img
                      className="w-full absolute bottom-3 -left-1"
                      src={Vector1}
                      alt="Vector1"
                    />
                    <span className="relative">NFTs</span>
                  </span>
                </span>
              }
            />
          </div>
        </div>
      </div>
      <div className="nc-PageHome relative overflow-hidden">
        <div className="container relative space-y-20 mt-12 mb-20 sm:space-y-24 sm:my-24 lg:space-y-32 lg:my-32">
          {/* SECTION 2 */}
          <SectionHowItWork />
        </div>
        <div className="container relative space-y-24 my-24 lg:space-y-32 lg:my-32">
          {/* SECTION */}
          {/* <SectionGridAuthorBox boxCard="box3" /> */}

          {/* SECTION */}
          <SectionGridFeatureNFT loading={loading} products={products} />

          {/* SECTION 1 */}
          <SectionSliderCategories />

          {/* SECTION */}
          <SectionVideos />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default PageHome;

import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import SectionMagazine5 from "./SectionMagazine5";
import SectionLatestPosts from "./SectionLatestPosts";
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import HeaderLogged from "components/Header/HeaderLogged";
import Footer from "shared/Footer/Footer";
import axios from "../../axios";
import ReactGA from "react-ga4";

// DEMO DATA

const BlogPage: React.FC = () => {
  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: window.location.hostname + window.location.search,
      title: "Blog Page",
    });
  }, []);

  const [postLoading, setPostLoading] = useState(true);
  const [popularLoading, setPopularLoading] = useState(true);
  const [posts, setPosts] = useState<any>(null);
  const [popularPosts, setPopularPosts] = useState<any>(null);
  const [page, setPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);

  const paginate = (pg: any) => {
    setPage(pg);
  };

  const getPopularPosts = async () => {
    const resp = await axios.get("/posts/popular");
    if (resp.data) setPopularPosts(resp.data);
    setPopularLoading(false);
  };

  const getPosts = async (page: number) => {
    const resp = await axios.get("/posts?page=" + page);
    if (resp.data) {
      setTotalPosts(resp.data.count);
      setPosts(resp.data.data);
    }
    setPostLoading(false);
  };

  useEffect(() => {
    getPopularPosts();
  }, []);

  useEffect(() => {
    setPostLoading(true);
    getPosts(page);
  }, [page]);

  return (
    <>
      <HeaderLogged />
      <div className="nc-BlogPage overflow-hidden relative">
        <Helmet>
          <title>Blog || Stopthefake Legit-check your items</title>
        </Helmet>

        {/* ======== BG GLASS ======== */}
        <BgGlassmorphism />
        {/* ======== ALL SECTIONS ======== */}
        <div className="container relative">
          {/* === SECTION 1 === */}
          {/* <div className="pt-12 pb-16 lg:pb-28">
            <SectionMagazine5 />
          </div> */}


          {/* === SECTION 8 === */}
          <SectionLatestPosts
            className="py-16 lg:py-28"
            posts={posts}
            postLoading={postLoading}
            popularPosts={popularPosts}
            popularLoading={popularLoading}
            count={totalPosts}
            paginate={paginate}
          />

          {/* === SECTION 1 === */}
          {/* <SectionSubscribe2 className="pb-16 lg:pb-28" /> */}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BlogPage;

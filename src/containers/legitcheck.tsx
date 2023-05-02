import React, { FC, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Pagination from "shared/Pagination/Pagination";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Input from "shared/Input/Input";
import ButtonCircle from "shared/Button/ButtonCircle";
import CardNFT from "components/CardNFT";
import Footer from "shared/Footer/Footer";
import HeaderLogged from "components/Header/HeaderLogged";
import axios from "../axios";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import Spinner from "components/Spinner";
import ReactGA from "react-ga4";

export interface PageSearchProps {
  className?: string;
}

const PageSearch: FC<PageSearchProps> = ({ className = "" }) => {
  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: window.location.hostname + window.location.search,
      title: "Explore Legitcheck Page",
    });
  }, []);

  const location = useLocation();
  const search = new URLSearchParams(location.search);
  const pageNumber = Number(search.get("page"));
  const [page, setPage] = useState(pageNumber || 1);
  const [pageSize, setPageSize] = useState(16);
  const [legitCheckCount, setLegitCheckCount] = useState(0);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const getProducts = async (page: any) => {
      setLoading(true);
      await axios
        .get("/products?page=" + page)
        .then((resp: any) => {
          setLoading(false);
          setLegitCheckCount(resp.data.count);
          setProducts(resp.data?.data);
        })
        .catch((err: any) => {
          setLoading(false);
          toast.error(err.message);
        });
    };

    getProducts(page);
  }, [page]);

  const paginate = (pge: any) => {
    setPage(pge);
  };

  const handleSearchSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    await axios
      .post("/products/search?page=" + page, { searchInput })
      .then((resp: any) => {
        setLoading(false);
        setLegitCheckCount(resp.data.count);
        setProducts(resp.data?.data);
      })
      .catch((err: any) => {
        setLoading(false);
        toast.error(err.message);
      });
  };

  return (
    <>
      <HeaderLogged />
      <div className={`nc-PageSearch  ${className}`} data-nc-id="PageSearch">
        <Helmet>
          <title>Explore || Stopthefake legit-check your item</title>
        </Helmet>

        <div
          className="bg-primary-50 dark:bg-neutral-800/20"
          style={{ paddingTop: "75px" }}
        >
          <div className="container">
            <h1
              className="text-center"
              style={{ fontSize: "35px", marginBottom: "15px" }}
            >
              WE'VE CHECKED
            </h1>
            <h3
              className="text-center"
              style={{ fontSize: "35px", marginBottom: "15px" }}
            >
              {legitCheckCount || "Loading..." || "12237"}
            </h3>
            <p className="text-center">Sneakers and Clothings of all brands</p>
          </div>
        </div>

        <div
          className={`nc-HeadBackgroundCommon h-24 2xl:h-28 top-0 left-0 right-0 w-full bg-primary-50 dark:bg-neutral-800/20 `}
          data-nc-id="HeadBackgroundCommon"
        />
        <div className="container">
          <header className="max-w-2xl mx-auto -mt-10 flex flex-col lg:-mt-7">
            <form
              className="relative w-full"
              noValidate
              onSubmit={handleSearchSubmit}
            >
              <label
                htmlFor="search-input"
                className="text-neutral-500 dark:text-neutral-300"
              >
                <span className="sr-only">Search all icons</span>
                <Input
                  className="shadow-lg border-0 dark:border"
                  id="search-input"
                  type="search"
                  placeholder="Type your keywords"
                  sizeClass="pl-14 py-5 pr-5 md:pl-16"
                  rounded="rounded-full"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
                <ButtonCircle
                  className="absolute right-2.5 top-1/2 transform -translate-y-1/2"
                  size=" w-11 h-11"
                  type="submit"
                >
                  <i className="las la-arrow-right text-xl"></i>
                </ButtonCircle>
                <span className="absolute left-5 top-1/2 transform -translate-y-1/2 text-2xl md:left-6">
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M22 22L20 20"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </label>
            </form>
          </header>
        </div>

        <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 lg:space-y-28">
          <main>
            {/* LOOP ITEMS */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 mt-8 lg:mt-10">
              {loading ? (
                <div className="flex justify-center">
                  <Spinner size="lg" />
                </div>
              ) : (
                products &&
                products?.map((product, index) => (
                  <CardNFT key={index} product={product} />
                ))
              )}
            </div>

            {/* PAGINATION */}
            <div className="flex flex-col mt-12 lg:mt-16 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
              <Pagination
                pageSize={pageSize}
                total={legitCheckCount}
                paginate={paginate}
              />
              {/* <ButtonPrimary loading>Show me more</ButtonPrimary> */}
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PageSearch;

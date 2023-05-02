import React, { FC, Fragment, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import NcImage from "shared/NcImage/NcImage";
import CardNFT from "components/CardNFT";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import Pagination from "shared/Pagination/Pagination";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import authorBanner from "images/nfts/authorBanner.png";
import { nftsImgs } from "contains/fakeData";
import FollowButton from "components/FollowButton";
import VerifyIcon from "components/VerifyIcon";
import { Tab } from "@headlessui/react";
import CardAuthorBox3 from "components/CardAuthorBox3/CardAuthorBox3";
import ArchiveFilterListBox from "components/ArchiveFilterListBox";
import SectionGridAuthorBox from "components/SectionGridAuthorBox/SectionGridAuthorBox";
import Footer from "shared/Footer/Footer";
import HeaderLogged from "components/Header/HeaderLogged";
import app from "config/app";
import { useAuth } from "contexts/AuthContext";
import axios from "../../axios";
import { toast } from "react-toastify";
import Heading from "shared/Heading/Heading";
import Heading2 from "components/Heading/Heading2";
import Spinner from "components/Spinner";
import { imageURL } from "utils/helpers";

export interface AuthorPageProps {
  className?: string;
}

const AuthorPage: FC<AuthorPageProps> = ({ className = "" }) => {
  let [categories] = useState(["My Legit-check"]);
  const { user, token } = useAuth();
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(16);
  const [products, setProducts] = useState([]);
  const [legitCheckCount, setLegitCheckCount] = useState(0);

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      await axios
        .get("/products/" + user?.["id"] + "?page=" + page, {
          headers: {
            token: `Bearer ${token}`,
          },
        })
        .then((resp: any) => {
          setProducts(resp.data?.data);
          setLegitCheckCount(resp.data?.count);
          setLoading(false);
        })
        .catch((err: any) => {
          toast.error(
            err.response?.data ? err?.response?.data?.message : err.message
          );
          setLoading(false);
        });
    };

    getProducts();
  }, [page]);

  const paginate = (pge: any) => {
    setPage(pge);
  };

  const renderTabs = (
    <Tab.Group>
      <div className="flex flex-col lg:flex-row justify-between ">
        <Tab.List className="flex space-x-0 sm:space-x-2 overflow-x-auto ">
          {categories.map((item) => (
            <Tab key={item} as={Fragment}>
              {({ selected }) => (
                <button
                  className={`flex-shrink-0 block font-medium px-4 py-2 text-sm sm:px-6 sm:py-2.5 capitalize rounded-full focus:outline-none ${
                    selected
                      ? "bg-neutral-900 dark:bg-neutral-100 text-neutral-50 dark:text-neutral-900"
                      : "text-neutral-500 dark:text-neutral-400 dark:hover:text-neutral-100 hover:text-neutral-900 hover:bg-neutral-100/70 dark:hover:bg-neutral-800"
                  } `}
                >
                  {item}
                </button>
              )}
            </Tab>
          ))}
        </Tab.List>
        {/* <div className="mt-5 lg:mt-0 flex items-end justify-end">
                  <ArchiveFilterListBox />
                </div> */}
      </div>
      <Tab.Panels>
        <Tab.Panel className="">
          {/* LOOP ITEMS */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 mt-8 lg:mt-10">
            {/* {Array.from("11111111").map((_, index) => (
                      <CardNFT key={index} />
                    ))} */}
          </div>

          {/* PAGINATION */}
          <div className="flex flex-col mt-12 lg:mt-16 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
            <Pagination />
            <ButtonPrimary loading>Show me more</ButtonPrimary>
          </div>
        </Tab.Panel>
        <Tab.Panel className="">
          {/* LOOP ITEMS */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 mt-8 lg:mt-10">
            {/* {Array.from("11111111").map((_, index) => (
                      <CardNFT key={index} />
                    ))} */}
          </div>

          {/* PAGINATION */}
          <div className="flex flex-col mt-12 lg:mt-16 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
            <Pagination />
            <ButtonPrimary loading>Show me more</ButtonPrimary>
          </div>
        </Tab.Panel>
        <Tab.Panel className="">
          {/* LOOP ITEMS */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 mt-8 lg:mt-10">
            {/* {Array.from("11111111").map((_, index) => (
                      <CardNFT isLiked key={index} />
                    ))} */}
          </div>

          {/* PAGINATION */}
          <div className="flex flex-col mt-12 lg:mt-16 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
            <Pagination />
            <ButtonPrimary loading>Show me more</ButtonPrimary>
          </div>
        </Tab.Panel>
        <Tab.Panel className="">
          {/* LOOP ITEMS */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-8 lg:mt-10">
            {Array.from("11111111").map((_, index) => (
              <CardAuthorBox3 following key={index} />
            ))}
          </div>

          {/* PAGINATION */}
          <div className="flex flex-col mt-12 lg:mt-16 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
            <Pagination />
            <ButtonPrimary loading>Show me more</ButtonPrimary>
          </div>
        </Tab.Panel>
        <Tab.Panel className="">
          {/* LOOP ITEMS */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mt-8 lg:mt-10">
            {Array.from("11111111").map((_, index) => (
              <CardAuthorBox3 following={false} key={index} />
            ))}
          </div>

          {/* PAGINATION */}
          <div className="flex flex-col mt-12 lg:mt-16 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
            <Pagination />
            <ButtonPrimary loading>Show me more</ButtonPrimary>
          </div>
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );

  return (
    <>
      <HeaderLogged />
      <div className={`nc-AuthorPage  ${className}`} data-nc-id="AuthorPage">
        <Helmet>
          <title>Creator || {app.name}</title>
        </Helmet>

        {/* HEADER */}
        <div className="w-full">
          <div className="relative w-full h-40 md:h-60 2xl:h-72">
            <NcImage
              containerClassName="absolute inset-0"
              src={authorBanner}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="container -mt-10 lg:-mt-16">
            <div className="relative bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 p-5 lg:p-8 rounded-3xl md:rounded-[40px] shadow-xl flex flex-col md:flex-row">
              <div className="w-32 lg:w-44 flex-shrink-0 mt-12 sm:mt-0">
                <NcImage
                  src={imageURL(user?.["image"])}
                  containerClassName="aspect-w-1 aspect-h-1 rounded-3xl overflow-hidden"
                />
              </div>
              <div className="pt-5 md:pt-1 md:ml-6 xl:ml-14 flex-grow">
                <div className="max-w-screen-sm ">
                  <h2 className="inline-flex items-center text-2xl sm:text-3xl lg:text-4xl font-semibold">
                    <span>
                      {user?.["name"] + " " + user?.["surname"] ||
                        "Dony Herrera"}
                    </span>
                    {/* <VerifyIcon
                      className="ml-2"
                      iconClass="w-6 h-6 sm:w-7 sm:h-7 xl:w-8 xl:h-8"
                    /> */}
                  </h2>

                  <span className="block mt-4 text-sm text-neutral-500 dark:text-neutral-400">
                    My current balance <br />
                    {user?.["credits"]} token
                  </span>
                </div>
                <div className="mt-4 ">
                  <ButtonSecondary href="/subscription">
                    <span className="font-medium">Recharge now</span>
                  </ButtonSecondary>
                </div>
              </div>
              {/* <div className="absolute md:static left-5 top-4 sm:left-auto sm:top-5 sm:right-5 flex flex-row-reverse justify-end">
                <FollowButton
                  isFollowing={false}
                  fontSize="text-sm md:text-base font-medium"
                  sizeClass="px-4 py-1 md:py-2.5 h-8 md:!h-10 sm:px-6 lg:px-8"
                />
              </div> */}
            </div>
          </div>
        </div>
        {/* ====================== END HEADER ====================== */}

        <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 lg:space-y-28">
          {loading ? (
            <div className="flex justify-center">
              <Spinner size="lg" />
            </div>
          ) : (
            <main>
              <Heading2 heading="My Legit-Checks" />
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 mt-8 lg:mt-10">
                {products.length > 0 ? (
                  products.map((product, index) => (
                    <CardNFT key={index} product={product} />
                  ))
                ) : (
                  <div>
                    <h3 className="text-center">No data to show.</h3>
                  </div>
                )}
              </div>
              <div className="flex flex-col mt-12 lg:mt-16 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
                <Pagination
                  pageSize={pageSize}
                  total={legitCheckCount}
                  paginate={paginate}
                />
                {/* <ButtonPrimary loading>Show me more</ButtonPrimary> */}
              </div>
            </main>
          )}

          {/* === SECTION 5 === */}
          {/* <div className="relative py-16 lg:py-28">
            <BackgroundSection />
            <SectionGridAuthorBox
              data={Array.from("11111111")}
              boxCard="box4"
            />
          </div> */}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AuthorPage;

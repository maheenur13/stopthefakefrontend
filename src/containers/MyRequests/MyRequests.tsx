import HeaderLogged from "components/Header/HeaderLogged";
import React, { useEffect, useState } from "react";
import Footer from "shared/Footer/Footer";
import Helmet from "react-helmet";
import app from "config/app";
import NcImage from "shared/NcImage/NcImage";
import Spinner from "components/Spinner";
import Heading2 from "components/Heading/Heading2";
import CardNFT from "components/CardNFT";
import Pagination from "shared/Pagination/Pagination";
import { useAuth } from "contexts/AuthContext";
import axios from "../../axios";
import { toast } from "react-toastify";

const MyRequests = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(16);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [legitCheckCount, setLegitCheckCount] = useState(0);

  const { user, token } = useAuth();

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

  return (
    <>
      <HeaderLogged />
      <div className={`nc-AuthorPage`} data-nc-id="AuthorPage">
        <Helmet>
          <title>Creator || {app.name}</title>
        </Helmet>

        {/* HEADER */}

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

export default MyRequests;

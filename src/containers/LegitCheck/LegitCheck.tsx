import axios from "../../axios";
import Breadcrumb from "components/Breadcrumb";
import PortalWrapper from "components/PortalWrapper/PortalWrapper";
import SectionGridFeatureNFT from "containers/PageHome/SectionGridFeatureNFT";
import { useAuth } from "contexts/AuthContext";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useHistory, useLocation } from "react-router-dom";
import Pagination from "shared/Pagination/Pagination";

const LegitCheck = () => {
  const location = useLocation();
  const search = new URLSearchParams(location.search);
  const pageNumber = Number(search.get("page"));
  const [page, setPage] = useState(pageNumber || 1);
  const [pageSize, setPageSize] = useState(16);
  const [legitCheckCount, setLegitCheckCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const { user, token } = useAuth();
  const history = useHistory();

  const getProductsForAdmin = async (page: any) => {
    await axios
      .get("/products/admin?page=" + page, {
        headers: {
          token: `Bearer ${token}`,
        },
      })
      .then((resp: any) => {
        setLoading(false);
        setProducts(resp.data?.data);
        setLegitCheckCount(resp?.data?.count);
      })
      .catch((err: any) => {
        setLoading(false);
        toast.error(err.message);
      });
  };

  useEffect(() => {
    setLoading(true);
    getProductsForAdmin(page);
  }, [page]);

  useEffect(() => {
    if (user?.["role"] === `["ROLE_USER"]`) {
      history.push("/");
    }
  }, []);

  const paginate = (pge: any) => {
    setPage(pge);
  };

  return (
    <PortalWrapper>
      <div className="p-4">
        <Breadcrumb page="My Legit-Check" />
        <SectionGridFeatureNFT
          admin={true}
          loading={loading}
          products={products}
          setProducts={setProducts}
          setDataLoading={setLoading}
        />
        <div className="flex flex-col mt-12 lg:mt-16 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
          <Pagination
            pageSize={pageSize}
            total={legitCheckCount}
            paginate={paginate}
          />
          {/* <ButtonPrimary loading>Show me more</ButtonPrimary> */}
        </div>
      </div>
    </PortalWrapper>
  );
};

export default LegitCheck;

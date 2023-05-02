import React, { FC, useEffect, useState } from "react";
import CardNFT from "components/CardNFT";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import Heading from "components/Heading/Heading";
import axios from "../../axios";
import { toast } from "react-toastify";
import Spinner from "components/Spinner";
import { useAuth } from "contexts/AuthContext";

//
export interface SectionGridFeatureNFTProps {
  admin?: boolean;
  loading?: boolean;
  products?: any[];
  setProducts?: any;
  setDataLoading?: any;
}

const SectionGridFeatureNFT: FC<SectionGridFeatureNFTProps> = ({
  admin,
  loading,
  products,
  setProducts,
  setDataLoading,
}) => {
  return (
    <div className="nc-SectionGridFeatureNFT relative">
      {!admin && <Heading>LAST LEGIT-CHECK</Heading>}

      {/* <h2>Last legit-check</h2> */}
      <div
        className={`grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-${
          admin ? "3" : "4"
        } `}
      >
        {loading ? (
          <Spinner />
        ) : products?.length! > 0 ? (
          products?.map((product, index) => (
            <CardNFT
              key={index}
              product={product}
              admin={admin}
              setProducts={setProducts}
              setDataLoading={setDataLoading}
            />
          ))
        ) : (
          <div>
            <p style={{ textAlign: "center" }}>No Data to Show</p>
          </div>
        )}
      </div>
      {!admin && (
        <div className="flex mt-16 justify-center items-center">
          <ButtonSecondary href="/legitcheck" loading>
            Show me more
          </ButtonSecondary>
        </div>
      )}
    </div>
  );
};

export default SectionGridFeatureNFT;

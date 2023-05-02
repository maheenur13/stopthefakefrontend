import React, { FC, useEffect, useState } from "react";
import NcImage from "shared/NcImage/NcImage";
import { nftsLargeImgs } from "contains/fakeData";
import Certificate from "components/Certificate/Certificate";
import Footer from "shared/Footer/Footer";
import HeaderLogged from "components/Header/HeaderLogged";
import { useLocation } from "react-router-dom";
import axios from "../../axios";
import { toast } from "react-toastify";
import Spinner from "components/Spinner";
import { dateFormat } from "utils/helpers";
import app from "config/app";
import { useAuth } from "contexts/AuthContext";

export interface NftDetailPageProps {
  className?: string;
  isPreviewMode?: boolean;
}

const NftDetailPage: FC<NftDetailPageProps> = ({
  className = "",
  isPreviewMode,
}) => {
  const { loggedIn, user } = useAuth();

  console.log("LoggedInUser: ", user);

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const id = query.get("id");

  const [loading, setLoading] = useState(false);
  const [legitCheck, setLegitCheck] = useState(null);
  const [legitCheckImages, setLegitCheckImages] = useState<any[] | null>(null);

  useEffect(() => {
    const getSingleLegitCheck = async () => {
      setLoading(true);
      await axios
        .get("/products/legit-check/" + id)
        .then((resp: any) => {
          setLegitCheck(resp.data);
          setLoading(false);
        })
        .catch((err: any) => {
          toast.error(
            err.response?.data ? err.response?.data?.message : err.message
          );
          setLoading(false);
        });
    };

    getSingleLegitCheck();
  }, []);

  useEffect(() => {
    if (legitCheck) {
      setLegitCheckImages(legitCheck?.["images"]);
    }
  }, [legitCheck]);

  const renderSection1 = () => {
    return (
      <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
        {/* ---------- 1 ----------  */}
        <div className="pb-9 space-y-5" style={{ width: "70%" }}>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
            {legitCheck?.["title"] || "Nike dunk syracus"}
          </h2>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
            {legitCheck?.["brand"] || "Nike"}
          </h3>
          <p>
            CHECKED @{" "}
            {legitCheck?.["checked_at"]
              ? dateFormat(legitCheck?.["checked_at"])
              : "2022-05-31 23:02"}
          </p>
        </div>
      </div>
    );
  };

  const passNotPass = ["Pass.png", "NotPass.png", "UnableToVerify.png"];

  return (
    <>
      <HeaderLogged />
      <div
        className={`nc-NftDetailPage  ${className}`}
        data-nc-id="NftDetailPage"
      >
        {/* MAIN */}
        {loading ? (
          <div className="flex justify-center" style={{ padding: "15px" }}>
            <Spinner />
          </div>
        ) : (
          <main className="container mt-11 flex ">
            <div className="w-full grid grid-cols-1 lg:grid-cols-1 gap-10 md:gap-14">
              <div
                className="pt-10 lg:pt-0 xl:pl-10 border-t-2 border-neutral-200 dark:border-neutral-700 lg:border-t-0"
                style={{ position: "relative", marginBottom: "50px" }}
              >
                {/* BADGE */}
                {legitCheck?.["status"] && (
                  <img
                    src={
                      "/badge-pass-not-pass/" +
                      (legitCheck?.["status"] === "Pass"
                        ? passNotPass[0]
                        : legitCheck?.["status"] === "Not Pass"
                        ? passNotPass[1]
                        : passNotPass[2])
                    }
                    alt={legitCheck?.["status"]}
                    style={{
                      width: "125px",
                      height: "125px",
                      position: "absolute",
                      right: 0,
                      top: 0,
                    }}
                  />
                )}
                {renderSection1()}
              </div>
              {/* CERTIFICATE */}
              {loggedIn && user?.["id"] === legitCheck?.["userId"] && (
                <Certificate
                  legitCheck={legitCheck}
                  statusBadges={passNotPass}
                />
              )}

              {/* CONTENT */}
              <div className="space-y-8 lg:space-y-10">
                {/* HEADING */}
                <div className="relative grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
                  {legitCheckImages?.map((img: any, index: any) => (
                    <NcImage
                      key={index}
                      src={`${app.serverURL}/assets/images/${img?.image}`}
                      containerClassName="aspect-w-6 aspect-h-6 rounded-3xl overflow-hidden"
                    />
                  ))}
                  {/* <NcImage
                    src={nftsLargeImgs[1]}
                    containerClassName="aspect-w-6 aspect-h-6 rounded-3xl overflow-hidden"
                  />
                  <NcImage
                    src={nftsLargeImgs[1]}
                    containerClassName="aspect-w-6 aspect-h-6 rounded-3xl overflow-hidden"
                  />
                  <NcImage
                    src={nftsLargeImgs[1]}
                    containerClassName="aspect-w-6 aspect-h-6 rounded-3xl overflow-hidden"
                  />
                  <NcImage
                    src={nftsLargeImgs[1]}
                    containerClassName="aspect-w-6 aspect-h-6 rounded-3xl overflow-hidden"
                  />
                  <NcImage
                    src={nftsLargeImgs[1]}
                    containerClassName="aspect-w-6 aspect-h-6 rounded-3xl overflow-hidden"
                  />
                  <NcImage
                    src={nftsLargeImgs[1]}
                    containerClassName="aspect-w-6 aspect-h-6 rounded-3xl overflow-hidden"
                  /> */}
                </div>
              </div>

              {/* SIDEBAR */}
            </div>
          </main>
        )}
      </div>
      <Footer />
    </>
  );
};

export default NftDetailPage;

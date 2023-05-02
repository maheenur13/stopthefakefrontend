import { RadioGroup } from "@headlessui/react";
import FormItem from "components/FormItem";
import Label from "components/Label/Label";
import MySwitch from "components/MySwitch";
import { FC, useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Input from "shared/Input/Input";
import Textarea from "shared/Textarea/Textarea";

import NcImage from "shared/NcImage/NcImage";
import Footer from "shared/Footer/Footer";
import HeaderLogged from "components/Header/HeaderLogged";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import { useAuth } from "contexts/AuthContext";
import { toast } from "react-toastify";
import axios from "../axios";
import app from "config/app";
import ReactGA from "react-ga4";
import PhotoInstructions from "./PhotoInstructions";
import styled from "styled-components";

export const ImageWrapper = ({
  file,
  uploadedFiles,
  setUploadedFiles,
}: any) => {
  return (
    <div
      style={{
        position: "relative",
        // marginRight: "20px",
        // marginBottom: "20px",
      }}
    >
      <div
        className="border-2 border-neutral-0 dark:border-neutral-700"
        style={{
          width: "100px",
          height: "100px",
          overflow: "hidden",
        }}
      >
        <img
          src={`${app.serverURL}/assets/images/${file && file["filename"]}`}
          alt=""
          width="100%"
          height="100%"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div
        style={{
          width: "20px",
          height: "20px",
          borderRadius: "100%",
          position: "absolute",
          top: "-10px",
          right: "-10px",
          zIndex: 1,
          backgroundColor: "blue",
          lineHeight: "20px",
          textAlign: "center",
          cursor: "pointer",
        }}
        onClick={async () => {
          await axios
            .post("/products/remove-file", {
              filename: file["filename"],
              files: uploadedFiles,
            })
            .then((resp: any) => {
              setUploadedFiles(resp.data.files);
            })
            .catch((err: any) => {
              toast.error(err.message);
            });
        }}
      >
        &times;
      </div>
    </div>
  );
};

export interface PageUploadItemProps {
  className?: string;
}

const plans = [
  {
    id: 1,
    name: "T-shirt",
    featuredImage: "/categories/tshirt.png",
  },
  {
    id: 2,
    name: "Sneakers",
    featuredImage: "/categories/sneakers.png",
  },
  {
    id: 3,
    name: "Hoodies/Jackets",
    featuredImage: "/categories/hoodies.png",
  },
  {
    id: 4,
    name: "Jeans/Pants",
    featuredImage: "/categories/pant.png",
  },
  {
    id: 5,
    name: "Belt",
    featuredImage: "/categories/belt.png",
  },
  {
    id: 6,
    name: "Bag/satchel",
    featuredImage: "/categories/bag.png",
  },
  {
    id: 7,
    name: "Jersey",
    featuredImage: "/categories/gersey.png",
  },
  {
    id: 8,
    name: "Accessories",
    featuredImage: "/categories/accessories.png",
  },
];

const plan = [
  {
    name: "30 min",
    desc: "2 Token",
    tokens: 2,
    featuredImage: "/timer/silver.png",
  },
  {
    name: "15 min",
    desc: "3 Token",
    tokens: 3,
    featuredImage: "/timer/gold.png",
  },
  {
    name: "3 hours",
    desc: "1 Token",
    tokens: 1,
    featuredImage: "/timer/bronze.jpeg",
  },
];

const PageUploadItem: FC<PageUploadItemProps> = ({ className = "" }) => {
  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: window.location.hostname + window.location.search,
      title: "Legitcheck Request Page",
    });
  }, []);

  const { user, setUser, token } = useAuth();
  const credits = user ? user["credits"] : 0;

  const [selected, setSelected] = useState(plans[0]);
  const [selectedTimer, setSelectedTimer] = useState(plan[2]);
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  const [undertaking, setUndertaking] = useState(true);

  const history = useHistory();

  const icons = [
    {
      icon: "/icons/box-label.svg",
      category: "t-shirt",
    },
    {
      icon: "/icons/box-stamp.svg",
      category: "t-shirt",
    },
    {
      icon: "/icons/exterior-inner.svg",
      category: "t-shirt",
    },

    {
      icon: "/icons/exterior-outer.svg",
      category: "t-shirt",
    },
    {
      icon: "/icons/heel.svg",
      category: "t-shirt",
    },
    {
      icon: "/icons/inside-label.svg",
      category: "t-shirt",
    },

    {
      icon: "/icons/insole_top.svg",
      category: "t-shirt",
    },
    {
      icon: "/icons/insole-bottom.svg",
      category: "t-shirt",
    },

    {
      icon: "/icons/interior-sewing.svg",
      category: "t-shirt",
    },
    {
      icon: "/icons/others.svg",
      category: "t-shirt",
    },
    {
      icon: "/icons/outsole.svg",
      category: "t-shirt",
    },
    {
      icon: "/icons/receipt.svg",
      category: "t-shirt",
    },
    {
      icon: "/icons/shoe-support-left.svg",
      category: "t-shirt",
    },
    {
      icon: "/icons/shoe-tag.svg",
      category: "t-shirt",
    },
    {
      icon: "/icons/show-support-right.svg",
      category: "t-shirt",
    },
    {
      icon: "/icons/tongue-back.svg",
      category: "t-shirt",
    },
    // "/icons/tongue-front.svg",
  ];

  const remarkOptions = [
    "No Box",
    "Replacement Box",
    "Weird Smell",
    "Replacement Insole",
    "Missing Insole",
    "Replacement Accessories",
    "Missing Accessories",
  ];

  // useEffect(() => {
  //   if (credits <= 0) {
  //     toast.error("You don't have enough tokens. Please buy tokens first.");
  //     history.push("/subscription");
  //   }
  // }, [selectedTimer]);

  const formik = useFormik({
    initialValues: {
      title: "",
      brand: "",
      link: "",
      remarks: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required."),
      brand: Yup.string().required("Product brand is required."),
      link: Yup.string().optional(),
      remarks: Yup.string().optional(),
    }),
    onSubmit: async (values) => {
      if (uploadedFiles.length < 6) {
        toast.error("Upload atleast 6 files.");
      } else if (!selected) {
        toast.error("Please select category.");
      } else if (!selectedTimer) {
        toast.error("Please select timer.");
      } else {
        if (undertaking) {
          await axios
            .post(
              "/products/create",
              {
                ...values,
                remark: values.remarks,
                timer: selectedTimer,
                category: selected,
                files: uploadedFiles,
              },
              {
                headers: {
                  token: `Bearer ${token}`,
                },
              }
            )
            .then((resp: any) => {
              setUser((prev: any) => ({ ...prev, credits: resp.data.credits }));
              toast.success(resp.data.message);
              history.push("/");
            })
            .catch((err: any) => {
              toast.error(err.message);
            });
        }
      }
    },
  });

  const handleCategoryChange = (e: any) => {
    // console.log(e);
    setSelected(e);
  };

  return (
    <>
      <HeaderLogged />
      <div
        className={`nc-PageUploadItem ${className}`}
        data-nc-id="PageUploadItem"
      >
        <Helmet>
          <title>Create Item || Start Legit-check</title>
        </Helmet>

        <div className="container">
          <div className="my-12 sm:lg:my-16 lg:my-24 max-w-4xl mx-auto space-y-8 sm:space-y-10">
            {/* HEADING */}
            <div className="max-w-2xl">
              <h2 className="text-3xl sm:text-4xl font-semibold">
                Start Legit-check
              </h2>
              <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
                8h00-23h59 Paris-Fr
              </span>
            </div>

            <div className="w-full border-b-2 border-neutral-100 dark:border-neutral-700"></div>

            {!undertaking && (
              <div
                className="bg-red-300 border-red-900 p-2 px-5"
                style={{ borderRadius: "5px" }}
              >
                <small className="text-red-900 ">
                  Accept terms &amp; conditions
                </small>
              </div>
            )}

            <form
              noValidate
              onSubmit={formik.handleSubmit}
              className="my-12 sm:lg:my-16 lg:my-24 max-w-4xl mx-auto space-y-8 sm:space-y-10"
            >
              <div>
                <Label>Choose category</Label>
                no
                <RadioGroup value={selected} onChange={handleCategoryChange}>
                  <RadioGroup.Label className="sr-only">
                    Server size
                  </RadioGroup.Label>
                  <div className="flex overflow-auto py-2 space-x-4 customScrollBar">
                    {plans.map((plan, index) => (
                      <RadioGroup.Option
                        key={index}
                        value={plan}
                        className={({ active, checked }) =>
                          `${
                            active
                              ? "ring-2 ring-offset-2 ring-offset-sky-300 ring-white ring-opacity-60"
                              : ""
                          }
                  ${
                    checked
                      ? "bg-neutral-600 text-white"
                      : "hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  }
                    relative flex-shrink-0 w-44 rounded-xl border border-neutral-200 dark:border-neutral-700 px-6 py-5 cursor-pointer flex focus:outline-none `
                        }
                      >
                        {({ active, checked }) => (
                          <>
                            <div className="flex items-center justify-between w-full">
                              <div className="flex items-center">
                                <div className="text-sm">
                                  <div className="flex items-center justify-between">
                                    <RadioGroup.Description
                                      as="div"
                                      className={"rounded-full w-32"}
                                    >
                                      <NcImage
                                        containerClassName="aspect-w-1 aspect-h-1 rounded-full overflow-hidden"
                                        src={plan.featuredImage}
                                      />
                                    </RadioGroup.Description>
                                  </div>
                                  <RadioGroup.Label
                                    as="p"
                                    className={`font-semibold mt-3 text-center ${
                                      checked ? "text-white" : ""
                                    }`}
                                  >
                                    {plan.name}
                                  </RadioGroup.Label>
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div>
              {/* ---- */}
              <FormItem label="Title">
                <Input
                  // defaultValue="Product name"
                  type="text"
                  placeholder="Title"
                  {...formik.getFieldProps("title")}
                />
                {formik.errors.title && (
                  <small className="text-red-700">
                    &times; {formik.errors.title}
                  </small>
                )}
              </FormItem>
              <FormItem label="Brand">
                <Input
                  defaultValue="Product brand"
                  type="text"
                  placeholder="Product Brand"
                  {...formik.getFieldProps("brand")}
                />
                {formik.errors.brand && (
                  <small className="text-red-700">
                    &times; {formik.errors.brand}
                  </small>
                )}
              </FormItem>
              <div className="mt-10 md:mt-0 space-y-5 sm:space-y-6 md:sm:space-y-8">
                <div>
                  <h3 className="text-lg sm:text-2xl font-semibold">
                    Upload your Image
                  </h3>
                  <span className="text-neutral-500 dark:text-neutral-400 text-sm">
                    File types supported: JPG, PNG, GIF, SVG . Max size: 100 MB
                  </span>
                  <div className="mt-5 ">
                    <ContainerWrapper className="mt-1 flex justify-center px-6 pt-6 pb-6 border-2 border-neutral-300 dark:border-neutral-6000 border-dashed rounded-xl ">
                      {/* filter((item)=>item.category.toLocaleLowerCase() === selected.name.toLocaleLowerCase()). */}
                      {icons.map((icon, index) => (
                        <Icon
                          key={index}
                          src={icon.icon}
                          alt={`Icon ${index}`}
                        />
                      ))}
                      <UploadButton className="space-y-1 text-center">
                        {/* <svg
                          className="mx-auto h-12 w-12 text-neutral-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                        </svg> */}
                        <div className="flex text-sm text-neutral-6000 dark:text-neutral-300">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer  rounded-md font-medium text-primary-6000 hover:text-primary-500 "
                          >
                            <div className="p-3 m-2 main-button focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500">
                              {" "}
                              + Upload a photos
                            </div>
                            <input
                              id="file-upload"
                              type="file"
                              className="sr-only"
                              multiple
                              onChange={async (e) => {
                                if (e.target.files) {
                                  // alert("Hello");
                                  const formData = new FormData();
                                  for (
                                    let index = 0;
                                    index < e.target.files.length;
                                    index++
                                  ) {
                                    formData.append(
                                      "product_images",
                                      e.target.files[index]
                                    );
                                  }
                                  await axios
                                    .post("/products/upload", formData, {
                                      headers: {
                                        "Content-Type": "multipart/form-data",
                                        token: `Bearer ${token}`,
                                      },
                                    })
                                    .then((resp: any) => {
                                      setUploadedFiles((prev) => [
                                        ...prev,
                                        ...resp.data,
                                      ]);
                                      (document.getElementById(
                                        "file-upload"
                                      ) as HTMLInputElement)!.value = "";
                                    })
                                    .catch((err: any) => {
                                      if (err.status === 500) {
                                        toast.error(
                                          "You are only allowed to upload image files."
                                        );
                                      } else {
                                        toast.error(err.message);
                                      }
                                    });
                                }
                              }}
                            />
                          </label>
                          {/* <p className="pl-1">or drag and drop</p> */}
                        </div>
                        {/* <p className="text-xs text-neutral-500 dark:text-neutral-400">
                          PNG, JPG, JPEG up to 10MB
                        </p> */}
                      </UploadButton>
                    </ContainerWrapper>
                  </div>
                </div>

                {/* <div className="flex items-center justify-center">
                  <PhotoInstructions />
                </div> */}

                <div className="flex gap-4 flex-wrap items-center justify-center">
                  {uploadedFiles.map((file, index) => {
                    return (
                      <ImageWrapper
                        key={index}
                        file={file}
                        uploadedFiles={uploadedFiles}
                        setUploadedFiles={setUploadedFiles}
                      />
                    );
                  })}
                </div>

                {/* ---- */}
                <FormItem label="Annonce link (facultatif)">
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                      https://
                    </span>
                    <Input
                      className="!rounded-l-none"
                      placeholder="abc.com"
                      {...formik.getFieldProps("link")}
                    />
                  </div>
                  {formik.errors.link && (
                    <small className="text-red-700">
                      &times; {formik.errors.link}
                    </small>
                  )}
                </FormItem>
                <div>
                  <Label>Choose timer</Label>
                  <div className="text-neutral-500 dark:text-neutral-400 text-sm"></div>
                  <div className="timer-select">
                    <RadioGroup
                      value={selectedTimer}
                      onChange={setSelectedTimer}
                    >
                      <RadioGroup.Label className="sr-only">
                        Server size
                      </RadioGroup.Label>
                      <div className="flex overflow-auto py-2 space-x-4 customScrollBar">
                        {plan.map((plan, index) => {
                          if (plan.tokens <= credits) {
                            return (
                              <RadioGroup.Option
                                key={index}
                                value={plan}
                                className={({ active, checked }) =>
                                  `${
                                    active
                                      ? "ring-2 ring-offset-2 ring-offset-sky-300 ring-white ring-opacity-60"
                                      : ""
                                  }
                  ${
                    checked
                      ? "bg-neutral-600 text-white"
                      : "hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  }
                    relative flex-shrink-0 w-44 rounded-xl border border-neutral-200 dark:border-neutral-700 px-6 py-5 cursor-pointer flex focus:outline-none `
                                }
                              >
                                {({ active, checked }) => (
                                  <>
                                    <div className="flex items-center justify-between w-full">
                                      <div className="flex items-center">
                                        <div className="text-sm">
                                          <div className="flex items-center justify-between">
                                            <RadioGroup.Description
                                              as="div"
                                              className={"rounded-full w-32"}
                                            >
                                              <NcImage
                                                containerClassName="aspect-w-1 aspect-h-1 rounded-full overflow-hidden"
                                                src={plan.featuredImage}
                                              />
                                            </RadioGroup.Description>
                                          </div>
                                          <RadioGroup.Label
                                            as="p"
                                            className={`font-semibold mt-3 text-center  ${
                                              checked ? "text-white" : ""
                                            }`}
                                          >
                                            {plan.name} <br />
                                            {plan.desc}
                                          </RadioGroup.Label>
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                )}
                              </RadioGroup.Option>
                            );
                          } else {
                            return;
                          }
                        })}
                      </div>
                    </RadioGroup>
                  </div>
                </div>
                {/* ---- */}
                <FormItem label="Remark">
                  <Textarea
                    rows={6}
                    className="mt-1.5"
                    placeholder="..."
                    {...formik.getFieldProps("remarks")}
                  />
                  {formik.errors.remarks && (
                    <small className="text-red-700">
                      &times; {formik.errors.remarks}
                    </small>
                  )}
                </FormItem>

                <div
                  className="flex items-center justify-center gap-2"
                  style={{ flexWrap: "wrap" }}
                >
                  {remarkOptions.map((option, index) => (
                    <p
                      key={index}
                      className="border-2 border-neutral-100 dark:border-neutral-700 p-2"
                      style={{
                        borderRadius: "15px",
                        margin: "0px",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        if (formik.values.remarks === "") {
                          formik.setFieldValue("remarks", option);
                        } else {
                          formik.setFieldValue(
                            "remarks",
                            formik.values.remarks + ", " + option
                          );
                        }
                      }}
                    >
                      {option}
                    </p>
                  ))}
                </div>

                <div className="w-full border-b-2 border-neutral-100 dark:border-neutral-700"></div>

                {/* ---- */}
                <MySwitch
                  enabled={undertaking}
                  setEnabled={setUndertaking}
                  label=" I accept political privacy and service rendering contract"
                />

                {/* ---- */}
                <div className="pt-2 flex flex-col sm:flex-row space-y-3 sm:space-y-0 space-x-0 sm:space-x-3 ">
                  <ButtonPrimary type="submit">Legit-check now</ButtonPrimary>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

function CheckIcon(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const ContainerWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  grid-gap: 20px;
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
`;

const Icon = styled.img`
  background-color: #0000002f;
  border-radius: 3px;
  width: 100%;
  height: auto;
`;

const UploadButton = styled.span`
  position: absolute;
  top: 50%; /* position the top  edge of the element at the middle of the parent */
  left: 50%; /* position the left edge of the element at the middle of the parent */
  outline: none;
  transform: translate(-50%, -50%);

  .main-button {
    border: 2px solid #08237a;
    background-color: #001aff1c;
    padding: 1rem 3rem;
    font-size: 1.4rem;
    color: #08237a;
    outline: none;
    white-space: nowrap;
    width: 100%;

    @media only screen and (max-width: 600px) {
      padding: 0.875rem 2.1rem;
      font-size: 1rem;
    }
  }
`;

export default PageUploadItem;

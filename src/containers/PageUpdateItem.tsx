import { RadioGroup } from "@headlessui/react";
import FormItem from "components/FormItem";
import Label from "components/Label/Label";
import { FC, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Input from "shared/Input/Input";
import Textarea from "shared/Textarea/Textarea";

import PortalWrapper from "components/PortalWrapper/PortalWrapper";
import Spinner from "components/Spinner";
import app from "config/app";
import { useAuth } from "contexts/AuthContext";
import { useFormik } from "formik";
import { useHistory, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import NcImage from "shared/NcImage/NcImage";
import * as Yup from "yup";
import axios from "../axios";

export interface PageUpdateItemProps {
  className?: string;
}

const status: any = [
  { name: "Pass", badge: "Pass.png" },
  { name: "Not Pass", badge: "NotPass.png" },
  { name: "Unable To Verify", badge: "UnableToVerify.png" },
];

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

const remarkOptions: string[] = [];

const PageUpdateItem: FC<PageUpdateItemProps> = ({ className = "" }) => {
  const [selected, setSelected] = useState<any>(plans[1]);
  const [selectedStatus, setSelectedStatus] = useState<any>(status[1]);
  const { token } = useAuth();
  const [legitCheckImages, setLegitCheckImages] = useState([]);
  const history = useHistory();

  const [legitCheck, setLegitCheck] = useState();
  const [dataLoading, setDataLoading] = useState(true);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const id = query.get("id");

  const [openModal, setOpenModal] = useState(false);
  const toggleModal = () => setOpenModal((prev) => !prev);

  const [comments, setComments] = useState<any[]>([]);
  const [titleInput, setTitleInput] = useState("");

  useEffect(() => {
    const getLegitCheck = async () => {
      await axios
        .get("/products/legit-check/" + id, {
          headers: {
            token: `Bearer ${token}`,
          },
        })
        .then((resp: any) => {
          setLegitCheck(resp.data);
          setDataLoading(false);
        })
        .catch((err: any) => {
          toast.error(
            err.response?.data ? err.response?.data?.message : err.message
          );
          setDataLoading(false);
        });
    };

    getLegitCheck();
  }, []);

  useEffect(() => {
    const getPrePos = async () => {
      const resp = await axios
        .get(`${app.serverURL}/api/pre-prepositions`, {
          headers: {
            token: `Bearer ${token}`,
          },
        })
        .then((resp: any) => resp.data);

      setComments(resp);
    };

    getPrePos();
  }, []);

  const formik = useFormik({
    initialValues: {
      title: "Shirt",
      brand: "Levis",
      link: "",
      remark: "Check",
      comment: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required."),
      brand: Yup.string().required("Brand is required."),
      link: Yup.string().optional(),
      remark: Yup.string().optional(),
      comment: Yup.string().optional(),
    }),
    onSubmit: async (values) => {
      const prod = { ...values, status: selectedStatus?.["name"] };
      setLoading(true);

      await axios
        .put("/products/legit-check/" + id, prod, {
          headers: { token: `Bearer ${token}` },
        })
        .then((resp: any) => {
          toast.success("Updated successfully.");
          setLoading(false);
          history.push("/my-legit-checks");
        })
        .catch((err: any) => {
          toast.error(
            err.response?.data ? err.response?.data?.message : err.message
          );
          setLoading(false);
        });
    },
  });

  useEffect(() => {
    if (legitCheck) {
      setSelected(
        plans.find(
          (plan: any) => plan.id === legitCheck?.["categoryId"]?.["id"]
        )
      );
      formik.setFieldValue("title", legitCheck?.["title"]);
      formik.setFieldValue("brand", legitCheck?.["brand"]);
      formik.setFieldValue("link", legitCheck?.["link"]);
      formik.setFieldValue("remark", legitCheck?.["remark"]);
      formik.setFieldValue("comment", legitCheck?.["comment"] || "");
      setSelectedStatus(
        status.find((stts: any) => stts.name === legitCheck?.["status"]) ||
          status[1]
      );
      setLegitCheckImages(legitCheck?.["images"]);
    }
  }, [legitCheck]);

  return (
    <PortalWrapper>
      {/* Add pre preposition modal */}
      <div
        className={`modal fade fixed top-0 left-0 w-full h-full ${
          !openModal && "hidden"
        } outline-none overflow-x-hidden overflow-y-auto`}
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        style={{ zIndex: 99999999999999 }}
      >
        <div
          className="modal-dialog relative w-auto pointer-events-none"
          style={{ maxWidth: "600px", margin: "50px auto" }}
        >
          <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
            <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
              <h5
                className="text-xl font-medium text-gray-800"
                id="exampleModalLabel"
              >
                Add Pre preposition
              </h5>
              <button
                type="button"
                className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                data-bs-dismiss="modal"
                aria-label="Close"
                style={{ fontSize: 24 }}
                onClick={toggleModal}
              >
                &times;
              </button>
            </div>
            <div className="modal-body relative p-6">
              <form
                noValidate
                onSubmit={async (e) => {
                  e.preventDefault();

                  if (titleInput === "") {
                    toast.error("Enter title.");
                    return false;
                  }

                  const res = await axios
                    .post(
                      `${app.serverURL}/api/pre-prepositions/add`,
                      { title: titleInput },
                      {
                        headers: {
                          token: `Bearer ${token}`,
                        },
                      }
                    )
                    .then((resp: any) => resp.data);

                  setTitleInput("");
                  setComments((prev) => [...prev, res]);
                  toggleModal();
                }}
              >
                <div style={{ marginBottom: "20px" }}>
                  <label style={{ color: "black", width: "100%" }}>
                    Title:
                  </label>
                  <input
                    type="text"
                    placeholder="Title"
                    style={{ width: "100%", color: "black" }}
                    value={titleInput}
                    onChange={(e) => {
                      setTitleInput(e.target.value);
                    }}
                  />
                </div>
                <div className="flex justify-end">
                  <ButtonPrimary type="submit">Add</ButtonPrimary>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* <HeaderLogged /> */}
      <div
        className={`nc-PageUploadItem ${className}`}
        data-nc-id="PageUploadItem"
      >
        <Helmet>
          <title>Update Item || Start Legit-check</title>
        </Helmet>

        {dataLoading ? (
          <div>
            <Spinner size="lg" />
          </div>
        ) : (
          <div className="container">
            <form noValidate onSubmit={formik.handleSubmit}>
              <div className="my-12 sm:lg:my-16 lg:my-24 max-w-4xl mx-auto space-y-8 sm:space-y-10">
                <div>
                  <Label>Choose category</Label>

                  <RadioGroup value={selected} onChange={setSelected}>
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
                  <Input {...formik.getFieldProps("title")} />
                  {formik.errors.title && (
                    <small className="text-red-700">
                      &times; {formik.errors.title}
                    </small>
                  )}
                </FormItem>
                <FormItem label="Brand">
                  <Input {...formik.getFieldProps("brand")} />
                  {formik.errors.brand && (
                    <small className="text-red-700">
                      &times; {formik.errors.brand}
                    </small>
                  )}
                </FormItem>
                <div className="mt-10 md:mt-0 space-y-5 sm:space-y-6 md:sm:space-y-8">
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
                      {formik.errors.link && (
                        <small className="text-red-700">
                          &times; {formik.errors.link}
                        </small>
                      )}
                    </div>
                  </FormItem>

                  {/* ---- */}
                  <FormItem label="Remark">
                    <Textarea
                      rows={6}
                      className="mt-1.5"
                      placeholder="..."
                      {...formik.getFieldProps("remark")}
                    />
                    {formik.errors.remark && (
                      <small className="text-red-700">
                        &times; {formik.errors.remark}
                      </small>
                    )}
                  </FormItem>

                  <div className="space-y-8 lg:space-y-10">
                    {/* HEADING */}
                    <div className="relative grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 ">
                      {legitCheckImages?.map((img, index) => (
                        <NcImage
                          src={`${app.serverURL}/assets/images/${img?.["image"]}`}
                          key={index}
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

                  <FormItem label="Authentication remark">
                    <Textarea
                      rows={6}
                      className="mt-1.5"
                      placeholder="..."
                      {...formik.getFieldProps("comment")}
                    />
                    {formik.errors.comment && (
                      <small className="text-red-700">
                        &times; {formik.errors.comment}
                      </small>
                    )}
                  </FormItem>

                  <div
                    className="flex items-center justify-center gap-2"
                    style={{ flexWrap: "wrap" }}
                  >
                    {comments.length > 0
                      ? comments.map((option, index) => (
                          <p
                            key={index}
                            className="border-2 border-neutral-100 dark:border-neutral-700 p-2"
                            style={{
                              borderRadius: "15px",
                              margin: "0px",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              if (formik.values.comment === "") {
                                formik.setFieldValue("comment", option.title);
                              } else {
                                formik.setFieldValue(
                                  "comment",
                                  formik.values.comment + ", " + option.title
                                );
                              }
                            }}
                          >
                            {option.title}{" "}
                            <span
                              style={{
                                marginLeft: "10px",
                              }}
                              onClick={async (e) => {
                                e.stopPropagation();
                                setComments((prev) =>
                                  prev.filter((item) => item._id !== option._id)
                                );
                                await axios.delete(
                                  `${app.serverURL}/api/pre-prepositions/${option._id}`,
                                  {
                                    headers: {
                                      token: `Bearer ${token}`,
                                    },
                                  }
                                );
                              }}
                            >
                              &times;
                            </span>
                          </p>
                        ))
                      : null}
                    <button
                      type="button"
                      className="border-2 border-neutral-100 dark:border-neutral-700 p-2"
                      style={{
                        borderRadius: "15px",
                        margin: "0px",
                        cursor: "pointer",
                      }}
                      onClick={toggleModal}
                    >
                      + Add New
                    </button>
                  </div>

                  <RadioGroup
                    value={selectedStatus}
                    onChange={setSelectedStatus}
                  >
                    <RadioGroup.Label className="sr-only">
                      Server size
                    </RadioGroup.Label>
                    <div className="flex overflow-auto justify-center py-2 space-x-4 customScrollBar">
                      {status.map((plan: any, index: number) => (
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
                                          src={
                                            "/badge-pass-not-pass/" + plan.badge
                                          }
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
                <div className="pt-2 flex flex-col justify-center sm:items-center sm:flex-row space-y-3 sm:space-y-0 space-x-0 sm:space-x-3 ">
                  <ButtonPrimary type="submit">Update</ButtonPrimary>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
      {/* <Footer /> */}
    </PortalWrapper>
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

export default PageUpdateItem;

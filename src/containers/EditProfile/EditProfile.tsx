import Breadcrumb from "components/Breadcrumb";
import Label from "components/Label/Label";
import PortalWrapper from "components/PortalWrapper/PortalWrapper";
import Spinner from "components/Spinner";
import { useAuth } from "contexts/AuthContext";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Avatar from "shared/Avatar/Avatar";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Input from "shared/Input/Input";
import { imageURL } from "utils/helpers";
import * as Yup from "yup";
import axios from "../../axios";

const EditProfile = () => {
  const { user, token, setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const [data, setData] = useState(null);

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const id = query.get("id");
  const history = useHistory();

  useEffect(() => {
    if (user?.["role"] === `["ROLE_USER"]`) {
      history.push("/");
    }
  }, []);

  useEffect(() => {
    const getUser = async () => {
      await axios
        .get("/users/" + id, {
          headers: {
            token: `Bearer ${token}`,
          },
        })
        .then((resp: any) => {
          setData(resp.data);
          setDataLoading(false);
        })
        .catch((err: any) => {
          toast.error(
            err.response?.data ? err.response?.data?.message : err.message
          );
          setDataLoading(false);
        });
    };

    getUser();
  }, []);

  const formik = useFormik({
    initialValues: {
      image: "avatar.png",
      name: "Sunny",
      surname: "Moda",
      email: "sm@example.com",
      token: 0,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("This field is required."),
      surname: Yup.string().required("This field is required."),
      email: Yup.string()
        .email("Email is invalid.")
        .required("This field is required."),
      token: Yup.number().min(0, "Tokens should be minimum 0.").optional(),
    }),

    onSubmit: async (values) => {
      setLoading(true);
      await axios
        .put(
          "/users/admin/" + id,
          {
            image: values.image,
            name: values.name,
            surname: values.surname,
            email: values.email,
            credit: values.token,
          },
          {
            headers: {
              token: `Bearer ${token}`,
            },
          }
        )
        .then((resp: any) => {
          setData((prev: any) => ({
            ...prev,
            name: resp.data.name,
            image: resp.data.image,
            surname: resp.data.surname,
            email: resp.data.email,
            credit: resp.data.credit,
          }));
          toast.success("Profile updated successfully.");
          setLoading(false);
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
    if (data) {
      formik.setFieldValue("image", data?.["image"]);
      formik.setFieldValue("name", data?.["name"]);
      formik.setFieldValue("surname", data?.["surname"]);
      formik.setFieldValue("email", data?.["email"]);
      formik.setFieldValue("token", data?.["credit"]);
    }
  }, [data]);

  const avatarHandler = async (e: any) => {
    const formData = new FormData();
    formData.append("avatar", e.target.files[0]);
    await axios
      .post("/users/upload", formData, {
        headers: {
          token: `Bearer ${token}`,
        },
      })
      .then((resp: any) => {
        formik.setFieldValue("image", resp.data.filename);
        setData((prev: any) => ({ ...prev, image: resp.data.filename }));
      })
      .catch((err: any) => {
        toast.error(
          err.response?.data ? err.response?.data?.message : err.message
        );
      });
  };

  return (
    <PortalWrapper>
      <Breadcrumb page="Users >> Edit" />
      <div className="container">
        <div className="my-12 sm:lg:my-16 lg:my-24 max-w-4xl mx-auto space-y-8 sm:space-y-10">
          <div className="max-w-2xl">
            <h3 className="text-xl sm:text-4xl font-semibold">User Profile</h3>
            <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
              You can set preferred display name, create your profile URL and
              manage other personal settings.
            </span>
          </div>
          <div className="w-full border-b-2 border-neutral-100 dark:border-neutral-700"></div>
          {dataLoading ? (
            <div className="flex justify-content">
              <Spinner size="lg" />
            </div>
          ) : (
            <form onSubmit={formik.handleSubmit} noValidate>
              <div className="flex flex-col md:flex-row">
                <div className="flex-shrink-0 flex items-start">
                  <div className="relative rounded-full overflow-hidden flex">
                    <Avatar
                      sizeClass="w-32 h-32"
                      imgUrl={imageURL(data?.["image"], "avatar")}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-neutral-50 cursor-pointer">
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 30 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M17.5 5H7.5C6.83696 5 6.20107 5.26339 5.73223 5.73223C5.26339 6.20107 5 6.83696 5 7.5V20M5 20V22.5C5 23.163 5.26339 23.7989 5.73223 24.2678C6.20107 24.7366 6.83696 25 7.5 25H22.5C23.163 25 23.7989 24.7366 24.2678 24.2678C24.7366 23.7989 25 23.163 25 22.5V17.5M5 20L10.7325 14.2675C11.2013 13.7988 11.8371 13.5355 12.5 13.5355C13.1629 13.5355 13.7987 13.7988 14.2675 14.2675L17.5 17.5M25 12.5V17.5M25 17.5L23.0175 15.5175C22.5487 15.0488 21.9129 14.7855 21.25 14.7855C20.5871 14.7855 19.9513 15.0488 19.4825 15.5175L17.5 17.5M17.5 17.5L20 20M22.5 5H27.5M25 2.5V7.5M17.5 10H17.5125"
                          stroke="currentColor"
                          strokeWidth={1.5}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>

                      <span className="mt-1 text-xs">Change Image</span>
                    </div>
                    <input
                      type="file"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={avatarHandler}
                    />
                  </div>
                </div>
                <div className="flex-grow mt-10 md:mt-0 md:pl-16 max-w-3xl space-y-5 sm:space-y-6 md:sm:space-y-7">
                  {/* ---- */}
                  <div>
                    <Label>Name</Label>
                    <Input
                      className="mt-1.5"
                      {...formik.getFieldProps("name")}
                    />
                    {formik.errors.name && (
                      <small className="text-red-700">
                        &times; {formik.errors.name}
                      </small>
                    )}
                  </div>
                  <div>
                    <Label>Surname</Label>
                    <Input
                      className="mt-1.5"
                      {...formik.getFieldProps("surname")}
                    />
                    {formik.errors.surname && (
                      <small className="text-red-700">
                        &times; {formik.errors.surname}
                      </small>
                    )}
                  </div>

                  {/* ---- */}
                  <div>
                    <Label>Email</Label>
                    <div className="mt-1.5 flex">
                      <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                        <i className="text-2xl las la-envelope"></i>
                      </span>
                      <Input
                        className="!rounded-l-none"
                        placeholder="example@email.com"
                        {...formik.getFieldProps("email")}
                      />
                    </div>
                    {formik.errors.email && (
                      <small className="text-red-700">
                        &times; {formik.errors.email}
                      </small>
                    )}
                  </div>

                  {/* ---- */}
                  <div>
                    <Label>Tokens</Label>
                    <Input
                      className="mt-1.5"
                      {...formik.getFieldProps("token")}
                    />
                    {formik.errors.token && (
                      <small className="text-red-700">
                        &times; {formik.errors.token}
                      </small>
                    )}
                  </div>

                  {/* ---- */}
                  <div className="pt-2">
                    <ButtonPrimary className="w-full">
                      {loading ? <Spinner /> : "Update profile"}
                    </ButtonPrimary>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </PortalWrapper>
  );
};

export default EditProfile;

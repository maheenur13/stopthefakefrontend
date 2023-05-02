import Spinner from "components/Spinner";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Input from "shared/Input/Input";
import SwitchDarkMode from "shared/SwitchDarkMode/SwitchDarkMode";
import Helmet from "react-helmet";
import app from "config/app";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "../../axios";
import { toast } from "react-toastify";

const PageForgotPassword = () => {
  const [buttonClicked, setButtonClicked] = useState(false);
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email is invalid")
        .required("Email is required."),
    }),
    onSubmit: async (values) => {
      setButtonClicked(true);
      await axios
        .post("/auth/forgot-password", values)
        .then((resp: any) => {
          toast.success(resp.data.message);
          setButtonClicked(false);
          history.push("/login");
        })
        .catch((err: any) => {
          toast.error(
            err.response?.data ? err.response?.data?.message : err.message
          );
          setButtonClicked(false);
        });
    },
  });

  return (
    <>
      {/* <HeaderLogged /> */}
      <div
        className={`nc-PageLogin`}
        data-nc-id="PageLogin"
        style={{
          minHeight: "100vh",
          marginBottom: "-200px",
          paddingBottom: "30px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "15px 15px 0px 0px",
          }}
        >
          <SwitchDarkMode />
        </div>
        <Helmet>
          <title>Forgot Password || {app.name}</title>
        </Helmet>

        <div className="container mb-24 lg:mb-32">
          <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
            Forgot Password
          </h2>
          <div className="max-w-md mx-auto space-y-6">
            {/* FORM */}
            <form
              className="grid grid-cols-1 gap-6"
              noValidate
              onSubmit={formik.handleSubmit}
            >
              <label className="block">
                <span className="text-neutral-800 dark:text-neutral-200">
                  Email address
                </span>
                <Input
                  type="email"
                  placeholder="example@example.com"
                  className="mt-1"
                  {...formik.getFieldProps("email")}
                />
                {formik.errors.email && (
                  <small className="text-red-700">
                    &times; {formik.errors.email}
                  </small>
                )}
              </label>

              <ButtonPrimary type="submit">
                {buttonClicked ? <Spinner /> : "Continue"}
              </ButtonPrimary>
            </form>

            {/* ==== */}
            <span className="block text-center text-neutral-700 dark:text-neutral-300">
              Remember Password? {` `}
              <Link className="text-green-600" to="/login">
                Login
              </Link>
            </span>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default PageForgotPassword;

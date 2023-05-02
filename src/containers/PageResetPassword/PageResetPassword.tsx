import React, { useState } from "react";
import SwitchDarkMode from "shared/SwitchDarkMode/SwitchDarkMode";
import Helmet from "react-helmet";
import Input from "shared/Input/Input";
import { useFormik } from "formik";
import * as Yup from "yup";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { Link, useHistory, useLocation } from "react-router-dom";
import Spinner from "components/Spinner";
import axios from "../../axios";
import { toast } from "react-toastify";

const PageResetPassword = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const userId = query.get("id");
  const token = query.get("token");

  const [buttonClicked, setButtonClicked] = useState(false);
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      password: "",
      re_password: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(6, "Password is too short.")
        .max(16, "Password is too long.")
        .required("Password is required."),
      re_password: Yup.string()
        .min(6, "Password is too short.")
        .max(16, "Password is too long.")
        .required("Password is required.")
        .oneOf([Yup.ref("password"), null], "Passwords must match."),
    }),
    onSubmit: async (values) => {
      setButtonClicked(true);
      await axios
        .post("/auth/reset-password", {
          id: userId,
          token,
          password: values.password,
        })
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
    <div
      className={`nc-PageSignUp`}
      data-nc-id="PageSignUp"
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
        <title>Reset Password || Stopthefake Legit-check your items</title>
      </Helmet>
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Reset Password
        </h2>
        <div className="max-w-md mx-auto space-y-6 ">
          {/* FORM */}
          {userId && token ? (
            <form
              className="grid grid-cols-1 gap-6"
              noValidate
              onSubmit={formik.handleSubmit}
            >
              <label className="block">
                <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                  Password
                </span>
                <Input
                  type="password"
                  className="mt-1"
                  {...formik.getFieldProps("password")}
                />
                {formik.errors.password && (
                  <small className="text-red-700">
                    &times; {formik.errors.password}
                  </small>
                )}
              </label>
              <label className="block">
                <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                  Retype Password
                </span>
                <Input
                  type="password"
                  className="mt-1"
                  {...formik.getFieldProps("re_password")}
                />
                {formik.errors.re_password && (
                  <small className="text-red-700">
                    &times; {formik.errors.re_password}
                  </small>
                )}
              </label>
              <ButtonPrimary type="submit">
                {buttonClicked ? <Spinner /> : "Continue"}
              </ButtonPrimary>
            </form>
          ) : (
            <div>
              <h3 className="text-center">Link is invalid.</h3>
            </div>
          )}

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            Remember Password? {` `}
            <Link className="text-green-600" to="/login">
              Sign in
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PageResetPassword;

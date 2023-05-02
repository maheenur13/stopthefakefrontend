import React, { FC, useEffect, useState } from "react";
import googleSvg from "images/Google.svg";
import { Helmet } from "react-helmet";
import Input from "shared/Input/Input";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { Link, useHistory } from "react-router-dom";
import SwitchDarkMode from "shared/SwitchDarkMode/SwitchDarkMode";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "contexts/AuthContext";
import Spinner from "components/Spinner";
import axios from "../../axios";
import { toast } from "react-toastify";
import app from "config/app";
import GoogleLoginButton from "components/GoogleLoginButton/GoogleLoginButton";
import ReactGA from "react-ga4";

export interface PageSignUpProps {
  className?: string;
}

const loginSocials = [
  {
    name: "Continue with Google",
    href: `${app.serverURL}/auth/google`,
    icon: googleSvg,
  },
];

const PageSignUp: FC<PageSignUpProps> = ({ className = "" }) => {
  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: window.location.hostname + window.location.search,
      title: "Register Page",
    });
  }, []);

  const [signUpClicked, setSignUpClicked] = useState(false);
  const { login, loggedIn } = useAuth();
  const history = useHistory();

  useEffect(() => {
    loggedIn && history.push("/dashboard");
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, "First name is too short.")
        .required("First name is required."),
      surname: Yup.string()
        .min(2, "Last name is too short.")
        .required("Last name is required."),
      email: Yup.string()
        .email("Email is invalid")
        .required("Email is required."),
      password: Yup.string()
        .min(6, "Password is too short.")
        .max(16, "Password is too long.")
        .required("Password is required."),
    }),
    onSubmit: async (values) => {
      setSignUpClicked(true);
      await axios
        .post("/auth/register", values)
        .then((resp: any) => {
          setSignUpClicked(false);
          login(resp.data);
          history.push("/");
        })
        .catch((err: any) => {
          setSignUpClicked(false);
          toast.error(
            err.response?.data ? err.response?.data?.message : err.meesage
          );
        });
    },
  });

  return (
    <div
      className={`nc-PageSignUp  ${className}`}
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
        <title>Sign up || Stopthefake Legit-check your items</title>
      </Helmet>
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Signup
        </h2>
        <div className="max-w-md mx-auto space-y-6 ">
          <div className="grid gap-3">
            {/* {loginSocials.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className=" flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
              >
                <img
                  className="flex-shrink-0"
                  src={item.icon}
                  alt={item.name}
                />
                <h3 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
                  {item.name}
                </h3>
              </a>
            ))} */}
            <GoogleLoginButton />
          </div>
          {/* OR */}
          <div className="relative text-center">
            <span className="relative z-10 inline-block px-4 font-medium text-sm bg-white dark:text-neutral-400 dark:bg-neutral-900">
              OR
            </span>
            <div className="absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100 dark:border-neutral-800"></div>
          </div>
          {/* FORM */}
          <form
            className="grid grid-cols-1 gap-6"
            noValidate
            onSubmit={formik.handleSubmit}
          >
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Firstname
              </span>
              <Input
                type="text"
                placeholder="Jon"
                className="mt-1"
                {...formik.getFieldProps("name")}
              />
              {formik.errors.name && (
                <small className="text-red-700">
                  &times; {formik.errors.name}
                </small>
              )}
            </label>
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Lastname
              </span>
              <Input
                type="text"
                placeholder="Doe"
                className="mt-1"
                {...formik.getFieldProps("surname")}
              />
              {formik.errors.surname && (
                <small className="text-red-700">
                  &times; {formik.errors.surname}
                </small>
              )}
            </label>
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
            <ButtonPrimary type="submit">
              {signUpClicked ? <Spinner /> : "Continue"}
            </ButtonPrimary>
          </form>

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            Already have an account? {` `}
            <Link className="text-green-600" to="/login">
              Sign in
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PageSignUp;

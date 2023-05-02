import CardAuthorBox3 from "components/CardAuthorBox3/CardAuthorBox3";
import GoogleLoginButton from "components/GoogleLoginButton/GoogleLoginButton";
import Spinner from "components/Spinner";
import app from "config/app";
import { useAuth } from "contexts/AuthContext";
import { useFormik } from "formik";
import googleSvg from "images/Google.svg";
import { FC, useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useHistory, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Input from "shared/Input/Input";
import SwitchDarkMode from "shared/SwitchDarkMode/SwitchDarkMode";
import * as Yup from "yup";
import axios from "../../axios";
import ReactGA from "react-ga4";

export interface PageLoginProps {
  className?: string;
}

const loginSocials = [
  {
    name: "Continue with Google",
    href: `${app.serverURL}/auth/google`,
    icon: googleSvg,
  },
];

const PageLogin: FC<PageLoginProps> = ({ className = "" }) => {
  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: window.location.hostname + window.location.search,
      title: "Login Page",
    });
  }, []);

  const [loginClicked, setLoginClicked] = useState(false);
  const [googleAuth, setGoogleAuth] = useState(false);
  const { login, loggedIn } = useAuth();
  const history = useHistory();
  const location = useLocation();
  const search = new URLSearchParams(location.search);
  const auth = search.get("auth");

  const getGoogleAuthUser = async () => {
    await axios
      .get("/auth/google/user")
      .then((resp: any) => {
        if (resp) {
          setGoogleAuth(false);
          login(resp.data);
          if (resp.data.role === `["ROLE_USER"]`) {
            history.push("/");
          } else {
            history.push("/dashboard");
          }
        } else {
          toast.error("Something went wrong.");
        }
      })
      .catch((err: any) => {
        setGoogleAuth(false);
        toast.error(
          err.response?.data ? err.response?.data?.message : err.message
        );
      });
  };

  useEffect(() => {
    if (auth) {
      setGoogleAuth(true);
      getGoogleAuthUser();
    }
  }, []);

  useEffect(() => {
    loggedIn && history.push("/dashboard");
  }, []);

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email is invalid")
        .required("Email is required."),
      password: Yup.string()
        .min(6, "Password is too short.")
        .max(16, "Password is too long.")
        .required("Password is required."),
    }),
    onSubmit: async (values) => {
      setLoginClicked(true);
      await axios
        .post("/auth/login", values)
        .then((resp: any) => {
          setLoginClicked(false);
          login(resp.data);
          history.push("/dashboard");
        })
        .catch((err: any) => {
          setLoginClicked(false);
          toast.error(
            err.response?.data ? err.response?.data?.message : err.message
          );
        });
    },
  });

  return (
    <>
      {/* <HeaderLogged /> */}
      <div
        className={`nc-PageLogin ${className}`}
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
          <title>Login || Booking React Template</title>
        </Helmet>
        {googleAuth ? (
          <div className="container flex justify-center">
            <Spinner size="lg" />
          </div>
        ) : (
          <div className="container mb-24 lg:mb-32">
            <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
              Login
            </h2>
            <div className="max-w-md mx-auto space-y-6">
              <div className="grid gap-3">
                {/* {loginSocials.map((item, index) => (
                  <button
                    key={index}
                    className="flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
                  >
                    <img
                      className="flex-shrink-0"
                      src={item.icon}
                      alt={item.name}
                    />
                    <h3 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
                      {item.name}
                    </h3>
                  </button>
                ))}
                 */}
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
                    <Link
                      to="/forgot-password"
                      className="text-sm text-green-600"
                    >
                      Forgot password?
                    </Link>
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
                  {loginClicked ? <Spinner /> : "Continue"}
                </ButtonPrimary>
              </form>

              {/* ==== */}
              <span className="block text-center text-neutral-700 dark:text-neutral-300">
                New user? {` `}
                <Link className="text-green-600" to="/signup">
                  Create an account
                </Link>
              </span>
            </div>
          </div>
        )}
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default PageLogin;

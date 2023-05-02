import React, { useEffect } from "react";
import googleSvg from "images/Google.svg";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import axios from "../../axios";
import { useHistory } from "react-router-dom";
import { useAuth } from "contexts/AuthContext";
import { toast } from "react-toastify";

const GoogleLoginButton = () => {
  const clientId =
    "269712187567-86i5tau4f21p8t50pnf9jk8p1t6ujvft.apps.googleusercontent.com";

  const history = useHistory();
  const { login } = useAuth();

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient);
  }, []);

  const onSuccess = async (res: any) => {
    console.log("Success:", res.profileObj);
    await axios
      .post("/auth/google/user", res?.profileObj)
      .then((resp: any) => {
        if (resp) {
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
        toast.error(
          err.response?.data ? err.response?.data?.message : err.message
        );
      });
  };
  const onFailure = (err: any) => {
    console.log("Failed:", err);
  };

  return (
    <GoogleLogin
      clientId={clientId}
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy={"single_host_origin"}
      render={(props: any) => (
        <button
          onClick={props.onClick}
          disabled={props.disabled}
          className="flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
        >
          <img
            className="flex-shrink-0"
            src={googleSvg}
            alt="Continue with Google"
          />
          <h3 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
            Continue with Google
          </h3>
        </button>
      )}
    />
  );
};

export default GoogleLoginButton;

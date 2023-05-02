import Breadcrumb from "components/Breadcrumb";
import PortalWrapper from "components/PortalWrapper/PortalWrapper";
import PostForm from "components/PostForm";
import { useAuth } from "contexts/AuthContext";
import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../../../axios";

const AddPost = () => {
  const { token, user } = useAuth();
  const history = useHistory();
  const location = useLocation();

  const search = new URLSearchParams(location.search);
  const postId = search.get("id");
  const slug = search.get("sg");

  useEffect(() => {
    if (user?.["role"] === `["ROLE_USER"]`) {
      history.push("/");
    }
  }, []);

  const formSubmitHandler = async (values: any) => {
    const postImages = values.files?.map((item: any) => {
      return { filename: item.filename };
    });

    if (postId) {
      await axios
        .post(
          "/posts/create/section",
          {
            postId,
            images: postImages,
            title: values.title,
            description: values.description,
          },
          {
            headers: {
              token: "Bearer " + token,
            },
          }
        )
        .then((resp: any) => {
          toast.success("Post section added successfully.");
          history.push("/blog/" + slug);
        })
        .catch((err: any) => {
          toast.error(err.message);
        });
    } else {
      await axios
        .post(
          "/posts/create",
          { userId: user?.["id"], images: postImages, ...values },
          {
            headers: {
              token: "Bearer " + token,
            },
          }
        )
        .then((resp: any) => {
          toast.success("Post created successfully.");
          history.push("/blog/" + resp.data.slug);
        })
        .catch((err: any) => {
          toast.error(err.message);
        });
    }
  };

  return (
    <PortalWrapper>
      <Breadcrumb page="Add New Post" />
      <div style={{ maxWidth: "600px", width: "100%", margin: "0px auto" }}>
        <div className="max-w-2xl mb-5">
          <h2 className="text-3xl sm:text-4xl font-semibold">
            Add New {postId ? "Section" : "Post"}
          </h2>
          {/* <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
            8h00-23h59 Paris-Fr
          </span> */}
        </div>

        <PostForm formHandler={formSubmitHandler} />
      </div>
    </PortalWrapper>
  );
};

export default AddPost;

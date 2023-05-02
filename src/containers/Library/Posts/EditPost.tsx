import Breadcrumb from "components/Breadcrumb";
import PortalWrapper from "components/PortalWrapper/PortalWrapper";
import PostForm from "components/PostForm";
import Spinner from "components/Spinner";
import { useAuth } from "contexts/AuthContext";
import { useEffect, useState } from "react";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../../../axios";

const EditPost = ({
  match: {
    params: { slug },
  },
}: any) => {
  const { user, token, loggedIn } = useAuth();
  !loggedIn && <Redirect to="/login" />;

  const location = useLocation();
  const search = new URLSearchParams(location.search);
  const id = search.get("id");

  const history = useHistory();

  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (user?.["role"] === `["ROLE_USER"]`) {
      history.push("/");
    }
  }, []);

  const getData = async () => {
    if (id) {
      const res = await axios.get("/posts/section/" + id, {
        headers: {
          token: "Bearer " + token,
        },
      });
      if (res.data) setData(res.data);
    } else {
      const res = await axios.get("/posts/post/" + slug, {
        headers: {
          token: "Bearer " + token,
        },
      });
      if (res.data) setData(res.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const editSubmitHandler = async (values: any) => {
    const postImages = values.files?.map((item: any) => {
      return { filename: item.filename };
    });

    const vals = {
      images: postImages,
      title: values.title,
      description: values.description,
    };

    if (id) {
      await axios
        .put("/posts/section/" + data?._id, vals, {
          headers: {
            token: "Bearer " + token,
          },
        })
        .then((resp: any) => {
          toast.success("Post section updated successfully.");
          history.push("/blog/" + slug);
        })
        .catch((err: any) => {
          toast.error(err.message);
        });
    } else {
      await axios
        .put("/posts/post/" + data?._id, vals, {
          headers: {
            token: "Bearer " + token,
          },
        })
        .then((resp: any) => {
          toast.success("Post updated successfully.");
          history.push("/blog/" + resp.data.slug);
        })
        .catch((err: any) => {
          toast.error(err.message);
        });
    }
  };

  return (
    <PortalWrapper>
      <Breadcrumb page="Edit Post" />
      <div style={{ maxWidth: "600px", width: "100%", margin: "0px auto" }}>
        <div className="max-w-2xl mb-5">
          <h2 className="text-3xl sm:text-4xl font-semibold">
            Edit {id ? "Section" : "Post"}
          </h2>
        </div>

        {loading ? (
          <div className="flex align-center justify-center">
            <Spinner size="lg" />
          </div>
        ) : data ? (
          <PostForm data={data} type={"edit"} formHandler={editSubmitHandler} />
        ) : (
          <p className="text-center">Not found</p>
        )}
      </div>
    </PortalWrapper>
  );
};

export default EditPost;

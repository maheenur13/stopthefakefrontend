import Breadcrumb from "components/Breadcrumb";
import PortalWrapper from "components/PortalWrapper/PortalWrapper";
import SectionLatestPosts from "containers/BlogPage/SectionLatestPosts";
import { useAuth } from "contexts/AuthContext";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import axios from "../../axios";

const Library = () => {
  const [postLoading, setPostLoading] = useState(true);
  const [posts, setPosts] = useState<any>(null);
  const [page, setPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const { user } = useAuth();
  const history = useHistory();

  const paginate = (pg: any) => {
    setPage(pg);
  };

  const getPosts = async (page: number) => {
    const resp = await axios.get("/posts?page=" + page);
    if (resp.data) {
      setTotalPosts(resp.data.count);
      setPosts(resp.data.data);
    }
    setPostLoading(false);
  };

  useEffect(() => {
    setPostLoading(true);
    getPosts(page);
  }, [page]);

  useEffect(() => {
    if (user?.["role"] === `["ROLE_USER"]`) {
      history.push("/");
    }
  }, []);

  return (
    <PortalWrapper>
      <Breadcrumb page="Library" />
      <div className="flex align-center justify-end">
        <ButtonPrimary href="/post/new">New Post</ButtonPrimary>
      </div>
      <div className="py-10">
        <SectionLatestPosts
          dashboard
          count={totalPosts}
          posts={posts}
          postLoading={postLoading}
          paginate={paginate}
        />
      </div>
    </PortalWrapper>
  );
};

export default Library;

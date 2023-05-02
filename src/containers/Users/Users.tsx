import Breadcrumb from "components/Breadcrumb";
import PortalWrapper from "components/PortalWrapper/PortalWrapper";
import SectionGridAuthorBox from "components/SectionGridAuthorBox/SectionGridAuthorBox";
import { useAuth } from "contexts/AuthContext";
import React, { useEffect, useRef, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import ButtonCircle from "shared/Button/ButtonCircle";
import Input from "shared/Input/Input";
import Pagination from "shared/Pagination/Pagination";
import axios from "../../axios";

const Users = () => {
  const { user, token } = useAuth();
  const location = useLocation();
  const search = new URLSearchParams(location.search);
  const pageNumber = Number(search.get("page"));
  const [page, setPage] = useState(pageNumber || 1);
  const [pageSize, setPageSize] = useState(16);
  const [usersCount, setUsersCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const history = useHistory();

  const searchInputRef = useRef<any>();

  const getUsers = async (page: any) => {
    await axios
      .get("/users?page=" + page, {
        headers: {
          token: `Bearer ${token}`,
        },
      })
      .then((resp: any) => {
        setUsersCount(resp.data.count);
        setUsers(resp.data.data);
        setLoading(false);
      })
      .catch((err: any) => {
        setLoading(false);
        toast.error(err.message);
      });
  };

  useEffect(() => {
    setLoading(true);
    getUsers(page);
  }, [page]);

  useEffect(() => {
    if (user?.["role"] === `["ROLE_USER"]`) {
      history.push("/");
    }
  }, []);

  const paginate = (pge: any) => {
    setPage(pge);
  };

  const handleSearchSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    await axios
      .post(
        "/users/search?page=" + page,
        { email: searchInputRef.current.value },
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      )
      .then((resp: any) => {
        setUsersCount(resp.data.count);
        setUsers(resp.data.data);
        setLoading(false);
      })
      .catch((err: any) => {
        setLoading(false);
        toast.error(err.message);
      });
  };

  return (
    <PortalWrapper>
      <div className="p-4">
        <Breadcrumb page="Users" />

        <div className="container">
          {/* <header className="max-w-2xl mx-auto -mt-10 flex flex-col lg:-mt-7 my-5"> */}
          <header className="max-w-lg mx-auto flex flex-col my-5">
            <form
              className="relative w-full"
              noValidate
              onSubmit={handleSearchSubmit}
            >
              <label
                htmlFor="search-input"
                className="text-neutral-500 dark:text-neutral-300"
              >
                <span className="sr-only">Search all icons</span>
                <Input
                  className="shadow-lg border-0 dark:border"
                  id="search-input"
                  type="search"
                  placeholder="Type your keywords"
                  sizeClass="pl-14 py-3 pr-3 md:pl-16"
                  ref={searchInputRef}
                  rounded="rounded-full"
                  // value={searchInput}
                  // onChange={(e) => {
                  //   setSearchInput(e.target.value);
                  // }}
                />
                <ButtonCircle
                  className="absolute right-0 top-1/2 transform -translate-y-1/2"
                  size=" w-11 h-11"
                  type="submit"
                >
                  <i className="las la-arrow-right text-xl"></i>
                </ButtonCircle>
                <span className="absolute left-5 top-1/2 transform -translate-y-1/2 text-2xl md:left-6">
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M22 22L20 20"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </label>
            </form>
          </header>
        </div>

        <SectionGridAuthorBox
          admin={true}
          boxCard="box3"
          loading={loading}
          users={users}
        />
      </div>
      <div className="flex flex-col mt-12 lg:mt-16 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
        <Pagination
          pageSize={pageSize}
          total={usersCount}
          paginate={paginate}
        />
        {/* <ButtonPrimary loading>Show me more</ButtonPrimary> */}
      </div>
    </PortalWrapper>
  );
};

export default Users;

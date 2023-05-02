import HeaderLogged from "components/Header/HeaderLogged";
import Spinner from "components/Spinner";
import { _getImgRd, _getPersonNameRd, _getTitleRd } from "contains/fakeData";
import { useAuth } from "contexts/AuthContext";
import moment from "moment";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import Avatar from "shared/Avatar/Avatar";
import Badge from "shared/Badge/Badge";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import Comment from "shared/Comment/Comment";
import Footer from "shared/Footer/Footer";
import NcImage from "shared/NcImage/NcImage";
import Textarea from "shared/Textarea/Textarea";
import axios from "../../axios";
import app from "../../config/app";
import ReactGA from "react-ga4";
import ButtonForth from "shared/Button/ButtonForth";
import ButtonFifth from "shared/Button/ButtonFifth";
import { CheckCircleIcon } from "@heroicons/react/outline";

const BlogSingle = ({
  match: {
    params: { slug },
  },
}: any) => {
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    if (post) {
      ReactGA.send({
        hitType: "pageview",
        page: window.location.hostname + window.location.search,
        title: post?.["title"],
      });
    }
  }, [post]);

  const { user, token } = useAuth();
  const history = useHistory();

  const [postId, setPostId] = useState(null);
  const [sectionId, setSectionId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [postDeleteModal, setPostDeleteModal] = useState(false);
  const [postSectionDeleteModal, setPostSectionDeleteModal] = useState(false);

  const postDeleteModalToggler = () => setPostDeleteModal((prev) => !prev);
  const postSectionDeleteModalToggler = () =>
    setPostSectionDeleteModal((prev) => !prev);

  const getPost = async () => {
    const singlePost = await axios.get("/posts/" + slug);
    if (singlePost.data) setPost(singlePost.data);

    setLoading(false);
  };

  useEffect(() => {
    getPost();
  }, []);

  const postDeleteHandler = async () => {
    if (postId) {
      await axios
        .delete("/posts/post/" + postId, {
          headers: {
            token: "Bearer " + token,
          },
        })
        .then((resp: any) => {
          setPostId(null);
          toast.success(resp.data.message);
          history.push("/blog");
        })
        .catch((err: any) => {
          toast.error(err.message);
        });
    }
  };

  const postSectionDeleteHandler = async () => {
    if (sectionId) {
      await axios
        .delete("/posts/section/" + sectionId, {
          headers: {
            token: "Bearer " + token,
          },
        })
        .then((resp: any) => {
          setSectionId(null);
          toast.success(resp.data.message);
          window.location.reload();
        })
        .catch((err: any) => {
          toast.error(err.message);
        });
    }
  };

  const renderHeader = () => {
    return (
      <>
        <div className="container mb-10">
      
        </div>
        <header className="container rounded-xl">
          <div className="max-w-screen-md mx-auto space-y-5">
            {/* <Badge href="##" color="purple" name="Traveler" /> */}
            <h1
              className=" text-neutral-900 font-semibold text-3xl md:text-4xl md:!leading-[120%] lg:text-4xl dark:text-neutral-100 max-w-4xl "
              title="Quiet ingenuity: 120,000 lunches and counting"
            >
              {post?.["title"]}
            </h1>
            {/* <span className="block text-base text-neutral-500 md:text-lg dark:text-neutral-400 pb-1">
            We’re an online magazine dedicated to covering the best in
            international product design. We started as a little blog back in
            2002 covering student work and over time
          </span> */}

            <div className="w-full border-b border-neutral-100 dark:border-neutral-800"></div>
            <div className="flex flex-col items-center sm:flex-row sm:justify-between">
              <div className="nc-PostMeta2 flex items-center flex-wrap text-neutral-700 text-left dark:text-neutral-200 text-sm leading-none flex-shrink-0">
                <Avatar
                  imgUrl={
                    app.serverURL +
                    "/assets/images/" +
                    post?.["userId"]?.["image"]
                  }
                  containerClassName="flex-shrink-0"
                  sizeClass="w-8 h-8 sm:h-11 sm:w-11 "
                />
                <div className="ml-3">
                  <div className="flex items-center">
                    <a className="block font-semibold" href="/#">
                      {post?.["userId"]?.["name"] +
                        " " +
                        post?.["userId"]?.["surname"]}
                    </a>
                  </div>
                  <div className="text-xs mt-[6px]">
                    <span className="text-neutral-700 dark:text-neutral-300">
                      {moment(post?.["createdAt"]).format("MMM DD, YYYY") ||
                        "May 20, 2021"}
                    </span>
                    {/* <span className="mx-2 font-semibold">·</span>
                  <span className="text-neutral-700 dark:text-neutral-300">
                    6 min read
                  </span> */}
                  </div>
                </div>
              </div>
              {user?.["role"] === '["ROLE_ADMIN"]' && (
                <div className="mt-3 sm:mt-1.5 sm:ml-3">
                  {/* <SocialsList /> */}
                  <p>
                    <Link to={"/library/" + post?.slug}>Edit</Link>
                    &nbsp;&nbsp; |&nbsp;&nbsp;{" "}
                    <button
                      style={{ display: "inline", cursor: "pointer" }}
                      onClick={() => {
                        setPostId(post?._id);
                        postDeleteModalToggler();
                      }}
                    >
                      Delete
                    </button>
                  </p>
                </div>
              )}
            </div>
          </div>
        </header>
      </>
    );
  };

  const renderContent = () => {
    return (
      <div
        id="single-entry-content"
        className="prose prose-sm !max-w-screen-md sm:prose lg:prose-lg mx-auto dark:prose-invert"
      >
        <p>{post?.["description"]}</p>
        <div
          style={{
            maxWidth: "330px",
            padding: "15px",
            paddingTop: "0px",
            margin: "0px auto",
            background: "white",
            color: "black",
          }}
        >
          <h3 style={{ color: "black" }}>
            Need your item authenticated by us?
          </h3>
          <p>
            Proven expertise, not self-claimed. Get checked by the industry's
            top experts
          </p>
          <div style={{ position: "relative" }}>
            <ButtonFifth href="/page-upload-item">
              <CheckCircleIcon
                width={22}
                height={22}
                style={{ marginRight: "7px" }}
              />{" "}
              Get Authenticated
            </ButtonFifth>
            <p className="fifth-btn-label">NEW!</p>
          </div>
        </div>

        <div>
          {post?.sections?.map((item: any, index: number) => (
            <>
              <div key={index}>
                <h2>{item.title}</h2>
                {user?.["role"] === '["ROLE_ADMIN"]' && (
                  <p className="text-right">
                    <small>
                      <Link
                        to={"/library/" + post?.slug + "?id=" + item?._id}
                        style={{ textDecoration: "none", fontWeight: "normal" }}
                      >
                        Edit
                      </Link>{" "}
                      |{" "}
                      <div
                        style={{ display: "inline", cursor: "pointer" }}
                        onClick={() => {
                          setSectionId(item?._id);
                          postSectionDeleteModalToggler();
                        }}
                      >
                        <span>Delete</span>
                      </div>
                    </small>
                  </p>
                )}
                <p>{item.description}</p>
                {item.images.length > 1 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {item.images.map((image: any, index: number) => (
                      <div key={index}>
                        <figure>
                          <img
                            src={
                              app.serverURL + "/assets/images/" + image.filename
                            }
                            className="rounded-2xl"
                            alt="Not found"
                          />
                        </figure>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div>
                    <figure>
                      <img
                        src={
                          app.serverURL +
                          "/assets/images/" +
                          item.images[0].filename
                        }
                        className="rounded-2xl"
                        alt="Not found"
                      />
                    </figure>
                  </div>
                )}
              </div>

            </>
          ))}
        </div>
        {/* <p>
          It is a long established fact that a <strong>reader</strong> will be
          distracted by the readable content of a page when looking at its{" "}
          <strong>layout</strong>. The point of using Lorem Ipsum is that it has
          a more-or-less normal{" "}
          <a href="/#" target="_blank" rel="noopener noreferrer">
            distribution of letters.
          </a>{" "}
        </p>
        <ol>
          <li>We want everything to look good out of the box.</li>
          <li>
            Really just the first reason, that's the whole point of the plugin.
          </li>
          <li>
            Here's a third pretend reason though a list with three items looks
            more realistic than a list with two items.
          </li>
        </ol>
        <h3>Typography should be easy</h3>
        <p>
          So that's a header for you — with any luck if we've done our job
          correctly that will look pretty reasonable.
        </p>
        <p>Something a wise person once told me about typography is:</p>
        <blockquote>
          <p>
            Typography is pretty important if you don't want your stuff to look
            like trash. Make it good then it won't be bad.
          </p>
        </blockquote>
        <p>
          It's probably important that images look okay here by default as well:
        </p>
        <figure>
          <img
            src="https://images.unsplash.com/photo-1501493870936-9c2e41625521?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1045&amp;q=80"
            alt="nc blog"
            className="rounded-2xl"
          />
          <figcaption>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure vel
            officiis ipsum placeat itaque neque dolorem modi perspiciatis dolor
            distinctio veritatis sapiente
          </figcaption>
        </figure>
        <p>
          Now I'm going to show you an example of an unordered list to make sure
          that looks good, too:
        </p>
        <ul>
          <li>So here is the first item in this list.</li>
          <li>In this example we're keeping the items short.</li>
          <li>Later, we'll use longer, more complex list items.</li>
        </ul>
        <p>And that's the end of this section.</p>
        <h2>Code should look okay by default.</h2>
        <p>
          I think most people are going to use{" "}
          <a href="https://highlightjs.org/">highlight.js</a> or{" "}
          <a href="https://prismjs.com/">Prism</a> or something if they want to
          style their code blocks but it wouldn't hurt to make them look{" "}
          <em>okay</em> out of the box, even with no syntax highlighting.
        </p>
        <p>
          What I've written here is probably long enough, but adding this final
          sentence can't hurt.
        </p>

        <p>Hopefully that looks good enough to you.</p>
        <h3>We still need to think about stacked headings though.</h3>
        <h4>
          Let's make sure we don't screw that up with <code>h4</code> elements,
          either.
        </h4>
        <p>
          Phew, with any luck we have styled the headings above this text and
          they look pretty good.
        </p>
        <p>
          Let's add a closing paragraph here so things end with a decently sized
          block of text. I can't explain why I want things to end that way but I
          have to assume it's because I think things will look weird or
          unbalanced if there is a heading too close to the end of the document.
        </p>
        <p>
          What I've written here is probably long enough, but adding this final
          sentence can't hurt.
        </p> */}
      </div>
    );
  };

  const renderTags = () => {
    return (
      <div className="max-w-screen-md mx-auto flex flex-wrap">
        <a
          className="nc-Tag inline-block bg-white text-sm text-neutral-600 py-2 rounded-lg border border-neutral-100  md:px-4 dark:bg-neutral-700 dark:border-neutral-700 hover:border-neutral-200 dark:hover:border-neutral-6000 mr-2 mb-2"
          href="##"
        >
          Garden
        </a>
        <a
          className="nc-Tag inline-block bg-white text-sm text-neutral-600 py-2 rounded-lg border border-neutral-100  md:px-4 dark:bg-neutral-700 dark:border-neutral-700 hover:border-neutral-200 dark:hover:border-neutral-6000 mr-2 mb-2"
          href="##"
        >
          Jewelry
        </a>
        <a
          className="nc-Tag inline-block bg-white text-sm text-neutral-600 py-2 rounded-lg border border-neutral-100  md:px-4 dark:bg-neutral-700 dark:border-neutral-700 hover:border-neutral-200 dark:hover:border-neutral-6000 mr-2 mb-2"
          href="##"
        >
          Tools
        </a>
      </div>
    );
  };

  const renderAuthor = () => {
    return (
      <div className="max-w-screen-md mx-auto ">
        <div className="nc-SingleAuthor flex items-center mb-10">
          <Avatar
            sizeClass="w-11 h-11 md:w-24 md:h-24"
            imgUrl={
              app.serverURL + "/assets/images/" + post?.["userId"]?.["image"]
            }
          />
          <div className="flex flex-col ml-3 max-w-lg sm:ml-5 space-y-1">
            <span className="text-xs text-neutral-400 uppercase tracking-wider">
              WRITEN BY
            </span>
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-200">
              {/* <a href="/ncmaz/author/the-demo-author-slug"> */}
              {post?.["userId"]?.["name"] +
                " " +
                post?.["userId"]?.["surname"] || "Fones Mimi"}
              {/* </a> */}
            </h2>
            {/* <span className="text-sm text-neutral-500 sm:text-base dark:text-neutral-300">
              There’s no stopping the tech giant. Apple now opens its 100th
              store in China.There’s no stopping the tech giant.
              <a
                className="text-primary-6000 font-medium ml-1"
                href="/ncmaz/author/the-demo-author-slug"
              >
                Read More
              </a>
            </span> */}
          </div>
        </div>
      </div>
    );
  };

  const renderCommentForm = () => {
    return (
      <div className="max-w-screen-md mx-auto pt-5">
        <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">
          Responses (14)
        </h3>
        <form className="nc-SingleCommentForm mt-5">
          <Textarea />
          <div className="mt-2 space-x-3">
            <ButtonPrimary>Submit</ButtonPrimary>
            <ButtonSecondary>Cancel</ButtonSecondary>
          </div>
        </form>
      </div>
    );
  };

  const renderCommentLists = () => {
    return (
      <div className="max-w-screen-md mx-auto">
        <ul className="nc-SingleCommentLists space-y-5">
          <li>
            <Comment />
            <ul className="pl-4 mt-5 space-y-5 md:pl-11">
              <li>
                <Comment isSmall />
              </li>
            </ul>
          </li>
          <li>
            <Comment />
            <ul className="pl-4 mt-5 space-y-5 md:pl-11">
              <li>
                <Comment isSmall />
              </li>
            </ul>
          </li>
        </ul>
      </div>
    );
  };

  const renderPostRelated = (_: any, index: number) => {
    return (
      <div
        key={index}
        className="relative aspect-w-3 aspect-h-4 rounded-3xl overflow-hidden group"
      >
        <Link to={"/blog-single"} />
        <NcImage
          className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
          src={_getImgRd()}
        />
        <div>
          <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-black"></div>
        </div>
        <div className="flex flex-col justify-end items-start text-xs text-neutral-300 space-y-2.5 p-4">
          <Badge name="Categories" />
          <h2 className="block text-lg font-semibold text-white ">
            <span className="line-clamp-2">{_getTitleRd()}</span>
          </h2>

          <div className="flex">
            <span className="block text-neutral-200 hover:text-white font-medium truncate">
              {_getPersonNameRd()}
            </span>
            <span className="mx-1.5 font-medium">·</span>
            <span className="font-normal truncate">May 20, 2021</span>
          </div>
        </div>
        <Link to={"/blog-single"} />
      </div>
    );
  };

  return (
    <>
      <div
        id="popup-modal"
        tabIndex={-1}
        className={`${
          !postDeleteModal && "hidden"
        } flex justify-center align-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 p-4 md:inset-0 h-modal md:h-full`}
      >
        <div className="relative w-full max-w-md h-full md:h-auto">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              data-modal-toggle="popup-modal"
              onClick={postDeleteModalToggler}
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-6 text-center">
              <svg
                aria-hidden="true"
                className="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to delete this post?
              </h3>
              <button
                data-modal-toggle="popup-modal"
                type="button"
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                onClick={() => {
                  postDeleteHandler();
                  postDeleteModalToggler();
                }}
              >
                Yes, I'm sure
              </button>
              <button
                data-modal-toggle="popup-modal"
                type="button"
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                onClick={postDeleteModalToggler}
              >
                No, cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        id="popup-modal"
        tabIndex={-1}
        className={`${
          !postSectionDeleteModal && "hidden"
        } flex justify-center align-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 p-4 md:inset-0 h-modal md:h-full`}
      >
        <div className="relative w-full max-w-md h-full md:h-auto">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              data-modal-toggle="popup-modal"
              onClick={postSectionDeleteModalToggler}
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-6 text-center">
              <svg
                aria-hidden="true"
                className="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to delete this post section?
              </h3>
              <button
                data-modal-toggle="popup-modal"
                type="button"
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                onClick={() => {
                  postSectionDeleteHandler();
                  postSectionDeleteModalToggler();
                }}
              >
                Yes, I'm sure
              </button>
              <button
                data-modal-toggle="popup-modal"
                type="button"
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                onClick={postSectionDeleteModalToggler}
              >
                No, cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      <HeaderLogged />
      <div className="nc-PageSingle pt-8 lg:pt-16 ">
        <Helmet>
          <title>
            {loading ? "Loading ... " : post?.["title"]} - Stopthefake - Legit
            check your item
          </title>
        </Helmet>
        {loading ? (
          <div className="flex align-center justify-center mb-10">
            <Spinner size="lg" />
          </div>
        ) : post ? (
          <>
            {renderHeader()}
            <NcImage
              className="w-full rounded-xl"
              containerClassName="container my-10 sm:my-12 "
              // src="https://images.unsplash.com/photo-1605487903301-a1dff2e6bbbe?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1957&q=80"
              src={
                app.serverURL +
                "/assets/images/" +
                post?.["images"][0]?.["filename"]
              }
            />
            <div className="nc-SingleContent container space-y-10">
              {post?.["images"]?.length > 1 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {post?.["images"]
                    ?.slice(1)
                    .map((image: any, index: number) => (
                      <NcImage
                        className="w-full rounded-xl"
                        // src="https://images.unsplash.com/photo-1605487903301-a1dff2e6bbbe?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1957&q=80"
                        src={
                          app.serverURL +
                          "/assets/images/" +
                          image?.["filename"]
                        }
                        key={index}
                      />
                    ))}
                </div>
              )}
              {renderContent()}
              {user?.["role"] === '["ROLE_ADMIN"]' && (
                <div className="flex items-center justify-center">
                  <ButtonPrimary
                    href={"/post/new?id=" + post?.["_id"] + "&sg=" + slug}
                  >
                    Add Section
                  </ButtonPrimary>
                </div>
              )}
              {/* {renderTags()} */}
              <div className="max-w-screen-md mx-auto border-b border-t border-neutral-100 dark:border-neutral-700"></div>
              {renderAuthor()}
              {/* {renderCommentForm()}
          {renderCommentLists()} */}
            </div>
          </>
        ) : (
          <div className="flex align-center justify-center mb-10">
            <p style={{ textAlign: "center", margin: "0px" }}>No post found.</p>
          </div>
        )}
        {/* <div className="relative bg-neutral-100 dark:bg-neutral-800 py-16 lg:py-28 mt-16 lg:mt-24">
          <div className="container ">
            <h2 className="text-3xl font-semibold">Related posts</h2>
            <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {[1, 1, 1, 1].filter((_, i) => i < 4).map(renderPostRelated)}
            </div>
          </div>
        </div> */}
      </div>
      <Footer />
    </>
  );
};

export default BlogSingle;

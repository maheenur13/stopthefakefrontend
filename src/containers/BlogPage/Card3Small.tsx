import PostCardMeta from "components/PostCardMeta/PostCardMeta";
import app from "config/app";
import { _getImgRd, _getTitleRd } from "contains/fakeData";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import NcImage from "shared/NcImage/NcImage";

export interface Card3SmallProps {
  className?: string;
  post?: any;
}

const Card3Small: FC<Card3SmallProps> = ({ className = "h-full", post }) => {
  return (
    <div
      className={`nc-Card3Small relative flex flex-col-reverse sm:flex-row sm:justify-between sm:items-center ${className}`}
      data-nc-id="Card3Small"
    >
      <Link
        to={"/blog/" + post.slug}
        className=" absolute inset-0"
        title={"title"}
      ></Link>
      <div className="relative space-y-2">
        <PostCardMeta post={post} />
        <h2 className="nc-card-title block text-base font-semibold text-neutral-900 dark:text-neutral-100">
          <Link
            to={"/blog/" + post.slug}
            className=" line-clamp-2 capitalize"
            title={"title"}
          >
            {post.title}
          </Link>
        </h2>
      </div>

      <Link
        to={"/blog/" + post.slug}
        title={"title"}
        className={`block sm:w-20 flex-shrink-0 relative rounded-lg overflow-hidden mb-5 sm:ml-4 sm:mb-0 group`}
      >
        <div className={`w-full h-0 aspect-w-16 aspect-h-9 sm:aspect-h-16`}>
          <NcImage
            containerClassName="absolute inset-0"
            className="object-cover w-full h-full group-hover:scale-110 transform transition-transform duration-300"
            src={app.serverURL + "/assets/images/" + post.images[0].filename}
          />
        </div>
      </Link>
    </div>
  );
};

export default Card3Small;

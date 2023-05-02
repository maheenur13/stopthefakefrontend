import React, { FC } from "react";
import Avatar from "shared/Avatar/Avatar";
import { Link } from "react-router-dom";
import { _getPersonNameRd } from "contains/fakeData";
import app from "config/app";
import moment from "moment";

export interface PostCardMetaProps {
  className?: string;
  hiddenAvatar?: boolean;
  post?: any;
}

const PostCardMeta: FC<PostCardMetaProps> = ({
  className = "leading-none",
  hiddenAvatar = false,
  post,
}) => {
  return (
    <div
      className={`nc-PostCardMeta inline-flex items-center fledx-wrap text-neutral-800 dark:text-neutral-200 text-sm ${className}`}
      data-nc-id="PostCardMeta"
    >
      <Link
        to={"#"}
        className="flex-shrink-0 relative flex items-center space-x-2"
      >
        {!hiddenAvatar && (
          <Avatar
            radius="rounded-full"
            sizeClass={"h-7 w-7 text-sm"}
            imgUrl={app.serverURL + "/assets/images/" + post?.userId?.image}
          />
        )}
        <span className="block text-neutral-6000 hover:text-black dark:text-neutral-300 dark:hover:text-white font-medium">
          {post?.userId?.name + " " + post?.userId?.surname}
        </span>
      </Link>
      <>
        <span className="text-neutral-500 dark:text-neutral-400 mx-[6px] font-medium">
          ·
        </span>
        <span className="text-neutral-500 dark:text-neutral-400 font-normal line-clamp-1">
          {moment(post?.createdAt).format("MMM DD, YYYY")}
        </span>
      </>
    </div>
  );
};

export default PostCardMeta;

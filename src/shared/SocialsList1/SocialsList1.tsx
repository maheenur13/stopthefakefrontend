import instagram from "images/socials/instagram.svg";
import twitter from "images/socials/twitter.svg";
import youtube from "images/socials/youtube.svg";
import tiktok from "images/socials/_Group_-22.svg";
import { FC } from "react";
import { SocialType } from "shared/SocialsShare/SocialsShare";

export interface SocialsList1Props {
  className?: string;
}

const socials: SocialType[] = [
  { name: "Instagram", icon: instagram, href: "https://www.instagram.com/stop__the_fake/" },
  { name: "TikTok", icon: tiktok, href: "https://www.tiktok.com/@stop_the_fake?is_from_webapp=1&sender_device=pc" },
  { name: "Twitter", icon: twitter, href: "https://twitter.com/stopthefake3" },
  { name: "Youtube", icon: youtube, href: "https://www.youtube.com/channel/UCuS9zmNnLsyFJmQ71kL-v5Q" },

];

const SocialsList1: FC<SocialsList1Props> = ({ className = "space-y-3" }) => {
  const renderItem = (item: SocialType, index: number) => {
    return (
      <a
        href={item.href}
        className="flex items-center text-2xl text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white leading-none space-x-2 group"
        key={index}
      >
        <div className="flex-shrink-0 w-5 ">
          <img src={item.icon} alt="" />
        </div>
        <span className="hidden lg:block text-sm">{item.name}</span>
      </a>
    );
  };

  return (
    <div className={`nc-SocialsList1 ${className}`} data-nc-id="SocialsList1">
      {socials.map(renderItem)}
    </div>
  );
};

export default SocialsList1;

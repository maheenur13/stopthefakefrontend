import Heading from "components/Heading/Heading";
import React from "react";
import NcImage from "shared/NcImage/NcImage";

export interface People {
  id: string;
  name: string;
  job: string;
  avatar: string;
}

const FOUNDER_DEMO: People[] = [
  {
    id: "1",
    name: `Riadh`,
    job: "Co-founder and Chief Executive",
    avatar: "/riyad5.jpg",
  },
  {
    id: "4",
    name: `Lucas`,
    job: "Authenticator",
    avatar: "/hugo2.jpg",
  },
  {
    id: "3",
    name: `Nicolas`,
    job: "Marketing Director",
    avatar: "/nico.jpeg",
  },
  {
    id: "2",
    name: `Hugo`,
    job: "Co-Founder, Chief Strategy Officer",
    avatar: "/beram.jpeg",
  },
  {
    id: "5",
    name: `Sylvain`,
    job: "Authenticator",
    avatar: "/sylvain.jpg",
  },
  {
    id: "6",
    name: `Manon`,
    job: "Authenticator",
    avatar: "/manon.jpeg",
  },
];

const SectionFounder = () => {
  return (
    <div className="nc-SectionFounder relative">
      <Heading
        desc="We’re impartial and independent, and every day we create distinctive,
          world-class programmes and content"
      >
        OUR TEAM
      </Heading>
      <div className="grid sm:grid-cols-2 gap-x-5 gap-y-8 lg:grid-cols-6 xl:gap-x-8">
        {FOUNDER_DEMO.map((item) => (
          <div key={item.id} className="max-w-sm">
            <NcImage
              containerClassName="relative h-0 aspect-h-1 aspect-w-1 rounded-xl overflow-hidden"
              className="absolute inset-0 object-cover"
              src={item.avatar}
            />
            <h3 className="text-lg font-semibold text-neutral-900 mt-4 md:text-xl dark:text-neutral-200">
              {item.name}
            </h3>
            <span className="block text-sm text-neutral-500 sm:text-base dark:text-neutral-400">
              {item.job}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionFounder;

import Heading from "components/Heading/Heading";
import React from "react";
import NcImage from "shared/NcImage/NcImage";

const SectionWhy = () => {
  return (
    <div className="nc-SectionFounder relative">
      <Heading>
        Why choose{" "}
        <span style={{ textDecoration: "underline", marginLeft: "10px" }}>
          stopthefake.fr ?
        </span>
      </Heading>
      <div className="grid grid-cols-1 gap-x-5 gap-y-8 md:grid-cols-3 xl:gap-x-8">
        <NcImage
          containerClassName="relative h-0 aspect-h-1 aspect-w-1 rounded-xl overflow-hidden"
          className="absolute inset-0 object-cover"
          src="/stf-about-1.jpg"
        />
        <NcImage
          containerClassName="relative h-0 aspect-h-1 aspect-w-1 rounded-xl overflow-hidden"
          className="absolute inset-0 object-cover"
          src="/stf-about-2.jpg"
        />
        <NcImage
          containerClassName="relative h-0 aspect-h-1 aspect-w-1 rounded-xl overflow-hidden"
          className="absolute inset-0 object-cover"
          src="/stf-about-3.jpg"
        />
      </div>
    </div>
  );
};

export default SectionWhy;

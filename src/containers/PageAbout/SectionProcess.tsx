import Heading from "components/Heading/Heading";
import React from "react";
import NcImage from "shared/NcImage/NcImage";

const SectionProcess = () => {
   return(
    <div className="nc-SectionFounder relative">
      <Heading>
       Our mission is clear :{" "}
        
      </Heading>
      <div className="grid grid-cols-1 gap-x-5 gap-y-8 md:grid-cols-2 xl:gap-x-8">
        <NcImage
          containerClassName="relative h-0 aspect-h-1 aspect-w-1 rounded-xl overflow-hidden"
          className="absolute inset-0 object-cover"
          src="/our-mission.jpg"
        />
        <NcImage
          containerClassName="relative h-0 aspect-h-1 aspect-w-1 rounded-xl overflow-hidden"
          className="absolute inset-0 object-cover"
          src="/our-mission1.jpg"
        />
        
      </div>
    </div>
   );

};
export default SectionProcess;

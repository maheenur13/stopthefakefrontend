import React, { FC } from "react";
import { Link } from "react-router-dom";

export interface RealVsFakeCardProps {
  index: number;
  img: string;
  title: string;
  date: string;
  by: string;
  desc: string;
}

const RealVsFakeCard: FC<RealVsFakeCardProps> = ({
  index,
  img,
  title,
  date,
  by,
  desc,
}) => {
  return (
    <Link
      className={`card ${index === 0 && "col-span-2"} ${
        index !== 0 && "col-span-2 md:col-span-1"
      }`}
      to="#"
    >
      <div>
        <div className={index === 0 ? "card-img-full" : "card-img"}>
          <img src={img} alt="Not found" width="100%" />
        </div>
        <div>
          <h1 className={`card-title ${index === 0 && "card-title-center"}`}>
            {title}
          </h1>
          <p className={`card-mata ${index === 0 && "card-mata-center"}`}>
            <span style={{ paddingRight: "50px" }}>
              <i className="las la-calendar"></i> {date}
            </span>
            <span>
              <i className="lar la-user"></i> {"Posted by " + by}
            </span>
          </p>
          <p className={`card-desc ${index === 0 && "card-desc-center"}`}>
            {desc}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default RealVsFakeCard;

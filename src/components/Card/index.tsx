import React from "react";
import CountUp from "react-countup";

type CardItem = {
  id?: string;
  text: string;
  value: number | any;
  icon: any;
};

const Card = ({ id, text, value, icon }: CardItem) => (
  <div
    id={id}
    className="m-1 flex w-[60%] flex-col items-center justify-center rounded-lg bg-white p-2 shadow md:w-[32%] md:p-5"
  >
    {icon && <span>{icon}</span>}
    <p className="normal-text">{text}</p>
    <p className="header-text">
      <CountUp end={value} />
    </p>
  </div>
);

export default Card;

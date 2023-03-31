import React from "react";
import { GiBurningDot } from "react-icons/gi";
import { header } from "@/constant";
type CardItem = {
  id?: string;
  text: string;
  value: number | any;
  icon: any;
  name: string | any;
};
let today = new Date();
let date = today.getDate();
let month = today.getMonth() + 1;
let year = today.getFullYear();

let currentDate = `${year}/${month}/${date}`;

const ShareCard = ({ id, text, value, name, icon }: CardItem) => (
  <div
    id={id}
    className="m-1 flex h-[40vh] w-[46%] flex-row items-center justify-center rounded-lg bg-white  shadow md:w-[50%] "
  >
    <div className="flex h-[40vh] w-[60%] flex-col items-center justify-center bg-brand_primary">
      <GiBurningDot className="text-6xl text-white" />
      <p className="header-text text-lg text-white">{header}</p>
      {/* <p className='name-text text-2xl text-white'>{name}</p> */}
    </div>
    <div className="flex flex-col items-center justify-center rounded-lg p-2 md:p-5">
      {icon && <span>{icon}</span>}
      <p className="normal-text">{text}</p>
      {/* <p className='header-text'>{value}</p>
    <p className='normal-text'>{currentDate}</p> */}
    </div>
  </div>
);

export default ShareCard;

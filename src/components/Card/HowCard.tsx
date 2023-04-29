import React from "react";
type CardItem = {
  id: number;
  title: string;
  text: string;
  icon: any;
};

const HowCard = ({ id, title, icon, text }: CardItem) => (
  <div className="rounded-lg bg-white p-4">
    <span className="h-[32px] w-[32px] md:h-[48px] md:w-[48px]">{icon}</span>
    <p className="header-text mt-4 text-[12px] leading-[16px] md:text-[16px] md:leading-[22px]">
      {title}
    </p>

    <p className="font-primary text-[10px] font-thin leading-[16px] text-[#A1A1A1] md:text-[12px] md:leading-[20px]">
      {text}
    </p>
  </div>
);

export default HowCard;

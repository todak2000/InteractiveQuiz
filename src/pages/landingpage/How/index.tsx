import React from "react";
import { howArray } from "@/constant";

import HowCard from "@/components/Card/HowCard";

const How: React.FC = () => {
  return (
    <section className="bg-about flex w-full flex-col items-center justify-center bg-[#F8F9FC] px-4 pt-[80px] md:px-[120px] md:py-[80px] ">
      <p className="font-sencondary my-4 text-3xl" id="how-to-play">
        How to Play
      </p>
      <div className="mt-8 grid w-full grid-cols-2 gap-3 md:mt-0 md:grid-cols-4 ">
        {howArray.map((item) => {
          return (
            <HowCard
              key={item.id}
              id={item.id}
              title={item.title}
              icon={item.icon}
              text={item.text}
            />
          );
        })}
      </div>
    </section>
  );
};

export default How;

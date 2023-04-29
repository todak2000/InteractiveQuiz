import React from "react";
import { GiBurningDot } from "react-icons/gi";

import { header } from "@/constant";

function Footer() {
  return (
    <footer className="grid w-full grid-cols-1 bg-brand_footer px-4 py-4">
      <section className="flex flex-col items-center justify-center">
        <div className="flex flex-shrink-0 flex-row items-center ">
          <GiBurningDot className="mr-2 text-2xl text-white" />
          <p className="header-text text-white">{header}</p>
        </div>
        <p className="normal-text text-white">© {new Date().getFullYear()}</p>
      </section>
    </footer>
  );
}

export default Footer;

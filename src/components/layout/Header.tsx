import React, { useEffect, useState } from "react";
import MobileHeader from "@/components/layout/HeaderMobile";
import HeaderButton from "@/components/links/Headerbutton";
import { GiBurningDot } from "react-icons/gi";
import { header } from "@/constant";

function Header() {
  const [avatar, setAvatar] = useState("");
  useEffect(() => {
    setAvatar(`https://picsum.photos/200`);
  }, []);

  const links = [
    { id: 1, href: `/quiz`, label: "Quizboard" }, 
    { id: 2, href: `/board`, label: "Leadersboard" }, 
    { id: 3, href: `/challenge`, label: "Challengeboard" }, 
];
  return (
    <>
      <section className="sidebar hidden h-full min-h-[100vh] bg-brand_primary md:col-span-2 md:block md:pl-8  md:pr-12">
        <div className="relative w-full lg:mb-6">
          <div className="my-10 flex flex-col items-center justify-center">
            <GiBurningDot className="mt-16 text-6xl text-white" />
            <p className="header-text text-white">{header}</p>
          </div>
          <ul className="mt-10 flex flex-col items-center justify-center">
            {links.map(({ id, href, label }) => (
              <HeaderButton
                key={id}
                href={href}
                text={label}
                activeBg="bg-white"
                activeText="text-brand_primary"
                inactiveBg="bg-transparent"
              />
            ))}
          </ul>
        </div>
      </section>
      <MobileHeader image={avatar} alt="avatar" handleLogOut={null} />
    </>
  );
}
export default React.memo(Header);

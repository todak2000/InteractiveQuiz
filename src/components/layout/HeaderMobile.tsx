import React, { useState } from "react";
import { SlClose } from "react-icons/sl";
import HeaderButton from "@/components/links/Headerbutton";
import { GiBurningDot, GiHamburgerMenu } from "react-icons/gi";
import { header } from "@/constant";

type MobileHeaderProps = {
  alt: string;
  image: string;
  handleLogOut: any;
};

function MobileHeader({ alt, image, handleLogOut }: MobileHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  const links = [
    { id: 1, href: `/quiz`, label: "Quizboard" },
    { id: 2, href: `/board`, label: "Leadersboard" }, 
    { id: 3, href: `/challenge`, label: "Challengeboard" }, 
    { id: 4, href: "/", label: "Logout" },
  ];
  return (
    <header className="xs:bg-white_day lg:hiden flex-row justify-between p-3 shadow-[0px_1px_4px_rgba(0,0,0,0.5)] xs:flex md:hidden">
      <div className="flex-row items-center justify-around xs:flex md:hidden">
        <GiBurningDot className="mr-3 text-4xl text-brand_primary" />
        <p className="header-medium text-brand_primary">{header}</p>
      </div>
      <GiHamburgerMenu
        size={25}
        className="h-[25px] text-brand_primary"
        onClick={toggleModal}
      />
      {isOpen && (
        <div
          className={`fixed top-0 right-0 z-10 h-fit w-2/3 bg-brand_primary py-4 pl-4`}
        >
          <SlClose
            size={25}
            className="text-white_day mb-4"
            onClick={toggleModal}
          />

          <ul className="flex flex-col items-center justify-center">
            {links.map(({ id, href, label }) => (
              <HeaderButton
                key={id}
                href={href}
                text={label}
                activeBg="bg-white"
                activeText="text-brand_primary"
                inactiveBg="bg-transparent"
                onClick={handleLogOut}
              />
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}

export default React.memo(MobileHeader);

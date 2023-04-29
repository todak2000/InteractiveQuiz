import React, { useState, useEffect } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { navBarItems } from "@/constant";
import { useRouter } from "next/router";
import Button from "@/components/buttons/Button";
import Image from "next/image";
import { ImSpinner2 } from "react-icons/im";
import { GoogleLogo } from "@/constant";
import { GiBurningDot } from "react-icons/gi";
import { header } from "@/constant";
import { useUser } from "@/store/user";

interface Props {
  handleGoogle: () => void;
}

const NavBar: React.FC<Props> = ({ handleGoogle }) => {
  const { loading } = useUser();
  const { push } = useRouter();

  const [showDropDown, setShowDropDown] = useState(false);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    if (width > 768) {
      setShowDropDown(false);
    }
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [width]);

  const handleClick = () => {
    setShowDropDown(!showDropDown);
  };
  const handleLink = (link: string) => {
    push(link);
  };

  return (
    <div className="flex  w-full flex-row items-center justify-between bg-brand_primary px-4 pt-[40px]  md:px-[120px]">
      <div className="flex flex-shrink-0 flex-row items-center ">
        <GiBurningDot className="mr-2 text-2xl text-white" />
        <p className="header-text text-white">{header}</p>
      </div>
      <RxHamburgerMenu
        className="flex text-lg text-white md:hidden"
        onClick={handleClick}
      />

      <div
        className={` ${
          showDropDown
            ? "absolute top-16 right-4 grid w-[120px] grid-cols-1 gap-4 bg-white py-4 drop-shadow-md "
            : "hidden flex-row items-center md:flex"
        }`}
      >
        {navBarItems.map(({ id, route, name }) => {
          return (
            <p
              key={id}
              onClick={() => {
                handleLink(route);
              }}
              className="text-brand_primary_color cursor-pointer text-center text-[16px] font-thin leading-[22px] hover:font-bold hover:text-white md:mr-4 md:text-[#AAC4E6]"
            >
              {name}
            </p>
          );
        })}
        <Button
          variant="navButton"
          className="hidden md:flex"
          onClick={() => {
            handleGoogle();
          }}
        >
          {loading ? (
            <ImSpinner2 className="animate-spin" />
          ) : (
            <>
              <Image
                src={GoogleLogo}
                alt="google logo"
                width={20}
                height={20}
              />
              <span className="ml-4 font-primary">Sign in with Google</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default NavBar;

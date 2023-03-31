import { useRouter } from "next/router";
import React from "react";
import { RiLogoutCircleLine } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";
import { MdLeaderboard } from "react-icons/md";
type HeaderButtonProps = {
  href: string;
  text: string;
  activeBg: string;
  activeText: string;
  inactiveBg: string;
  onClick?: any;
  setConversionOpen?: any;
};

const HeaderButton: React.FC<HeaderButtonProps> = ({
  href,
  text,
  activeBg,
  activeText,
  inactiveBg,
  onClick,
  setConversionOpen,
}) => {
  const { pathname, push } = useRouter();

  const handleLink = (link: string) => {
    push(link);
  };

  const classname =
    href === pathname.split("/quiz/").pop() ||
    href === pathname.split("/leadership/").pop()
      ? `${activeBg} rounded-l-lg w-full h-12 ${activeText} flex flex-row text-sm items-center pl-8 my-3`
      : `${inactiveBg} rounded-l-lg w-full h-12 text-white flex flex-row items-center pl-8 my-3 text-sm`;

  return (
    <button
      onClick={() => {
        handleLink(href);
      }}
      className={classname}
    >
      {text === "Quizboard" && <RxDashboard size={25} className="mr-4" />}
      {text === "Leadersboard" && <MdLeaderboard size={25} className="mr-4" />}

      {text === "Logout" && <RiLogoutCircleLine size={25} className="mr-2" />}
      {text}
    </button>
  );
};

export default React.memo(HeaderButton);

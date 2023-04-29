import React from "react";
import Image from "next/image";
import Button from "@/components/buttons/Button";
import {
  bgDesktop,
  GoogleLogo,
  heroHeaderText,
  heroNormalText,
} from "@/constant";
import { useUser } from "@/store/user";
import { ImSpinner2 } from "react-icons/im";
import CountUp from "react-countup";

interface Props {
  handleGoogle: () => void;
}

const Hero: React.FC<Props> = ({ handleGoogle }) => {
  const { loading, totalPlayers, totalChallenges } = useUser();

  const previewArray = [
    {
      id: 1,
      text: "Players",
      value: totalPlayers,
    },
    {
      id: 2,
      text: "Challenges",
      value: totalChallenges,
    },
    // {
    //   id: 3,
    //   text: "Coins earned",
    //   value: 20
    // },
  ];

  return (
    <section className="bg-desktop md: w-full items-center bg-brand_primary px-4 py-[80px] md:flex md:h-[80vh] md:flex-row md:justify-between md:py-[40px] md:px-[120px]">
      <div className="flex flex-col items-center justify-center md:w-1/2 md:items-start md:justify-start">
        <p className="header-text-medium text-center text-white md:text-left md:text-[64px] md:leading-[82px]">
          {heroHeaderText}
        </p>
        <p className="normal-text mt-4 w-[70%] text-center text-[14px] leading-[15px] text-[#E7E7E7] md:w-[85%] md:text-left md:text-[16px] md:leading-[26px]">
          {heroNormalText}
        </p>

        <div className="mt-4 flex flex-row items-center justify-between md:mt-8">
          <Button
            variant="navButton"
            className="px-4 md:px-0"
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
                <span className="ml-4 font-primary ">Sign in with Google</span>
              </>
            )}
          </Button>
        </div>
        <div className="mt-4 grid grid-cols-2 md:mt-8">
          {previewArray.map(({ id, text, value }) => {
            return (
              <div className="mr-4" key={id}>
                <p className="text-right font-secondary text-[16px] font-bold leading-[20px] text-white md:text-left md:text-[24px] md:leading-[30px]">
                  <CountUp end={value} />+
                </p>
                <p className="normal-text mt-[-0.4rem] w-[70%] text-right text-[8px] leading-[15px] text-[#E7E7E7] md:w-[85%] md:text-left md:text-[16px] md:leading-[26px]">
                  {text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="hidden md:flex">
        <Image src={bgDesktop} alt="bg-desktop" width={500} height={700} />
      </div>
    </section>
  );
};

export default Hero;

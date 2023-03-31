import React from "react";
import { GiBurningDot } from "react-icons/gi";
import { IoCloseCircleSharp } from "react-icons/io5";
import {
  header,
  instructionHeader,
  instructionButtonText,
  InstructionsArr,
} from "@/constant";
import { ImSpinner2 } from "react-icons/im";
import { useUser } from "@/store/user";
import Button from "../buttons/Button";

function RightBar() {
  const {
    loading,
    setOpenQuizBoard,
    setOpenResultBoard,
    setIsReadInstructions,
    setLoading,
    isReadInstructions,
  } = useUser();

  const handleStart = () => {
    setOpenQuizBoard(true);
    setOpenResultBoard(false);
    setIsReadInstructions(false);
    setLoading(false);
  };
  const handleInstructions = () => {
    setIsReadInstructions(!isReadInstructions);
  };
  return (
    <>
      <section className="absolute top-0 right-0 z-10 hidden h-[100vh] w-full bg-black opacity-30 md:block"></section>
      <div className="absolute  top-0 right-0 z-20 h-[100vh] w-full bg-white px-2 py-4 md:w-1/2">
        <div className="flex flex-col items-center justify-center">
          <GiBurningDot className="text-6xl text-brand_primary" />
          <p className="header-text text-brand_primary">{header}</p>
          <p className="header-medium text-black">{instructionHeader}</p>

          {InstructionsArr.map(({ id, text }) => {
            return (
              <p
                key={id}
                className="normal-text m-1 flex w-full flex-row items-center justify-start text-left text-[12px] leading-[14px] md:text-sm"
              >
                {text}
              </p>
            );
          })}
          <Button
            variant="submit"
            className="mt-4 h-[45px] w-2/3"
            onClick={handleStart}
          >
            {loading ? (
              <ImSpinner2 className="animate-spin" />
            ) : (
              instructionButtonText
            )}
          </Button>
          <button
            className=" absolute bottom-10 flex h-8 w-[130px] flex-row items-center justify-between bg-transparent px-4 text-[10px] leading-[14px] text-[#414141] disabled:bg-[#a1a1a1] md:h-12 md:w-auto md:rounded-xl md:text-sm"
            onClick={() => {
              handleInstructions();
            }}
          >
            <IoCloseCircleSharp className="text-lg text-[#414141]" />
            Close Instructions
          </button>
        </div>
      </div>
    </>
  );
}
export default React.memo(RightBar);

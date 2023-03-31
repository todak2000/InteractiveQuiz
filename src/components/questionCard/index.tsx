import React, { useState, useEffect } from "react";
import { GiSpellBook } from "react-icons/gi";
import CountdownTimer from "../countDown";
import { RiHandCoinLine } from "react-icons/ri";
import ProgressBar from "../progressBar";
import CountUp from "react-countup";

type CardItem = {
  question: any;
  quizScore: number;
  seconds: number;
  len: number;
  count: number;
  isNext: boolean;
  setIsNext: React.Dispatch<React.SetStateAction<boolean>>;
};

const QuestionCard: React.FC<CardItem> = ({
  setIsNext,
  isNext,
  question,
  quizScore,
  seconds,
  count,
  len,
}) => {
  const [scoree, setScoree] = useState(quizScore);
  const [sec, setSec] = useState(seconds);
  useEffect(() => {
    setScoree(quizScore);
    setSec(seconds);
  }, [quizScore, seconds]);

  return (
    <div className="relative flex flex-col items-center justify-center rounded-lg bg-white p-4 md:h-[50vh]">
      <div className="absolute top-4 left-0 flex w-[100%] flex-row items-center justify-between md:left-10 md:w-[180%]">
        <p className="flex flex-row items-center justify-center font-secondary font-medium">
          {" "}
          <RiHandCoinLine className="mr-2 text-2xl text-brand_primary" />{" "}
          <CountUp end={scoree} />
        </p>
        <ProgressBar max={len} value={count} />
        <CountdownTimer seconds={sec} isNext={isNext} setIsNext={setIsNext} />
      </div>
      <GiSpellBook className="mt-6 text-5xl text-brand_primary md:mt-0" />
      <p className="header-medium mt-4 text-center text-[20px] leading-[25px] md:text-[16px] md:leading-[22px]">
        {question}
      </p>
    </div>
  );
};

export default QuestionCard;

import React, { useState, useEffect } from "react";
import { GiTrophyCup } from "react-icons/gi";
import { useRouter } from "next/router";
import Layout from "@/components/layout/Layout";
import { useUser } from "@/store/user";
import type { NextPageWithLayout } from "../../pages/_app";
import { RiLogoutCircleLine } from "react-icons/ri";
import { FaStopCircle } from "react-icons/fa";
import { SiProgress } from "react-icons/si";
import { selectOptions } from "@/constant";
import { GiTwoCoins } from "react-icons/gi";
import CountUp from "react-countup";
import { ImSpinner2 } from "react-icons/im";

type TopBarProps = {
  username: string | any;
};

const TopBar: NextPageWithLayout<TopBarProps> = ({ username }) => {
  const handleOpen = () => {
    setLoading(true);
    generateQuestions()
      .then((res: any[]) => {
        setQuestions(res);
      })
      .then(() => {
        setLoading(false);
        setOpenQuizBoard(!openQuizBoard);
        setOpenResultBoard(false);
      })
      .catch((error: any) => {
        console.log(error);
        setLoading(false);
      });
  };
  const handleStop =()=>{
    setOpenQuizBoard(!openQuizBoard);
        setOpenResultBoard(false);
  }
  const {
    setLevel,
    setUserData,
    userData,
    loading,
    setOpenQuizBoard,
    openQuizBoard,
    openResultBoard,
    setQuestions,
    setOpenResultBoard,
    score,
    level,
    setLoading,
    questions,
    generateQuestions,
  } = useUser();
  const { push } = useRouter();
  const [scoree, setScoree] = useState(score);
  useEffect(() => {
    setScoree(score);
  }, [score]);

  useEffect(() => {
    console.log(questions, "ques arr");
    console.log(loading, "loading");
  }, [loading]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLevel(Number(e.target.value));
    setUserData({
      ...userData,
      [e.target.name]: Number(e.target.value),
    });
  };

  return (
    <>
      <section className="md:bg-white_day md:-mr-12 md:flex md:flex-row md:items-center md:justify-between md:rounded-tl-3xl md:px-12 md:py-6 md:shadow-[0px_1px_0px_rgba(0,0,0,0.1)]">
        <p className="hidden md:block">
          {" "}
          <span className="mr-1 ">&#128075; </span> Hi{" "}
          {username?.split(" ")[0]!}
        </p>
        <div className="flex w-full flex-row items-center justify-between p-4 md:w-2/3">
          <span className="header-text flex flex-row items-center">
            <GiTwoCoins className="mr-2 text-3xl text-brand_primary" />{" "}
            <CountUp end={scoree} />
          </span>
          <span className="normal-text flex flex-row items-center text-[xs]">
            <span className="hidden md:flex">Difficulty level:</span>
            {level == 1 && (
              <SiProgress className="ml-1 text-green-300 md:ml-2" />
            )}
            {level == 2 && (
              <SiProgress className="ml-1 text-yellow-300 md:ml-2" />
            )}
            {level == 3 && <SiProgress className="ml-1 text-red-300 md:ml-2" />}

            <select
              className="hover:text-primary-600 active:text-primary-700 ml-1 w-[100px] rounded-sm border-0 text-[10px] text-xs md:ml-4 md:text-[#414141]"
              onChange={handleChange}
              name="difficulty"
              disabled={openQuizBoard || openResultBoard ? true : false}
            >
              <option value={level}>
                {level == 1 && "Easy"}
                {level == 2 && "Medium"}
                {level == 3 && "Hard"}
              </option>

              {selectOptions
                .filter((option) => option.value !== level)
                .map(({ id, value, label }) => {
                  return (
                    <option key={id} value={value}>
                      {label}
                    </option>
                  );
                })}
            </select>
          </span>
          <button
            className="flex h-8 w-[100px] flex-row items-center justify-between rounded-sm bg-brand_primary px-4 text-[10px] leading-[14px] text-white disabled:bg-[#a1a1a1] md:h-12 md:w-auto md:rounded-xl md:text-sm"
            onClick={() => { openQuizBoard && !openResultBoard ? handleStop():
              handleOpen();
            }}
            disabled={openResultBoard || loading ? true : false}
          >
            {loading ? (
              <>
                <ImSpinner2 className="animate-spin md:mr-1" /> Please wait
              </>
            ) : (
              <>
                {openQuizBoard && !openResultBoard ? (
                  <>
                    <FaStopCircle className="text-lg text-white md:mr-2" />
                    Stop Quiz
                  </>
                ) : (
                  <>
                    <GiTrophyCup className="text-lg text-white md:mr-2" />
                    Start Quiz
                  </>
                )}
              </>
            )}
          </button>
          <span
            className="ml-1 hidden cursor-pointer md:ml-10 md:flex"
            onClick={() => push("/")}
          >
            <RiLogoutCircleLine className="text-red-500" />
          </span>
        </div>
      </section>
    </>
  );
};

TopBar.getLayout = (page) => <Layout>{page}</Layout>;

export default React.memo(TopBar);

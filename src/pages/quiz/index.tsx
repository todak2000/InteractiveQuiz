import React, { useEffect, useCallback } from "react";
import Mainboard from "@/pages/common/mainboard";
import Card from "@/components/Card";
import { useUser } from "@/store/user";
import { MdLeaderboard } from "react-icons/md";
import { GiTwoCoins } from "react-icons/gi";
import QuizBoard from "@/components/QuizBoard";
import { FaBookReader } from "react-icons/fa";
import { sortFilterPosition } from "@/utils";
import { useRouter } from "next/router";
function Dashboard() {
  const dashboardData = {
    title: "Quizboard",
  };
  const {
    score,
    openQuizBoard,
    setOpenResultBoard,
    setIsReadInstructions,
    isReadInstructions,
    boardData,
    token,
    userData,
    setLoading,
    setChallengeId,
    setOpenQuizBoard,
  } = useUser();

  const handleInstructions = () => {
    setIsReadInstructions(!isReadInstructions);
  };
  const { push } = useRouter();
  const position = useCallback(() => {
    const position = sortFilterPosition(boardData)?.filter(
      (item) => item?.email === userData?.email
    )[0]?.position;
    return position;
  }, [boardData]);

  const cardData = [
    {
      id: 1,
      text: "Total Accumulated Score",
      value: score,
      icon: <GiTwoCoins className="text-6xl text-brand_primary" />,
    },
    {
      id: 2,
      text: "Leadrboard Rank",
      value: position(),
      icon: <MdLeaderboard className="text-6xl text-brand_primary" />,
    },
  ];

  useEffect(() => {
    setLoading(false);
    setOpenQuizBoard(false);
    setOpenResultBoard(false);
    setIsReadInstructions(false);
    setChallengeId("");
    if (!token) {
      push("/");
    }
  }, []);

  return (
    <div>
      <Mainboard title={dashboardData.title}>
        <div>
          {!openQuizBoard ? (
            <div className=" relative flex min-h-[400px] flex-col items-center justify-center rounded-lg bg-white p-4 md:flex-row">
              {cardData.map(({ id, text, value, icon }) => {
                return <Card key={id} text={text} value={value} icon={icon} />;
              })}
              <button
                className=" absolute bottom-5 flex h-8 w-[130px] flex-row items-center justify-between rounded-sm bg-brand_primary px-4 text-[10px] leading-[14px] text-white disabled:bg-[#a1a1a1] md:bottom-10 md:h-12 md:w-auto md:rounded-xl md:text-sm"
                onClick={() => {
                  handleInstructions();
                }}
              >
                <FaBookReader className="text-lg text-white md:mr-2" />
                Read Instructions
              </button>
            </div>
          ) : (
            <QuizBoard setIsQuiz={() => null} />
          )}
        </div>
      </Mainboard>
    </div>
  );
}

export default React.memo(Dashboard);

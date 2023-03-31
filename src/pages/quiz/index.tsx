import React, { useEffect } from "react";
import Mainboard from "@/pages/common/mainboard";
import Card from "@/components/Card";
import { useUser } from "@/store/user";
import { MdLeaderboard } from "react-icons/md";
import { GiTwoCoins } from "react-icons/gi";
import QuizBoard from "@/components/QuizBoard";

function Dashboard() {
  const dashboardData = {
    title: "Quizboard",
  };
  const { score, openQuizBoard, setOpenResultBoard, setOpenQuizBoard } =
    useUser();
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
      value: 100,
      icon: <MdLeaderboard className="text-6xl text-brand_primary" />,
    },
  ];

  useEffect(() => {
    setOpenQuizBoard(false);
    setOpenResultBoard(false);
  }, []);

  return (
    <div>
      <Mainboard title={dashboardData.title}>
        <div>
          {!openQuizBoard ? (
            <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg bg-white p-4 md:flex-row">
              {cardData.map(({ id, text, value, icon }) => {
                return <Card key={id} text={text} value={value} icon={icon} />;
              })}
            </div>
          ) : (
            <QuizBoard />
          )}
        </div>
      </Mainboard>
    </div>
  );
}

export default Dashboard;

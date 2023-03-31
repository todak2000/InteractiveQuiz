import React, { useState, useEffect } from "react";
import { useUser } from "@/store/user";
import { MdTimer } from "react-icons/md";
import useSound from "use-sound";

interface Props {
  seconds: number;
  isNext: boolean;
  setIsNext: any;
}

const CountdownTimer: React.FC<Props> = ({ seconds, isNext, setIsNext }) => {
  const { setLoading, setOpenResultBoard } = useUser();
  const [play] = useSound("/sound/completed.mp3");
  const [timeLeft, setTimeLeft] = useState<number>(seconds);

  useEffect(() => {
    let intervalId: any = null;
    if (isNext) {
      setTimeLeft(seconds);
      setIsNext(false);
      intervalId = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else {
      intervalId = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    }

    if (timeLeft === 0) {
      clearInterval(intervalId);
      setOpenResultBoard(true);
      setLoading(false);
      play();
    }

    return () => clearInterval(intervalId);
  }, [timeLeft, seconds]);

  return (
    <div className="flex flex-row items-center justify-center">
      <MdTimer className="text-2xl text-green-500" />{" "}
      <span className="font-secondary font-medium">{timeLeft}</span>
    </div>
  );
};

export default React.memo(CountdownTimer);

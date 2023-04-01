import React, { useState, useEffect} from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { MdCancel } from "react-icons/md";
import useSound from "use-sound";

type AnswerProps = {
  id: number;
  text: string;
  isAnswer: boolean;
};
type CardItem = {
  answerArray: AnswerProps[];
  handleNextQuestion: any;
  questionLen: number;
  handleSkip: any;
};

const AnswerCard: React.FC<CardItem> = ({
  answerArray,
  handleNextQuestion,
  handleSkip,
  questionLen,
}) => {
  const [isPickedId, setIsPickedId] = useState<any>(null);
  const [answerArr, setAnswerArr] = useState<AnswerProps[]>(answerArray);
  const [correctAnsId, setCorrectAnsId] = useState<any>(null);
  const handleClick = (id: number) => {
    setIsPickedId(id);
  };

  const [play] = useSound("/sound/correct.mp3");
  
  useEffect(() => {
    if (isPickedId !== null) {
      let a = answerArr.filter((ans) => ans.isAnswer === true);
      setCorrectAnsId(a[0]?.id);
    }
  }, [isPickedId]);

  useEffect(() => {
    setAnswerArr(randomizeAnswerArr(answerArray))
    setCorrectAnsId(null);
    setIsPickedId(null);
  }, [answerArray]);


  const handleNext = () => {
    handleNextQuestion(correctAnsId === isPickedId);
  };
  const randomizeAnswerArr = (arr:AnswerProps[])=> {
    let randomizedArr = [];
    let answerArrCopy = [...arr];
    while (answerArrCopy.length > 0) {
      let randIndex = Math.floor(Math.random() * answerArrCopy.length);
      randomizedArr.push(answerArrCopy[randIndex]);
      answerArrCopy.splice(randIndex, 1);
    }
    return randomizedArr;
  }



  return (
    <div className="flex flex-col items-center justify-center rounded-lg bg-white p-4 md:h-[50vh]">
      <button
        className="mt-8 flex h-6 flex-row items-center justify-between rounded-xl bg-[#f9f9f9] px-8 text-sm text-brand_primary"
        onClick={() => {
          handleSkip();
        }}
      >
        Skip
      </button>
      {answerArr.map(({ id, text }) => {
        if (isPickedId !== null && correctAnsId === id && isPickedId === id) {
          play();
        }

        return (
          <button
            key={id}
            className={`${
              isPickedId !== null && correctAnsId === id && isPickedId === id
                ? "mt-4 flex h-[45px] w-full md:w-2/3 flex-row items-center justify-center rounded-lg bg-brand_primary text-white"
                : " mt-4 flex h-[45px] w-full md:w-2/3 flex-row items-center justify-center rounded-lg border-[1px] border-brand_primary bg-white text-brand_primary"
            }`}
            disabled={isPickedId !== null ? true : false}
            onClick={() => {
              handleClick(id);
            }}
          >
            {isPickedId !== null &&
              correctAnsId === id &&
              isPickedId === id && (
                <BsCheckCircleFill className="mr-4 text-white" />
              )}
            {isPickedId !== null &&
              isPickedId === id &&
              correctAnsId !== id && <MdCancel className="mr-4 text-red-400" />}
            {text}
          </button>
        );
      })}
      {isPickedId !== null && questionLen > 0 && (
        <button
          className="mt-8 flex h-12 flex-row items-center justify-between rounded-xl bg-[#2E6CBD] px-8 text-sm text-white"
          onClick={() => {
            handleNext();
          }}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default React.memo(AnswerCard);

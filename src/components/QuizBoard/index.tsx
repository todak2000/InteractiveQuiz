import React, { useState, useCallback, useEffect } from "react";
import QuestionCard from "../questionCard";
import { questionsArray, sharedUrl } from "@/constant";
import AnswerCard from "../answerCard";
import { useUser } from "@/store/user";
import Card from "@/components/Card";
import { GiTrophyCup } from "react-icons/gi";
import { SlClose } from "react-icons/sl";
import { ImSpinner2 } from "react-icons/im";
import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TelegramShareButton,
  TelegramIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";
import useSound from "use-sound";

const QuizBoard: React.FC = () => {
  const {
    score,
    setOpenQuizBoard,
    seconds,
    setScore,
    questions,
    setQuestions,
    openResultBoard,
    setOpenResultBoard,
    setLoading,
    loading,
  } = useUser();
  const [quizScore, setQuizScore] = useState<number>(0);
  const [isNext, setIsNext] = useState(false);
  const [count, setCount] = useState(0);
  const [questionIndex, setQuestionIndex] = useState<number>(
    Math.floor(Math.random() * questions.length)
  );
  const [play] = useSound("/sound/completed.mp3");

  const handleSkip = () => {
    setCount(count + 1);
    setLoading(true);
    setIsNext(true);

    const oldIndex = questions[questionIndex]?.id;

    const updatedQuestionsArray = removeQuestion(questions, oldIndex);
    if (updatedQuestionsArray.length > 0 && count < 9) {
      setQuestions(updatedQuestionsArray);
      setQuestionIndex(
        Math.floor(Math.random() * updatedQuestionsArray.length)
      );

      setLoading(false);
    } else {
      setTimeout(() => {
        play();
        setOpenResultBoard(true);
        setLoading(false);
      }, 2000);
    }
  };

  const handleNextQuestion = (gotAnswer: boolean) => {
    setCount(count + 1);
    setLoading(true);
    setIsNext(true);
    if (gotAnswer) {
      setQuizScore(quizScore + 3);
      const newScore = Number(score) + 3;
      setScore(newScore);
    }
    const oldIndex = questions[questionIndex]?.id;

    const updatedQuestionsArray = removeQuestion(questions, oldIndex);
    if (updatedQuestionsArray.length > 0 && count < 9) {
      setQuestions(updatedQuestionsArray);
      setQuestionIndex(
        Math.floor(Math.random() * updatedQuestionsArray.length)
      );

      setLoading(false);
    } else {
      setTimeout(() => {
        play();
        setOpenResultBoard(true);
        setLoading(false);
      }, 2000);
    }
  };

  const removeQuestion = useCallback(
    (array: any[], id: number) => {
      return array.filter((question) => question?.id !== id);;
    },
    [],
  );
  
  const handleClose = () => {
    setOpenResultBoard(false);
    setOpenQuizBoard(false);
  };

  useEffect(() => {
    if (questions.length <=0) {
      setQuestions(questionsArray)
    }
  }, [])
  
  const cardData = [
    {
      id: 1,
      text: "Quiz Score",
      value: quizScore,
      icon: <GiTrophyCup className="text-6xl text-green-500" />,
    },
  ];

  return (
    <div>
      {loading ? (
        <div className="flex h-1/2 w-full flex-col items-center justify-center">
          <ImSpinner2 className="animate-spin" />
        </div>
      ) : (
        <>
          {openResultBoard ? (
            <div className="relative flex flex-col items-center justify-center rounded-lg bg-white p-4">
              {cardData.map(({ id, text, value, icon }) => {
                return <Card key={id} text={text} value={value} icon={icon} />;
              })}

              <div className="my-10 flex w-full flex-row items-center justify-evenly md:w-1/2 ">
                <FacebookShareButton
                  url={sharedUrl}
                  quote={`I just got a score of ${quizScore} playing this quiz`}
                >
                  <FacebookIcon size={32} round />
                </FacebookShareButton>
                <WhatsappShareButton
                  url={sharedUrl}
                  title={`I just got a score of ${quizScore} playing this quiz`}
                  separator=":: "
                >
                  <WhatsappIcon size={32} round />
                </WhatsappShareButton>
                <LinkedinShareButton url={sharedUrl}>
                  <LinkedinIcon size={32} round />
                </LinkedinShareButton>
                <TwitterShareButton
                  url={sharedUrl}
                  title={`I just got a score of ${quizScore} playing this quiz`}
                  className="Demo__some-network__share-button"
                >
                  <TwitterIcon size={32} round />
                </TwitterShareButton>
                <TelegramShareButton
                  url={sharedUrl}
                  title={`I just got a score of ${quizScore} playing this quiz`}
                  className="Demo__some-network__share-button"
                >
                  <TelegramIcon size={32} round />
                </TelegramShareButton>
              </div>

              <SlClose
                size={25}
                className=" absolute top-4 right-4 mb-4 text-red-400"
                onClick={handleClose}
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 rounded-lg bg-white p-4 md:grid-cols-2">
              <QuestionCard
                question={questions[questionIndex]?.question}
                quizScore={quizScore}
                seconds={seconds}
                len={10}
                count={count}
                isNext={isNext}
                setIsNext={setIsNext}
              />
              <AnswerCard
                answerArray={questions[questionIndex]?.answerArr}
                handleNextQuestion={handleNextQuestion}
                handleSkip={handleSkip}
                questionLen={questions.length}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default React.memo(QuizBoard);

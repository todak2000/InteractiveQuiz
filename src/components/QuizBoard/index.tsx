import React, { useState, useCallback, useEffect } from "react";
import QuestionCard from "../questionCard";
import { questionsArray } from "@/constant";
import AnswerCard from "../answerCard";
import { useUser } from "@/store/user";
import Card from "@/components/Card";
import { GiTrophyCup } from "react-icons/gi";
import { SlClose } from "react-icons/sl";
import { ImSpinner2 } from "react-icons/im";
import { socialMediaUrl } from "@/constant";
import { useRouter } from "next/router";
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
import {
  sendUserScore,
  handleSearchChallengeBoard,
  updatePlayerChallengeScore,
} from "@/firebase";

type Props = {
  setIsQuiz: React.Dispatch<React.SetStateAction<boolean>>;
};
const QuizBoard: React.FC<Props> = ({ setIsQuiz }) => {
  const { push } = useRouter();
  const {
    score,
    userData,
    setSeconds,
    setOpenQuizBoard,
    seconds,
    setScore,
    token,
    openResultBoard,
    setChallengeId,
    setOpenResultBoard,
    challengeId,
    setLoading,
    loading,
  } = useUser();
  const [questions, setQuestions] = useState<any[]>(questionsArray);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [isNext, setIsNext] = useState(false);
  const [count, setCount] = useState(0);
  const [noOfQuestions, setNoOfQuestions] = useState(9);
  const [complete, setComplete] = useState(false);
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
    if (updatedQuestionsArray.length > 0 && count < noOfQuestions) {
      setQuestions(updatedQuestionsArray);
      setQuestionIndex(
        Math.floor(Math.random() * updatedQuestionsArray.length)
      );

      setLoading(false);
    } else {
      if (challengeId && challengeId !== "") {
        updatePlayerChallengeScore(token, challengeId, quizScore).then(() =>
          console.log("challenge score updated")
        );
      }
      setTimeout(() => {
        play();
        setOpenResultBoard(true);
        setLoading(false);
      }, 2000);
    }
  };

  const handleNextQuestion = async (gotAnswer: boolean) => {
    setCount(count + 1);
    setLoading(true);
    setIsNext(true);
    if (gotAnswer) {
      setQuizScore(quizScore + 3);
      if (!challengeId) {
        const newScore = Number(score) + 3;
        setScore(newScore);
        await sendUserScore(token, 3); // sent to server
      }
    }
    const oldIndex = questions[questionIndex]?.id;

    const updatedQuestionsArray = removeQuestion(questions, oldIndex);
    if (updatedQuestionsArray.length > 0 && count < noOfQuestions) {
      setQuestions(updatedQuestionsArray);
      setQuestionIndex(
        Math.floor(Math.random() * updatedQuestionsArray.length)
      );

      setLoading(false);
    } else {
      setTimeout(() => {
        play();
        setComplete(true);
        setOpenResultBoard(true);
        setLoading(false);
      }, 2000);
    }
  };

  const removeQuestion = useCallback((array: any[], id: number) => {
    return array.filter((question) => question?.id !== id);
  }, []);

  const handleClose = () => {
    if (challengeId && challengeId !== "") {
      setChallengeId("");
      setOpenResultBoard(false);
      setIsQuiz(false);
    } else {
      setOpenResultBoard(false);
      setOpenQuizBoard(false);
    }
  };

  const cardData = [
    {
      id: 1,
      text: "Quiz Score",
      value: quizScore,
      icon: <GiTrophyCup className="text-6xl text-green-500" />,
    },
  ];

  useEffect(() => {
    if (challengeId && challengeId !== "") {
      handleSearchChallengeBoard(challengeId).then((res: any) => {
        setNoOfQuestions(res[0].noOfQuestions);
        setSeconds(
          res[0].levelOfDifficulty === "Easy"
            ? 15
            : res[0].levelOfDifficulty === "Medium"
            ? 10
            : res[0].levelOfDifficulty === "Hard"
            ? 7
            : 15
        );
      });
    }
  }, [challengeId]);
  useEffect(() => {
    if (challengeId && challengeId !== "" && complete) {
      updatePlayerChallengeScore(token, challengeId, quizScore).then(() =>
        console.log("challenge score updated")
      );
    }
  }, [complete]);

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
                  url={socialMediaUrl}
                  title={`I just aced this quiz with a score of ${quizScore}! Challenge yourself and see if you can beat my score!`}
                  quote={`I just aced this quiz with a score of ${quizScore}! Challenge yourself and see if you can beat my score!`}
                >
                  <FacebookIcon size={32} round />
                </FacebookShareButton>
                <WhatsappShareButton
                  url={socialMediaUrl}
                  title={`I just aced this quiz with a score of ${quizScore}! Challenge yourself and see if you can beat my score!`}
                  separator=":: "
                >
                  <WhatsappIcon size={32} round />
                </WhatsappShareButton>
                <LinkedinShareButton
                  url={socialMediaUrl}
                  title={`I just aced this quiz with a score of ${quizScore}! Challenge yourself and see if you can beat my score!`}
                >
                  <LinkedinIcon size={32} round />
                </LinkedinShareButton>
                <TwitterShareButton
                  url={socialMediaUrl}
                  title={`I just aced this quiz with a score of ${quizScore}! Challenge yourself and see if you can beat my score!`}
                >
                  <TwitterIcon size={32} round />
                </TwitterShareButton>
                <TelegramShareButton
                  url={socialMediaUrl}
                  title={`I just aced this quiz with a score of ${quizScore}! Challenge yourself and see if you can beat my score!`}
                >
                  <TelegramIcon size={32} round />
                </TelegramShareButton>
              </div>

              <SlClose
                size={25}
                className=" absolute top-4 right-4 mb-4 cursor-pointer text-red-400"
                onClick={handleClose}
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 rounded-lg bg-white p-4 md:grid-cols-2">
              <QuestionCard
                question={questions[questionIndex]?.question}
                quizScore={quizScore}
                seconds={seconds}
                len={noOfQuestions}
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

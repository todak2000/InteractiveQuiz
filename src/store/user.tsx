import React, { createContext, useContext, useState, useEffect } from "react";

import { useLocalStorageState } from "../hooks";

export type UserProp = {
  name: string;
  difficulty: number;
  latest_score: number;
};

export type UserContextProps = {
  userData: UserProp | null;
  setUserData: React.Dispatch<React.SetStateAction<any>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;

  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  level: number;
  setLevel: React.Dispatch<React.SetStateAction<number>>;
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  openQuizBoard: boolean;
  setOpenQuizBoard: React.Dispatch<React.SetStateAction<boolean>>;
  openResultBoard: boolean;
  setOpenResultBoard: React.Dispatch<React.SetStateAction<boolean>>;
  seconds: number;
  setSeconds: React.Dispatch<React.SetStateAction<number>>;
  isReadInstructions: boolean;
  setIsReadInstructions: React.Dispatch<React.SetStateAction<boolean>>;
  questions: any;
  setQuestions: React.Dispatch<React.SetStateAction<any>>;

  generateQuestions: any;
};

const UserContext = createContext<UserContextProps>({
  userData: null,
  setUserData: () => null,
  loading: false,
  setLoading: () => null,

  name: "",
  setName: () => null,
  level: 1,
  setLevel: () => null,
  score: 0,
  setScore: () => null,
  openQuizBoard: false,
  setOpenQuizBoard: () => null,
  openResultBoard: false,
  setOpenResultBoard: () => null,
  seconds: 15,
  setSeconds: () => null,
  isReadInstructions: false,
  setIsReadInstructions: () => null,
  questions: [],
  setQuestions: () => null,

  generateQuestions: () => null,
});

let userObject = {
  key: "name",
  defaultValue: "",
};
let scoreObject = {
  key: "totalScore",
  defaultValue: 0,
};
let levelObject = {
  key: "difficulty",
  defaultValue: 1,
};
let readObject = {
  key: "isReadInstructions",
  defaultValue: false,
};

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [name, setName] = useLocalStorageState(userObject);
  const [score, setScore] = useLocalStorageState(scoreObject);
  const [level, setLevel] = useLocalStorageState(levelObject);
  const [isReadInstructions, setIsReadInstructions] =
    useLocalStorageState(readObject);

  const [userData, setUserData] = useState({
    name: name,
    difficulty: level,
    latest_score: score,
  });
  const [openQuizBoard, setOpenQuizBoard] = useState(false);
  const [openResultBoard, setOpenResultBoard] = useState(false);
  const [seconds, setSeconds] = useState(15);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);

  const generateQuestions = async () => {
    let body: string = `
    kindly generate an array of 10 random but authentic  from science, art, management, sports, economics, finance, sports, and english grammar quiz questions and answer using the below format:
{
    "id": 1,
		"question": "What is the boiling point of water?",
		"answerArr": [{
				"id": 1,
				"text": "100°C",
				"isAnswer": true
			},
			{
				"id": 2,
				"text": "212°F",
				"isAnswer": false
			},
			{
				"id": 3,
				"text": "0°C",
				"isAnswer": false
			}
		]
  },
create an object  with key 'questions' and pass an array of objects of above example. Also ensure the questions are not more than 10 words, answers not more than six words.
see how i want the result::
{
  "questions": [{}, {}]
}`;

    const res = await fetch("/api/question", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: body }),
    });
    const data = await res.json();

    let x = JSON.stringify(data.questions);
    console.log(data.questions, 'check return data')
    let y = JSON.parse(x);
    let z = JSON.parse(y);

    return z?.questions;
  };
  useEffect(() => {
    switch (level) {
      case 1:
        setSeconds(15);
        break;
      case 2:
        setSeconds(10);
        break;
      case 3:
        setSeconds(7);
        break;
    }
  }, [level]);

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
        loading,
        setLoading,
        name,
        setName,
        level,
        setLevel,
        score,
        setScore,
        openQuizBoard,
        setOpenQuizBoard,
        openResultBoard,
        setOpenResultBoard,
        seconds,
        setSeconds,
        isReadInstructions,
        setIsReadInstructions,
        generateQuestions,
        questions,
        setQuestions,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

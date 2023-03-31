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

  useEffect(() => {
    switch (Number(level)) {
      case 1:
        setSeconds(15);
        break;
      case 2:
        setSeconds(10);
        break;
      case 3:
        setSeconds(7);
        break;
      default:
        setSeconds(15);
        break;
    }
  }, [userData.difficulty]);

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
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

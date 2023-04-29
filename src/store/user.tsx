import React, { createContext, useContext, useState, useEffect } from "react";

import { useLocalStorageState } from "../hooks";
import { boardProps } from "@/pages/board";
import { getScoreUpdate } from "@/firebase";
import { db } from "@/firebase";
import { collection, onSnapshot } from "@firebase/firestore";

export type UserProp = {
  name: string;
  difficulty: number;
  latest_score: number;
  avatar: string | any | null;
  email: string;
};

export type challengeProps = {
  id: string;
  creatorId: string;
  levelOfDifficulty: string;
  noOfPlayers: number;
  noOfQuestions: number;
  stake: number;
  isClosed: boolean;
  playersArray: {
    playerId: string;
    score: number;
    isPlayed: boolean;
  }[];
};

export type UserContextProps = {
  userData: UserProp | null;
  setUserData: React.Dispatch<React.SetStateAction<any>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setBoardData: React.Dispatch<React.SetStateAction<any[]>>;
  boardData: boardProps[];
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
  email: any;
  setEmail: React.Dispatch<React.SetStateAction<any>>;
  token: any;
  setToken: React.Dispatch<React.SetStateAction<any>>;
  avatar: any;
  setAvatar: React.Dispatch<React.SetStateAction<any>>;
  setChallengeData: React.Dispatch<React.SetStateAction<any[]>>;
  challengeData: challengeProps[];
  challengeId: any;
  setChallengeId: React.Dispatch<React.SetStateAction<any>>;
  totalChallenges: number;
  setTotalChallenges: React.Dispatch<React.SetStateAction<number>>;
  totalPlayers: number;
  setTotalPlayers: React.Dispatch<React.SetStateAction<number>>;
};

const UserContext = createContext<UserContextProps>({
  userData: null,
  setUserData: () => null,
  loading: false,
  setLoading: () => null,
  setBoardData: () => null,
  boardData: [],
  setChallengeData: () => null,
  challengeData: [],
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
  token: false,
  setToken: () => null,
  email: false,
  setEmail: () => null,
  avatar: false,
  challengeId: "",
  setChallengeId: () => null,
  setAvatar: () => null,
  totalChallenges: 0,
  setTotalChallenges: () => null,
  totalPlayers: 0,
  setTotalPlayers: () => null,
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
let tokenObject = {
  key: "token",
  defaultValue: "",
};
let emailObject = {
  key: "email",
  defaultValue: "",
};
let avatarObject = {
  key: "avatar",
  defaultValue: "",
};
let challengeIdObject = {
  key: "chalengeId",
  defaultValue: "",
};
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [name, setName] = useLocalStorageState(userObject);
  const [score, setScore] = useLocalStorageState(scoreObject);
  const [level, setLevel] = useLocalStorageState(levelObject);
  const [token, setToken] = useLocalStorageState(tokenObject);
  const [email, setEmail] = useLocalStorageState(emailObject);
  const [avatar, setAvatar] = useLocalStorageState(avatarObject);
  const [challengeId, setChallengeId] = useLocalStorageState(challengeIdObject);
  const [isReadInstructions, setIsReadInstructions] =
    useLocalStorageState(readObject);

  const [userData, setUserData] = useState({
    name: name,
    difficulty: level,
    latest_score: score,
    avatar: avatar,
    email: email,
  });
  const [openQuizBoard, setOpenQuizBoard] = useState(false);
  const [openResultBoard, setOpenResultBoard] = useState(false);
  const [boardData, setBoardData] = useState<any[]>([]);
  const [challengeData, setChallengeData] = useState<any[]>([]);
  const [seconds, setSeconds] = useState(15);
  const [totalPlayers, setTotalPlayers] = useState(0);
  const [totalChallenges, setTotalChallenges] = useState(0);
  const [loading, setLoading] = useState(false);

  const getChallengeBoard = () => {
    const challengeBoard = collection(db, "challengeBoard");
    onSnapshot(challengeBoard, (querySnapshot) => {
      setTotalChallenges(querySnapshot.docs.length);
      setChallengeData(
        // querySnapshot.docs.filter((doc)=>doc.data().isClosed == false).map((doc) => ({
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          creatorId: doc.data().creatorId,
          levelOfDifficulty: doc.data().levelOfDifficulty,
          noOfPlayers: doc.data().noOfPlayers,
          noOfQuestions: doc.data().noOfQuestions,
          stake: doc.data().stake,
          isClosed: doc.data().isClosed,
          playersArray: doc.data().playersArray,
        }))
      );
    });
  };

  const getLeadersBoard = () => {
    const userScoreDB = collection(db, "leadersBoard");
    onSnapshot(userScoreDB, (querySnapshot) => {
      setTotalPlayers(querySnapshot.docs.length);
      setBoardData(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          email: doc.data().email,
          total: doc.data().total,
        }))
      );
      getScoreUpdate(userData?.email).then((res) => {
        setScore(res);
      });
    });
  };
  useEffect(() => {
    getLeadersBoard();
    getChallengeBoard();
  }, []);

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
        token,
        setToken,
        avatar,
        setAvatar,
        email,
        setEmail,
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
        boardData,
        setBoardData,
        challengeData,
        setChallengeData,
        challengeId,
        setChallengeId,
        totalChallenges,
        setTotalChallenges,
        totalPlayers,
        setTotalPlayers,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

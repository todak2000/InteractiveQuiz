// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  increment,
  setDoc,
  doc,
  query,
  where,
  getDocs,
  getDoc,
  updateDoc,
  arrayUnion,
} from "@firebase/firestore";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { updatePlayerScoreFunc, getWinner } from "@/utils";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  
  authDomain: "interactivequiz-a5281.firebaseapp.com",
  projectId: "interactivequiz-a5281",
  storageBucket: "interactivequiz-a5281.appspot.com",
  messagingSenderId: "389737820485",
  appId: "1:389737820485:web:763ad6fa01c2da2f8d8e2c",
  measurementId: "G-LDFP529H3T",
  apiKey: process.env.NEXT_PUBLIC_apiKey,
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth();
const provider = new GoogleAuthProvider();
// Initialize db
export const db = getFirestore(app);

// Google Auth
export const handleGoogleAuth = async (): Promise<
  { token: string; user: any; userScore: number } | undefined
> => {
  try {
    const userCredentials = await signInWithPopup(auth, provider);
    const credential: any =
      GoogleAuthProvider.credentialFromResult(userCredentials);
    // const token = credential.accessToken;
    const userScoreDB = collection(db, "leadersBoard");
    const scoreQuery = query(
      userScoreDB,
      where("email", "==", userCredentials.user?.email)
    );
    const querySnapshot = await getDocs(scoreQuery);
    const user: any = userCredentials.user;
    let token: any;
    if (user) {
      let userScore: number = 0;
      if (querySnapshot.docs.length > 0) {
        userScore = querySnapshot.docs[0].data().total;
        token = querySnapshot.docs[0].id;
      } else {
        let id = `id${Math.floor(Math.random() * 999999) + 1}gd`;
        token = id;
        const newUserScoreDB = doc(db, "leadersBoard", id);
        await setDoc(
          newUserScoreDB,
          { total: increment(0), email: userCredentials.user?.email },
          { merge: true }
        ).then((res: any) => console.log("new user added to db leaderboard"));
      }
      console.log(token, user, userScore, "sdsds");
      return { token, user, userScore };
    }
    return;
  } catch (err) {
    console.log(err);
  }
};

export const handleGoogleOut = async (): Promise<void> => {
  try {
    const logout = await signOut(auth);
    console.log(logout);
    return logout;
  } catch (err) {
    console.log(err);
  }
};

export const sendUserScore = async (token: string, score: number) => {
  try {
    const boardRef = doc(db, "leadersBoard", token);
    const res = await setDoc(
      boardRef,
      {
        total: increment(score),
      },
      { merge: true }
    );
    return res;
  } catch (error) {
    console.log(error, "update user score");
  }
};

// accept Challenge
export const acceptChallenge = async (token: string, challengeId: string) => {
  try {
    let pullResult: any = await handleSearchChallengeBoard(challengeId);

    console.log(pullResult[0].noOfPlayers, "sds");
    if (pullResult[0].playersArray.length < pullResult[0].noOfPlayers) {
      pullResult[0].playersArray.push({
        playerId: token,
        score: 0,
        isPlayed: false,
      });
      const boardRef = doc(db, "challengeBoard", challengeId);
      const res = await setDoc(
        boardRef,
        {
          playersArray: pullResult[0].playersArray,
        },
        { merge: true }
      );
      sendUserScore(token, -pullResult[0].stake).then(() => {
        return res;
      });
    }
  } catch (error) {
    console.log(error, "error");
  }
};
// update player challenge score
export const updatePlayerChallengeScore = async (
  token: string,
  challengeId: string,
  score: number
) => {
  try {
    let pullResult: any = await handleSearchChallengeBoard(challengeId);
    const update: any = updatePlayerScoreFunc(pullResult, token, score, true);
    if (update.length === 1 && update[0].isClosed) {
      const winnerId: any = getWinner(update[0].playersArray);
      const score: number = update[0].noOfPlayers * update[0].stake;
      sendUserScore(winnerId, score);
    }
    const boardRef = doc(db, "challengeBoard", challengeId);
    const res = await setDoc(
      boardRef,
      {
        creatorId: update[0].creatorId,
        levelOfDifficulty: update[0].levelOfDifficulty,
        noOfPlayers: update[0].noOfPlayers,
        noOfQuestions: update[0].noOfQuestions,
        stake: update[0].stake,
        isClosed: update[0].isClosed,
        playersArray: update[0].playersArray,
      },
      { merge: true }
    );

    return res;
  } catch (error) {
    console.log(error, "error");
  }
};

// Search Leader
export const handleSearchLeaderBoard = async (queryItem: string | number) => {
  try {
    const boardDB = collection(db, "leadersBoard");
    const searchQuery = query(boardDB, where("email", ">=", queryItem));
    const querySnapshot = await getDocs(searchQuery);
    const searchResultArray = [];
    if (querySnapshot.docs.length > 0) {
      searchResultArray.push({
        id: querySnapshot.docs[0].id,
        email: querySnapshot.docs[0].data().email,
        total: querySnapshot.docs[0].data().total,
      });
    }
    return searchResultArray;
  } catch (err) {
    console.log(err);
  }
};

// search challenge board
export const handleSearchChallengeBoard = async (queryItem: string | any) => {
  try {
    const boardDB = doc(db, "challengeBoard", queryItem);
    const querySnapshot: any = await getDoc(boardDB);
    const searchResultArray = [];
    searchResultArray.push({
      id: querySnapshot.id,
      creatorId: querySnapshot?.data().creatorId,
      levelOfDifficulty: querySnapshot?.data().levelOfDifficulty,
      noOfPlayers: querySnapshot?.data().noOfPlayers,
      noOfQuestions: querySnapshot?.data().noOfQuestions,
      stake: querySnapshot?.data().stake,
      isClosed: querySnapshot?.data().isClosed,
      playersArray: querySnapshot?.data().playersArray,
    });
    // }
    return searchResultArray || [];
  } catch (err) {
    console.log(err);
  }
};

export const getScoreUpdate = async (email: any) => {
  try {
    const userScoreDB = collection(db, "leadersBoard");
    const scoreQuery = query(userScoreDB, where("email", "==", email));
    const querySnapshot = await getDocs(scoreQuery);
    return querySnapshot.docs[0].data().total;
  } catch (err) {
    console.log(err);
  }
};

// create challenge
export const createQuizChallenge = async (
  creatorId: string,
  levelOfDifficulty: string,
  noOfPlayers: string,
  noOfQuestions: string,
  stake: string
): Promise<void> => {
  try {
    let id = `chall${Math.floor(Math.random() * 999999) + 1}ge`;
    const newChallenge = doc(db, "challengeBoard", id);
    await setDoc(
      newChallenge,
      {
        creatorId: creatorId,
        levelOfDifficulty: levelOfDifficulty,
        noOfPlayers: Number(noOfPlayers),
        noOfQuestions: Number(noOfQuestions),
        stake: Number(stake),
        isClosed: false,
        playersArray: [
          {
            playerId: creatorId,
            score: 0,
            isPlayed: false,
          },
        ],
      },
      { merge: true }
    )
      .then(() => {
        sendUserScore(creatorId, Number(-stake));
      })
      .then(() => console.log("challenge added to db leaderboard"));
    return;
  } catch (err) {
    console.log(err);
  }
};

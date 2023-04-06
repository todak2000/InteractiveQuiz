// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, onSnapshot, increment, setDoc, doc, query, where, getDocs, or } from "@firebase/firestore";
import {getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8z9d_dQ7iFa4zz10mHIWTa9-OdPfQ96E",
  authDomain: "interactivequiz-a5281.firebaseapp.com",
  projectId: "interactivequiz-a5281",
  storageBucket: "interactivequiz-a5281.appspot.com",
  messagingSenderId: "389737820485",
  appId: "1:389737820485:web:763ad6fa01c2da2f8d8e2c",
  measurementId: "G-LDFP529H3T"
  // apiKey: process.env.NEXT_PUBLIC_apiKey,
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth();
const provider = new GoogleAuthProvider();
// Initialize db
export const db = getFirestore(app);

// Google Auth
export const handleGoogleAuth = async (): Promise<{token: string, user: any, userScore: number} | undefined> => { 
  try {
    const userCredentials = await signInWithPopup(auth, provider);
    const credential: any = GoogleAuthProvider.credentialFromResult(userCredentials);
    const token = credential.accessToken;
    const userScoreDB = collection(db, "leadersBoard");
    const scoreQuery = query(userScoreDB, where("email", "==", userCredentials.user?.email));
    const querySnapshot = await getDocs(scoreQuery);
    const user: any = userCredentials.user;
    if (user) {
      let userScore: number = 0;
      if (querySnapshot.docs.length > 0) {
        userScore = querySnapshot.docs[0].data().total;
      }
      else{
        let id = `id${Math.floor(Math.random() * 999999) + 1}gd`
        const newUserScoreDB = doc(db, "leadersBoard", id);
        await setDoc(newUserScoreDB, { total: increment(0), email: userCredentials.user?.email}, { merge: true })
        .then((res:any)=>console.log("new user added to db leaderboard"))
      }
      return {token, user, userScore};
    }
    return;
  } catch(err) {
    console.log(err);
  }
};

export const sendUserScore = async (email:string, score:number) => {
  try {
    const boardRef = doc(db, "leadersBoard", email);
    const res = await setDoc(boardRef, 
      { 
        total: increment(score) ,
        email: email,
      }, 
      { merge: true }
    );
    return res
  } catch (error) {
    console.log(error, "device error");
  }
};

// Search Leader
export const handleSearchLeaderBoard = async (queryItem: string|number)=> { 
  try {
    const boardDB = collection(db, "leadersBoard");
    const searchQuery = query(boardDB,  where("email", ">=", queryItem));
    const querySnapshot = await getDocs(searchQuery);
    const searchResultArray =[]
    if (querySnapshot.docs.length > 0) {
      searchResultArray.push(
        {
          id: querySnapshot.docs[0].id,
          email: querySnapshot.docs[0].data().email,
          total:querySnapshot.docs[0].data().total
        }
      );
    }
    return searchResultArray

  } catch(err) {
    console.log(err);
  }
};

export const getScoreUpdate = async (email:any) => { 
  try {
    const userScoreDB = collection(db, "leadersBoard");
    const scoreQuery = query(userScoreDB, where("email", "==", email));
    const querySnapshot = await getDocs(scoreQuery); 
    return querySnapshot.docs[0].data().total;
  } catch(err) {
    console.log(err);
  }
};
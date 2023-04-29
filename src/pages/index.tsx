import React, { useState, useEffect } from "react";
import Seo from "@/components/Seo";
import Layout from "@/components/layout/Layout";
import GeneralTable from "@/components/Table/GeneralTable";
import { boardTableHeader } from "@/constant";
import { useUser, UserProp } from "@/store/user";
import { useRouter } from "next/router";
import { handleGoogleAuth } from "@/firebase";
import NavBar from "./landingpage/NavBar";
import Hero from "./landingpage/Hero";
import How from "./landingpage/How";
import Footer from "./landingpage/Footer";
import { boardProps } from "./board";
import { sortDataFunc, topThreeValues } from "@/utils";

export default function HomePage() {
  const [newUser, setNewUser] = useState<UserProp>({
    name: "",
    difficulty: 1,
    latest_score: 0,
    avatar: "",
    email: "",
  });
  const [sortedData, setSortedData] = useState<boardProps>([]);
  const [topThreeData, setTopThreeData] = useState<boardProps>([]);
  const {
    setLoading,
    setName,
    setToken,
    setLevel,
    setUserData,
    setEmail,
    setScore,
    setAvatar,
    boardData,
  } = useUser();
  const { push } = useRouter();

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleGoogle = async () => {
    setLoading(true);
    const authResult = await handleGoogleAuth();
    const { token, user, userScore }: any = authResult;

    setToken(token);
    setEmail(user?.email);
    setName(user?.displayName);
    setAvatar(user?.photoURL);
    setScore(userScore);
    setUserData({
      name: user?.displayName,
      difficulty: 1,
      latest_score: userScore,
      avatar: user?.photoURL,
      email: user?.email,
    });
    setNewUser({
      name: user?.displayName,
      difficulty: 1,
      latest_score: userScore,
      avatar: user?.photoURL,
      email: user?.email,
    });
    setLevel(1);
    push("/quiz");
  };

  useEffect(() => {
    const res: any = sortDataFunc(boardData);
    setSortedData(res);
    const topThree: any = topThreeValues(boardData);
    setTopThreeData(topThree);
  }, [boardData]);

  return (
    <Layout>
      <Seo templateTitle="Home | " />
      <>
        <NavBar handleGoogle={handleGoogle} />
        <Hero handleGoogle={handleGoogle} />
        <How />
        <GeneralTable
          tableHeader={boardTableHeader}
          data={sortedData.slice(0, 5)}
          topThree={topThreeData}
        />
        <Footer />
      </>
    </Layout>
  );
}

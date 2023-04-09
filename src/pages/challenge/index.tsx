import React, { useEffect, useState } from "react";
import Mainboard from "@/pages/common/mainboard";
import { useUser } from "@/store/user";
import { HiCheckBadge, HiShare } from "react-icons/hi2";
import { IoCloseCircleSharp } from "react-icons/io5";

import { BsClipboardPlus } from "react-icons/bs";
import { RiSpaceShipLine } from "react-icons/ri";
import { BsClipboardData } from "react-icons/bs";
import Button from "@/components/buttons/Button";
import { ImSpinner2 } from "react-icons/im";
import QuizBoard from "@/components/QuizBoard";
import { boardTableHeader } from "@/constant";
import { useRouter } from "next/router";
import Form from "@/components/Form";
import { challengeTableHeader } from "@/constant";
import { sortDataFunc } from "@/utils";
import CountUp from "react-countup";
import { createChallengeFormState, createChallengeArray } from "@/constant";
import SearchCard from "@/components/SearchCard";
import MobileTable from "@/components/Card/MobileTable";
import {
  createQuizChallenge,
  handleSearchChallengeBoard,
  acceptChallenge,
} from "@/firebase";
import { challengeProps } from "@/store/user";
import { checkPlayerId } from "@/utils";
import Table from "@/components/Table";
import { sortResultFunc } from "@/utils";

function ChallengeBoard() {
  const challengeboardData = {
    title: "Challengeboard",
  };
  const { score, setChallengeId, token, challengeData, userData } = useUser();
  const { push } = useRouter();
  const [sortedData, setSortedData] = useState<challengeProps[]>([]);
  const [sortedData2, setSortedData2] = useState<any>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingShow, setIsLoadingShow] = useState<boolean>(false);
  const [isLoadingAccept, setIsLoadingAccept] = useState<boolean>(false);
  const [isQuiz, setIsQuiz] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string>("");
  const [showChallengeResult, setShowChallengeResult] =
    useState<boolean>(false);

  const [isCreate, setIsCreate] = useState<boolean>(false);

  const handleSearch = async (e: React.FormEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value;
    setErrMsg("");
    if (value !== "") {
      setIsSearching(true);
      const searchResult: any = await handleSearchChallengeBoard(value);
      if (searchResult?.length > 0) {
        setIsSearching(false);
        setSortedData(searchResult);
      } else {
        setIsSearching(false);
        setSortedData([]);
      }
    } else {
      setSortedData(challengeData);
    }
  };

  const handleCreateChallenge = () => {
    setErrMsg("");
    setIsCreate(true);
  };
  const handleAcceptChallenge = async (id: string, stake: number) => {
    setIsLoadingAccept(true);
    if (score > stake) {
      acceptChallenge(token, id, userData?.email).then(() =>
        setIsLoadingAccept(false)
      );
    } else {
      setIsLoading(true);
      setErrMsg(
        "Oops! you have insufficient coins. Play more quiz games to earn coins"
      );
    }
  };
  const handleStartChallenge = (id: string) => {
    setIsQuiz(true);
    setChallengeId(id);
    setErrMsg("");
  };
  const handleShowResult = async (data: any) => {
    setIsLoadingShow(true);
    setErrMsg("");
    const res: any = sortResultFunc(data);
    setSortedData2(res);
    setShowChallengeResult(true);
    setIsLoadingShow(false);
  };

  const handleSubmit = (form: any) => {
    setIsLoading(true);
    if (score > Number(form.stake)) {
      form.creatorId = token;
      createQuizChallenge(
        form.creatorId,
        form.levelOfDifficulty,
        form.noOfPlayers,
        form.noOfQuestions,
        form.stake,
        userData?.email
      ).then(() => {
        setIsCreate(false);
        setIsLoading(true);
      });
    } else {
      setErrMsg(
        "Oops! you have insufficient coins. Play more quiz games to earn coins"
      );
    }
  };
  useEffect(() => {
    const res: any = sortDataFunc(challengeData);
    setErrMsg("");
    setSortedData(res);
  }, [challengeData]);

  useEffect(() => {
    if (!token) {
      push("/");
    }
  }, []);
  return (
    <div>
      <Mainboard title={challengeboardData.title}>
        <div>
          <p className="my-3 w-full text-center font-secondary text-xs text-red-500">
            *** If you are seeing <b>low fund</b>, kindly go to Quizboard to
            play and earn coins sufficent to create or accept a challenge
          </p>
          <div className="relative min-h-[50vh] overflow-x-auto bg-white py-4 shadow-md sm:rounded-lg md:px-8">
            {isQuiz ? (
              <QuizBoard setIsQuiz={setIsQuiz} />
            ) : (
              <>
                {isCreate ? (
                  <div className="flex flex-col items-center justify-center">
                    {errMsg !== "" && (
                      <p className="font-primary text-xs text-red-500">
                        {" "}
                        &#x1F615; {errMsg}
                      </p>
                    )}
                    <Form
                      formState={createChallengeFormState}
                      formArray={createChallengeArray}
                      inputBg="#fff"
                      isLoading={isLoading}
                      handleSubmit={handleSubmit}
                      handleClose={() => setIsCreate(false)}
                    />
                  </div>
                ) : (
                  <>
                    <div className="mb-4 flex flex-row items-center justify-between bg-white px-4 md:flex-row md:items-center md:justify-between">
                      <SearchCard handleSearch={handleSearch} />
                      <button
                        className="px-auto flex h-8 w-1/3 flex-row items-center justify-center rounded-sm bg-brand_primary text-[10px] leading-[14px] text-white disabled:bg-[#a1a1a1] md:mt-0 md:h-12 md:w-auto md:justify-start md:rounded-xl md:px-4 md:text-sm"
                        onClick={() => {
                          handleCreateChallenge();
                        }}
                        disabled={score < 100}
                      >
                        <BsClipboardPlus className="mr-1 text-sm text-white md:mr-2 md:text-lg" />
                        Create Challenge
                      </button>
                    </div>
                    {errMsg !== "" && (
                      <p className="text-center font-primary text-xs text-red-500">
                        {" "}
                        &#x1F615; {errMsg}
                      </p>
                    )}
                    <div className="md:hidden">
                      <MobileTable
                        headerArray={challengeTableHeader}
                        data={sortedData}
                        isSearching={isSearching}
                        handleStartChallenge={handleStartChallenge}
                        handleShowResult={handleShowResult}
                        isLoadingShow={isLoadingShow}
                        isLoadingAccept={isLoadingAccept}
                        handleAcceptChallenge={handleAcceptChallenge}
                      />
                    </div>
                    <table className="hidden w-full text-left text-sm text-gray-500 md:block">
                      <thead className="bg-gray-50 text-xs uppercase text-gray-700  ">
                        <tr>
                          {challengeTableHeader.map(({ id, text }) => {
                            return (
                              <th
                                scope="col"
                                className="px-6 py-3 font-secondary text-xs"
                                key={id}
                              >
                                {text}
                              </th>
                            );
                          })}
                        </tr>
                      </thead>
                      <tbody
                        className={`${
                          sortedData?.length <= 0 ? "h-[200px]" : ""
                        }`}
                      >
                        {isSearching ? (
                          <div className="absolute left-1/4 right-1/4 flex w-1/2 flex-col items-center justify-center">
                            <ImSpinner2 className="animate-spin" />
                          </div>
                        ) : (
                          <>
                            {sortedData?.length <= 0 && (
                              <div className="absolute right-1/4 left-1/4 mt-10 flex w-1/2 flex-col items-center justify-center bg-white">
                                <BsClipboardData className="my-4 text-3xl text-[#414141]" />
                                <span className="h-12 font-secondary text-sm text-[#818181]">
                                  Oops! No Challenge. Start One
                                </span>
                              </div>
                            )}
                            {sortedData?.length > 0 &&
                              sortedData?.map(
                                (
                                  {
                                    id,
                                    stake,
                                    playersArray,
                                    creatorId,
                                    isClosed,
                                    levelOfDifficulty,
                                    noOfPlayers,
                                    noOfQuestions,
                                  },
                                  index
                                ) => (
                                  <>
                                    {playersArray.filter(
                                      (player: any) => player.playerId === token
                                    ).length == 1 ? (
                                      <tr key={id}>
                                        <td className="px-6 py-4 font-primary ">
                                          <span className="text-xs">{id}</span>
                                        </td>
                                        <td className="px-6 py-4 font-primary text-xs">
                                          {levelOfDifficulty}
                                        </td>
                                        <td className="px-6 py-4 text-center font-primary text-xs">
                                          <CountUp end={noOfPlayers} />{" "}
                                        </td>
                                        <td className="px-6 py-4 text-center font-primary text-xs">
                                          {noOfQuestions}{" "}
                                        </td>
                                        <td className="px-6 py-4 text-center font-primary text-xs">
                                          {stake}
                                        </td>
                                        <td
                                          className={`px-6 py-4 text-center font-primary text-xs ${
                                            noOfPlayers === playersArray?.length
                                              ? " "
                                              : "animated-blink"
                                          }`}
                                        >
                                          {noOfPlayers ===
                                          playersArray?.length ? (
                                            <RiSpaceShipLine className="mx-auto text-center text-2xl text-yellow-500" />
                                          ) : (
                                            noOfPlayers - playersArray?.length
                                          )}
                                        </td>
                                        <td className="flex flex-row items-center justify-center px-6 py-4 font-primary text-xs">
                                          {checkPlayerId(playersArray, token)
                                            .isPlayer &&
                                          playersArray?.length ===
                                            noOfPlayers &&
                                          !checkPlayerId(playersArray, token)
                                            .isPlayed ? (
                                            <Button
                                              variant="challenge"
                                              className=" h-[45px] w-[50px] text-xs"
                                              onClick={() => {
                                                handleStartChallenge(id);
                                              }}
                                            >
                                              Start
                                            </Button>
                                          ) : checkPlayerId(playersArray, token)
                                              .isPlayer &&
                                            playersArray?.length ===
                                              noOfPlayers &&
                                            checkPlayerId(playersArray, token)
                                              .isPlayed ? (
                                            <Button
                                              variant="challenge"
                                              className=" h-[45px] w-[50px] text-xs"
                                              onClick={() => {
                                                handleShowResult(playersArray);
                                              }}
                                            >
                                              {isLoadingShow ? (
                                                <ImSpinner2 className="animate-spin" />
                                              ) : (
                                                "Results"
                                              )}
                                            </Button>
                                          ) : checkPlayerId(playersArray, token)
                                              .isPlayer &&
                                            playersArray?.length <
                                              noOfPlayers &&
                                            !checkPlayerId(playersArray, token)
                                              .isPlayed ? (
                                            <>
                                              <HiCheckBadge className="text-2xl text-green-500" />
                                            </>
                                          ) : !checkPlayerId(
                                              playersArray,
                                              token
                                            ).isPlayer &&
                                            playersArray?.length <
                                              noOfPlayers &&
                                            !checkPlayerId(playersArray, token)
                                              .isPlayed ? (
                                            <Button
                                              variant="challenge"
                                              className=" h-[45px] w-[50px] text-xs"
                                              onClick={() => {
                                                handleAcceptChallenge(
                                                  id,
                                                  stake
                                                );
                                              }}
                                              disabled={score < stake}
                                            >
                                              {isLoadingAccept ? (
                                                <ImSpinner2 className="animate-spin" />
                                              ) : score < stake ? (
                                                "low fund"
                                              ) : (
                                                "Accept"
                                              )}
                                            </Button>
                                          ) : (
                                            ""
                                          )}
                                        </td>
                                        <td>
                                          {checkPlayerId(playersArray, token)
                                            .isPlayer &&
                                            playersArray?.length <
                                              noOfPlayers &&
                                            !checkPlayerId(playersArray, token)
                                              .isPlayed && (
                                              <HiShare className="cursor-pointer text-[#818181]" />
                                            )}
                                        </td>
                                      </tr>
                                    ) : !isClosed ? (
                                      <tr key={id}>
                                        <td className="px-6 py-4 font-primary ">
                                          <span className="text-xs">{id}</span>
                                        </td>
                                        <td className="px-6 py-4 font-primary text-xs">
                                          {levelOfDifficulty}
                                        </td>
                                        <td className="px-6 py-4 text-center font-primary text-xs">
                                          <CountUp end={noOfPlayers} />{" "}
                                        </td>
                                        <td className="px-6 py-4 text-center font-primary text-xs">
                                          {noOfQuestions}{" "}
                                        </td>
                                        <td className="px-6 py-4 text-center font-primary text-xs">
                                          {stake}
                                        </td>
                                        <td
                                          className={`px-6 py-4 text-center font-primary text-xs ${
                                            noOfPlayers === playersArray?.length
                                              ? " "
                                              : "animated-blink"
                                          }`}
                                        >
                                          {noOfPlayers ===
                                          playersArray?.length ? (
                                            <RiSpaceShipLine className="mx-auto text-center text-2xl text-yellow-500" />
                                          ) : (
                                            noOfPlayers - playersArray?.length
                                          )}
                                        </td>
                                        <td className="flex flex-row items-center justify-center px-6 py-4 font-primary text-xs">
                                          {checkPlayerId(playersArray, token)
                                            .isPlayer &&
                                          playersArray?.length ===
                                            noOfPlayers &&
                                          !checkPlayerId(playersArray, token)
                                            .isPlayed ? (
                                            <Button
                                              variant="challenge"
                                              className=" h-[45px] w-[50px] text-xs"
                                              onClick={() => {
                                                handleStartChallenge(id);
                                              }}
                                            >
                                              Start
                                            </Button>
                                          ) : checkPlayerId(playersArray, token)
                                              .isPlayer &&
                                            playersArray?.length ===
                                              noOfPlayers &&
                                            checkPlayerId(playersArray, token)
                                              .isPlayed ? (
                                            <Button
                                              variant="challenge"
                                              className=" h-[45px] w-[50px] text-xs"
                                              onClick={() => {
                                                handleShowResult(playersArray);
                                              }}
                                            >
                                              {isLoadingShow ? (
                                                <ImSpinner2 className="animate-spin" />
                                              ) : (
                                                "Results"
                                              )}
                                            </Button>
                                          ) : checkPlayerId(playersArray, token)
                                              .isPlayer &&
                                            playersArray?.length <
                                              noOfPlayers &&
                                            !checkPlayerId(playersArray, token)
                                              .isPlayed ? (
                                            <>
                                              <HiCheckBadge className="text-2xl text-green-500" />
                                            </>
                                          ) : !checkPlayerId(
                                              playersArray,
                                              token
                                            ).isPlayer &&
                                            playersArray?.length <
                                              noOfPlayers &&
                                            !checkPlayerId(playersArray, token)
                                              .isPlayed ? (
                                            <Button
                                              variant="challenge"
                                              className=" h-[45px] w-[50px] text-xs"
                                              onClick={() => {
                                                handleAcceptChallenge(
                                                  id,
                                                  stake
                                                );
                                              }}
                                              disabled={score < stake}
                                            >
                                              {isLoadingAccept ? (
                                                <ImSpinner2 className="animate-spin" />
                                              ) : score < stake ? (
                                                "low fund"
                                              ) : (
                                                "Accept"
                                              )}
                                            </Button>
                                          ) : (
                                            ""
                                          )}
                                        </td>
                                        <td>
                                          {checkPlayerId(playersArray, token)
                                            .isPlayer &&
                                            playersArray?.length <
                                              noOfPlayers &&
                                            !checkPlayerId(playersArray, token)
                                              .isPlayed && (
                                              <HiShare className="cursor-pointer text-[#818181]" />
                                            )}
                                        </td>
                                      </tr>
                                    ) : (
                                      ""
                                    )}
                                  </>
                                )
                              )}
                          </>
                        )}
                      </tbody>
                    </table>
                  </>
                )}
              </>
            )}
          </div>

          {showChallengeResult && (
            <div className="absolute top-0 left-0 h-screen w-screen bg-white md:left-auto md:right-0  md:h-full md:w-auto md:p-4">
              <Table
                tableHeader={boardTableHeader}
                data={sortedData2}
                topThree={[]}
              />
              <button
                className=" mx-auto my-4 flex h-8 flex-row items-center justify-between bg-gray-200 px-4 text-[10px] leading-[14px] text-[#414141] disabled:bg-[#a1a1a1] md:h-12  md:text-sm"
                onClick={() => {
                  setShowChallengeResult(false);
                }}
              >
                <IoCloseCircleSharp className="mr-2 text-lg text-[#414141]" />
                Close
              </button>
            </div>
          )}
        </div>
      </Mainboard>
    </div>
  );
}

export default React.memo(ChallengeBoard);

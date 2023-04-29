import React from "react";
import CountUp from "react-countup";
import { BsHash, BsPatchQuestionFill, BsClipboardData } from "react-icons/bs";
import { MdOutlinePerson } from "react-icons/md";
import { GiTwoCoins } from "react-icons/gi";
import Button from "../buttons/Button";
import { ImSpinner2 } from "react-icons/im";
import { RiSpaceShipLine } from "react-icons/ri";
import { checkPlayerId } from "@/utils";
import { HiCheckBadge, HiShare } from "react-icons/hi2";
import { useUser } from "@/store/user";
import SocialMedia from "../socialMedia";
type CardItem = {
  headerArray: any[];
  data: any[];
  isSearching: boolean;
  socialMediaTitle: string;
  isShare: string;
  handleShare: (id: string) => void;
  handleStartChallenge: (id: string) => void;
  handleShowResult: (playersArray: any[]) => void;
  isLoadingShow: boolean;
  isLoadingAccept: boolean;
  handleAcceptChallenge: (id: string, stake: number) => void;
};

const MobileTable = ({
  isLoadingAccept,
  data,
  isLoadingShow,
  socialMediaTitle,
  isSearching,
  isShare,
  handleShare,
  handleStartChallenge,
  handleShowResult,
  handleAcceptChallenge,
}: CardItem) => {
  const { token, score, userData } = useUser();
  return (
    <>
      {data?.length <= 0 && !isSearching && (
        <div className="rounded-xs m-1 mb-1 flex flex-col items-center justify-center bg-white p-4">
          <BsClipboardData className="my-4 text-3xl text-[#414141]" />
          <span className="h-12 font-secondary text-sm text-[#818181]">
            Oops! No Challenge. Start One
          </span>
        </div>
      )}
      {isSearching ? (
        <div className="rounded-xs m-1 mb-1 flex flex-col items-center justify-center bg-white p-4">
          <ImSpinner2 className="animate-spin" />
        </div>
      ) : (
        data.map(
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
          ) => {
            const level =
              levelOfDifficulty === "Hard"
                ? "bg-red-200 text-red-500"
                : levelOfDifficulty === "Medium"
                ? "bg-yellow-200 text-yellow-700"
                : "bg-green-200 text-green-700";

            return (
              <>
                {playersArray.filter((player: any) => player.playerId === token)
                  .length == 1 ? (
                  <div
                    key={id}
                    className="rounded-xs mx-1 my-2 flex flex-col bg-gray-50 p-4 shadow"
                  >
                    <div className="my-1 flex flex-row justify-between">
                      <span className="flex flex-row items-center  font-secondary text-xs font-bold text-[#414141]">
                        {" "}
                        <BsHash /> {id}
                      </span>
                      <span className="flex flex-row items-center  font-secondary text-xs font-bold text-[#414141]">
                        {checkPlayerId(playersArray, token).isPlayer &&
                          playersArray?.length < noOfPlayers &&
                          !checkPlayerId(playersArray, token).isPlayed && (
                            <HiShare
                              className="relative cursor-pointer text-[#818181]"
                              onClick={() => handleShare(id)}
                            />
                          )}
                        {isShare === id && (
                          <div className="absolute top-[70%] right-0 grid grid-rows-3 gap-1">
                            <SocialMedia title={socialMediaTitle} />
                          </div>
                        )}
                      </span>
                    </div>

                    <div className="my-1 grid grid-cols-3 gap-1">
                      <span
                        className={`flex w-2/3 flex-row items-center justify-center rounded-full  py-1 font-primary text-xs ${level}`}
                      >
                        {levelOfDifficulty}
                      </span>
                      <span className="flex flex-row items-center font-secondary text-xs text-[#414141]">
                        {" "}
                        <MdOutlinePerson className="mr-1 text-brand_primary" />
                        Players:
                        <CountUp end={noOfPlayers} className="ml-1" />{" "}
                      </span>
                      <span className="flex flex-row items-center  font-secondary text-xs text-[#414141]">
                        {noOfPlayers === playersArray?.length ? (
                          <RiSpaceShipLine className="mx-auto text-center text-2xl text-yellow-500" />
                        ) : (
                          `Spot Left:  ${noOfPlayers - playersArray?.length}`
                        )}
                      </span>
                    </div>
                    <div className="my-1 grid grid-cols-3 gap-1">
                      <span className="flex flex-row items-center  font-secondary text-xs text-[#414141]">
                        {" "}
                        <GiTwoCoins className="mr-2 text-brand_primary" />
                        Amount: {stake}
                      </span>
                      <span className="flex flex-row items-center  font-secondary text-xs text-[#414141]">
                        {" "}
                        <BsPatchQuestionFill className="mr-2 text-brand_primary" />{" "}
                        Questions: {noOfQuestions}
                      </span>
                      <span className="flex flex-col items-center justify-center ">
                        {checkPlayerId(playersArray, token).isPlayer &&
                        playersArray?.length === noOfPlayers &&
                        !checkPlayerId(playersArray, token).isPlayed ? (
                          <Button
                            variant="challenge"
                            className=" h-[30px] w-full text-xs"
                            onClick={() => {
                              handleStartChallenge(id);
                            }}
                          >
                            Start
                          </Button>
                        ) : checkPlayerId(playersArray, token).isPlayer &&
                          playersArray?.length === noOfPlayers &&
                          checkPlayerId(playersArray, token).isPlayed ? (
                          <Button
                            variant="challenge"
                            className="h-[30px] w-full text-xs"
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
                        ) : checkPlayerId(playersArray, token).isPlayer &&
                          playersArray?.length < noOfPlayers &&
                          !checkPlayerId(playersArray, token).isPlayed ? (
                          <>
                            <HiCheckBadge className="text-2xl text-green-500" />
                          </>
                        ) : !checkPlayerId(playersArray, token).isPlayer &&
                          playersArray?.length < noOfPlayers &&
                          !checkPlayerId(playersArray, token).isPlayed ? (
                          <Button
                            variant="challenge"
                            className="h-[30px] w-full text-xs"
                            onClick={() => {
                              handleAcceptChallenge(id, stake);
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
                      </span>
                    </div>
                  </div>
                ) : !isClosed ? (
                  <div
                    key={id}
                    className="rounded-xs m-1 mb-1 flex flex-col bg-gray-50 p-4 shadow"
                  >
                    <div className="my-1 flex flex-row justify-between">
                      <span className="flex flex-row items-center  font-secondary text-xs font-bold text-[#414141]">
                        {" "}
                        <BsHash /> {id}
                      </span>
                      <span className="flex flex-row items-center  font-secondary text-xs font-bold text-[#414141]">
                        {checkPlayerId(playersArray, token).isPlayer &&
                          playersArray?.length < noOfPlayers &&
                          !checkPlayerId(playersArray, token).isPlayed && (
                            <HiShare
                              className="relative cursor-pointer text-[#818181]"
                              onClick={() => handleShare(id)}
                            />
                          )}
                        {isShare === id && (
                          <div className="absolute top-[70%] right-0 grid grid-rows-3 gap-1">
                            <SocialMedia title={socialMediaTitle} />
                          </div>
                        )}
                      </span>
                    </div>

                    <div className="my-1 grid grid-cols-3 gap-1">
                      <span
                        className={`flex w-2/3 flex-row items-center justify-center rounded-full  py-1 font-primary text-xs ${level}`}
                      >
                        {levelOfDifficulty}
                      </span>
                      <span className="flex flex-row items-center font-secondary text-xs text-[#414141]">
                        {" "}
                        <MdOutlinePerson className="mr-1 text-brand_primary" />
                        Players:
                        <CountUp end={noOfPlayers} className="ml-1" />{" "}
                      </span>
                      <span className="flex flex-row items-center  font-secondary text-xs text-[#414141]">
                        {noOfPlayers === playersArray?.length ? (
                          <RiSpaceShipLine className="mx-auto text-center text-2xl text-yellow-500" />
                        ) : (
                          `Spot Left:  ${noOfPlayers - playersArray?.length}`
                        )}
                      </span>
                    </div>
                    <div className="my-1 grid grid-cols-3 gap-1">
                      <span className="flex flex-row items-center  font-secondary text-xs text-[#414141]">
                        {" "}
                        <GiTwoCoins className="mr-2 text-brand_primary" />
                        Amount: {stake}
                      </span>
                      <span className="flex flex-row items-center  font-secondary text-xs text-[#414141]">
                        {" "}
                        <BsPatchQuestionFill className="mr-2 text-brand_primary" />{" "}
                        Questions: {noOfQuestions}
                      </span>
                      <span className="flex flex-row items-center ">
                        {checkPlayerId(playersArray, token).isPlayer &&
                        playersArray?.length === noOfPlayers &&
                        !checkPlayerId(playersArray, token).isPlayed ? (
                          <Button
                            variant="challenge"
                            className="h-[30px] w-full text-xs"
                            onClick={() => {
                              handleStartChallenge(id);
                            }}
                          >
                            Start
                          </Button>
                        ) : checkPlayerId(playersArray, token).isPlayer &&
                          playersArray?.length === noOfPlayers &&
                          checkPlayerId(playersArray, token).isPlayed ? (
                          <Button
                            variant="challenge"
                            className="h-[30px] w-full text-xs"
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
                        ) : checkPlayerId(playersArray, token).isPlayer &&
                          playersArray?.length < noOfPlayers &&
                          !checkPlayerId(playersArray, token).isPlayed ? (
                          <>
                            <HiCheckBadge className="text-2xl text-green-500" />
                          </>
                        ) : !checkPlayerId(playersArray, token).isPlayer &&
                          playersArray?.length < noOfPlayers &&
                          !checkPlayerId(playersArray, token).isPlayed ? (
                          <Button
                            variant="challenge"
                            className="h-[30px] w-full text-xs"
                            onClick={() => {
                              handleAcceptChallenge(id, stake);
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
                      </span>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </>
            );
          }
        )
      )}
    </>
  );
};

export default React.memo(MobileTable);

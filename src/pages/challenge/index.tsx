import React, { useEffect, useState } from "react";
import Mainboard from "@/pages/common/mainboard";
import { useUser } from "@/store/user";
import { HiCheckBadge, HiShare } from "react-icons/hi2";
import { SlBadge } from "react-icons/sl";
import {BsClipboardPlus} from 'react-icons/bs';
import {RiSpaceShipLine} from 'react-icons/ri';
import {MdIncompleteCircle} from 'react-icons/md'
import Button from "@/components/buttons/Button";
import { ImSpinner2 } from "react-icons/im";
// import { db } from "@/firebase";
// import { collection, onSnapshot } from "@firebase/firestore";
import Form from "@/components/Form";
import { challengeTableHeader } from "@/constant";
import { maskEmail } from "@/utils";
import { handleSearchLeaderBoard } from "@/firebase";
import { sortDataFunc, topThreeValues } from "@/utils";
import CountUp from "react-countup";
import { getScoreUpdate } from "@/firebase";
import { createChallengeFormState, createChallengeArray } from "@/constant";
import SearchCard from "@/components/SearchCard";
import { createQuizChallenge, handleSearchChallengeBoard, acceptChallenge } from "@/firebase";
import { challengeProps } from "@/store/user";
import { checkPlayerId } from "@/utils";
// export type boardProps = {
//   id: string; 
//   email: string; 
//   total: number;
// }[]

function ChallengeBoard() {
  const challengeboardData = {
    title: "Challengeboard",
  };
  const {
    userData,
    setScore,
    loading,
    setLoading,
    token,
    challengeData,
    boardData, setBoardData
  } = useUser();
const [sortedData, setSortedData] = useState<challengeProps[]>([]);

const [isSearching, setIsSearching] = useState<boolean>(false)
const [isLoading, setIsLoading] = useState<boolean>(false)

const [isCreate, setIsCreate] = useState<boolean>(false)

  const handleSearch  = async (e:React.FormEvent<HTMLInputElement> )=>{
    const value = (e.target as HTMLInputElement).value;
    if (value !== '') {
      setIsSearching(true)
      const searchResult: any = await handleSearchChallengeBoard(value)
      if (searchResult?.length > 0) {
        setIsSearching(false)
        setSortedData(searchResult)
      }
      else{
        setIsSearching(false)
        setSortedData([])
      }
      
    }
    else{
      setSortedData(challengeData)
    }
  }

  const handleCreateChallenge = ()=>{
    
    setIsCreate(true)
  }
  const handleAcceptChallenge = async (id: string)=>{
    const res = await acceptChallenge(token, id)
  }

  const handleSubmit = async (form:any)=>{
    form.creatorId = token
    const res = await createQuizChallenge(
      form.creatorId, 
      form.levelOfDifficulty,
      form.noOfPlayers, 
      form.noOfQuestions,
      form.stake
    )

  }
  useEffect(() => {
    const res: any = sortDataFunc(challengeData)
    setSortedData(res)
  }, [challengeData])
  

  return (
    <div>
      <Mainboard title={challengeboardData.title}>
        <div >
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg pt-4 md:p-8 bg-white">
            {isCreate ? 
            <div className='flex flex-col justify-center items-center'>
              <Form 
              formState={createChallengeFormState}
              formArray={createChallengeArray}
              inputBg="#fff"
              handleSubmit={handleSubmit}
              handleClose={()=>setIsCreate(false)}
            />
            </div>
            :
            <>
              <div className="px-4  pb-4 bg-white flex flex-col md:flex-row items-start md:justify-between md:items-center">
                  <SearchCard handleSearch={handleSearch}/>
                  <button
                    className="flex h-8 w-[100px] mt-4 md:mt-0 flex-row items-center justify-between rounded-sm bg-brand_primary px-4 text-[10px] leading-[14px] text-white disabled:bg-[#a1a1a1] md:h-12 md:w-auto md:rounded-xl md:text-sm"
                    onClick={() => {
                      handleCreateChallenge();
                    }}
                  >
                    <BsClipboardPlus className="text-lg text-white md:mr-2" />
                        Create New Challenge
                  </button>
              </div>
              <table className="w-full text-sm text-left text-gray-500 ">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
                  <tr>
                    {challengeTableHeader.map(({id, text })=>{
                      return (
                          <th scope="col" className="px-6 py-3 font-secondary text-xs" key={id}>
                              {text}
                          </th>
                      )
                    })}
                    <th></th>
                  </tr>
                  </thead>
                  <tbody>
                    {isSearching ? 
                    <div 
                      className="absolute left-1/4 right-1/4 w-1/2 flex-col flex justify-center items-center">
                        <ImSpinner2 className="animate-spin"/> 
                    </div>
                    :
                    <>
                    {sortedData?.length <= 0 && <div className="absolute left-1/4 right-1/ w-1/2 flex-col flex justify-center items-center"><span className='text-lg text-[#818181] font-secondary'>Oops! No Results</span></div>}
                    {sortedData?.length > 0 && sortedData?.map(({id, stake, playersArray, creatorId, isClosed, levelOfDifficulty, noOfPlayers, noOfQuestions}) =>(
                      <tr key={id}>
                        <td className="px-6 py-4 font-primary ">
                          <span className="text-xs">{id}</span>
                        </td>
                        <td className="px-6 py-4 font-primary text-xs">{levelOfDifficulty}</td>
                        <td className="px-6 py-4 font-primary text-xs text-center"><CountUp end={noOfPlayers}/> </td>
                        <td className="px-6 py-4 font-primary text-xs text-center">{noOfQuestions}</td>
                        <td className="px-6 py-4 font-primary text-xs text-center">{stake}</td>
                        <td className={`px-6 py-4 font-primary text-xs text-center ${noOfPlayers === playersArray?.length ?' ': 'animated-blink'}`}>{noOfPlayers === playersArray?.length  ?<RiSpaceShipLine className="text-2xl text-yellow-500 text-center mx-auto"/> : noOfPlayers - playersArray?.length}</td>
                        <td className="px-6 py-4 font-primary text-xs flex flex-row items-center justify-center">
                        {
                        checkPlayerId(playersArray, token).isPlayer && playersArray?.length === noOfPlayers && !checkPlayerId(playersArray, token).isPlayed ?
                          <Button
                            variant="challenge"
                            className=" h-[45px] w-[50px] text-xs"
                            // onClick={()=>{handleAcceptChallenge(id)}}
                          >
                            {isLoading ? (
                              <ImSpinner2 className="animate-spin" />
                            ) : (
                              "Start"
                            )}
                          </Button>
                        :
                        checkPlayerId(playersArray, token).isPlayer && playersArray?.length === noOfPlayers && checkPlayerId(playersArray, token).isPlayed ?
                          <Button
                            variant="challenge"
                            className=" h-[45px] w-[50px] text-xs"
                            // onClick={()=>{handleAcceptChallenge(id)}}
                          >
                            {isLoading ? (
                              <ImSpinner2 className="animate-spin" />
                            ) : (
                              "Results"
                            )}
                          </Button>
                        :
                        checkPlayerId(playersArray, token).isPlayer && playersArray?.length < noOfPlayers && !checkPlayerId(playersArray, token).isPlayed ?
                        <>
                        <HiCheckBadge className="text-2xl text-green-500"/>
                        </>
                        :
                        !checkPlayerId(playersArray, token).isPlayer && playersArray?.length < noOfPlayers && !checkPlayerId(playersArray, token).isPlayed? 
                        <Button
                          variant="challenge"
                          className=" h-[45px] w-[50px] text-xs"
                          onClick={()=>{handleAcceptChallenge(id)}}
                        >
                          {isLoading ? (
                            <ImSpinner2 className="animate-spin" />
                          ) : (
                            "Accept"
                          )}
                        </Button>:
                        ''
                        }
                        </td> 
                        <td>
                          <HiShare className='cursor-pointer text-[#818181]'/>
                        </td>
                      </tr>
                    ))}
                    </>
                    }
                    
                  </tbody>
              </table>
              </>
              }
          </div>
          
        </div>
      </Mainboard>
    </div>
  );
}

export default React.memo(ChallengeBoard);

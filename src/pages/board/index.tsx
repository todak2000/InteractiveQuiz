import React, { useEffect, useState } from "react";
import Mainboard from "@/pages/common/mainboard";
import { useUser } from "@/store/user";
import { HiCheckBadge } from "react-icons/hi2";
import { SlBadge } from "react-icons/sl";

// import { db } from "@/firebase";
// import { collection, onSnapshot } from "@firebase/firestore";

import { boardTableHeader } from "@/constant";
import { maskEmail } from "@/utils";
import { handleSearchLeaderBoard } from "@/firebase";
import { sortDataFunc, topThreeValues } from "@/utils";
import CountUp from "react-countup";
import { getScoreUpdate } from "@/firebase";

export type boardProps = {
  id: string; 
  email: string; 
  total: number;
}[]

function LeadersBoard() {
  const leaderboardData = {
    title: "Leadersboard",
  };
  const {
    userData,
    setScore,
    boardData, setBoardData
  } = useUser();
// const [boardData, setBoardData] = useState<boardProps>([]);
const [sortedData, setSortedData] = useState<boardProps>([]);
const [topThreeData, setTopThreeData] = useState<boardProps>([]);
// const q = query(citiesRef, orderBy("name", "desc"), limit(3));
  // const getLeadersBoard = () => {
  //   const userScoreDB = collection(db, "leadersBoard");
  //   onSnapshot(userScoreDB, (querySnapshot) => {
  //     setBoardData(
  //       querySnapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         email:doc.data().email,
  //         total: doc.data().total,
  //       }))
  //     );
  //     getScoreUpdate(userData?.email).then(res=>{
  //       setScore(res)
  //     })

  //   });
  // };

  
  const handleSearch  = async (e:React.FormEvent<HTMLInputElement> )=>{
    const value = (e.target as HTMLInputElement).value;
    if (value !== '') {
      const searchResult: any = await handleSearchLeaderBoard(value)
      const res: any = sortDataFunc(searchResult)
      setSortedData(res)
    }
    else{
      const res: any = sortDataFunc(boardData)
      setSortedData(res)
    }
  }

  // useEffect(() => {
  //   getLeadersBoard()
  // }, []);

  useEffect(() => {
    const res: any = sortDataFunc(boardData)
    setSortedData(res)
    const topThree: any = topThreeValues(boardData)
    setTopThreeData(topThree)
  }, [boardData])
  

  return (
    <div>
      <Mainboard title={leaderboardData.title}>
        <div >
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg pt-4 md:p-6 bg-white">
              <div className="pb-4 bg-white">
                  <label htmlFor="table-search" className="sr-only">Search</label>
                  <div className="relative mt-1">
                      <div className="absolute inset-y-0 left-0 items-center pl-3 pointer-events-none hidden md:flex">
                          <svg className="w-5 h-5 text-gray-500 " aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                      </div>
                      <input 
                        type="text" id="table-search" className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg mx-auto md:mx-0 w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"  
                        placeholder="Search via Email"
                        onChange={handleSearch}
                      />
                  </div>
              </div>
              <table className="w-full text-sm text-left text-gray-500 ">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
                  <tr>
                    {boardTableHeader.map(({id, text })=>{
                      return (
                          <th scope="col" className="px-6 py-3 font-secondary text-xs" key={id}>
                              {text}
                          </th>
                      )
                    })}
                  </tr>
                  </thead>
                  <tbody>
                    {sortedData.map(({id, email, total}, index) =>(
                      <tr key={id}>
                        <td className="px-6 py-4 font-primary ">
                          {total === topThreeData[0]?.total ?
                          <SlBadge className="text-2xl text-[#d4af37]"/>
                          :
                          total === topThreeData[1]?.total ?
                          <SlBadge className="text-2xl text-[#c0c0c0]"/>
                          :
                          total === topThreeData[2]?.total ?
                          <SlBadge className="text-2xl text-[#CD7F32]"/>
                          :
                          
                          <span className="text-xs">{index+1}</span>
                          
                        }
                          
                        </td>
                        <td className="px-6 py-4 font-primary text-xs">{maskEmail(email)}</td>
                        <td className="px-6 py-4 font-primary text-xs"><CountUp end={total}/> </td>
                        {userData?.email === email &&
                        <td className="px-6 py-4 font-primary text-xs"><HiCheckBadge className="text-2xl text-green-500"/></td> 
                        }
                      </tr>
                    ))}
                    
                  </tbody>
              </table>
          </div>
        </div>
      </Mainboard>
    </div>
  );
}

export default React.memo(LeadersBoard);

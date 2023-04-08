import React, { useEffect, useState } from "react";
import Mainboard from "@/pages/common/mainboard";
import { useUser } from "@/store/user";
import { boardTableHeader } from "@/constant";
import { handleSearchLeaderBoard } from "@/firebase";
import { sortDataFunc, topThreeValues } from "@/utils";
import SearchCard from "@/components/SearchCard";
import Table from "@/components/Table";

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
    boardData, 
  } = useUser();
const [sortedData, setSortedData] = useState<boardProps>([]);
const [topThreeData, setTopThreeData] = useState<boardProps>([]);

  
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
                <SearchCard handleSearch={handleSearch}/>
              </div>
              <Table 
                tableHeader={boardTableHeader}
                data={sortedData}
                topThree={topThreeData}
              />
          </div>
        </div>
      </Mainboard>
    </div>
  );
}

export default React.memo(LeadersBoard);

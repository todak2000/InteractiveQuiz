import React, { useEffect, useState } from "react";
import Mainboard from "@/pages/common/mainboard";
import { useUser } from "@/store/user";
import { boardTableHeader } from "@/constant";
import { handleSearchLeaderBoard } from "@/firebase";
import { sortDataFunc, topThreeValues } from "@/utils";
import SearchCard from "@/components/SearchCard";
import Table from "@/components/Table";
import { useRouter } from "next/router";

export type boardProps = {
  id: string;
  email: string;
  total: number;
}[];

function LeadersBoard() {
  const leaderboardData = {
    title: "Leadersboard",
  };
  const { boardData, token } = useUser();
  const { push } = useRouter();
  const [sortedData, setSortedData] = useState<boardProps>([]);
  const [topThreeData, setTopThreeData] = useState<boardProps>([]);

  const handleSearch = async (e: React.FormEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value;
    if (value !== "") {
      const searchResult: any = await handleSearchLeaderBoard(value);
      const res: any = sortDataFunc(searchResult);
      setSortedData(res);
    } else {
      const res: any = sortDataFunc(boardData);
      setSortedData(res);
    }
  };

  useEffect(() => {
    const res: any = sortDataFunc(boardData);
    setSortedData(res);
    const topThree: any = topThreeValues(boardData);
    setTopThreeData(topThree);
  }, [boardData]);
  useEffect(() => {
    if (!token) {
      push("/");
    }
  }, []);

  return (
    <div>
      <Mainboard title={leaderboardData.title}>
        <div>
          <div className="relative overflow-x-auto bg-white pt-4 shadow-md sm:rounded-lg md:p-6">
            <div className="bg-white pb-4">
              <SearchCard handleSearch={handleSearch} />
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

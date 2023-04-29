import React from "react";
import { HiCheckBadge } from "react-icons/hi2";
import { SlBadge } from "react-icons/sl";
import { maskEmail } from "@/utils";
import CountUp from "react-countup";

interface Props {
  tableHeader: any[];
  data: any[];
  topThree?: any[];
}

const GeneralTable: React.FC<Props> = ({
  tableHeader,
  data,
  topThree = [],
}) => {
  return (
    <div
      className="my-[40px] flex w-full flex-col items-center justify-center"
      id="board"
    >
      <p className="font-sencondary my-4 text-3xl">Leader's Board</p>
      <table className="w-[90%] text-left text-sm text-gray-500 md:w-1/2 ">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700  ">
          <tr className="border-b">
            {tableHeader.map(({ id, text }) => {
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
        <tbody>
          {data.map(
            ({ id, email, total, isPlayed, score, playerId }, index) => (
              <tr
                key={id}
                className={`border-b ${
                  index % 2 !== 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="px-6 py-4 font-primary ">
                  {index === 0 ? (
                    <SlBadge className="text-2xl text-[#d4af37]" />
                  ) : (
                    <span className="text-xs">{index + 1}</span>
                  )}
                </td>
                <td className="flex flex-row items-center px-6 py-4 font-primary text-xs">
                  {isPlayed && (
                    <HiCheckBadge className="ml-1 text-xl text-green-500" />
                  )}
                  {email ? maskEmail(email) : playerId}
                </td>
                <td className="px-6 py-4 font-primary text-xs">
                  <CountUp end={total ? total : score} />{" "}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default React.memo(GeneralTable);

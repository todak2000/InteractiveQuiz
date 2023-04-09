import React from "react";
import { HiCheckBadge } from "react-icons/hi2";
import { SlBadge } from "react-icons/sl";
import { maskEmail } from "@/utils";
import { useUser } from "@/store/user";
import CountUp from "react-countup";

interface Props {
  tableHeader: any[];
  data: any[];
  topThree?: any[];
}

const Table: React.FC<Props> = ({ tableHeader, data, topThree = [] }) => {
  const { userData, token } = useUser();
  return (
    <table className="w-full text-left text-sm text-gray-500 ">
      <thead className="bg-gray-50 text-xs uppercase text-gray-700  ">
        <tr>
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
        {data.map(({ id, email, total, isPlayed, score, playerId }, index) => (
          <tr
            key={id}
            className={`${
              userData?.email === email || token === playerId
                ? "bg-green-100"
                : ""
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
              {(userData?.email === email || token === playerId) && (
                <span className="ml-1"> (You)</span>
              )}
            </td>
            <td className="px-6 py-4 font-primary text-xs">
              <CountUp end={total ? total : score} />{" "}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default React.memo(Table);

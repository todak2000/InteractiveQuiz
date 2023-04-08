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

const Table: React.FC<Props> = ({ tableHeader, data, topThree=[]}) => {
    const {
        userData,
      } = useUser();
  return (
    <table className="w-full text-sm text-left text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
        <tr>
        {tableHeader.map(({id, text })=>{
            return (
                <th scope="col" className="px-6 py-3 font-secondary text-xs" key={id}>
                    {text}
                </th>
            )
        })}
        </tr>
        </thead>
        <tbody>
        {data.map(({id, email, total}, index) =>(
            <tr key={id}>
            <td className="px-6 py-4 font-primary ">
                { total === topThree[0]?.total ?
                <SlBadge className="text-2xl text-[#d4af37]"/>
                :
                total === topThree[1]?.total ?
                <SlBadge className="text-2xl text-[#c0c0c0]"/>
                :
                total === topThree[2]?.total ?
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
  );
};

export default React.memo(Table);

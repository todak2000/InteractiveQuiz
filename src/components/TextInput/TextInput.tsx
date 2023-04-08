import React from "react";
import { useUser } from "@/store/user";

type Props = {
  label: string;
  type: string;
  placeholder: string;
  name: string;
  inputBg: string;
  value: string;
  note?: string;
  options?: string[];
  handleChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => void;
};
const TextInput: React.FC<Props> = ({
  label,
  type,
  placeholder,
  name,
  inputBg,
  note,
  options,
  value,
  handleChange,
}) => {
  const { score } = useUser();
  return (
    <div className="my-4 flex  w-full flex-col">
      <p className=" mb-2 text-[14px] font-thin leading-[18px] text-[#414141]">
        {label} <sup className="text-[#BD5A5A]">*</sup>
      </p>
      {type === "select" ? (
        <select
          className={`border-1 border-brand_primary px-4 ${inputBg} h-[45px] w-full rounded text-xs font-thin  text-[#818181] md:w-[100%]`}
          onChange={handleChange}
          name={name}
        >
          <option value="">Select Difficulty level&hellip;</option>
          {options?.map((text, index) => {
            return (
              <option key={index} value={text}>
                {text}
              </option>
            );
          })}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          className={`border-1 px-4 ${
            value === ""
              ? "border-brand_primary"
              : name === "stake" &&
                (100 > Number(value) || 5000 < Number(value))
              ? "border-[#FF395B]"
              : name === "noOfQuestions" &&
                (10 > Number(value) || 30 < Number(value))
              ? "border-[#FF395B]"
              : name === "noOfPlayers" &&
                (2 > Number(value) || 5 < Number(value))
              ? "border-[#FF395B]"
              : "border-brand_primary"
          } ${inputBg} h-[45px] w-full rounded text-xs font-thin  text-[#818181] md:w-[100%]`}
        />
      )}
      {note && (
        <p
          className={`mt-1 text-[10px] font-thin leading-[13px] 
        ${
          value === ""
            ? "text=[#414141]"
            : name === "stake" &&
              (100 > Number(value) ||
                5000 < Number(value) ||
                score < Number(value))
            ? "text-[#FF395B]"
            : name === "noOfQuestions" &&
              (10 > Number(value) || 30 < Number(value))
            ? "text-[#FF395B]"
            : name === "noOfPlayers" && (2 > Number(value) || 5 < Number(value))
            ? "text-[#FF395B]"
            : "text=[#414141]"
        }`}
        >
          {name === "stake" && score < Number(value)
            ? "You have exceeded your balance"
            : note}
        </p>
      )}
    </div>
  );
};

export default React.memo(TextInput);

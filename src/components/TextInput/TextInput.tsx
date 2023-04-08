import React from 'react'

type Props = {
  label: string
  type: string
  placeholder: string
  name: string
  inputBg: string
  value: string
  note?: string
  options?: string[]
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,
  ) => void
}
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
  return (
    <div className='flex flex-col  w-full my-4'>
      <p className=' text-[14px] leading-[18px] font-thin text-[#414141] mb-2'>
        {label} <sup className='text-[#BD5A5A]'>*</sup>
      </p>
      {type === 'select' ? (
        <select
          className={`px-4 border-1 border-brand_primary ${inputBg} h-[45px] text-[#818181] w-full md:w-[100%] text-xs  font-thin rounded`}
          onChange={handleChange}
          name={name}
        >
          <option value="">Select Difficulty level&hellip;</option>
          {options?.map((text,index) => {
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
          // minLength={
          //   name == 'stake' ? 100 :
          //   name == 'noOfQuestions' ? 10 :
          //   name == 'noOfPlayers' ? 2 : 99
          // }
          onChange={handleChange}
          className={`px-4 border-1 ${
            value === '' ? "border-brand_primary":
            name ==='stake' && (100 > Number(value) || 5000 < Number(value)) ? "border-[#FF395B]" :
            name ==='noOfQuestions' && (10 > Number(value) || 30 < Number(value)) ? "border-[#FF395B]" :
            name ==='noOfPlayers' && (2 > Number(value) || 5 < Number(value)) ? "border-[#FF395B]" :
            
            "border-brand_primary"
          } ${inputBg} h-[45px] text-[#818181] w-full md:w-[100%] text-xs  font-thin rounded`}
        />
      )}
      {note && <p 
        className={`text-[10px] mt-1 leading-[13px] font-thin 
        ${
          value === '' ? "text=[#414141]":
          name ==='stake' && (100 > Number(value) || 5000 < Number(value)) ? "text-[#FF395B]" :
          name ==='noOfQuestions' && (10 > Number(value) || 30 < Number(value)) ? "text-[#FF395B]" :
          name ==='noOfPlayers' && (2 > Number(value) || 5 < Number(value)) ? "text-[#FF395B]" :
          "text=[#414141]"
        }`
      }
      >{note}</p>}
    </div>
  )
}

export default React.memo(TextInput);

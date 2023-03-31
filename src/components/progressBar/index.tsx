import React from "react";

interface Props {
  value: number;
  max: number;
}

const ProgressBar: React.FC<Props> = ({ value, max }) => {
  const percent = (value / max) * 100;

  return (
    <div className="h-3 w-1/2 rounded-full bg-gray-200 ">
      <div
        className="h-3 w-1/2 rounded-full bg-brand_primary"
        style={{ width: `${percent}%` }}
      />
      <span>{`${percent}%`}</span>
    </div>
  );
};

export default ProgressBar;

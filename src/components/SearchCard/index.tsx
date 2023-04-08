import React from "react";

interface Props {
  handleSearch: (e: React.FormEvent<HTMLInputElement>) => void;
}

const SearchCard: React.FC<Props> = ({ handleSearch }) => {
  return (
    <div className="relative mt-1">
      <div className="pointer-events-none absolute inset-y-0 left-0 hidden items-center pl-3 md:flex">
        <svg
          className="h-5 w-5 text-gray-500 "
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </div>
      <input
        type="text"
        id="table-search"
        className="mx-auto block w-80 rounded-lg border border-gray-300 bg-gray-50 p-2 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 md:mx-0"
        placeholder="Search"
        onChange={handleSearch}
      />
    </div>
  );
};

export default React.memo(SearchCard);

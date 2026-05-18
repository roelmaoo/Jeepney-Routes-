import { useState, useEffect } from "react";
import Weather from "./weather";

function Dropdown() {
  return (
    <div className="rounded-md fixed left-0 right-0 top-0 m-2 md:m-10 h-80 bg-white ">
      <div className="flex flex-col h-full items-center justify-between">
        <nav className="flex flex-col items-left gap-5">
          <Weather />
        </nav>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="50"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-compact-up"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M4 13l8 -3l8 3" />
        </svg>
      </div>
    </div>
  );
}

export default function Hamburger() {
  const [isDropDown, setIsDropdown] = useState(false);

  return (
    <div>
      <button
        className="p-2 rounded-md bg-white shadow-lg cursor-pointer "
        onClick={() => setIsDropdown(!isDropDown)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-menu-2"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M4 6l16 0" />
          <path d="M4 12l16 0" />
          <path d="M4 18l16 0" />
        </svg>

        {isDropDown ? <Dropdown /> : <div>close</div>}
      </button>
    </div>
  );
}

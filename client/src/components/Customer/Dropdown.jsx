import React, { useState } from 'react';

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button
        onClick={toggleDropdown}
        data-ripple-light="true"
        data-popover-target="menu-1"
        data-popover-nested="true"
        className="select-none rounded-lg bg-gray-900 py-1 px-6 text-center align-middle font-sans text-xs font-bold  text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      >
        Checked In!
      </button>
      {isOpen && (
        <ul
          role="menu"
          data-popover="menu-1"
          data-popover-placement="bottom"
          className="absolute z-10 ml-2 mt-1  px-2 overflow-auto rounded-md border border-blue-gray-50 bg-white  font-sans text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none"
        >
          <li
            role="menuitem"
            className="block w-full cursor-pointer select-none rounded-md px-3 pt-[9px] pb-2 text-start leading-tight transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
          >
            In Repair
          </li>   
          <li
            role="menuitem"
            className="block w-full cursor-pointer select-none rounded-md px-3 pt-[9px] pb-2 text-start leading-tight transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
          >
            Finished
          </li>   
        </ul>
      )}
    </div>
  );
};

export default Dropdown;

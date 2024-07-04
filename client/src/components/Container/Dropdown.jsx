import { useState, useRef, useEffect } from 'react';

const Dropdown = () => {
  // State to control whether the dropdown is open or closed
  const [isOpen, setIsOpen] = useState(false);
  // State to store the currently selected status
  const [status, setStatus] = useState('Checked In');
  // Ref to the dropdown container for detecting outside clicks
  const dropdownRef = useRef(null);

  // Function to toggle the dropdown open/closed
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Function to handle status change
  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    setIsOpen(false); // Close the dropdown after selection
  }

  // Effect to handle clicking outside the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    // Add event listener when component mounts
    document.addEventListener('mousedown', handleClickOutside);
    // Remove event listener when component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      {/* Dropdown trigger */}
      <div
        onClick={toggleDropdown}
        data-ripple-light="true"
        data-popover-target="menu-1"
        data-popover-nested="true"
        className="select-none rounded-lg bg-gray-900 py-1 px-6 text-center align-middle font-sans text-xs font-bold text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none cursor-pointer"
      >
        {status}
      </div>
      {/* Dropdown menu */}
      {isOpen && (
        <ul
          role="menu"
          className="absolute z-10 left-0 mt-1 w-full overflow-auto rounded-md border border-blue-gray-50 bg-white font-sans text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none"
        >
          {/* Dropdown menu items */}
          <li
            role="menuitem"
            onClick={() => handleStatusChange('In Repair')}
            className="block w-full cursor-pointer select-none rounded-md px-3 pt-[9px] pb-2 text-start leading-tight transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
          >
            In Repair
          </li>   
          <li
            role="menuitem"
            onClick={() => handleStatusChange('Finished')}
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
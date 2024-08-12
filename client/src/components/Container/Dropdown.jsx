import { useState, useRef, useEffect } from 'react';
import getStatusColors from '../../helper/getStatusColors';

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState('Checked In');
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen); 
  };

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    setIsOpen(false);
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const statusColors = getStatusColors(status);

  return (
    <div ref={dropdownRef} className="relative">
      <div
        onClick={toggleDropdown}
        data-ripple-light="true"
        data-popover-target="menu-1"
        data-popover-nested="true"
        className={`select-none rounded-lg py-1 px-6 text-center align-middle font-sans text-xs font-bold shadow-md transition-all hover:shadow-lg focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none cursor-pointer ${statusColors}`}
      >
        {status}
      </div>
      {isOpen && (
        <ul
          role="menu"
          className="absolute z-10 left-0 mt-1 w-full overflow-auto rounded-md border border-blue-gray-50 bg-white font-sans text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none"
        >
          <li
            role="menuitem"
            onClick={() => handleStatusChange('In Repair')}
            className={`block w-full cursor-pointer select-none rounded-md px-3 pt-[9px] pb-2 text-start leading-tight transition-all hover:bg-opacity-80 focus:bg-opacity-80 active:bg-opacity-80 ${getStatusColors('In Repair')}`}
          >
            In Repair
          </li>   
          <li
            role="menuitem"
            onClick={() => handleStatusChange('Finished')}
            className={`block w-full cursor-pointer select-none rounded-md px-3 pt-[9px] pb-2 text-start leading-tight transition-all hover:bg-opacity-80 focus:bg-opacity-80 active:bg-opacity-80 ${getStatusColors('Finished')}`}
          >
            Finished
          </li>   
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
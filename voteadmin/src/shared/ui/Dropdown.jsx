'use client'
import {useState} from 'react';
import Link from "next/link";



const Dropdown = ({items, label}) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => setIsOpen((prev) => !prev);
    const handleClose = () => setIsOpen(false);
    const onItemClick = (cb) => {
        handleClose();
        if (cb) cb();
    };

    return (
        <div className="relative">
            <button
                id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar"
                className="flex items-center"
                onClick={handleToggle}
            >
                {label}
                <DropdownIcon isOpen={isOpen}/>
            </button>
            <div
                id="dropdownNavbar"
                className={`z-10 ${isOpen ? 'absolute top-8' : 'hidden'} font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 `}

            >
                <ul className="py-2 text-sm text-gray-700" aria-labelledby="dropdownLargeButton">
                    {items.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className="block px-4 py-2 hover:bg-gray-200"
                            onClick={() => onItemClick(item.onClick)}
                        >
                            {item.label}
                        </Link>
                    ))}
                </ul>
            </div>
        </div>
    );
};


const DropdownIcon = ({isOpen}) =>
    <svg
        className={`w-2.5 h-2.5 ml-1 rotate-${isOpen ? '180':'0'}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
        fill="none" viewBox="0 0 10 6">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
              strokeWidth="2" d="m1 1 4 4 4-4"/>
    </svg>


export default Dropdown;

'use client'


import Link from 'next/link';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import { useState } from 'react';
import Image from 'next/image';
import { FiMenu } from "react-icons/fi";


const Navbar: React.FC = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="fixed bg-gray-50 w-[90%] py-2 ml-4  md:py-4 md:top-10 top-5 rounded-full z-10  shadow-2xl border-gray-50 border-[0.5px]">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-black font-bold text-xs hidden md:flex">
          <Link href='/' >
            <Image src={'/smart-scholar-high-resolution-logo-grayscale-transparent.png'} alt='logo' width={200} height={200} className='hidden md:flex '/>
          </Link>
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setDropdownOpen(!isDropdownOpen)}
            className=""
          >
           <FiMenu className='text-3xl'/>
          </button>
        </div>

        <div className={`md:flex hidden space-x-4`}>
          <Link href="/">
            <p className="text-blackhover:rounded hover:bg-gray-300 p-2">Home</p>
          </Link>
          <Link href="/ai-tools">
            <p className="text-black hover:rounded hover:bg-gray-300 p-2">AI Tools</p>
          </Link>
          <Link href='/ai-tools/study-plan'>
            <p className="text-black  hover:rounded hover:bg-gray-300 p-2">Study Plan</p>
          </Link>
          <Link href="/job">
            <p className="text-blackhover:rounded hover:bg-gray-300 p-2">Jobs</p>
          </Link>
          <Link href='/scholarship'>
            <p className="text-black hover:rounded hover:bg-gray-300 p-2">Scholarships</p>
          </Link>
          <Link href='/resources'>
            <p className="text-black  hover:rounded hover:bg-gray-300 p-2">Resources</p>
          </Link>
        </div>

        {/* TODO Use Auth.js for authentication */}
        <div className="flex items-center gap-4">
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>

      {/* Dropdown for mobile screens */}
      {isDropdownOpen && (
        <div className="md:hidden bg-white shadow-md rounded mt-2 absolute w-full left-0">
          <Link href="/job">
            <p className="text-black text-md hover:rounded hover:bg-gray-300 p-2">Jobs</p>
          </Link>
          <Link href="/scholarship">
            <p className="text-black text-md hover:rounded hover:bg-gray-300 p-2">Scholarships</p>
          </Link>
          <Link href="/resources">
            <p className="text-black text-md hover:rounded hover:bg-gray-300 p-2">Resources</p>
          </Link>
          <Link href="/ai-tools">
            <p className="text-black text-md hover:rounded hover:bg-gray-300 p-2">AI Tools</p>
          </Link>
          <Link href='/ai-tools/study-plan'>
            <p className="text-black text-md hover:rounded hover:bg-gray-300 p-2">Study Plan</p>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
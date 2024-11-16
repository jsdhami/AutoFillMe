"use client"
import React, { useState } from 'react';
import { signIn } from "next-auth/react";
import Link from "next/link";
import { MenuIcon, XIcon } from '@heroicons/react/solid';
import Image from 'next/image';
// import Image from 'next/image';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-gray-900 bg-gradient-to-b text-white pt-7 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 rounded-full">
            <Link href="/" ><Image src='/logo.png' alt='Logo' width={100} height={100} className='w-20' /></Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/" className="hover:bg-gray-700 px-3 py-2 rounded-md text-lg font-medium">
                Home
              </Link>
              <Link href="/about" className="hover:bg-gray-700 px-3 py-2 rounded-md text-lg font-medium">
                About
              </Link>
              <Link href="/team" className="hover:bg-gray-700 px-3 py-2 rounded-md text-lg font-medium">
                Team
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <button
              className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-full"
              onClick={() => signIn("github")}
            >
              Sign In
            </button>
            <div className="ml-4 md:hidden">
              <button
                type="button"
                className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
                onClick={toggleMenu}
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? (
                  <XIcon className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden shadow-sm bg-gray-950 mt-4 min-w-fit right-3 absolute rounded-sm " id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/"
              className="hover:bg-gray-700 text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="hover:bg-gray-700 text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              About
            </Link>
            <Link
              href="/team"
              className="hover:bg-gray-700 text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Team
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
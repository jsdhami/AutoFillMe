"use client"
import React from 'react'
import { signIn } from "next-auth/react"
import Link from "next/link"
 
const header = () => {
  return (
   <>
   <div className="py-3 px-4 flex justify-between items-center rounded-full bg-gray-900 bg-gradient-to-b text-white gap-10">
     <div className="flex font-bold text-lg mx-4">
      <Link href={"/"}>AutoFill Me</Link>
     </div>
      <div className="flex flex-row justify-around items-center gap-2 md:gap-3 ">
          <div className="mx-2">
            <Link href="/">Home </Link></div>
          <div className="mx-2">
            <Link href="/about">About</Link>
          </div>
          <div className="mx-2">
            <Link href="/team">Team</Link>
          </div>
      </div>
      <div className="flex">
        <button className="hover:bg-blue-500 bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={() => signIn("", {redirectTo: "/dashboard"})}>
          Sign In
        </button>
      </div>
   </div>
   </>
  )
}

export default header
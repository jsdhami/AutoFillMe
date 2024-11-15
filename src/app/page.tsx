import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
    <div className="m-8 text-white">
    <Header />
      <div className="flex flex-col items-center justify-center my-16 min-h-fit gap-8">
        <div className="flex justify-center border rounded-full text-sm p-1 border-gray-900 w-fit px-3 ">
          This project is developed by Team Aakash at KU-HackFest! 🚀
        </div>
        <div className="text-5xl font-bold text-white">Welcome to AutoFill Me!</div>
        <div className="flex">
          A Web App that helps you fill out Physical and Online forms with ease.
        </div>
        <div className="flex flex-row items-center justify-center gap-4">
          <Button className="bg-blue-700 hover:bg-gray-900">  Get Start </Button>
          <Button className="bg-blue-700 hover:bg-gray-900">  Learn More </Button>
          <Button className="bg-blue-700 hover:bg-gray-900">  
          <Link href="/dashboard">Dashboard</Link>  
          </Button>
        </div>
      </div>
      {/* ***************************************** */}
      <div className="w-full flex m-2 flex-row flex-wrap justify-around mb-16">
        <div className="flex w-2/5 h-40 bg-gray-900 rounded-xl">
          
       

        </div>
        <div className="flex w-2/5 h-40 rounded-xl bg-gray-900">
          
          

        </div>
      </div>
      <Footer />
    </div>
    </>
  );
}

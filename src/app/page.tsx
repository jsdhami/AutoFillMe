import React from "react";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaRocket, FaInfoCircle, FaTachometerAlt, FaUser } from "react-icons/fa";

export default function Home() {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow max-w-7xl mx-auto p-6 flex flex-col items-center justify-center">
        <section className="text-center mb-16">
          <div className="inline-block bg-gray-800 rounded-full px-4 py-2 text-sm font-semibold text-gray-400 mb-6">
            Developed by Team Aakash at KU-HackFest! 🚀
          </div>
          <h1 className="text-5xl font-bold mb-4">Welcome to AutoFill Me!</h1>
          <p className="text-xl text-gray-400 mb-10">
            A Web App that helps you fill out Physical and Online forms with ease.
          </p>
          <div className="flex justify-center gap-4">
            <Button className="bg-blue-700 hover:bg-blue-800 transition duration-300">Get Started</Button>
            <Button className="bg-blue-700 hover:bg-blue-800 transition duration-300">Learn More</Button>
            <Button className="bg-blue-700 hover:bg-blue-800 transition duration-300">
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          {features.map((feature) => (
            <Page key={feature.title} icon={feature.icon} title={feature.title} description={feature.description} />
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
}

const features = [
  {
    icon: <FaRocket className="text-blue-500 text-4xl" />,
    title: "Fast and Efficient",
    description: "AutoFill Me helps you save time by automatically filling out forms with your personal information.",
  },
  {
    icon: <FaInfoCircle className="text-blue-500 text-4xl" />,
    title: "Detailed Information",
    description: "Get detailed information about your forms and their progress with our comprehensive dashboard.",
  },
  {
    icon: <FaTachometerAlt className="text-blue-500 text-4xl" />,
    title: "Improved Productivity",
    description: "Streamline your form-filling process and focus on more important tasks with AutoFill Me.",
  },
  {
    icon: <FaUser className="text-blue-500 text-4xl" />,
    title: "Trusted by Users",
    description: "AutoFill Me is trusted by thousands of users to simplify their form-filling needs.",
  },
];

const Page = ({ icon, title, description }: {icon: React.ReactNode, title: string, description: string}) => (
  <div className="bg-gray-800 rounded-xl p-6 flex items-center transition-transform transform hover:scale-105">
    <div className="mr-6">{icon}</div>
    <div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  </div>
);
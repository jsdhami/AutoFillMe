import React from "react";
import {
  FaLightbulb,
  FaClipboardCheck,
  FaDesktop,
  FaCalendarCheck,
} from "react-icons/fa";
import Header from "@/components/header/header";

const About = () => {
  return (
    <div className="bg-gray-900 text-white lg:h-[calc(100vh-6rem)] flex flex-col">
      <div className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 animate-fade-in">
              About AutoFillMe
            </h1>
            <p className="text-xl text-gray-400 animate-fade-in delay-200">
              Simplify your form-filling process with our powerful AI-driven
              solution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>

          <div className="mt-12">
            <h2 className="text-3xl font-bold mb-4 animate-fade-in">
              How It Works?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {howItWorks.map((step, index) => (
                <HowItWorksCard
                  key={index}
                  title={step.title}
                  description={step.description}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const features = [
  {
    icon: <FaLightbulb className="text-blue-500 text-4xl mb-4" />,
    title: "Idea",
    description:
      "AutoFillMe was created by Team Aakash to simplify the tedious task of filling out forms.",
  },
  {
    icon: <FaClipboardCheck className="text-blue-500 text-4xl mb-4" />,
    title: "Document Upload",
    description:
      "Upload documents like ID cards, certificates, or invoices, and let AI extract the relevant data.",
  },
  {
    icon: <FaDesktop className="text-blue-500 text-4xl mb-4" />,
    title: "Automatic Form Filling",
    description:
      "AutoFillMe uses the extracted data to populate forms automatically, saving you time and effort.",
  },
  {
    icon: <FaCalendarCheck className="text-blue-500 text-4xl mb-4" />,
    title: "Time-Saving and Accurate",
    description:
      "Eliminate repetitive manual typing and reduce the chance of errors with AutoFillMe.",
  },
];

const FeatureCard = ({ icon, title, description }: any) => (
  <div className="bg-gray-800 rounded-xl p-6 flex flex-col items-center transition-transform transform hover:scale-105">
    {icon}
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-400 text-center">{description}</p>
  </div>
);

const howItWorks = [
  {
    title: "Upload Documents",
    description:
      "Start by uploading your documents, whether they're images, PDFs, or scanned copies, into the app or browser extension.",
  },
  {
    title: "Data Extraction with AI",
    description:
      "Using advanced AI technology, AutoFillMe scans the documents, identifies key information, and organizes it into fields. It's trained to handle a variety of formats and layouts.",
  },
  {
    title: "Automatic Form Filling",
    description:
      "Once the data is extracted, AutoFillMe uses it to populate forms automatically, whether you're filling out an online application, a registration form, or a government document.",
  },
  {
    title: "Accessible Anywhere",
    description:
      "As a progressive web app, AutoFillMe works on any device with a browser. The browser extension also enhances convenience, allowing you to use it directly within your workflow.",
  },
];

const HowItWorksCard = ({ title, description }: any) => (
  <div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </div>
);

export default About;

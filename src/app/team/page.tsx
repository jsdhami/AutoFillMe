import React from "react";
import Team from "@/components/team/Team";
import Header from "@/components/header/header";

const page = () => {
  return (
    <div className="h-screen">
      <Header />
      <Team />
    </div>
  );
};

export default page;

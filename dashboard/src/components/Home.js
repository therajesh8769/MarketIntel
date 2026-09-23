import React from "react";
import Dashboard from "./Dashboard";
import TopBar from "./TopBar";

const Home = ({ responseData }) => {
  return (
    <>
      <TopBar />
      <Dashboard responseData={responseData} />
    </>
  );
};

export default Home;

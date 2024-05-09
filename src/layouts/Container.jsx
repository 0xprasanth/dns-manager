import React from "react";
import Header from "../components/Header";

const Container = ({ children }) => {
  return (
    <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
      <Header />
      {children}
    </div>
  );
};

export default Container;

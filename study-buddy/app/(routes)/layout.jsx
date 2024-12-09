import React from "react";
import Navbar from "./(components)/Navbar";
import { AuthContextProvider } from "./_utils/auth-context";

const layout = ({ children }) => {
  return (
    <AuthContextProvider>
      <div className="container mx-auto px-5">
        <Navbar />
        {children}
      </div>
    </AuthContextProvider>
  );
};

export default layout;

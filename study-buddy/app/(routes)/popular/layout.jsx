import React from "react";

const layout = ({ children }) => {
  return (
    <div className="space-y-4">
      <h1 className="text-white font-semibold text-xl tracking-wider">
        Most Upvotes
      </h1>
      {children}
    </div>
  );
};

export default layout;

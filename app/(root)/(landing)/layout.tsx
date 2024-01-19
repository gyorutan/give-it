import React from "react";

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen bg-zinc-900 text-white">
      <div className="h-full md:flex md:justify-center md:items-center p-12 md:p-0">
        <main>{children}</main>
      </div>
    </div>
  );
};

export default LandingLayout;

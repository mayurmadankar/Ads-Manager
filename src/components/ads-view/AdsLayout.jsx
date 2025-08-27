import React from "react";
import { Outlet } from "react-router-dom";

const AdsLayout = () => {
  return (
    <div>
      <div className="flex flex-col bg-white overflow-hidden">
        {/* common header */}
        {/* <ShoppingHeader /> */}
        <main className="flex flex-col w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdsLayout;

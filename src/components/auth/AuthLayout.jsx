import React from "react";
import { Outlet } from "react-router-dom";
import { Button } from "../ui/button";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col ">
      <header className="flex items-center justify-between px-20 py-5 bg-white shadow-sm">
        <div className="flex items-center gap-3">
          <img
            src="/src/assets/btimage.jpg"
            alt="Brand logo"
            className="h-10 w-auto"
          />
        </div>
        <div className="flex items-center gap-6">
          <a
            href="#"
            className="text-black hover:underline font-medium text-xl"
          >
            FAQs
          </a>
          <Button variant="custom" className="w-[120px]">
            Log In
          </Button>
        </div>
      </header>
      <main className="flex flex-1 items-center justify-center px-4">
        <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-lg overflow-hidden w-full">
          <div className="hidden md:flex flex-col justify-center items-center bg-blue-100 px-10 py-12 w-1/2">
            <h2 className="text-3xl font-bold text-blue-700 mb-2">
              Welcome Back!
            </h2>
            <p className="text-blue-600 text-lg">
              Please login to your account.
            </p>
          </div>
          <div className="flex-1 flex items-center justify-center px-8 py-8">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AuthLayout;

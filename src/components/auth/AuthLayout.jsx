import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import girlImg from "../../assets/girl.png";
import btimage from "../../assets/btimage.png";

const AuthLayout = () => {
  const navigate = useNavigate();
  const [tbn, setTbn] = useState(false);

  return (
    <div className="min-h-screen flex flex-col ">
      <header className="flex items-center justify-between px-12 py-2 bg-white shadow-sm max-md:py-3 max-md:px-4">
        <div className="flex items-center gap-3">
          <img
            src={btimage}
            alt="Brand logo"
            className="h-14 w-auto max-md:h-10"
          />
        </div>
        <div className="flex items-center gap-6">
          <a
            href="#"
            className="text-black hover:underline font-medium text-xl"
          >
            FAQs
          </a>
          <Button
            variant="custom"
            className="md:w-[120px] text-lg py-6 max-md:py-3"
            onClick={() => {
              setTbn((prev) => {
                const newState = !prev;
                if (newState) {
                  navigate("/auth/login");
                } else {
                  navigate("/auth/register");
                }
                return newState;
              });
            }}
          >
            {tbn ? "Sign Up" : "Log In"}
          </Button>
        </div>
      </header>
      <main className="flex md:flex-1 items-center justify-center px-12 my-4 max-md:p-4 ">
        <div className="flex flex-col md:flex-row bg-white rounded-xl md:shadow-lg overflow-hidden w-full max-md:shadow-2xl">
          <div className="hidden lg:flex flex-col justify-center items-center bg-blue-100 px-10 py-12 w-1/2">
            <img src={girlImg} alt="default-girl" />
          </div>
          <div className="flex-1 flex items-center justify-center md:px-8 md:py-8 md:bg-blue-100">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AuthLayout;

import React, { useState } from "react";
import CommonForm from "@/components/common/CommonForm";
import { loginFormControls } from "@/components/config";

const initialState = {
  identifier: "",
  password: ""
};

const AuthLogin = () => {
  const [formData, setFormData] = useState(initialState);
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);
  const [checkboxError, setCheckboxError] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    setIsBtnDisabled(true);

    const { identifier, password } = formData;

    const isEmail = /\S+@\S+\.\S+/.test(identifier);
    const isPhone = /^[0-9]{10}$/.test(identifier);

    if (!isEmail && !isPhone) {
      alert("Please enter a valid email or mobile number");
      setIsBtnDisabled(false);
      return;
    }

    setTimeout(() => {
      setIsBtnDisabled(false);
    }, 1500);
  };

  return (
    <div className="flex items-center justify-center  w-[500px] p-6 bg-white md:border rounded-lg ">
      <div className="flex flex-col items-center justify-center w-full gap-4">
        <h1 className="text-[30px] font-bold mb-4">Log In</h1>
        <CommonForm
          formControls={loginFormControls}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
          buttonText="Log In"
          isBtnDisabled={isBtnDisabled}
        />
        <div className="flex items-center justify-center py-2 gap-2 max-sm:w-[300px]">
          <input
            type="checkbox"
            id="terms"
            className="accent-blue-600"
            onChange={(e) => setCheckboxError(!e.target.checked)}
          />
          <label htmlFor="terms" className="text-sm">
            I agree to&nbsp;
            <a href="#" className="text-blue-500 underline hover:text-blue-700">
              Terms of Use
            </a>
            &nbsp;and&nbsp;
            <a href="#" className="text-blue-500 underline hover:text-blue-700">
              Privacy Policy
            </a>
            &nbsp;of Bharat TeleClinic
          </label>
        </div>
        {checkboxError ? (
          <p className="text-red-500 text-sm">
            You must agree to the terms and conditions
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default AuthLogin;

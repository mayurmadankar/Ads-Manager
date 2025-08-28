import React, { useState } from "react";
import CommonForm from "@/components/common/CommonForm";
import { loginFormControls } from "@/components/config";
import { useDispatch } from "react-redux";
import validator from "validator";
import { loginUser } from "@/redux/AuthSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const initialState = {
  identifier: "",
  password: ""
};

const AuthLogin = () => {
  const [formData, setFormData] = useState(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [submitFieldErrors, setSubmitFieldErrors] = useState({});

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const validateForm = () => {
    let newErrors = {};
    Object.keys(formData).forEach((name) => {
      let value = formData[name];
      let errorMsg = "";

      if (name === "firstName" && !value) {
        errorMsg = "Please enter your first name";
      }
      if (name === "lastName" && !value) {
        errorMsg = "Please enter your last name";
      }
      if (name === "phone") {
        value = value.replace(/[^0-9]/g, "");
        if (!value) errorMsg = "Please enter your phone number";
        else if (value.length !== 10)
          errorMsg = "Phone number must be exactly 10 digits";
      }
      if (name === "email") {
        if (!validator.isEmail(value))
          errorMsg = "Please enter a valid email address";
      }
      if (name === "password") {
        if (value.length < 8)
          errorMsg = "Password must be at least 8 characters long.";
        else if (value.length > 20)
          errorMsg = "Password must be at most 20 characters long.";
        else if (!/[A-Z]/.test(value))
          errorMsg = "Password must contain at least one uppercase letter.";
        else if (!/[!@#$%^&*(),.?\":{}|<>]/.test(value))
          errorMsg = "Password must contain at least one special character.";
      }
      if (name === "identifier") {
        if (!value) {
          errorMsg = "Please enter your email or mobile number";
        } else {
          const emailRegex = /^\S+@\S+\.\S+$/;
          const phoneRegex = /^[0-9]{10}$/;
          if (!emailRegex.test(value) && !phoneRegex.test(value)) {
            errorMsg = "Enter a valid email or 10-digit mobile number";
          }
        }
      }
      if (!checkboxChecked) {
        newErrors.checkbox = "You must agree to the terms and conditions";
      }

      if (errorMsg) {
        newErrors[name] = errorMsg;
      }
    });

    setSubmitFieldErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const isValid = validateForm();
    if (isValid) {
      dispatch(loginUser(formData)).then((res) => {
        if (res?.payload?.id) {
          toast.success("Login successful");
          navigate("/ads/dashboard");
        } else {
          toast.error("Login failed");
        }
        setIsSubmitting(false);
      });
    } else {
      setIsSubmitting(false);
    }
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
          isSubmitting={isSubmitting}
          submitFieldErrors={submitFieldErrors}
        />
        <div className="flex items-center justify-center py-2 gap-2 max-sm:w-[300px]">
          <input
            type="checkbox"
            id="terms"
            className="accent-blue-600"
            onChange={(e) => setCheckboxChecked(e.target.checked)}
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
        {submitFieldErrors.checkbox ? (
          <p className="text-red-500 text-sm">{submitFieldErrors.checkbox}</p>
        ) : null}
      </div>
    </div>
  );
};

export default AuthLogin;

import CommonForm from "@/components/common/CommonForm";
import { registerFormControls } from "@/components/config";
import { registerUser } from "@/redux/AuthSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: ""
};

const AuthRegister = () => {
  const [formData, setFormData] = useState(initialState);
  const [checkboxError, setCheckboxError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);

  function onSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    dispatch(registerUser(formData)).then((res) => {
      if (res?.payload?.id) {
        toast.success("Registration successful");
        navigate("/auth/login");
      } else {
        toast.error("Registration failed");
      }
      setIsSubmitting(false);
    });
  }

  return (
    <div className="flex items-center justify-center  w-[500px] p-6 bg-white md:border rounded-lg ">
      <div className="flex flex-col items-center justify-center w-full gap-4">
        <h1 className="text-[30px] font-bold mb-4">Sign Up</h1>
        <CommonForm
          formControls={registerFormControls}
          buttonText="Sign Up"
          isSubmitting={isSubmitting}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
        />
        <div className="flex items-center justify-center pt-2 gap-2 max-sm:w-[300px]">
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
        {checkboxError && (
          <p className="text-red-500 text-sm">
            You must agree to the terms and conditions
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthRegister;

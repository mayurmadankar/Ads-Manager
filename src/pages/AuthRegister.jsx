import CommonForm from "@/components/common/CommonForm";
import { registerFormControls } from "@/components/config";
import { useState } from "react";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: ""
};

const AuthRegister = () => {
  const [formData, setFormData] = useState(initialState);

  function onSubmit(event) {
    event.preventDefault();
    console.log(formData);
  }

  return (
    <div className="flex items-center justify-center  w-[500px] p-6 bg-white border rounded-lg ">
      <div className="flex flex-col items-center justify-center w-full gap-4">
        <h1 className="text-[30px] font-bold mb-4">Sign Up</h1>
        <CommonForm
          formControls={registerFormControls}
          buttonText="Sign Up"
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
        />
        <div className="flex items-center justify-center py-2 gap-2 max-sm:w-[300px]">
          <input type="checkbox" id="terms" className="accent-blue-600" />
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
      </div>
    </div>
  );
};

export default AuthRegister;

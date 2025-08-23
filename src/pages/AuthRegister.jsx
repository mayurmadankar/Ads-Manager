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
    <div className="flex items-center justify-center p-8">
      <div className="w-full ">
        <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
        <CommonForm
          formControls={registerFormControls}
          buttonText="Sign Up"
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
};

export default AuthRegister;

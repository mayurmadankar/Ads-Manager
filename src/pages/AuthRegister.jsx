import { useState } from "react";

const initialState = {
  firstName: "",
  lastName: "",
  identifier: "",
  otp: ""
};

const AuthRegister = () => {
  const [formData, setFormData] = useState(initialState);

  return (
    <>
      <h1>Register</h1>
    </>
  );
};

export default AuthRegister;

import React, { useState } from "react";

const initialState = {
  email: "",
  password: ""
};

const AuthLogin = () => {
  const [formData, setFormData] = useState(initialState);
  return (
    <div>
      <h1>Login</h1>
     
    </div>
  );
};

export default AuthLogin;

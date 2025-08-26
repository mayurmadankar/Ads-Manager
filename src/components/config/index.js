export const registerFormControls = [
  {
    name: "firstName",
    label: "First name",
    placeholder: "Enter your first name",
    componentType: "input",
    type: "text"
  },
  {
    name: "lastName",
    label: "Last name",
    placeholder: "Enter your last name",
    componentType: "input",
    type: "text"
  },
  {
    name: "email",
    label: "Business email",
    placeholder: "Enter your business email",
    componentType: "input",
    type: "email"
  },
  {
    name: "phone",
    label: "Business mobile Number",
    placeholder: "Enter your business mobile number",
    componentType: "input",
    type: "tel",
    inputMode: "numeric",
    pattern: "[0-9]*"
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password"
  }
];

export const loginFormControls = [
  {
    name: "identifier",
    label: "Email or mobile number",
    placeholder: "Enter your business email or mobile number",
    componentType: "input",
    type: "text"
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password"
  }
];

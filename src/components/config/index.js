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
    label: "Business Phone Number",
    placeholder: "Enter your business phone number",
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

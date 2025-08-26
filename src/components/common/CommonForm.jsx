import React, { useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Eye, EyeOff } from "lucide-react";
import validator from "validator";

const CommonForm = (props) => {
  const {
    formControls,
    formData,
    setFormData,
    onSubmit,
    buttonText,
    isBtnDisabled
  } = props;

  const [showPassword, setShowPassword] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleInputChange = (event, name, type) => {
    let value = event.target.value;
    if (name === "firstName") {
      if (!value) {
        setFirstNameError("Please enter your first name");
      } else {
        setFirstNameError("");
      }
    }
    if (name === "lastName") {
      if (!value) {
        setLastNameError("Please enter your last name");
      } else {
        setLastNameError("");
      }
    }
    if (name === "phone") {
      value = value.replace(/[^0-9]/g, "");

      if (!value) {
        setPhoneError("Please enter your phone number");
      } else if (value.length !== 10) {
        setPhoneError("Phone number must be exactly 10 digits");
      } else {
        setPhoneError("");
      }
    }

    if (name === "email") {
      if (!validator.isEmail(value)) {
        setEmailError("Please enter a valid email address");
      } else {
        setEmailError("");
      }
    }
    if (name === "password") {
      if (value.length < 8) {
        setPasswordError("Password must be at least 8 characters long.");
      } else if (value.length > 20) {
        setPasswordError("Password must be at most 20 characters long.");
      } else if (!/[A-Z]/.test(value)) {
        setPasswordError(
          "Password must contain at least one uppercase letter."
        );
      } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
        setPasswordError(
          "Password must contain at least one special character."
        );
      } else {
        setPasswordError("");
      }
    }

    setFormData({
      ...formData,
      [name]: value
    });
  };
  const renderInputsByComponentType = (getControlItem) => {
    let element = null;
    const value = formData[getControlItem.name] || "";

    switch (getControlItem.componentType) {
      case "input":
        if (getControlItem.name === "password") {
          element = (
            <div className="mb-4">
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter password"
                  value={formData.password}
                  maxLength={20}
                  onChange={(event) =>
                    handleInputChange(
                      event,
                      getControlItem.name,
                      getControlItem.type
                    )
                  }
                  className={passwordError ? "border-red-500 pr-10" : "pr-10"}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {passwordError && (
                <p className="text-red-500 text-sm mt-1">{passwordError}</p>
              )}
            </div>
          );
        } else {
          element = (
            <>
              <Input
                name={getControlItem.name}
                placeholder={getControlItem.placeholder}
                id={getControlItem.name}
                type={getControlItem.type}
                value={value}
                inputMode={getControlItem.inputMode}
                pattern={getControlItem.pattern}
                maxLength={getControlItem.name === "phone" ? 10 : undefined}
                onChange={(event) =>
                  handleInputChange(
                    event,
                    getControlItem.name,
                    getControlItem.type
                  )
                }
                className={
                  (getControlItem.name === "firstName" && firstNameError) ||
                  (getControlItem.name === "lastName" && lastNameError) ||
                  (getControlItem.name === "email" && emailError) ||
                  (getControlItem.name === "phone" && phoneError)
                    ? "border-red-500 pr-10 text-sm"
                    : "pr-10"
                }
              />
              {getControlItem.name === "firstName" && firstNameError && (
                <p className="text-red-500 text-sm">{firstNameError}</p>
              )}
              {getControlItem.name === "lastName" && lastNameError && (
                <p className="text-red-500 text-sm">{lastNameError}</p>
              )}
              {getControlItem.name === "email" && emailError && (
                <p className="text-red-500 text-sm">{emailError}</p>
              )}
              {getControlItem.name === "phone" && phoneError && (
                <p className="text-red-500 text-sm">{phoneError}</p>
              )}
            </>
          );
        }
        break;
      default:
        element = (
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            inputMode={getControlItem.inputMode}
            pattern={getControlItem.pattern}
            maxLength={getControlItem.name === "phone" ? 10 : undefined}
            onChange={(event) =>
              handleInputChange(event, getControlItem.name, getControlItem.type)
            }
          />
        );
        break;
    }
    return element;
  };
  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-3">
        {formControls.map((controlItem) => (
          <div className="grid w-full gap-1.5" key={controlItem.name}>
            <Label className="mb-1 text-neutral-600">{controlItem.label}</Label>
            {renderInputsByComponentType(controlItem)}
          </div>
        ))}
      </div>
      <Button
        disabled={isBtnDisabled}
        type="submit"
        className="w-full mt-4 text-lg py-6 max-md:py-3"
        variant="custom"
      >
        {buttonText || "Submit"}
      </Button>
    </form>
  );
};

export default CommonForm;

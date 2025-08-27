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
    isSubmitting,
    submitFieldErrors
  } = props;

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (event, name, type) => {
    let value = event.target.value;
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
    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const renderInputsByComponentType = (getControlItem) => {
    const value = formData[getControlItem.name] || "";
    const error =
      errors[getControlItem.name] || submitFieldErrors[getControlItem.name];

    if (
      getControlItem.componentType === "input" &&
      getControlItem.name === "password"
    ) {
      return (
        <div className="mb-4">
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter password"
              value={value}
              maxLength={20}
              onChange={(event) =>
                handleInputChange(
                  event,
                  getControlItem.name,
                  getControlItem.type
                )
              }
              className={
                error || submitFieldErrors[getControlItem.name]
                  ? "border-red-500 pr-10"
                  : "pr-10"
              }
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {(error || submitFieldErrors[getControlItem.name]) && (
            <p className="text-red-500 text-sm mt-1">
              {error || submitFieldErrors[getControlItem.name]}
            </p>
          )}
        </div>
      );
    }

    return (
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
            handleInputChange(event, getControlItem.name, getControlItem.type)
          }
          className={
            error || submitFieldErrors[getControlItem.name]
              ? "border-red-500 pr-10"
              : "pr-10"
          }
        />
        {(error || submitFieldErrors[getControlItem.name]) && (
          <p className="text-red-500 text-sm mt-1">
            {error || submitFieldErrors[getControlItem.name]}
          </p>
        )}
      </>
    );
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
        disabled={isSubmitting}
        type="submit"
        className="w-full mt-4 text-lg py-6 max-md:py-3"
        variant="custom"
      >
        {isSubmitting ? "Submitting..." : buttonText}
      </Button>
    </form>
  );
};

export default CommonForm;

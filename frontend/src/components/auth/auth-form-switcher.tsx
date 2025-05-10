import { useState } from "react";
import { AuthForm } from "./auth-form";

export function AuthFormSwitcher() {
  const [formType, setFormType] = useState<"login" | "register">("login");

  const toggleFormType = () => {
    setFormType((prev) => (prev === "login" ? "register" : "login"));
  };

  return <AuthForm type={formType} onToggleType={toggleFormType} />;
}

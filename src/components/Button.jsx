"use client";
import { Button as Btn } from "@material-tailwind/react";
import React from "react";

const Button = ({ children, type, variant }) => {
  return (
    <Btn
      className="rounded text-primary-200 border-primary-200 hover:bg-transparent hover:text-primary-200 hover:border-primary-200 "
      type={type ?? "button"}
      variant={variant ?? "filled"}
    >
      {children}
    </Btn>
  );
};

export default Button;

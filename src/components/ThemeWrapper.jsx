"use client";
import { ThemeProvider } from "@material-tailwind/react";
import React from "react";

const ThemeWrapper = ({ children }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};

export default ThemeWrapper;

"use client";
import { ThemeProvider } from "@material-tailwind/react";
import React from "react";

const ThemeWrapper = ({ children }) => {
  return (
    <ThemeProvider
      value={{
        dialog: {
          defaultProps: {
            animate: {
              mount: {
                scale: 1,
                y: 0,
                opacity: 1,
                transition: { duration: 0, transitionStyle: "none" },
              },
              unmount: {
                scale: 1,
                y: 0,
                opacity: 0,
                transition: { duration: 0, transitionStyle: "none" },
              },
            },
          },
          styles: {
            base: {
              backdrop: {
                backdropFilter: "backdrop-blur-none",
              },
            },
          },
        },
        button: {
          defaultProps: {
            variant: "filled",
            size: "md",
            color: "blue",
            fullWidth: false,
            ripple: true,
            className: "",
          },
          valid: {
            variants: ["filled", "outlined", "gradient", "text"],
            sizes: ["sm", "md", "lg"],
            colors: [
              "white",
              "blue-gray",
              "gray",
              "brown",
              "deep-orange",
              "orange",
              "amber",
              "yellow",
              "lime",
              "light-green",
              "green",
              "teal",
              "cyan",
              "light-blue",
              "blue",
              "indigo",
              "deep-purple",
              "purple",
              "pink",
              "red",
            ],
          },
          styles: {
            base: {
              initial: {
                verticalAlign: "align-middle",
                userSelect: "select-none",
                fontFamily: "font-sans",
                fontWeight: "font-bold",
                textAlign: "text-center",
                textTransform: "uppercase",
                transition: "transition-all",
                disabled:
                  "disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none",
              },
              fullWidth: {
                display: "block",
                width: "w-full",
              },
            },
            sizes: {
              sm: {
                fontSize: "text-xs",
                py: "py-2",
                px: "px-4",
                borderRadius: "rounded-lg",
              },
              md: {
                fontSize: "text-xs",
                py: "py-3",
                px: "px-6",
                borderRadius: "rounded-lg",
              },
              lg: {
                fontSize: "text-sm",
                py: "py-3.5",
                px: "px-7",
                borderRadius: "rounded-lg",
              },
            },
            variants: {
              filled: {
                white: {
                  backgroud: "bg-white",
                  color: "text-blue-gray-900",
                  shadow: "shadow-md shadow-blue-gray-500/10",
                  hover: "hover:shadow-lg hover:shadow-blue-gray-500/20",
                  focus: "focus:opacity-[0.85] focus:shadow-none",
                  active: "active:opacity-[0.85] active:shadow-none",
                },
                "blue-gray": {
                  backgroud: "bg-blue-gray-500",
                  color: "text-white",
                  shadow: "shadow-md shadow-blue-gray-500/20",
                  hover: "hover:shadow-lg hover:shadow-blue-gray-500/40",
                  focus: "focus:opacity-[0.85] focus:shadow-none",
                  active: "active:opacity-[0.85] active:shadow-none",
                },
                gray: {
                  backgroud: "bg-gray-500",
                  color: "text-white",
                  shadow: "shadow-md shadow-gray-500/20",
                  hover: "hover:shadow-lg hover:shadow-gray-500/40",
                  focus: "focus:opacity-[0.85] focus:shadow-none",
                  active: "active:opacity-[0.85] active:shadow-none",
                },
                brown: {
                  backgroud: "bg-brown-500",
                  color: "text-white",
                  shadow: "shadow-md shadow-brown-500/20",
                  hover: "hover:shadow-lg hover:shadow-brown-500/40",
                  focus: "focus:opacity-[0.85] focus:shadow-none",
                  active: "active:opacity-[0.85] active:shadow-none",
                },
                "deep-orange": {
                  backgroud: "bg-deep-orange-500",
                  color: "text-white",
                  shadow: "shadow-md shadow-deep-orange-500/20",
                  hover: "hover:shadow-lg hover:shadow-deep-orange-500/40",
                  focus: "focus:opacity-[0.85] focus:shadow-none",
                  active: "active:opacity-[0.85] active:shadow-none",
                },
                orange: {
                  backgroud: "bg-orange-500",
                  color: "text-white",
                  shadow: "shadow-md shadow-orange-500/20",
                  hover: "hover:shadow-lg hover:shadow-orange-500/40",
                  focus: "focus:opacity-[0.85] focus:shadow-none",
                  active: "active:opacity-[0.85] active:shadow-none",
                },
                amber: {
                  backgroud: "bg-amber-500",
                  color: "text-black",
                  shadow: "shadow-md shadow-amber-500/20",
                  hover: "hover:shadow-lg hover:shadow-amber-500/40",
                  focus: "focus:opacity-[0.85] focus:shadow-none",
                  active: "active:opacity-[0.85] active:shadow-none",
                },
                yellow: {
                  backgroud: "bg-yellow-500",
                  color: "text-black",
                  shadow: "shadow-md shadow-yellow-500/20",
                  hover: "hover:shadow-lg hover:shadow-yellow-500/40",
                  focus: "focus:opacity-[0.85] focus:shadow-none",
                  active: "active:opacity-[0.85] active:shadow-none",
                },
                lime: {
                  backgroud: "bg-lime-500",
                  color: "text-black",
                  shadow: "shadow-md shadow-lime-500/20",
                  hover: "hover:shadow-lg hover:shadow-lime-500/40",
                  focus: "focus:opacity-[0.85] focus:shadow-none",
                  active: "active:opacity-[0.85] active:shadow-none",
                },
                "light-green": {
                  backgroud: "bg-light-green-500",
                  color: "text-white",
                  shadow: "shadow-md shadow-light-green-500/20",
                  hover: "hover:shadow-lg hover:shadow-light-green-500/40",
                  focus: "focus:opacity-[0.85] focus:shadow-none",
                  active: "active:opacity-[0.85] active:shadow-none",
                },
                green: {
                  backgroud: "bg-green-500",
                  color: "text-white",
                  shadow: "shadow-md shadow-green-500/20",
                  hover: "hover:shadow-lg hover:shadow-green-500/40",
                  focus: "focus:opacity-[0.85] focus:shadow-none",
                  active: "active:opacity-[0.85] active:shadow-none",
                },
                teal: {
                  backgroud: "bg-teal-500",
                  color: "text-white",
                  shadow: "shadow-md shadow-teal-500/20",
                  hover: "hover:shadow-lg hover:shadow-teal-500/40",
                  focus: "focus:opacity-[0.85] focus:shadow-none",
                  active: "active:opacity-[0.85] active:shadow-none",
                },
                cyan: {
                  backgroud: "bg-cyan-500",
                  color: "text-white",
                  shadow: "shadow-md shadow-cyan-500/20",
                  hover: "hover:shadow-lg hover:shadow-cyan-500/40",
                  focus: "focus:opacity-[0.85] focus:shadow-none",
                  active: "active:opacity-[0.85] active:shadow-none",
                },
                "light-blue": {
                  backgroud: "bg-light-blue-500",
                  color: "text-white",
                  shadow: "shadow-md shadow-light-blue-500/20",
                  hover: "hover:shadow-lg hover:shadow-light-blue-500/40",
                  focus: "focus:opacity-[0.85] focus:shadow-none",
                  active: "active:opacity-[0.85] active:shadow-none",
                },
                blue: {
                  backgroud: "bg-primary-200",
                  color: "text-black",
                  shadow: "shadow-md shadow-primary-200/20",
                  hover: "hover:shadow-lg hover:shadow-primary-200/40",
                  focus: "focus:opacity-[0.85] focus:shadow-none",
                  active: "active:opacity-[0.85] active:shadow-none",
                  border: "rounded",
                },
                indigo: {
                  backgroud: "bg-indigo-500",
                  color: "text-white",
                  shadow: "shadow-md shadow-indigo-500/20",
                  hover: "hover:shadow-lg hover:shadow-indigo-500/40",
                  focus: "focus:opacity-[0.85] focus:shadow-none",
                  active: "active:opacity-[0.85] active:shadow-none",
                },
                "deep-purple": {
                  backgroud: "bg-deep-purple-500",
                  color: "text-white",
                  shadow: "shadow-md shadow-deep-purple-500/20",
                  hover: "hover:shadow-lg hover:shadow-deep-purple-500/40",
                  focus: "focus:opacity-[0.85] focus:shadow-none",
                  active: "active:opacity-[0.85] active:shadow-none",
                },
                purple: {
                  backgroud: "bg-purple-500",
                  color: "text-white",
                  shadow: "shadow-md shadow-purple-500/20",
                  hover: "hover:shadow-lg hover:shadow-purple-500/40",
                  focus: "focus:opacity-[0.85] focus:shadow-none",
                  active: "active:opacity-[0.85] active:shadow-none",
                },
                pink: {
                  backgroud: "bg-pink-500",
                  color: "text-white",
                  shadow: "shadow-md shadow-pink-500/20",
                  hover: "hover:shadow-lg hover:shadow-pink-500/40",
                  focus: "focus:opacity-[0.85] focus:shadow-none",
                  active: "active:opacity-[0.85] active:shadow-none",
                },
                red: {
                  backgroud: "bg-red-500",
                  color: "text-white",
                  shadow: "shadow-md shadow-red-500/20",
                  hover: "hover:shadow-lg hover:shadow-red-500/40",
                  focus: "focus:opacity-[0.85] focus:shadow-none",
                  active: "active:opacity-[0.85] active:shadow-none",
                },
              },
              gradient: {
                white: {
                  backgroud: "bg-white",
                  color: "text-blue-gray-900",
                  shadow: "shadow-md shadow-blue-gray-500/10",
                  hover: "hover:shadow-lg hover:shadow-blue-gray-500/20",
                  focus: "focus:opacity-[0.85] focus:shadow-none",
                  active: "active:opacity-[0.85] active:shadow-none",
                },
                "blue-gray": {
                  backgroud:
                    "bg-gradient-to-tr from-blue-gray-600 to-blue-gray-400",
                  color: "text-white",
                  shadow: "shadow-md shadow-blue-gray-500/20",
                  hover: "hover:shadow-lg hover:shadow-blue-gray-500/40",
                  active: "active:opacity-[0.85]",
                },
                gray: {
                  backgroud: "bg-gradient-to-tr from-gray-600 to-gray-400",
                  color: "text-white",
                  shadow: "shadow-md shadow-gray-500/20",
                  hover: "hover:shadow-lg hover:shadow-gray-500/40",
                  active: "active:opacity-[0.85]",
                },
                brown: {
                  backgroud: "bg-gradient-to-tr from-brown-600 to-brown-400",
                  color: "text-white",
                  shadow: "shadow-md shadow-brown-500/20",
                  hover: "hover:shadow-lg hover:shadow-brown-500/40",
                  active: "active:opacity-[0.85]",
                },
                "deep-orange": {
                  backgroud:
                    "bg-gradient-to-tr from-deep-orange-600 to-deep-orange-400",
                  color: "text-white",
                  shadow: "shadow-md shadow-deep-orange-500/20",
                  hover: "hover:shadow-lg hover:shadow-deep-orange-500/40",
                  active: "active:opacity-[0.85]",
                },
                orange: {
                  backgroud: "bg-gradient-to-tr from-orange-600 to-orange-400",
                  color: "text-white",
                  shadow: "shadow-md shadow-orange-500/20",
                  hover: "hover:shadow-lg hover:shadow-orange-500/40",
                  active: "active:opacity-[0.85]",
                },
                amber: {
                  backgroud: "bg-gradient-to-tr from-amber-600 to-amber-400",
                  color: "text-black",
                  shadow: "shadow-md shadow-amber-500/20",
                  hover: "hover:shadow-lg hover:shadow-amber-500/40",
                  active: "active:opacity-[0.85]",
                },
                yellow: {
                  backgroud: "bg-gradient-to-tr from-yellow-600 to-yellow-400",
                  color: "text-black",
                  shadow: "shadow-md shadow-yellow-500/20",
                  hover: "hover:shadow-lg hover:shadow-yellow-500/40",
                  active: "active:opacity-[0.85]",
                },
                lime: {
                  backgroud: "bg-gradient-to-tr from-lime-600 to-lime-400",
                  color: "text-black",
                  shadow: "shadow-md shadow-lime-500/20",
                  hover: "hover:shadow-lg hover:shadow-lime-500/40",
                  active: "active:opacity-[0.85]",
                },
                "light-green": {
                  backgroud:
                    "bg-gradient-to-tr from-light-green-600 to-light-green-400",
                  color: "text-white",
                  shadow: "shadow-md shadow-light-green-500/20",
                  hover: "hover:shadow-lg hover:shadow-light-green-500/40",
                  active: "active:opacity-[0.85]",
                },
                green: {
                  backgroud: "bg-gradient-to-tr from-green-600 to-green-400",
                  color: "text-white",
                  shadow: "shadow-md shadow-green-500/20",
                  hover: "hover:shadow-lg hover:shadow-green-500/40",
                  active: "active:opacity-[0.85]",
                },
                teal: {
                  backgroud: "bg-gradient-to-tr from-teal-600 to-teal-400",
                  color: "text-white",
                  shadow: "shadow-md shadow-teal-500/20",
                  hover: "hover:shadow-lg hover:shadow-teal-500/40",
                  active: "active:opacity-[0.85]",
                },
                cyan: {
                  backgroud: "bg-gradient-to-tr from-cyan-600 to-cyan-400",
                  color: "text-white",
                  shadow: "shadow-md shadow-cyan-500/20",
                  hover: "hover:shadow-lg hover:shadow-cyan-500/40",
                  active: "active:opacity-[0.85]",
                },
                "light-blue": {
                  backgroud:
                    "bg-gradient-to-tr from-light-blue-600 to-light-blue-400",
                  color: "text-white",
                  shadow: "shadow-md shadow-light-blue-500/20",
                  hover: "hover:shadow-lg hover:shadow-light-blue-500/40",
                  active: "active:opacity-[0.85]",
                },
                blue: {
                  backgroud: "bg-gradient-to-tr from-blue-600 to-blue-400",
                  color: "text-white",
                  shadow: "shadow-md shadow-blue-500/20",
                  hover: "hover:shadow-lg hover:shadow-blue-500/40",
                  active: "active:opacity-[0.85]",
                },
                indigo: {
                  backgroud: "bg-gradient-to-tr from-indigo-600 to-indigo-400",
                  color: "text-white",
                  shadow: "shadow-md shadow-indigo-500/20",
                  hover: "hover:shadow-lg hover:shadow-indigo-500/40",
                  active: "active:opacity-[0.85]",
                },
                "deep-purple": {
                  backgroud:
                    "bg-gradient-to-tr from-deep-purple-600 to-deep-purple-400",
                  color: "text-white",
                  shadow: "shadow-md shadow-deep-purple-500/20",
                  hover: "hover:shadow-lg hover:shadow-deep-purple-500/40",
                  active: "active:opacity-[0.85]",
                },
                purple: {
                  backgroud: "bg-gradient-to-tr from-purple-600 to-purple-400",
                  color: "text-white",
                  shadow: "shadow-md shadow-purple-500/20",
                  hover: "hover:shadow-lg hover:shadow-purple-500/40",
                  active: "active:opacity-[0.85]",
                },
                pink: {
                  backgroud: "bg-gradient-to-tr from-pink-600 to-pink-400",
                  color: "text-white",
                  shadow: "shadow-md shadow-pink-500/20",
                  hover: "hover:shadow-lg hover:shadow-pink-500/40",
                  active: "active:opacity-[0.85]",
                },
                red: {
                  backgroud: "bg-gradient-to-tr from-red-600 to-red-400",
                  color: "text-white",
                  shadow: "shadow-md shadow-red-500/20",
                  hover: "hover:shadow-lg hover:shadow-red-500/40",
                  active: "active:opacity-[0.85]",
                },
              },
              outlined: {
                white: {
                  border: "border border-white",
                  color: "text-white",
                  hover: "hover:opacity-75",
                  focus: "focus:ring focus:ring-white/50",
                  active: "active:opacity-[0.85]",
                },
                "blue-gray": {
                  border: "border border-blue-gray-500",
                  color: "text-blue-gray-500",
                  hover: "hover:opacity-75",
                  focus: "focus:ring focus:ring-blue-gray-200",
                  active: "active:opacity-[0.85]",
                },
                gray: {
                  border: "border border-gray-500",
                  color: "text-gray-500",
                  hover: "hover:opacity-75",
                  focus: "focus:ring focus:ring-gray-200",
                  active: "active:opacity-[0.85]",
                },
                brown: {
                  border: "border border-brown-500",
                  color: "text-brown-500",
                  hover: "hover:opacity-75",
                  focus: "focus:ring focus:ring-brown-200",
                  active: "active:opacity-[0.85]",
                },
                "deep-orange": {
                  border: "border border-deep-orange-500",
                  color: "text-deep-orange-500",
                  hover: "hover:opacity-75",
                  focus: "focus:ring focus:ring-deep-orange-200",
                  active: "active:opacity-[0.85]",
                },
                orange: {
                  border: "border border-orange-500",
                  color: "text-orange-500",
                  hover: "hover:opacity-75",
                  focus: "focus:ring focus:ring-orange-200",
                  active: "active:opacity-[0.85]",
                },
                amber: {
                  border: "border border-amber-500",
                  color: "text-amber-500",
                  hover: "hover:opacity-75",
                  focus: "focus:ring focus:ring-amber-200",
                  active: "active:opacity-[0.85]",
                },
                yellow: {
                  border: "border border-yellow-500",
                  color: "text-yellow-500",
                  hover: "hover:opacity-75",
                  focus: "focus:ring focus:ring-yellow-200",
                  active: "active:opacity-[0.85]",
                },
                lime: {
                  border: "border border-lime-500",
                  color: "text-lime-500",
                  hover: "hover:opacity-75",
                  focus: "focus:ring focus:ring-lime-200",
                  active: "active:opacity-[0.85]",
                },
                "light-green": {
                  border: "border border-light-green-500",
                  color: "text-light-green-500",
                  hover: "hover:opacity-75",
                  focus: "focus:ring focus:ring-light-green-200",
                  active: "active:opacity-[0.85]",
                },
                green: {
                  border: "border border-green-500",
                  color: "text-green-500",
                  hover: "hover:opacity-75",
                  focus: "focus:ring focus:ring-green-200",
                  active: "active:opacity-[0.85]",
                },
                teal: {
                  border: "border border-teal-500",
                  color: "text-teal-500",
                  hover: "hover:opacity-75",
                  focus: "focus:ring focus:ring-teal-200",
                  active: "active:opacity-[0.85]",
                },
                cyan: {
                  border: "border border-cyan-500",
                  color: "text-cyan-500",
                  hover: "hover:opacity-75",
                  focus: "focus:ring focus:ring-cyan-200",
                  active: "active:opacity-[0.85]",
                },
                "light-blue": {
                  border: "border border-light-blue-500",
                  color: "text-light-blue-500",
                  hover: "hover:opacity-75",
                  focus: "focus:ring focus:ring-light-blue-200",
                  active: "active:opacity-[0.85]",
                },
                blue: {
                  border: "border border-primary-200 rounded",
                  color: "text-primary-200",
                  hover: "hover:opacity-75",
                  focus: "focus:ring focus:ring-primary-100",
                  active: "active:opacity-[0.85]",
                },
                indigo: {
                  border: "border border-indigo-500",
                  color: "text-indigo-500",
                  hover: "hover:opacity-75",
                  focus: "focus:ring focus:ring-indigo-200",
                  active: "active:opacity-[0.85]",
                },
                "deep-purple": {
                  border: "border border-deep-purple-500",
                  color: "text-deep-purple-500",
                  hover: "hover:opacity-75",
                  focus: "focus:ring focus:ring-deep-purple-200",
                  active: "active:opacity-[0.85]",
                },
                purple: {
                  border: "border border-purple-500",
                  color: "text-purple-500",
                  hover: "hover:opacity-75",
                  focus: "focus:ring focus:ring-purple-200",
                  active: "active:opacity-[0.85]",
                },
                pink: {
                  border: "border border-pink-500",
                  color: "text-pink-500",
                  hover: "hover:opacity-75",
                  focus: "focus:ring focus:ring-pink-200",
                  active: "active:opacity-[0.85]",
                },
                red: {
                  border: "border border-red-500",
                  color: "text-red-500",
                  hover: "hover:opacity-75",
                  focus: "focus:ring focus:ring-red-200",
                  active: "active:opacity-[0.85]",
                },
              },
              text: {
                white: {
                  color: "text-white",
                  hover: "hover:bg-white/10",
                  active: "active:bg-white/30",
                },
                "blue-gray": {
                  color: "text-blue-gray-500",
                  hover: "hover:bg-blue-gray-500/10",
                  active: "active:bg-blue-gray-500/30",
                },
                gray: {
                  color: "text-gray-500",
                  hover: "hover:bg-gray-500/10",
                  active: "active:bg-gray-500/30",
                },
                brown: {
                  color: "text-brown-500",
                  hover: "hover:bg-brown-500/10",
                  active: "active:bg-brown-500/30",
                },
                "deep-orange": {
                  color: "text-deep-orange-500",
                  hover: "hover:bg-deep-orange-500/10",
                  active: "active:bg-deep-orange-500/30",
                },
                orange: {
                  color: "text-orange-500",
                  hover: "hover:bg-orange-500/10",
                  active: "active:bg-orange-500/30",
                },
                amber: {
                  color: "text-amber-500",
                  hover: "hover:bg-amber-500/10",
                  active: "active:bg-amber-500/30",
                },
                yellow: {
                  color: "text-yellow-500",
                  hover: "hover:bg-yellow-500/10",
                  active: "active:bg-yellow-500/30",
                },
                lime: {
                  color: "text-lime-500",
                  hover: "hover:bg-lime-500/10",
                  active: "active:bg-lime-500/30",
                },
                "light-green": {
                  color: "text-light-green-500",
                  hover: "hover:bg-light-green-500/10",
                  active: "active:bg-light-green-500/30",
                },
                green: {
                  color: "text-green-500",
                  hover: "hover:bg-green-500/10",
                  active: "active:bg-green-500/30",
                },
                teal: {
                  color: "text-teal-500",
                  hover: "hover:bg-teal-500/10",
                  active: "active:bg-teal-500/30",
                },
                cyan: {
                  color: "text-cyan-500",
                  hover: "hover:bg-cyan-500/10",
                  active: "active:bg-cyan-500/30",
                },
                "light-blue": {
                  color: "text-light-blue-500",
                  hover: "hover:bg-light-blue-500/10",
                  active: "active:bg-light-blue-500/30",
                },
                blue: {
                  color: "text-blue-500",
                  hover: "hover:bg-blue-500/10",
                  active: "active:bg-blue-500/30",
                },
                indigo: {
                  color: "text-indigo-500",
                  hover: "hover:bg-indigo-500/10",
                  active: "active:bg-indigo-500/30",
                },
                "deep-purple": {
                  color: "text-deep-purple-500",
                  hover: "hover:bg-deep-purple-500/10",
                  active: "active:bg-deep-purple-500/30",
                },
                purple: {
                  color: "text-purple-500",
                  hover: "hover:bg-purple-500/10",
                  active: "active:bg-purple-500/30",
                },
                pink: {
                  color: "text-pink-500",
                  hover: "hover:bg-pink-500/10",
                  active: "active:bg-pink-500/30",
                },
                red: {
                  color: "text-red-500",
                  hover: "hover:bg-red-500/10",
                  active: "active:bg-red-500/30",
                },
              },
            },
          },
        },
        // input: {
        //   defaultProps: {
        //     variant: "outlined",
        //     size: "md",
        //     color: "blue",
        //     label: "",
        //     error: false,
        //     success: false,
        //     icon: undefined,
        //     labelProps: undefined,
        //     containerProps: undefined,
        //     shrink: false,
        //     className: "",
        //   },
        //   valid: {
        //     variants: ["standard", "outlined", "static"],
        //     sizes: ["md", "lg"],
        //     colors: [
        //       "black",
        //       "white",
        //       "blue-gray",
        //       "gray",
        //       "brown",
        //       "deep-orange",
        //       "orange",
        //       "amber",
        //       "yellow",
        //       "lime",
        //       "light-green",
        //       "green",
        //       "teal",
        //       "cyan",
        //       "light-blue",
        //       "blue",
        //       "indigo",
        //       "deep-purple",
        //       "purple",
        //       "pink",
        //       "red",
        //     ],
        //   },
        //   styles: {
        //     base: {
        //       container: {
        //         position: "relative",
        //         width: "w-full",
        //         minWidth: "min-w-[200px]",
        //       },
        //       input: {
        //         peer: "peer",
        //         width: "w-full",
        //         height: "h-full",
        //         bg: "bg-transparent",
        //         color: "text-blue-gray-700",
        //         fontFamily: "font-sans",
        //         fontWeight: "font-normal",
        //         outline: "outline outline-0 focus:outline-0",
        //         disabled: "disabled:bg-blue-gray-50 disabled:border-0",
        //         transition: "transition-all",
        //       },
        //       label: {
        //         display: "flex",
        //         width: "w-full",
        //         height: "h-full",
        //         userSelect: "select-none",
        //         pointerEvents: "pointer-events-none",
        //         position: "absolute",
        //         left: "left-0",
        //         fontWeight: "font-normal",
        //         textOverflow: "truncate",
        //         color: "peer-placeholder-shown:text-blue-gray-500",
        //         lineHeight: "leading-tight peer-focus:leading-tight",
        //         disabled:
        //           "peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500",
        //         transition: "transition-all",
        //       },
        //       icon: {
        //         display: "grid",
        //         placeItems: "place-items-center",
        //         position: "absolute",
        //         color: "text-blue-gray-500",
        //       },
        //       asterisk: {
        //         display: "inline-block",
        //         color: "text-red-500",
        //         ml: "ml-0.5",
        //       },
        //     },
        //     variants: {
        //       outlined: {
        //         base: {
        //           input: {
        //             borderWidth: "placeholder-shown:border",
        //             borderColor:
        //               "placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200",
        //             floated: {
        //               borderWidth: "border focus:border-2",
        //               borderColor: "border-t-transparent focus:border-t-transparent",
        //             },
        //           },
        //           inputWithIcon: {
        //             pr: "!pr-9",
        //           },
        //           icon: {
        //             top: "top-2/4",
        //             right: "right-3",
        //             transform: "-translate-y-2/4",
        //           },
        //           label: {
        //             position: "-top-1.5",
        //             fontSize: "peer-placeholder-shown:text-sm",
        //             floated: {
        //               fontSize: "text-[11px] peer-focus:text-[11px]",
        //             },
        //             before: {
        //               content: "before:content[' ']",
        //               display: "before:block",
        //               boxSizing: "before:box-border",
        //               width: "before:w-2.5",
        //               height: "before:h-1.5",
        //               mt: "before:mt-[6.5px]",
        //               mr: "before:mr-1",
        //               borderColor: "peer-placeholder-shown:before:border-transparent",
        //               borderRadius: "before:rounded-tl-md",
        //               floated: {
        //                 bt: "before:border-t peer-focus:before:border-t-2",
        //                 bl: "before:border-l peer-focus:before:border-l-2",
        //               },
        //               pointerEvents: "before:pointer-events-none",
        //               transition: "before:transition-all",
        //               disabled: "peer-disabled:before:border-transparent",
        //             },
        //             after: {
        //               content: "after:content[' ']",
        //               display: "after:block",
        //               flexGrow: "after:flex-grow",
        //               boxSizing: "after:box-border",
        //               width: "after:w-2.5",
        //               height: "after:h-1.5",
        //               mt: "after:mt-[6.5px]",
        //               ml: "after:ml-1",
        //               borderColor: "peer-placeholder-shown:after:border-transparent",
        //               borderRadius: "after:rounded-tr-md",
        //               floated: {
        //                 bt: "after:border-t peer-focus:after:border-t-2",
        //                 br: "after:border-r peer-focus:after:border-r-2",
        //               },
        //               pointerEvents: "after:pointer-events-none",
        //               transition: "after:transition-all",
        //               disabled: "peer-disabled:after:border-transparent",
        //             },
        //           },
        //         },
        //         sizes: {
        //           md: {
        //             container: {
        //               height: "h-10",
        //             },
        //             input: {
        //               fontSize: "text-sm",
        //               px: "px-3",
        //               py: "py-2.5",
        //               borderRadius: "rounded-[7px]",
        //             },
        //             label: {
        //               lineHeight: "peer-placeholder-shown:leading-[3.75]",
        //             },
        //             icon: {
        //               width: "w-5",
        //               height: "h-5",
        //             },
        //           },
        //           lg: {
        //             container: {
        //               height: "h-11",
        //             },
        //             input: {
        //               fontSize: "text-sm",
        //               px: "px-3",
        //               py: "py-3",
        //               borderRadius: "rounded-md",
        //             },
        //             label: {
        //               lineHeight: "peer-placeholder-shown:leading-[4.1]",
        //             },
        //             icon: {
        //               width: "w-6",
        //               height: "h-6",
        //             },
        //           },
        //         },
        //         colors: {
        //           input: {
        //             black: {
        //               color: "text-black",
        //               borderColor: "border-black",
        //               borderColorFocused: "focus:border-black",
        //             },
        //             white: {
        //               color: "text-white",
        //               borderColor: "border-white",
        //               borderColorFocused: "focus:border-white",
        //             },
        //             "blue-gray": {
        //               borderColor: "border-blue-gray-200",
        //               borderColorFocused: "focus:border-blue-gray-500",
        //             },
        //             gray: {
        //               borderColor: "border-blue-gray-200",
        //               borderColorFocused: "focus:border-gray-500",
        //             },
        //             brown: {
        //               borderColor: "border-blue-gray-200",
        //               borderColorFocused: "focus:border-brown-500",
        //             },
        //             "deep-orange": {
        //               borderColor: "border-blue-gray-200",
        //               borderColorFocused: "focus:border-deep-orange-500",
        //             },
        //             orange: {
        //               borderColor: "border-blue-gray-200",
        //               borderColorFocused: "focus:border-orange-500",
        //             },
        //             amber: {
        //               borderColor: "border-blue-gray-200",
        //               borderColorFocused: "focus:border-amber-500",
        //             },
        //             yellow: {
        //               borderColor: "border-blue-gray-200",
        //               borderColorFocused: "focus:border-yellow-500",
        //             },
        //             lime: {
        //               borderColor: "border-blue-gray-200",
        //               borderColorFocused: "focus:border-lime-500",
        //             },
        //             "light-green": {
        //               borderColor: "border-blue-gray-200",
        //               borderColorFocused: "focus:border-light-green-500",
        //             },
        //             green: {
        //               borderColor: "border-blue-gray-200",
        //               borderColorFocused: "focus:border-green-500",
        //             },
        //             teal: {
        //               borderColor: "border-blue-gray-200",
        //               borderColorFocused: "focus:border-teal-500",
        //             },
        //             cyan: {
        //               borderColor: "border-blue-gray-200",
        //               borderColorFocused: "focus:border-cyan-500",
        //             },
        //             "light-blue": {
        //               borderColor: "border-blue-gray-200",
        //               borderColorFocused: "focus:border-light-blue-500",
        //             },
        //             blue: {
        //               borderColor: "border-blue-gray-200",
        //               borderColorFocused: "focus:border-blue-500",
        //             },
        //             indigo: {
        //               borderColor: "border-blue-gray-200",
        //               borderColorFocused: "focus:border-indigo-500",
        //             },
        //             "deep-purple": {
        //               borderColor: "border-blue-gray-200",
        //               borderColorFocused: "focus:border-deep-purple-500",
        //             },
        //             purple: {
        //               borderColor: "border-blue-gray-200",
        //               borderColorFocused: "focus:border-purple-500",
        //             },
        //             pink: {
        //               borderColor: "border-blue-gray-200",
        //               borderColorFocused: "focus:border-pink-500",
        //             },
        //             red: {
        //               borderColor: "border-blue-gray-200",
        //               borderColorFocused: "focus:border-red-500",
        //             },
        //           },
        //           label: {
        //             black: {
        //               color: "!text-black peer-focus:text-black",
        //               before: "before:border-black peer-focus:before:!border-black",
        //               after: "after:border-black peer-focus:after:!border-black",
        //             },
        //             white: {
        //               color: "!text-white peer-focus:text-white",
        //               before: "before:border-white peer-focus:before:!border-white",
        //               after: "after:border-white peer-focus:after:!border-white",
        //             },
        //             "blue-gray": {
        //               color: "text-blue-gray-400 peer-focus:text-blue-gray-500",
        //               before: "before:border-blue-gray-200 peer-focus:before:!border-blue-gray-500",
        //               after: "after:border-blue-gray-200 peer-focus:after:!border-blue-gray-500",
        //             },
        //             gray: {
        //               color: "text-blue-gray-400 peer-focus:text-gray-500",
        //               before: "before:border-blue-gray-200 peer-focus:before:!border-gray-500",
        //               after: "after:border-blue-gray-200 peer-focus:after:!border-gray-500",
        //             },
        //             brown: {
        //               color: "text-blue-gray-400 peer-focus:text-brown-500",
        //               before: "before:border-blue-gray-200 peer-focus:before:!border-brown-500",
        //               after: "after:border-blue-gray-200 peer-focus:after:!border-brown-500",
        //             },
        //             "deep-orange": {
        //               color: "text-blue-gray-400 peer-focus:text-deep-orange-500",
        //               before: "before:border-blue-gray-200 peer-focus:before:!border-deep-orange-500",
        //               after: "after:border-blue-gray-200 peer-focus:after:!border-deep-orange-500",
        //             },
        //             orange: {
        //               color: "text-blue-gray-400 peer-focus:text-orange-500",
        //               before: "before:border-blue-gray-200 peer-focus:before:!border-orange-500",
        //               after: "after:border-blue-gray-200 peer-focus:after:!border-orange-500",
        //             },
        //             amber: {
        //               color: "text-blue-gray-400 peer-focus:text-amber-500",
        //               before: "before:border-blue-gray-200 peer-focus:before:!border-amber-500",
        //               after: "after:border-blue-gray-200 peer-focus:after:!border-amber-500",
        //             },
        //             yellow: {
        //               color: "text-blue-gray-400 peer-focus:text-yellow-500",
        //               before: "before:border-blue-gray-200 peer-focus:before:!border-yellow-500",
        //               after: "after:border-blue-gray-200 peer-focus:after:!border-yellow-500",
        //             },
        //             lime: {
        //               color: "text-blue-gray-400 peer-focus:text-lime-500",
        //               before: "before:border-blue-gray-200 peer-focus:before:!border-lime-500",
        //               after: "after:border-blue-gray-200 peer-focus:after:!border-lime-500",
        //             },
        //             "light-green": {
        //               color: "text-blue-gray-400 peer-focus:text-light-green-500",
        //               before: "before:border-blue-gray-200 peer-focus:before:!border-light-green-500",
        //               after: "after:border-blue-gray-200 peer-focus:after:!border-light-green-500",
        //             },
        //             green: {
        //               color: "text-blue-gray-400 peer-focus:text-green-500",
        //               before: "before:border-blue-gray-200 peer-focus:before:!border-green-500",
        //               after: "after:border-blue-gray-200 peer-focus:after:!border-green-500",
        //             },
        //             teal: {
        //               color: "text-blue-gray-400 peer-focus:text-teal-500",
        //               before: "before:border-blue-gray-200 peer-focus:before:!border-teal-500",
        //               after: "after:border-blue-gray-200 peer-focus:after:!border-teal-500",
        //             },
        //             cyan: {
        //               color: "text-blue-gray-400 peer-focus:text-cyan-500",
        //               before: "before:border-blue-gray-200 peer-focus:before:!border-cyan-500",
        //               after: "after:border-blue-gray-200 peer-focus:after:!border-cyan-500",
        //             },
        //             "light-blue": {
        //               color: "text-blue-gray-400 peer-focus:text-light-blue-500",
        //               before: "before:border-blue-gray-200 peer-focus:before:!border-light-blue-500",
        //               after: "after:border-blue-gray-200 peer-focus:after:!border-light-blue-500",
        //             },
        //             blue: {
        //               color: "text-blue-gray-400 peer-focus:text-blue-500",
        //               before: "before:border-blue-gray-200 peer-focus:before:!border-blue-500",
        //               after: "after:border-blue-gray-200 peer-focus:after:!border-blue-500",
        //             },
        //             indigo: {
        //               color: "text-blue-gray-400 peer-focus:text-indigo-500",
        //               before: "before:border-blue-gray-200 peer-focus:before:!border-indigo-500",
        //               after: "after:border-blue-gray-200 peer-focus:after:!border-indigo-500",
        //             },
        //             "deep-purple": {
        //               color: "text-blue-gray-400 peer-focus:text-deep-purple-500",
        //               before: "before:border-blue-gray-200 peer-focus:before:!border-deep-purple-500",
        //               after: "after:border-blue-gray-200 peer-focus:after:!border-deep-purple-500",
        //             },
        //             purple: {
        //               color: "text-blue-gray-400 peer-focus:text-purple-500",
        //               before: "before:border-blue-gray-200 peer-focus:before:!border-purple-500",
        //               after: "after:border-blue-gray-200 peer-focus:after:!border-purple-500",
        //             },
        //             pink: {
        //               color: "text-blue-gray-400 peer-focus:text-pink-500",
        //               before: "before:border-blue-gray-200 peer-focus:before:!border-pink-500",
        //               after: "after:border-blue-gray-200 peer-focus:after:!border-pink-500",
        //             },
        //             red: {
        //               color: "text-blue-gray-400 peer-focus:text-red-500",
        //               before: "before:border-blue-gray-200 peer-focus:before:!border-red-500",
        //               after: "after:border-blue-gray-200 peer-focus:after:!border-red-500",
        //             },
        //           },
        //         },
        //         error: {
        //           input: {
        //             borderColor:
        //               "border-red-500 placeholder-shown:border-t-red-500 placeholder-shown:border-red-500",
        //             borderColorFocused: "focus:border-red-500",
        //           },
        //           label: {
        //             color: "text-red-500 peer-focus:text-red-500 peer-placeholder-shown:text-red-500",
        //             before: "before:border-red-500 peer-focus:before:border-red-500",
        //             after: "after:border-red-500 peer-focus:after:border-red-500",
        //           },
        //         },
        //         success: {
        //           input: {
        //             borderColor:
        //               "border-green-500 placeholder-shown:border-t-green-500 placeholder-shown:border-green-500",
        //             borderColorFocused: "focus:border-green-500",
        //           },
        //           label: {
        //             color: "text-green-500 peer-focus:text-green-500 peer-placeholder-shown:text-green-500",
        //             before: "before:border-green-500 peer-focus:before:border-green-500",
        //             after: "after:border-green-500 peer-focus:after:border-green-500",
        //           },
        //         },
        //         shrink: {
        //           input: {
        //             borderTop: "!border-t-transparent",
        //           },
        //           label: {
        //             fontSize: "!text-[11px]",
        //             lineHeight: "!leading-tight",
        //             borderColor: "before:!border-blue-gray-200 after:!border-blue-gray-200",
        //           },
        //         },
        //       },
        //       standard: {
        //         base: {
        //           input: {
        //             borderWidth: "border-b",
        //             borderColor: "placeholder-shown:border-blue-gray-200",
        //           },
        //           inputWithIcon: {
        //             pr: "!pr-7",
        //           },
        //           icon: {
        //             top: "top-2/4",
        //             right: "right-0",
        //             transform: "-translate-y-1/4",
        //           },
        //           label: {
        //             position: "-top-1.5",
        //             fontSize: "peer-placeholder-shown:text-sm",
        //             floated: {
        //               fontSize: "text-[11px] peer-focus:text-[11px]",
        //             },
        //             after: {
        //               content: "after:content[' ']",
        //               display: "after:block",
        //               width: "after:w-full",
        //               position: "after:absolute",
        //               bottom: "after:-bottom-1.5",
        //               left: "left-0",
        //               borderWidth: "after:border-b-2",
        //               scale: "after:scale-x-0",
        //               floated: {
        //                 scale: "peer-focus:after:scale-x-100",
        //               },
        //               transition: "after:transition-transform after:duration-300",
        //             },
        //           },
        //         },
        //         sizes: {
        //           md: {
        //             container: {
        //               height: "h-11",
        //             },
        //             input: {
        //               fontSize: "text-sm",
        //               pt: "pt-4",
        //               pb: "pb-1.5",
        //             },
        //             label: {
        //               lineHeight: "peer-placeholder-shown:leading-[4.25]",
        //             },
        //             icon: {
        //               width: "w-5",
        //               height: "h-5",
        //             },
        //           },
        //           lg: {
        //             container: {
        //               height: "h-12",
        //             },
        //             input: {
        //               fontSize: "text-sm",
        //               px: "px-px",
        //               pt: "pt-5",
        //               pb: "pb-2",
        //             },
        //             label: {
        //               lineHeight: "peer-placeholder-shown:leading-[4.875]",
        //             },
        //             icon: {
        //               width: "w-6",
        //               height: "h-6",
        //             },
        //           },
        //         },
        //         colors: {
        //           input: {
        //             black: {
        //               color: "text-black",
        //               borderColor: "border-black",
        //               borderColorFocused: "focus:border-black",
        //             },
        //             white: {
        //               color: "text-white",
        //               borderColor: "border-white",
        //               borderColorFocused: "focus:border-white",
        //             },
        //             "blue-gray": {
        //               borderColor: "border-blue-gray-200",
        //               borderColorFocused: "focus:border-blue-gray-500",
        //             },
        //             gray: {
        //               borderColor: "border-blue-gray-200",
        //               borderColorFocused: "focus:border-gray-500",
        //             },
        //             brown: {
        //               borderColor: "border-blue-gray-200",
        //               borderColorFocused: "focus:border-brown-500",
        //             },
        //             "deep-orange": {
        //               borderColor: "border-blue-gray-200",
        //               borderColorFocused: "focus:border-deep-orange-500",
        //             },
        //             orange: {
        //               borderColor: "border-blue-gray-200",
        //               borderColorFocused: "focus:border-orange-500",
        //             },
        //             amber: {
        //               borderColor: "border-blue-gray-200",
        //               borderColorFocused: "focus:border-amber-500",
        //             },
        //             yellow: {
        //               borderColor: "border-blue-gray-200",
        //               borderColorFocused: "focus:border-yellow-500",
        //             },
        //             lime: {
        //               borderColor: "border-blue-gray-200",
        //               borderColorFocused: "focus:border-lime-500",
        //             },
        //             "light-green": {
        //               borderColor: "border-blue-gray-200",
        //               borderColorFocused: "focus:border-light-green-500",
        //             },
        //             green: {
        //               borderColor: "border-blue-gray-200",
        //               borderColorFocused: "focus:border-green-500",
        //             },
        //             teal: {
        //               borderColor: "border-blue-gray-200",
        //               borderColorFocused: "focus:border-teal-500",
        //             },
        //             cyan: {
        //               borderColor: "border-blue-gray-200",
        //               borderColorFocused: "focus:border-cyan-500",
        //             },
        //             "light-blue": {
        //               borderColor: "border-blue-gray-200",
        //               borderColorFocused: "focus:border-light-blue-500",
        //             },
        //             blue: {
        //               borderColor: "border-blue-gray-200",
        //               borderColorFocused: "focus:border-blue-500",
        //             },
        //             indigo: {
        //               borderColor: "border-blue-gray-200",
        //               borderColorFocused: "focus:border-indigo-500",
        //             },
        //             "deep-purple": {
        //               borderColor: "border-blue-gray-200",
        //               borderColorFocused: "focus:border-deep-purple-500",
        //             },
        //             purple: {
        //               borderColor: "border-blue-gray-200",
        //               borderColorFocused: "focus:border-purple-500",
        //             },
        //             pink: {
        //               borderColor: "border-blue-gray-200",
        //               borderColorFocused: "focus:border-pink-500",
        //             },
        //             red: {
        //               borderColor: "border-blue-gray-200",
        //               borderColorFocused: "focus:border-red-500",
        //             },
        //           },
        //           label: {
        //             black: {
        //               color: "!text-black peer-focus:text-black",
        //               after: "after:border-black peer-focus:after:border-black",
        //             },
        //             white: {
        //               color: "!text-white peer-focus:text-white",
        //               after: "after:border-white peer-focus:after:border-white",
        //             },
        //             "blue-gray": {
        //               color: "text-blue-gray-500 peer-focus:text-blue-gray-500",
        //               after: "after:border-blue-gray-500 peer-focus:after:border-blue-gray-500",
        //             },
        //             gray: {
        //               color: "text-blue-gray-500 peer-focus:text-gray-500",
        //               after: "after:border-gray-500 peer-focus:after:border-gray-500",
        //             },
        //             brown: {
        //               color: "text-blue-gray-500 peer-focus:text-brown-500",
        //               after: "after:border-brown-500 peer-focus:after:border-brown-500",
        //             },
        //             "deep-orange": {
        //               color: "text-blue-gray-500 peer-focus:text-deep-orange-500",
        //               after: "after:border-deep-orange-500 peer-focus:after:border-deep-orange-500",
        //             },
        //             orange: {
        //               color: "text-blue-gray-500 peer-focus:text-orange-500",
        //               after: "after:border-orange-500 peer-focus:after:border-orange-500",
        //             },
        //             amber: {
        //               color: "text-blue-gray-500 peer-focus:text-amber-500",
        //               after: "after:border-amber-500 peer-focus:after:border-amber-500",
        //             },
        //             yellow: {
        //               color: "text-blue-gray-500 peer-focus:text-yellow-500",
        //               after: "after:border-yellow-500 peer-focus:after:border-yellow-500",
        //             },
        //             lime: {
        //               color: "text-blue-gray-500 peer-focus:text-lime-500",
        //               after: "after:border-lime-500 peer-focus:after:border-lime-500",
        //             },
        //             "light-green": {
        //               color: "text-blue-gray-500 peer-focus:text-light-green-500",
        //               after: "after:border-light-green-500 peer-focus:after:border-light-green-500",
        //             },
        //             green: {
        //               color: "text-blue-gray-500 peer-focus:text-green-500",
        //               after: "after:border-green-500 peer-focus:after:border-green-500",
        //             },
        //             teal: {
        //               color: "text-blue-gray-500 peer-focus:text-teal-500",
        //               after: "after:border-teal-500 peer-focus:after:border-teal-500",
        //             },
        //             cyan: {
        //               color: "text-blue-gray-500 peer-focus:text-cyan-500",
        //               after: "after:border-cyan-500 peer-focus:after:border-cyan-500",
        //             },
        //             "light-blue": {
        //               color: "text-blue-gray-500 peer-focus:text-light-blue-500",
        //               after: "after:border-light-blue-500 peer-focus:after:border-light-blue-500",
        //             },
        //             blue: {
        //               color: "text-blue-gray-500 peer-focus:text-blue-500",
        //               after: "after:border-blue-500 peer-focus:after:border-blue-500",
        //             },
        //             indigo: {
        //               color: "text-blue-gray-500 peer-focus:text-indigo-500",
        //               after: "after:border-indigo-500 peer-focus:after:border-indigo-500",
        //             },
        //             "deep-purple": {
        //               color: "text-blue-gray-500 peer-focus:text-deep-purple-500",
        //               after: "after:border-deep-purple-500 peer-focus:after:border-deep-purple-500",
        //             },
        //             purple: {
        //               color: "text-blue-gray-500 peer-focus:text-purple-500",
        //               after: "after:border-purple-500 peer-focus:after:border-purple-500",
        //             },
        //             pink: {
        //               color: "text-blue-gray-500 peer-focus:text-pink-500",
        //               after: "after:border-pink-500 peer-focus:after:border-pink-500",
        //             },
        //             red: {
        //               color: "text-blue-gray-500 peer-focus:text-red-500",
        //               after: "after:border-red-500 peer-focus:after:border-red-500",
        //             },
        //           },
        //         },
        //         error: {
        //           input: {
        //             borderColor: "border-red-500 placeholder-shown:border-red-500",
        //             borderColorFocused: "focus:border-red-500",
        //           },
        //           label: {
        //             color: "text-red-500 peer-focus:text-red-500 peer-placeholder-shown:text-red-500",
        //             after: "after:border-red-500 peer-focus:after:border-red-500",
        //           },
        //         },
        //         success: {
        //           input: {
        //             borderColor: "border-green-500 placeholder-shown:border-green-500",
        //             borderColorFocused: "focus:border-green-500",
        //           },
        //           label: {
        //             color: "text-green-500 peer-focus:text-green-500 peer-placeholder-shown:text-green-500",
        //             after: "after:border-green-500 peer-focus:after:border-green-500",
        //           },
        //         },
        //         shrink: {
        //           input: {},
        //           label: {
        //             fontSize: "!text-[11px]",
        //             lineHeight: "!leading-tight",
        //           },
        //         },
        //       },
        //       static: {
        //         base: {
        //           input: {
        //             borderWidth: "border-b",
        //             borderColor: "placeholder-shown:border-blue-gray-200",
        //           },
        //           inputWithIcon: {
        //             pr: "!pr-7",
        //           },
        //           icon: {
        //             top: "top-2/4",
        //             right: "right-0",
        //             transform: "-translate-y-1/4",
        //           },
        //           label: {
        //             position: "-top-2.5",
        //             fontSize: "text-sm peer-focus:text-sm",
        //             after: {
        //               content: "after:content[' ']",
        //               display: "after:block",
        //               width: "after:w-full",
        //               position: "after:absolute",
        //               bottom: "after:-bottom-2.5",
        //               left: "left-0",
        //               borderWidth: "after:border-b-2",
        //               scale: "after:scale-x-0",
        //               floated: {
        //                 scale: "peer-focus:after:scale-x-100",
        //               },
        //               transition: "after:transition-transform after:duration-300",
        //             },
        //           },
        //         },
        //         sizes: {
        //           md: {
        //             container: {
        //               height: "h-11",
        //             },
        //             input: {
        //               fontSize: "text-sm",
        //               pt: "pt-4",
        //               pb: "pb-1.5",
        //             },
        //             label: {
        //               lineHeight: "peer-placeholder-shown:leading-tight",
        //             },
        //             icon: {
        //               width: "w-5",
        //               height: "h-5",
        //             },
        //           },
        //           lg: {
        //             container: {
        //               height: "h-12",
        //             },
        //             input: {
        //               fontSize: "text-sm",
        //               px: "px-px",
        //               pt: "pt-5",
        //               pb: "pb-2",
        //             },
        //             label: {
        //               lineHeight: "peer-placeholder-shown:leading-tight",
        //             },
        //             icon: {
        //               width: "w-6",
        //               height: "h-6",
        //             },
        //           },
        //         },
        //         colors: {
        //           input: {
        //             black: {
        //               color: "text-black",
        //               borderColor: "border-black",
        //               borderColorFocused: "focus:border-black",
        //             },
        //             white: {
        //               color: "text-white",
        //               borderColor: "border-white",
        //               borderColorFocused: "focus:border-white",
        //             },
        //             "blue-gray": {
        //               borderColor: "border-blue-gray-200",
        //               borderColorFocused: "focus:border-blue-gray-500",
        //             },
        //             gray: {
        //               borderColor: "border-blue-gray-200",
        //               borderColorFocused: "focus:border-gray-500",
        //             },
        //             brown: {
        //               borderColor: "border-blue-gray-200",
        //               borderColorFocused: "focus:border-brown-500",
        //             },
        //             "deep-orange": {
        //               borderColor: "border-blue-gray-200",
        //               borderColorFocused: "focus:border-deep-orange-500",
        //             },
        //             orange: {
        //               borderColor: "border-blue-gray-200",
        //               borderColorFocused: "focus:border-orange-500",
        //             },
        //             amber: {
        //               borderColor: "border-blue-gray-200",
        //               borderColorFocused: "focus:border-amber-500",
        //             },
        //             yellow: {
        //               borderColor: "border-blue-gray-200",
        //               borderColorFocused: "focus:border-yellow-500",
        //             },
        //             lime: {
        //               borderColor: "border-blue-gray-200",
        //               borderColorFocused: "focus:border-lime-500",
        //             },
        //             "light-green": {
        //               borderColor: "border-blue-gray-200",
        //               borderColorFocused: "focus:border-light-green-500",
        //             },
        //             green: {
        //               borderColor: "border-blue-gray-200",
        //               borderColorFocused: "focus:border-green-500",
        //             },
        //             teal: {
        //               borderColor: "border-blue-gray-200",
        //               borderColorFocused: "focus:border-teal-500",
        //             },
        //             cyan: {
        //               borderColor: "border-blue-gray-200",
        //               borderColorFocused: "focus:border-cyan-500",
        //             },
        //             "light-blue": {
        //               borderColor: "border-blue-gray-200",
        //               borderColorFocused: "focus:border-light-blue-500",
        //             },
        //             blue: {
        //               borderColor: "border-blue-gray-200",
        //               borderColorFocused: "focus:border-blue-500",
        //             },
        //             indigo: {
        //               borderColor: "border-blue-gray-200",
        //               borderColorFocused: "focus:border-indigo-500",
        //             },
        //             "deep-purple": {
        //               borderColor: "border-blue-gray-200",
        //               borderColorFocused: "focus:border-deep-purple-500",
        //             },
        //             purple: {
        //               borderColor: "border-blue-gray-200",
        //               borderColorFocused: "focus:border-purple-500",
        //             },
        //             pink: {
        //               borderColor: "border-blue-gray-200",
        //               borderColorFocused: "focus:border-pink-500",
        //             },
        //             red: {
        //               borderColor: "border-blue-gray-200",
        //               borderColorFocused: "focus:border-red-500",
        //             },
        //           },
        //           label: {
        //             black: {
        //               color: "!text-black peer-focus:black",
        //               after: "after:border-black peer-focus:after:border-black",
        //             },
        //             white: {
        //               color: "!text-white peer-focus:white",
        //               after: "after:border-white peer-focus:after:border-white",
        //             },
        //             "blue-gray": {
        //               color: "text-blue-gray-500 peer-focus:text-blue-gray-500",
        //               after: "after:border-blue-gray-500 peer-focus:after:border-blue-gray-500",
        //             },
        //             gray: {
        //               color: "text-blue-gray-500 peer-focus:text-gray-500",
        //               after: "after:border-gray-500 peer-focus:after:border-gray-500",
        //             },
        //             brown: {
        //               color: "text-blue-gray-500 peer-focus:text-brown-500",
        //               after: "after:border-brown-500 peer-focus:after:border-brown-500",
        //             },
        //             "deep-orange": {
        //               color: "text-blue-gray-500 peer-focus:text-deep-orange-500",
        //               after: "after:border-deep-orange-500 peer-focus:after:border-deep-orange-500",
        //             },
        //             orange: {
        //               color: "text-blue-gray-500 peer-focus:text-orange-500",
        //               after: "after:border-orange-500 peer-focus:after:border-orange-500",
        //             },
        //             amber: {
        //               color: "text-blue-gray-500 peer-focus:text-amber-500",
        //               after: "after:border-amber-500 peer-focus:after:border-amber-500",
        //             },
        //             yellow: {
        //               color: "text-blue-gray-500 peer-focus:text-yellow-500",
        //               after: "after:border-yellow-500 peer-focus:after:border-yellow-500",
        //             },
        //             lime: {
        //               color: "text-blue-gray-500 peer-focus:text-lime-500",
        //               after: "after:border-lime-500 peer-focus:after:border-lime-500",
        //             },
        //             "light-green": {
        //               color: "text-blue-gray-500 peer-focus:text-light-green-500",
        //               after: "after:border-light-green-500 peer-focus:after:border-light-green-500",
        //             },
        //             green: {
        //               color: "text-blue-gray-500 peer-focus:text-green-500",
        //               after: "after:border-green-500 peer-focus:after:border-green-500",
        //             },
        //             teal: {
        //               color: "text-blue-gray-500 peer-focus:text-teal-500",
        //               after: "after:border-teal-500 peer-focus:after:border-teal-500",
        //             },
        //             cyan: {
        //               color: "text-blue-gray-500 peer-focus:text-cyan-500",
        //               after: "after:border-cyan-500 peer-focus:after:border-cyan-500",
        //             },
        //             "light-blue": {
        //               color: "text-blue-gray-500 peer-focus:text-light-blue-500",
        //               after: "after:border-light-blue-500 peer-focus:after:border-light-blue-500",
        //             },
        //             blue: {
        //               color: "text-blue-gray-500 peer-focus:text-blue-500",
        //               after: "after:border-blue-500 peer-focus:after:border-blue-500",
        //             },
        //             indigo: {
        //               color: "text-blue-gray-500 peer-focus:text-indigo-500",
        //               after: "after:border-indigo-500 peer-focus:after:border-indigo-500",
        //             },
        //             "deep-purple": {
        //               color: "text-blue-gray-500 peer-focus:text-deep-purple-500",
        //               after: "after:border-deep-purple-500 peer-focus:after:border-deep-purple-500",
        //             },
        //             purple: {
        //               color: "text-blue-gray-500 peer-focus:text-purple-500",
        //               after: "after:border-purple-500 peer-focus:after:border-purple-500",
        //             },
        //             pink: {
        //               color: "text-blue-gray-500 peer-focus:text-pink-500",
        //               after: "after:border-pink-500 peer-focus:after:border-pink-500",
        //             },
        //             red: {
        //               color: "text-blue-gray-500 peer-focus:text-red-500",
        //               after: "after:border-red-500 peer-focus:after:border-red-500",
        //             },
        //           },
        //         },
        //         error: {
        //           input: {
        //             borderColor: "border-red-500 placeholder-shown:border-red-500",
        //             borderColorFocused: "focus:border-red-500",
        //           },
        //           label: {
        //             color: "text-red-500 peer-focus:text-red-500 peer-placeholder-shown:text-red-500",
        //             after: "after:border-red-500 peer-focus:after:border-red-500",
        //           },
        //         },
        //         success: {
        //           input: {
        //             borderColor: "border-green-500 placeholder-shown:border-green-500",
        //             borderColorFocused: "focus:border-green-500",
        //           },
        //           label: {
        //             color: "text-green-500 peer-focus:text-green-500 peer-placeholder-shown:text-green-500",
        //             after: "after:border-green-500 peer-focus:after:border-green-500",
        //           },
        //         },
        //         shrink: {
        //           input: {},
        //           label: {},
        //         },
        //       },
        //     },
        //   },
        // },
      }}
    >
      {children}
    </ThemeProvider>
  );
};

export default ThemeWrapper;

"use client";
import { Spinner } from "@material-tailwind/react";

const LoadingDots = ({ color = "#000", size = "5" }) => {
  return (
    // <span className={styles.loading}>
    //   <span style={{ backgroundColor: color, width: size, height: size }} />
    //   <span style={{ backgroundColor: color, width: size, height: size }} />
    //   <span style={{ backgroundColor: color, width: size, height: size }} />
    // </span>
    <Spinner className={`h-${size} w-${size}`} />
  );
};

export default LoadingDots;

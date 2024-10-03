"use client";
import { Spinner } from "@material-tailwind/react";

const LoadingDots = ({ color = false, size = "5" }) => {
  return (
    // <span className={styles.loading}>
    //   <span style={{ backgroundColor: color, width: size, height: size }} />
    //   <span style={{ backgroundColor: color, width: size, height: size }} />
    //   <span style={{ backgroundColor: color, width: size, height: size }} />
    // </span>
    <div
      className={`inline-block h-${size} w-${size} animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] ${
        color ? color : "text-primary-200"
      } motion-reduce:animate-[spin_1.5s_linear_infinite]`}
      role="status"
    >
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        Loading...
      </span>
    </div>
  );
};

export default LoadingDots;

import NextTopLoader from "nextjs-toploader";
import React from "react";

export default function LoaderRoute() {
  return (
    <NextTopLoader
      color="#C96"
      height={4}
      showSpinner={false}
      // easing="ease"
      // shadow="0 0 10px #2299DD,0 0 5px #2299DD"
      // template='<div class="bar" role="bar"><div class="peg"></div></div>
      // <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
    />
  );
}

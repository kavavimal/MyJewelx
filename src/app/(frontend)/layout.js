import { Suspense } from "react";
import { getCategories } from "../actions/category";
import Footer from "./components/Footer";
import FrontendHeader from "./components/FrontendHeader";
import "../globals.css";
import { getProducts } from "../actions/product";

export default async function FrontendLayout({ children }) {
  const categories = await getCategories();
  const products = await getProducts();
  return (
    <Suspense
      fallback={
        <div className="h-screen w-full flex items-center justify-center z-40">
          <div
            className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-primary-200 motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        </div>
      }
    >
      <FrontendHeader categories={categories} products={products} />
      {children}
      <Footer />
    </Suspense>
  );
}

"useClient";

import FilterProduct from "./FilterProduct";
import ProductCard from "./ProductCard";

const ShopComponent = ({ products }) => {
  return (
    <section className="container">
      <h1>Shop</h1>
      <div className="flex items-start">
        <div className="w-2/12">
          <FilterProduct />
        </div>
        <div className="flex-1 flex flex-wrap">
          {products.map((product) => (
            <ProductCard key={product.product_id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopComponent;

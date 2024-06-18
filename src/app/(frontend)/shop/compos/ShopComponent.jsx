"useClient";

const { default: ProductCard } = require("./ProductCard");

const ShopComponent = ({ products }) => {
  return (
    <div>
      <h1>Shop</h1>
      <div className="flex flex-wrap">
        {products.map((product) => (
          <ProductCard key={product.product_id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ShopComponent;

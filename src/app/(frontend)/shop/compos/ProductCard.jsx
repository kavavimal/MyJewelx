import Image from "next/image";
import Engagement from "./Engagement";
import Link from "next/link";

const ProductCard = ({ product }) => {
  return (
    <div className="w-[245px] font-emirates border rounded m-2 p-3">
      <div>
        <Link href={`/product/${product?.product_id}`}>
          <Image
            src={product?.variations[0]?.image[0].path}
            alt="image for design"
            width="300"
            height="300"
          />
        </Link>
      </div>
      <div className="mt-2 text-base">
        <Link
          href={`/product/${product?.product_id}`}
          className="font-normal leading-[18.34px] text-left"
        >
          {product?.product_name}
        </Link>
        <div className="flex justify-between text-sm font-light leading-[18px] text-left text-gray-600 my-1">
          <p>some specs(grade)</p>
          <p>10 gram</p>
        </div>
        <Engagement variation={product?.variations[0]} />
        {product?.user && (
          <p className="font-light leading-[19.6px] text-left my-1">
            Seller: {product?.user?.firstName + " " + product?.user?.lastName}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;

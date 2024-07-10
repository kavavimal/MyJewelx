import Image from "next/image";
import Engagement from "./Engagement";
import Link from "next/link";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { truncate } from "@/utils/helper";

const ProductCard = ({ product }) => {
  return (
    <>
      {/* <div className="w-auto font-emirates border rounded m-2">
        <div>
          <Link href={`/product/${product?.product_id}`}>
            <Image
              src={
                product?.variations &&
                product?.variations.length > 0 &&
                product?.variations[0]?.image[0].path
              }
              alt="image for design"
              width="300"
              height="300"
              className="w-[200px] h-[200px] object-cover rounded"
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
          <Engagement
            product_id={product.product_id}
            variation={
              product?.variations &&
              product?.variations.length > 0 &&
              product?.variations[0]
            }
          />
          {product?.user && (
            <p className="font-light leading-[19.6px] text-left my-1">
              Seller: {product?.user?.firstName + " " + product?.user?.lastName}
            </p>
          )}
        </div>
      </div> */}
      <Link
        href={`/product/${product?.product_id}`}
        className="font-normal leading-[18.34px] text-left"
      >
        <Card className="overflow-hidden">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 rounded-none"
          >
            <div className="w-[245px] h-[192px] overflow-hidden">
              <Image
                src={
                  product?.variations &&
                  product?.variations.length > 0 &&
                  product?.variations[0]?.image[0]?.path
                    ? product?.variations[0]?.image[0]?.path
                    : "/assets/images/image.png"
                }
                alt="image for design"
                width={300}
                height={300}
                className="object-cover w-full h-full hover:scale-110 transition-all duration-300"
              />
            </div>
          </CardHeader>
          <CardBody>
            <div className="flex flex-col gap-1.5">
              <p className="text-black text-sm">
                {truncate(product?.product_name, 25)}
              </p>
              <div className="flex items-center justify-between">
                <span className="font-light text-xs">AED 5000 - 8000</span>
                <span className="font-light text-xs">10 gram</span>
              </div>
              <Engagement
                product_id={product.product_id}
                variation={
                  product?.variations &&
                  product?.variations.length > 0 &&
                  product?.variations[0]
                }
              />
              {product?.user && (
                <p lassName="text-black text-sm">
                  Seller:{" "}
                  {product?.user?.firstName + " " + product?.user?.lastName}
                </p>
              )}
            </div>
          </CardBody>
        </Card>
      </Link>
    </>
  );
};

export default ProductCard;

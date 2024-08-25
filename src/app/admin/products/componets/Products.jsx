"use client";
import {
  updateProductFeaturedStatus,
  updateProductStatus,
} from "@/actions/product";
import { ADMIN_ID, theme, VENDOR_ID } from "@/utils/constants";
import { showToast } from "@/utils/helper";
import {
  Button,
  IconButton,
  Input,
  Select,
  Option,
  Switch,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Badge,
} from "@material-tailwind/react";
import Image from "next/image";
import StarRatings from "@/components/frontend/StarRatings";
import { AcountType, ProductStatus } from "@prisma/client";
import dynamic from "next/dynamic";
import Link from "next/link";
import DeleteProduct from "./DeleteProduct";
import { useEffect, useState } from "react";
import { useUserStore } from "@/contexts/userStore";
import moment from "moment";
const DataTable = dynamic(() => import("react-data-table-component"), {
  ssr: false,
});

const Products = ({ products, attributes, karats }) => {
  const [filterProducts, setFilterProducts] = useState(products);
  const [material, setMaterial] = useState("");
  const [karat, setKarat] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchItem, setSearchItem] = useState(products);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [productReviews, setProductReviews] = useState([]);
  const user = useUserStore((state) => state.user);
  console.log(user);
  const handleOpenDialog = async (product) => {
    console.log(product);
    setSelectedProduct(product);
    setProductReviews(product.reviews);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedProduct(null);
    setProductReviews([]);
  };

  useEffect(() => {
    // if (typeof window !== "undefined") {
    localStorage.setItem("activeStep", 0);
    // }
  }, []);

  const columns = [
    {
      name: "Images",
      selector: (row) => (
        <>
          {console.log(row)}

          {row?.variations?.length > 0 &&
          row?.variations[0]?.image?.length > 0 &&
          row?.variations[0]?.image[0]?.path ? (
            <Image
              src={row?.variations[0]?.image[0]?.path}
              width={50}
              height={50}
              alt="product image"
            />
          ) : (
            <div className="relative cursor-pointer inline-flex items-center justify-center w-10 h-10 select-none overflow-hidden hover:opacity-80 bg-primary-200/25 rounded-full dark:bg-gray-600">
              <span className="font-medium text-black uppercase">{`${row?.product_name[0]}`}</span>
            </div>
          )}
        </>
      ),
    },
    {
      name: "Product Name",
      selector: (row) => row?.product_name,
      sortable: true,
    },
    user.role.role_name === AcountType.ADMIN && {
      name: "Created By",
      selector: (row) => {
        if (row?.user?.role_id === ADMIN_ID) {
          return `${row?.user?.firstName} ${row?.user?.lastName} (ADMIN)`;
        } else if (row?.user?.role_id === VENDOR_ID) {
          return `${
            row?.user?.vendor?.store_name ??
            row?.user?.firstName + " " + row?.user?.lastName
          } (VENDOR)`;
        }
      },
      sortable: true,
    },
    user.role.role_name === AcountType.ADMIN && {
      name: "Status",
      cell: (row) => (
        <>
          <div className="flex items-center grow">
            <Switch
              checked={row.status === ProductStatus.PUBLISHED}
              label={row.status}
              ripple={false}
              onChange={() =>
                updateProductStatus(
                  row.product_id,
                  row.status === ProductStatus.PUBLISHED
                    ? ProductStatus.DRAFT
                    : ProductStatus.PUBLISHED
                )
              }
            />
          </div>
        </>
      ),
    },
    // {
    //   name: "Featured",
    //   cell: (row) => (
    //     <>
    //       <div className="flex items-center grow">
    //         <Switch
    //           checked={row.featured === true}
    //           // label={"Featured"}
    //           ripple={false}
    //           onChange={async () => {
    //             let rs = await updateProductFeaturedStatus(
    //               row.product_id,
    //               !row.featured
    //             );
    //             if (rs.success) {
    //               showToast({
    //                 message: "Product Featured Status updated",
    //               });
    //             }
    //           }}
    //         />
    //       </div>
    //     </>
    //   ),
    // },
    {
      name: "Date",
      selector: (row) => moment(row?.createdAt).format("DD/MM/YYYY"),
    },
    {
      name: "Actions",
      cell: (row) => (
        <>
          {/* {console.log(row)} */}

          <Badge
            overlap="circular"
            placement="top-end"
            content={row.reviews?.length}
            className={`text-[10px] !min-h-2 !min-w-4 p-0 ${
              row.reviews?.length > 0 ? "" : "hidden"
            } `}
          >
            <IconButton
              className="rounded-full"
              color="orange"
              onClick={() => handleOpenDialog(row)}
              size="sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="size-5"
              >
                <path
                  fill="currentColor"
                  d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2M6 14v-2.47l6.88-6.88c.2-.2.51-.2.71 0l1.77 1.77c.2.2.2.51 0 .71L8.47 14zm12 0h-7.5l2-2H18z"
                ></path>
              </svg>
            </IconButton>
          </Badge>

          {/*           
          <Button
            className="rounded-full py-[6px] !text-[10px] px-2"
            variant="gradient"
            color="orange"
            onClick={() => handleOpenDialog(row)}
          >
            Reviews
          </Button> */}
          <Link href={`/admin/products/edit/${row.product_id}`}>
            <IconButton variant="text" className="rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={18}
                height={18}
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M20.71 7.04c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.37-.39-1.02-.39-1.41 0l-1.84 1.83l3.75 3.75M3 17.25V21h3.75L17.81 9.93l-3.75-3.75z"
                ></path>
              </svg>
            </IconButton>
          </Link>
          <DeleteProduct product_id={row?.product_id} />
        </>
      ),
    },
  ];

  const handleSelectChange = (value) => {
    setMaterial(value);
    handleselectfilter(value);
  };

  const handleselectfilter = (value) => {
    const filtered = products.filter((product) => {
      const { ProductAttributeValue } = product;

      const materialMatch = ProductAttributeValue.some(
        (attrValue) =>
          attrValue.attribute.name.toLowerCase() === "material" &&
          attrValue.attributeValue.name.toLowerCase() === value.toLowerCase()
      );

      const karatMatch = ProductAttributeValue.some(
        (attrValue) =>
          attrValue.attribute.name.toLowerCase() === "gold karat" &&
          attrValue.attributeValue.name.toLowerCase() === value.toLowerCase()
      );

      return materialMatch || karatMatch;
    });
    setFilterProducts(filtered);
    setSearchItem(filtered);
  };

  const handleKaratChange = (value) => {
    setKarat(value);
    handleselectfilter(value);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    const value = e.target.value.toLowerCase();
    const filtered = searchItem.filter((product) => {
      const { product_name, user } = product;
      const { firstName, lastName, vendor } = user || {};
      const { variations } = product || {};
      const vendorStoreName = vendor?.store_name?.toLowerCase() || "";
      const variationsMatch = variations?.some((variation) =>
        variation.sku?.toLowerCase().includes(value)
      );
      return (
        product_name.toLowerCase().includes(value) ||
        (firstName && firstName.toLowerCase().includes(value)) ||
        (lastName && lastName.toLowerCase().includes(value)) ||
        variationsMatch ||
        vendorStoreName.includes(value)
      );
    });
    setFilterProducts(filtered);
  };

  const customStyles = {
    cells: {
      style: {
        fontSize: "15px",
      },
    },
  };

  const selectValues = () => {
    const values = [];

    attributes.forEach((attribute) => {
      attribute.values.forEach((value) => {
        values.push(value.name);
      });
    });
    return values;
  };

  const selectKarats = () => {
    const values = [];

    karats.forEach((karat) => {
      karat.values.forEach((value) => {
        values.push(value.name);
      });
    });
    return values;
  };

  const handleCancel = () => {
    setMaterial("");
    setKarat("");
    setFilterProducts(products);
    setSearchItem(products);
    setSearchQuery("");
  };

  return (
    <>
      <div className="flex justify-between items-center btn btn-primary mb-5">
        <h2 className="text-2xl font-semibold">Products</h2>
        <div className="flex gap-3 items-end">
          <Select
            label="Select Material"
            containerProps={{ className: "!w-[150px]" }}
            name="material"
            value={material}
            onChange={handleSelectChange}
          >
            {selectValues().map((value) => (
              <Option key={value} value={value}>
                {value}
              </Option>
            ))}
          </Select>
          <div className={`${material === "Gold" ? "block" : "hidden"}`}>
            <Select
              label="Select Karat"
              containerProps={{ className: "!w-[150px]" }}
              name="Karat"
              value={karat}
              onChange={handleKaratChange}
            >
              {selectKarats().map((value) => (
                <Option key={value} value={value}>
                  {value}
                </Option>
              ))}
            </Select>
          </div>
          <Input
            label="Search"
            placeholder="Search Products"
            value={searchQuery}
            onChange={handleSearch}
            containerProps={{ className: "!w-[300px]" }}
          />
          <Button color="red" onClick={handleCancel}>
            cancel
          </Button>
          <Link
            href="/admin/products/add"
            className="flex justify-end btn btn-primary"
          >
            <Button
              size="md"
              className="flex items-center gap-2 px-4 py-2 hover:shadow-none hover:opacity-90 shadow-none rounded bg-primary-200 text-black font-emirates"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z"
                ></path>
              </svg>
              Add New Products
            </Button>
          </Link>
        </div>
      </div>
      <div className="rounded-lg shadow border bg-white border-dark-200 py-5">
        <DataTable
          striped
          columns={columns}
          data={filterProducts}
          highlightOnHover
          pagination
          pointerOnHover
          customStyles={customStyles}
        />
      </div>

      {/* Product Reviews Dialog */}
      {selectedProduct && (
        <Dialog open={isDialogOpen} handler={handleCloseDialog} size="lg">
          <DialogHeader>{selectedProduct.product_name} Reviews</DialogHeader>
          <DialogBody className="h-[42rem] overflow-auto" divider>
            <section className="py-2">
              <h4 className="text-2xl font-semibold mb-5">Product Reviews</h4>
              {productReviews?.length > 0 ? (
                productReviews.map((review, index) => (
                  <div
                    key={index}
                    className="border p-5 rounded-sm bg-white mb-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-[13px]">
                        <div className="bg-clip-border overflow-hidden rounded-full flex w-[37px]">
                          <Image
                            height={50}
                            width={50}
                            src="/assets/images/avatar.jpg"
                            size="sm"
                            className="h-[37px] w-full"
                            alt=""
                          />
                        </div>
                        <div className="flex flex-col gap-[.5px]">
                          <h4 className="text-lg font-medium text-secondary-100">
                            {review.fromUser?.firstName}{" "}
                            {review.fromUser?.lastName}
                          </h4>
                          <StarRatings starRatings={review.rating} />
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-secondary-100">
                        <div>
                          on {moment(review.createdAt.toString()).fromNow()}
                        </div>
                      </div>
                    </div>
                    <p className="text-secondary-100 leading-6 text-sm mt-[6px]">
                      {review.text}
                    </p>
                    <div className="flex items-center gap-[15px] my-[15px]">
                      {review?.images?.length > 0 &&
                        review?.images.map((imageItem, index) => (
                          <Image
                            key={index}
                            src={imageItem?.path}
                            width={100}
                            height={100}
                            alt=""
                            className="w-[85px] h-[81px] border border-blueGray-400"
                          />
                        ))}
                    </div>
                  </div>
                ))
              ) : (
                <p>No reviews available for this product.</p>
              )}
            </section>
          </DialogBody>
          <DialogFooter>
            <Button variant="text" color="red" onClick={handleCloseDialog}>
              Close
            </Button>
          </DialogFooter>
        </Dialog>
      )}
    </>
  );
};

export default Products;

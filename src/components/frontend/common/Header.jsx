"use client";
import Image from "next/image";
import Link from "next/link";
import CartSidebar from "../cart/CartSidebar";
import ProfileMenu from "../ProfileMenu";
import HeaderWishlistIcon from "../HeaderWishlistIcon";
import {
  Button,
  IconButton,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { useState } from "react";
import { truncate } from "@/utils/helper";

const MenuLinks = [
  // {
  //   label: (
  //     <svg
  //       width="26"
  //       height="22"
  //       viewBox="0 0 26 22"
  //       fill="none"
  //       xmlns="http://www.w3.org/2000/svg"
  //     >
  //       <path
  //         d="M18.4688 0.375C16.2102 0.375 14.2327 1.34625 13 2.98797C11.7673 1.34625 9.78984 0.375 7.53125 0.375C5.73337 0.377026 4.00971 1.09213 2.73842 2.36342C1.46713 3.63471 0.752026 5.35837 0.75 7.15625C0.75 14.8125 12.102 21.0097 12.5855 21.2656C12.7129 21.3342 12.8553 21.37 13 21.37C13.1447 21.37 13.2871 21.3342 13.4145 21.2656C13.898 21.0097 25.25 14.8125 25.25 7.15625C25.248 5.35837 24.5329 3.63471 23.2616 2.36342C21.9903 1.09213 20.2666 0.377026 18.4688 0.375ZM13 19.4937C11.0028 18.33 2.5 13.0286 2.5 7.15625C2.50174 5.82241 3.03237 4.5437 3.97554 3.60054C4.9187 2.65737 6.19741 2.12674 7.53125 2.125C9.65859 2.125 11.4447 3.25813 12.1906 5.07812C12.2565 5.23861 12.3687 5.37587 12.5128 5.47248C12.6569 5.56908 12.8265 5.62065 13 5.62065C13.1735 5.62065 13.3431 5.56908 13.4872 5.47248C13.6313 5.37587 13.7435 5.23861 13.8094 5.07812C14.5553 3.25484 16.3414 2.125 18.4688 2.125C19.8026 2.12674 21.0813 2.65737 22.0245 3.60054C22.9676 4.5437 23.4983 5.82241 23.5 7.15625C23.5 13.0198 14.995 18.3289 13 19.4937Z"
  //         fill="#1A1A1A"
  //       />
  //     </svg>
  //   ),
  //   link: "/",
  // },
];
export default function FrontendHeader({ categories }) {
  const [category, setCategory] = useState(null);
  return (
    <>
      <div className="top-bar bg-black py-2">
        <div className="container">
          <div className="flex items-center justify-between">
            <div>
              <Link
                href="mailto:contact@myjewlex.com"
                className="flex items-center gap-2 text-white text-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.2em"
                  height="1.2em"
                  viewBox="0 0 36 36"
                >
                  <path
                    fill="currentColor"
                    d="M32.33 6a2 2 0 0 0-.41 0h-28a2 2 0 0 0-.53.08l14.45 14.39Z"
                    className="clr-i-solid clr-i-solid-path-1"
                  ></path>
                  <path
                    fill="currentColor"
                    d="m33.81 7.39l-14.56 14.5a2 2 0 0 1-2.82 0L2 7.5a2 2 0 0 0-.07.5v20a2 2 0 0 0 2 2h28a2 2 0 0 0 2-2V8a2 2 0 0 0-.12-.61M5.3 28H3.91v-1.43l7.27-7.21l1.41 1.41Zm26.61 0h-1.4l-7.29-7.23l1.41-1.41l7.27 7.21Z"
                    className="clr-i-solid clr-i-solid-path-2"
                  ></path>
                  <path fill="none" d="M0 0h36v36H0z"></path>
                </svg>
                contact@myjewlex.com
              </Link>
            </div>
            <div>
              <label htmlFor="" className="text-white text-sm">
                Your Dream Jewelry, Realized by my Jewlex
              </label>
            </div>
            <div>
              <Link
                href="tel:+917555176153"
                className="flex items-center gap-2 text-white text-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.2em"
                  height="1.2em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24c1.12.37 2.33.57 3.57.57c.55 0 1 .45 1 1V20c0 .55-.45 1-1 1c-9.39 0-17-7.61-17-17c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1c0 1.25.2 2.45.57 3.57c.11.35.03.74-.25 1.02z"
                  ></path>
                </svg>
                +91 755 517 6153
              </Link>
            </div>
          </div>
        </div>
      </div>
      <nav className="bg-white border-gray-200 dark:bg-gray-900 shadow-xxs sticky top-0 z-20">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto pt-5">
          <div>
            <Link
              href="/"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <Image
                width={160}
                height={160}
                src="/assets/images/logo.svg"
                alt="logo"
              />
            </Link>
          </div>
          <div>
            <div className="flex items-center justify-center">
              <Menu placement="bottom-start">
                <MenuHandler>
                  <Button
                    ripple={false}
                    variant="text"
                    color="blue-gray"
                    className="flex h-10 items-center gap-2 rounded-r-none rounded-l  border-r-0 bg-[#E6E6E6] hover:opacity-100 focus:bg-none capitalize font-normal text-sm font-emirates outline-none focus:outline-none active:outline-none"
                  >
                    {category ? truncate(category, 10) : "All"}
                  </Button>
                </MenuHandler>
                <MenuList className="max-h-[20rem] max-w-[18rem]">
                  <MenuItem onClick={() => setCategory("All")}>All</MenuItem>
                  {categories.length > 0 &&
                    categories.map((category, index) => {
                      return (
                        <MenuItem
                          onClick={() => setCategory(category.name)}
                          key={index}
                        >
                          {category.name}
                        </MenuItem>
                      );
                    })}
                </MenuList>
              </Menu>
              <input
                type="text"
                name="search"
                className="h-10 border-[#E6E6E6] border-x-0 border-y-[1.5px] focus:outline-none px-3 placeholder:text-secondary-100 text-secondary-100 w-[615px]"
                placeholder="Search my Jewlex"
              />
              <IconButton className="hover:shadow-none shadow-none outline-none rounded-s-none focus:outline-none active:outline-none">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.9925 11.9286C13.9277 10.7229 14.3685 9.20611 14.2251 7.68694C14.0817 6.16776 13.365 4.76026 12.2207 3.75078C11.0764 2.7413 9.59051 2.20568 8.06531 2.25287C6.54011 2.30007 5.09018 2.92654 4.01048 4.00484C2.92985 5.08388 2.30133 6.53438 2.25301 8.06074C2.20468 9.58709 2.74019 11.0744 3.75041 12.2197C4.76062 13.3649 6.16951 14.0819 7.68996 14.2244C9.21042 14.3669 10.728 13.9244 11.9335 12.9868L11.9657 13.0206L15.1472 16.2028C15.2169 16.2725 15.2996 16.3278 15.3907 16.3655C15.4817 16.4032 15.5793 16.4226 15.6779 16.4226C15.7764 16.4226 15.874 16.4032 15.965 16.3655C16.0561 16.3278 16.1388 16.2725 16.2085 16.2028C16.2782 16.1332 16.3334 16.0504 16.3712 15.9594C16.4089 15.8683 16.4283 15.7708 16.4283 15.6722C16.4283 15.5737 16.4089 15.4761 16.3712 15.385C16.3334 15.294 16.2782 15.2113 16.2085 15.1416L13.0262 11.9601C13.0153 11.9493 13.004 11.9388 12.9925 11.9286ZM11.4355 5.06609C11.8589 5.4827 12.1957 5.97902 12.4264 6.52644C12.6571 7.07386 12.7771 7.66153 12.7795 8.25555C12.7819 8.84958 12.6667 9.43821 12.4405 9.98748C12.2143 10.5368 11.8815 11.0358 11.4615 11.4559C11.0415 11.8759 10.5424 12.2086 9.99313 12.4348C9.44385 12.661 8.85523 12.7763 8.2612 12.7738C7.66717 12.7714 7.0795 12.6514 6.53209 12.4207C5.98467 12.1901 5.48834 11.8533 5.07173 11.4298C4.23917 10.5836 3.77473 9.44267 3.77956 8.25555C3.78439 7.06844 4.25812 5.93132 5.09754 5.0919C5.93697 4.25247 7.07408 3.77875 8.2612 3.77391C9.44831 3.76908 10.5893 4.23353 11.4355 5.06609Z"
                    fill="currentColor"
                  />
                </svg>
              </IconButton>
            </div>
          </div>
          <div>
            <div
              className="hidden w-full md:block md:w-auto"
              id="navbar-default"
            >
              <ul className="font-medium flex items-center gap-3">
                <ProfileMenu />
                {MenuLinks.map((link, i) => {
                  return (
                    <li key={"linkmenu" + i}>
                      <Link href={link.link} aria-current="page">
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
                <li>
                  <HeaderWishlistIcon />
                </li>
                <li>
                  <CartSidebar />
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="main-menu container">
          <nav className="py-3">
            <ul className="flex items-center justify-center gap-12">
              <li>
                <Link href="#" className="text-sm">
                  Product on Demand
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-sm">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/store" className="text-sm">
                  Store list
                </Link>
              </li>
              <li>
                <Link href="/vendor/registration" className="text-sm">
                  Store Registration
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm">
                  Community
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm">
                  Blog
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </nav>
    </>
  );
}

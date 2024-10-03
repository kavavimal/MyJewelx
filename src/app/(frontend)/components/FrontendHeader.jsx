"use client";
import Image from "next/image";
import Link from "next/link";
import CartSidebar from "./CartSidebar";
import ProfileMenu from "./ProfileMenu";
import HeaderWishlistIcon from "./HeaderWishlistIcon";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Button,
  Drawer,
  IconButton,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { truncate } from "@/utils/helper";
import { Form, Formik, useFormik } from "formik";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

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
export default function FrontendHeader({ categories, products }) {
  const [category, setCategory] = useState(null);
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  let searchStr = searchParams.get("q");
  const [open, setOpen] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchMenuOpen, setIsSearchMenuOpen] = useState(false);
  const toggleSearchMenu = () => setIsSearchMenuOpen(!isSearchMenuOpen);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [isActive, setIsActive] = useState(1);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSubMenu = () => setIsSubMenuOpen(!isSubMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
  const openSearchDrawer = () => setOpenSearch(true);
  const closeSearchDrawer = () => setOpenSearch(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);
  const [isShowMore, setIsShowMore] = useState(false);
  const [openAccordions, setOpenAccordions] = useState([0, 2]);
  const [nestedAccordions, setNestedAccordions] = useState({});
  const [searchItems, setSearchItems] = useState([]);
  const [showsuggestions, setShowsuggestions] = useState("");

  const highlightText = (text, highlight) => {
    if (!highlight.trim()) return text;

    const regex = new RegExp(`(${highlight.trim()})`, "gi");
    return text.replace(regex, '<span style="color: #F0AE11;">$1</span>');
  };

  const filteredProducts = products?.filter((product) =>
    product?.product_name?.toLowerCase().includes(showsuggestions.toLowerCase())
  );

  useEffect(() => {
    const storedSearchItems = localStorage.getItem("searchItems");
    if (storedSearchItems) {
      setSearchItems(JSON.parse(storedSearchItems));
    } else {
      setSearchItems([]);
    }
  }, []);

  useEffect(() => {
    console.log(searchItems);
  }, [searchItems]);

  const handleAccordionToggle = (id, isNested = false) => {
    if (isNested) {
      setNestedAccordions((prevNested) => ({
        ...prevNested,
        [id]: !prevNested[id],
      }));
    } else {
      setOpenAccordions((prevOpen) =>
        prevOpen.includes(id)
          ? prevOpen.filter((item) => item !== id)
          : [...prevOpen, id]
      );
    }
  };
  const formik = useFormik({
    initialValues: {
      search: searchStr || "",
    },
    onSubmit: (values, { resetForm }) => {
      const searchTerm = values?.search.trim();

      if (searchTerm !== "") {
        setShowsuggestions("");

        if (typeof window !== "undefined") {
          let searchItems =
            JSON.parse(localStorage.getItem("searchItems")) || [];

          const termExists = searchItems.some(
            (item) => item.toLowerCase() === searchTerm.toLowerCase()
          );

          if (!termExists) {
            searchItems.push(searchTerm);
            localStorage.setItem("searchItems", JSON.stringify(searchItems));
          }
        }

        if (!category || category === "All") {
          router.push(`/shop/?q=${searchTerm}`);
          resetForm();
          closeSearchDrawer();
          searchStr = "";
        } else {
          router.push(`/shop/?q=${searchTerm}&category=${category}`);
          resetForm();
          closeSearchDrawer();
          setFieldValue("search", "");
          searchStr = "";
        }
      }
    },
  });

  useEffect(() => {
    formik.setFieldValue("search", searchStr);
  }, [searchStr]);

  return (
    <>
      <div className="top-bar bg-black py-2">
        <div className="container">
          <div className="flex items-center flex-col md:flex-row justify-between">
            <div className="hidden md:block">
              <Link
                href="mailto:contact@myjewlex.com"
                className="flex items-center gap-2 text-white text-sm hover:text-primary-200"
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
            <div className="hidden md:block">
              <Link
                href="tel:+917555176153"
                className="flex items-center gap-2 text-white text-sm  hover:text-primary-200"
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
      <nav className="bg-white hidden lg:block border-gray-200 dark:bg-gray-900 shadow-xxs sticky top-0 z-[999]">
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
            <Formik initialValues={formik.initialValues}>
              <Form onSubmit={formik.handleSubmit}>
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
                      <MenuItem onClick={() => setCategory("All")}>
                        All
                      </MenuItem>
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
                    value={formik.values.search}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="h-10 border-[#E6E6E6] border-x-0 border-y-[1.5px] focus:outline-none px-3 placeholder:text-secondary-100 text-secondary-100 lg:w-[545px] xl:w-[627px]"
                    placeholder="Search my Jewlex"
                  />
                  <IconButton
                    type="submit"
                    className="hover:shadow-none shadow-none outline-none rounded-s-none focus:outline-none active:outline-none"
                  >
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
              </Form>
            </Formik>
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
                <Link
                  href="/jewlex-on-demand"
                  className={`text-sm hover:text-primary-200 ${
                    pathName.includes("jewlex-on-demand")
                      ? "text-primary-200"
                      : ""
                  } `}
                >
                  Jewlex on Demand
                </Link>
              </li>
              <li>
                <Link
                  href="/shop"
                  className={`text-sm hover:text-primary-200 ${
                    pathName.includes("shop") ? "text-primary-200" : ""
                  } `}
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  href="/store"
                  className={`text-sm hover:text-primary-200 ${
                    pathName.includes("store") ? "text-primary-200" : ""
                  } `}
                >
                  Store list
                </Link>
              </li>
              <li>
                <Link
                  href="/vendor/registration"
                  className={`text-sm hover:text-primary-200 ${
                    pathName.includes("vendor/registration") ||
                    pathName.includes("vendor/details")
                      ? "text-primary-200"
                      : ""
                  } `}
                >
                  Store Registration
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className={`text-sm hover:text-primary-200 ${
                    pathName.includes("Community") ? "text-primary-200" : ""
                  } `}
                >
                  Community
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className={`text-sm hover:text-primary-200 ${
                    pathName.includes("Blog") ? "text-primary-200" : ""
                  } `}
                >
                  Blog
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </nav>
      <nav className="bg-white lg:hidden sm:hidden block border-gray-200 dark:bg-gray-900 shadow-xxs sticky top-0 z-[999]">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-5 px-[15px]">
          <div className="flex gap-1 items-center">
            <IconButton
              onClick={openDrawer}
              className="p-0 m-0 rounded-full bg-transparent shadow-none hover:shadow-none"
            >
              <svg
                width="18"
                height="14"
                viewBox="0 0 18 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 7H17M1 1H17M1 13H17"
                  stroke="#1A1A1A"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </IconButton>
            {/* <Menu
              open={isMenuOpen}
              handler={toggleMenu}
              dismiss={{
                itemPress: false,
              }}
            >
              <MenuHandler> */}
            <IconButton
              onClick={openSearchDrawer}
              className="p-0 m-0 rounded-full bg-transparent shadow-none hover:shadow-none"
            >
              <svg
                width="19"
                height="19"
                viewBox="0 0 19 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M14.3233 12.9048C15.5703 11.2971 16.158 9.27482 15.9668 7.24925C15.7757 5.22367 14.82 3.34701 13.2943 2.00104C11.7685 0.655069 9.78735 -0.0590965 7.75375 0.00383158C5.72015 0.0667597 3.7869 0.902055 2.34731 2.33978C0.906468 3.77851 0.068442 5.7125 0.00401015 7.74765C-0.0604217 9.78279 0.65359 11.7659 2.00054 13.2929C3.34749 14.8199 5.22601 15.7758 7.25329 15.9659C9.28056 16.1559 11.304 15.5658 12.9113 14.3158L12.9543 14.3608L17.1963 18.6038C17.2892 18.6967 17.3995 18.7704 17.5209 18.8207C17.6423 18.871 17.7724 18.8968 17.9038 18.8968C18.0352 18.8968 18.1653 18.871 18.2867 18.8207C18.4081 18.7704 18.5184 18.6967 18.6113 18.6038C18.7042 18.5109 18.7779 18.4006 18.8282 18.2792C18.8785 18.1578 18.9044 18.0277 18.9044 17.8963C18.9044 17.7649 18.8785 17.6348 18.8282 17.5134C18.7779 17.392 18.7042 17.2817 18.6113 17.1888L14.3683 12.9468C14.3537 12.9324 14.3387 12.9184 14.3233 12.9048ZM12.2473 3.75478C12.8119 4.31026 13.2609 4.97203 13.5685 5.70192C13.8761 6.43181 14.0361 7.21537 14.0393 8.0074C14.0425 8.79944 13.8889 9.58428 13.5873 10.3166C13.2857 11.049 12.8421 11.7144 12.282 12.2745C11.7219 12.8345 11.0565 13.2782 10.3242 13.5798C9.59181 13.8814 8.80697 14.035 8.01493 14.0318C7.2229 14.0286 6.43933 13.8686 5.70945 13.561C4.97956 13.2534 4.31779 12.8044 3.76231 12.2398C2.65223 11.1115 2.03297 9.59023 2.03941 8.0074C2.04586 6.42458 2.67749 4.90843 3.79672 3.78919C4.91596 2.66996 6.43211 2.03833 8.01493 2.03188C9.59775 2.02544 11.119 2.6447 12.2473 3.75478Z"
                  fill="#1A1A1A"
                />
              </svg>
            </IconButton>
            {/* </MenuHandler>
              <MenuList className="mt-[15px] w-full rounded-none">
                <Formik initialValues={formik.initialValues}>
                  <div className="flex items-center gap-2">
                    <Form onSubmit={formik.handleSubmit} className="w-full">
                      <div className="flex items-center justify-center w-full">
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
                            <MenuItem onClick={() => setCategory("All")}>
                              All
                            </MenuItem>
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
                          value={formik.values.search}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className="h-10 border-[#E6E6E6] w-full border-x-0 border-y-[1.5px] focus:outline-none px-3 placeholder:text-secondary-100 text-secondary-100 sm:w-[615px]"
                          placeholder="Search my Jewlex"
                        />
                        <IconButton
                          type="submit"
                          className="hover:shadow-none shadow-none outline-none rounded-s-none focus:outline-none active:outline-none"
                        >
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
                    </Form>
                    <IconButton
                      onClick={() => setIsMenuOpen(false)}
                      className="p-0 m-0 rounded-full bg-transparent shadow-none hover:shadow-none"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6.93947 7.99997L0.718971 1.78097C0.649239 1.71124 0.593925 1.62846 0.556186 1.53735C0.518447 1.44624 0.499023 1.34859 0.499023 1.24997C0.499023 1.15135 0.518447 1.0537 0.556186 0.962596C0.593925 0.871487 0.649239 0.788703 0.718971 0.718971C0.788703 0.649239 0.871487 0.593925 0.962596 0.556186C1.0537 0.518447 1.15135 0.499023 1.24997 0.499023C1.34859 0.499023 1.44624 0.518447 1.53735 0.556186C1.62846 0.593925 1.71124 0.649239 1.78097 0.718971L7.99997 6.93947L14.219 0.718971C14.3598 0.578141 14.5508 0.499023 14.75 0.499023C14.9491 0.499023 15.1401 0.578141 15.281 0.718971C15.4218 0.859801 15.5009 1.05081 15.5009 1.24997C15.5009 1.44913 15.4218 1.64014 15.281 1.78097L9.06047 7.99997L15.281 14.219C15.4218 14.3598 15.5009 14.5508 15.5009 14.75C15.5009 14.9491 15.4218 15.1401 15.281 15.281C15.1401 15.4218 14.9491 15.5009 14.75 15.5009C14.5508 15.5009 14.3598 15.4218 14.219 15.281L7.99997 9.06047L1.78097 15.281C1.64014 15.4218 1.44913 15.5009 1.24997 15.5009C1.05081 15.5009 0.859801 15.4218 0.718971 15.281C0.578141 15.1401 0.499023 14.9491 0.499023 14.75C0.499023 14.5508 0.578141 14.3598 0.718971 14.219L6.93947 7.99997Z"
                          fill="#010101"
                        />
                      </svg>
                    </IconButton>
                  </div>
                </Formik>
              </MenuList>
            </Menu> */}
          </div>
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
          <div className="hidden">
            <Formik initialValues={formik.initialValues}>
              <Form onSubmit={formik.handleSubmit}>
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
                      <MenuItem onClick={() => setCategory("All")}>
                        All
                      </MenuItem>
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
                    value={formik.values.search}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="h-10 border-[#E6E6E6] border-x-0 border-y-[1.5px] focus:outline-none px-3 placeholder:text-secondary-100 text-secondary-100 w-[615px]"
                    placeholder="Search my Jewlex"
                  />
                  <IconButton
                    type="submit"
                    className="hover:shadow-none shadow-none outline-none px-4   rounded-s-none focus:outline-none active:outline-none"
                  >
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
              </Form>
            </Formik>
          </div>
          <div>
            <div className="w-full" id="navbar-default">
              <ul className="font-medium flex items-center gap-3">
                <div className="hidden">
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
                </div>
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
      </nav>
      <nav className="bg-white hidden sm:block lg:hidden border-gray-200 dark:bg-gray-900 shadow-xxs sticky top-0 z-[999]">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-3">
          <div className="flex items-start gap-2">
            <IconButton
              onClick={openDrawer}
              className="p-0 m-0 rounded-full bg-transparent shadow-none hover:shadow-none"
            >
              <svg
                width="18"
                height="14"
                viewBox="0 0 18 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 7H17M1 1H17M1 13H17"
                  stroke="#1A1A1A"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </IconButton>
            <div>
              <Menu
                open={isSearchMenuOpen}
                handler={toggleSearchMenu}
                dismiss={{
                  itemPress: false,
                }}
              >
                <MenuHandler>
                  <IconButton className="p-0 m-0 rounded-full bg-transparent shadow-none hover:shadow-none">
                    <svg
                      width="19"
                      height="19"
                      viewBox="0 0 19 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M14.3233 12.9048C15.5703 11.2971 16.158 9.27482 15.9668 7.24925C15.7757 5.22367 14.82 3.34701 13.2943 2.00104C11.7685 0.655069 9.78735 -0.0590965 7.75375 0.00383158C5.72015 0.0667597 3.7869 0.902055 2.34731 2.33978C0.906468 3.77851 0.068442 5.7125 0.00401015 7.74765C-0.0604217 9.78279 0.65359 11.7659 2.00054 13.2929C3.34749 14.8199 5.22601 15.7758 7.25329 15.9659C9.28056 16.1559 11.304 15.5658 12.9113 14.3158L12.9543 14.3608L17.1963 18.6038C17.2892 18.6967 17.3995 18.7704 17.5209 18.8207C17.6423 18.871 17.7724 18.8968 17.9038 18.8968C18.0352 18.8968 18.1653 18.871 18.2867 18.8207C18.4081 18.7704 18.5184 18.6967 18.6113 18.6038C18.7042 18.5109 18.7779 18.4006 18.8282 18.2792C18.8785 18.1578 18.9044 18.0277 18.9044 17.8963C18.9044 17.7649 18.8785 17.6348 18.8282 17.5134C18.7779 17.392 18.7042 17.2817 18.6113 17.1888L14.3683 12.9468C14.3537 12.9324 14.3387 12.9184 14.3233 12.9048ZM12.2473 3.75478C12.8119 4.31026 13.2609 4.97203 13.5685 5.70192C13.8761 6.43181 14.0361 7.21537 14.0393 8.0074C14.0425 8.79944 13.8889 9.58428 13.5873 10.3166C13.2857 11.049 12.8421 11.7144 12.282 12.2745C11.7219 12.8345 11.0565 13.2782 10.3242 13.5798C9.59181 13.8814 8.80697 14.035 8.01493 14.0318C7.2229 14.0286 6.43933 13.8686 5.70945 13.561C4.97956 13.2534 4.31779 12.8044 3.76231 12.2398C2.65223 11.1115 2.03297 9.59023 2.03941 8.0074C2.04586 6.42458 2.67749 4.90843 3.79672 3.78919C4.91596 2.66996 6.43211 2.03833 8.01493 2.03188C9.59775 2.02544 11.119 2.6447 12.2473 3.75478Z"
                        fill="#1A1A1A"
                      />
                    </svg>
                  </IconButton>
                </MenuHandler>
                <MenuList className="w-full rounded-none">
                  <Formik initialValues={formik.initialValues}>
                    <div className="flex items-center gap-2">
                      <Form onSubmit={formik.handleSubmit} className="w-full">
                        <div className="flex items-center justify-center w-full">
                          <Menu
                            open={isSubMenuOpen}
                            handler={toggleSubMenu}
                            placement="bottom-start"
                          >
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
                              <MenuItem onClick={() => setCategory("All")}>
                                All
                              </MenuItem>
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
                            value={formik.values.search}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="h-10 border-[#E6E6E6] w-full border-x-0 border-y-[1.5px] focus:outline-none px-3 placeholder:text-secondary-100 text-secondary-100"
                            placeholder="Search my Jewlex"
                          />
                          <IconButton
                            type="submit"
                            className="hover:shadow-none shadow-none outline-none rounded-s-none focus:outline-none active:outline-none"
                          >
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
                      </Form>
                      <IconButton
                        onClick={() => toggleSearchMenu()}
                        className="p-0 m-0 rounded-full bg-transparent shadow-none hover:shadow-none"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6.93947 7.99997L0.718971 1.78097C0.649239 1.71124 0.593925 1.62846 0.556186 1.53735C0.518447 1.44624 0.499023 1.34859 0.499023 1.24997C0.499023 1.15135 0.518447 1.0537 0.556186 0.962596C0.593925 0.871487 0.649239 0.788703 0.718971 0.718971C0.788703 0.649239 0.871487 0.593925 0.962596 0.556186C1.0537 0.518447 1.15135 0.499023 1.24997 0.499023C1.34859 0.499023 1.44624 0.518447 1.53735 0.556186C1.62846 0.593925 1.71124 0.649239 1.78097 0.718971L7.99997 6.93947L14.219 0.718971C14.3598 0.578141 14.5508 0.499023 14.75 0.499023C14.9491 0.499023 15.1401 0.578141 15.281 0.718971C15.4218 0.859801 15.5009 1.05081 15.5009 1.24997C15.5009 1.44913 15.4218 1.64014 15.281 1.78097L9.06047 7.99997L15.281 14.219C15.4218 14.3598 15.5009 14.5508 15.5009 14.75C15.5009 14.9491 15.4218 15.1401 15.281 15.281C15.1401 15.4218 14.9491 15.5009 14.75 15.5009C14.5508 15.5009 14.3598 15.4218 14.219 15.281L7.99997 9.06047L1.78097 15.281C1.64014 15.4218 1.44913 15.5009 1.24997 15.5009C1.05081 15.5009 0.859801 15.4218 0.718971 15.281C0.578141 15.1401 0.499023 14.9491 0.499023 14.75C0.499023 14.5508 0.578141 14.3598 0.718971 14.219L6.93947 7.99997Z"
                            fill="#010101"
                          />
                        </svg>
                      </IconButton>
                    </div>
                  </Formik>
                </MenuList>
              </Menu>
            </div>
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
            <div className="w-full" id="navbar-default">
              <ul className="font-medium flex items-center gap-3">
                <div>
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
                </div>
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
        {/* <div className="max-w-screen-xl mx-auto">
          <Formik initialValues={formik.initialValues}>
            <Form onSubmit={formik.handleSubmit}>
              <div className="flex pb-2 px-2 items-center justify-center">
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
                  value={formik.values.search}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="h-10 border-[#E6E6E6] border-x-0 border-y-[1.5px] focus:outline-none px-3 placeholder:text-secondary-100 text-secondary-100 w-full"
                  placeholder="Search"
                />
                <IconButton
                  type="submit"
                  className="hover:shadow-none shadow-none outline-none rounded-s-none focus:outline-none active:outline-none"
                >
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
            </Form>
          </Formik>
        </div> */}
      </nav>

      <Drawer
        open={open}
        onClose={closeDrawer}
        overlayProps={{
          backdropBlur: false,
          className:
            "fixed inset-0 bg-black bg-opacity-60 backdrop-blur-none pointer-events-auto",
        }}
        className="p-4 z-[10000] h-full"
      >
        <div className="flex flex-col justify-between h-full">
          <div>
            <div className="mb-6 flex items-center justify-between w-full">
              <Link
                href="/"
                className="flex items-center space-x-3 rtl:space-x-reverse"
                onClick={closeDrawer}
              >
                <Image
                  width={160}
                  height={160}
                  src="/assets/images/logo.svg"
                  alt="logo"
                />
              </Link>
              <IconButton
                variant="text"
                color="blue-gray"
                onClick={closeDrawer}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.93947 7.99997L0.718971 1.78097C0.649239 1.71124 0.593925 1.62846 0.556186 1.53735C0.518447 1.44624 0.499023 1.34859 0.499023 1.24997C0.499023 1.15135 0.518447 1.0537 0.556186 0.962596C0.593925 0.871487 0.649239 0.788703 0.718971 0.718971C0.788703 0.649239 0.871487 0.593925 0.962596 0.556186C1.0537 0.518447 1.15135 0.499023 1.24997 0.499023C1.34859 0.499023 1.44624 0.518447 1.53735 0.556186C1.62846 0.593925 1.71124 0.649239 1.78097 0.718971L7.99997 6.93947L14.219 0.718971C14.3598 0.578141 14.5508 0.499023 14.75 0.499023C14.9491 0.499023 15.1401 0.578141 15.281 0.718971C15.4218 0.859801 15.5009 1.05081 15.5009 1.24997C15.5009 1.44913 15.4218 1.64014 15.281 1.78097L9.06047 7.99997L15.281 14.219C15.4218 14.3598 15.5009 14.5508 15.5009 14.75C15.5009 14.9491 15.4218 15.1401 15.281 15.281C15.1401 15.4218 14.9491 15.5009 14.75 15.5009C14.5508 15.5009 14.3598 15.4218 14.219 15.281L7.99997 9.06047L1.78097 15.281C1.64014 15.4218 1.44913 15.5009 1.24997 15.5009C1.05081 15.5009 0.859801 15.4218 0.718971 15.281C0.578141 15.1401 0.499023 14.9491 0.499023 14.75C0.499023 14.5508 0.578141 14.3598 0.718971 14.219L6.93947 7.99997Z"
                    fill="#010101"
                  />
                </svg>
              </IconButton>
            </div>
            <div className="flex items-center pb-5 text-center gap-0">
              <button
                className={`w-[50%] text-[20px] leading-[28px]   ${
                  isActive === 0
                    ? "text-primary-200 border-b-primary-200 border-b-2"
                    : "text-secondary-50 border-b-blueGray-150 border-b"
                }`}
                onClick={() => setIsActive(0)}
              >
                Menu
              </button>
              <button
                className={`w-[50%] text-[20px] leading-[28px]   ${
                  isActive === 1
                    ? "text-primary-200 border-b-primary-200 border-b-2"
                    : "text-secondary-50 border-b-blueGray-150 border-b"
                }`}
                onClick={() => setIsActive(1)}
              >
                Category
              </button>
            </div>
            {isActive === 0 && (
              <nav>
                <ul className="flex flex-col gap-4">
                  <li>
                    <Link
                      href="/jewlex-on-demand"
                      className="text-md hover:text-primary-200"
                      onClick={closeDrawer}
                    >
                      Jewlex on Demand
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/shop"
                      className="text-md hover:text-primary-200"
                      onClick={closeDrawer}
                    >
                      Shop
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/store"
                      className="text-md hover:text-primary-200"
                      onClick={closeDrawer}
                    >
                      Store list
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/vendor/registration"
                      className="text-md hover:text-primary-200"
                      onClick={closeDrawer}
                    >
                      Store Registration
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-md hover:text-primary-200"
                      onClick={closeDrawer}
                    >
                      Community
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-md hover:text-primary-200"
                      onClick={closeDrawer}
                    >
                      Blog
                    </Link>
                  </li>
                </ul>
              </nav>
            )}
            {isActive === 1 && (
              <div className="min-w-0 pt-2 p-0 px-0 h-[60vh] overflow-y-scroll flex flex-col gap-3">
                {categories
                  .filter((category) => category.parent_id === null)
                  .slice(0, isShowMore ? categories.length : 5)
                  .map((category, index) => {
                    const hasSubcategories = categories.some(
                      (subcategory) =>
                        subcategory.parent_id === category.category_id
                    );

                    return hasSubcategories ? (
                      <Accordion
                        className="py-0"
                        key={index}
                        open={nestedAccordions[category.category_id]}
                        icon={
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className={`h-4 float-end items-end self-end w-4 mr-2 transition-transform ${
                              nestedAccordions[category.category_id]
                                ? "rotate-[270deg]"
                                : ""
                            }`}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                            />
                          </svg>
                        }
                      >
                        <AccordionHeader
                          className="text-base py-0 border-b-0 font-medium font-emirates  flex items-center !justify-between"
                          onClick={() =>
                            handleAccordionToggle(category.category_id, true)
                          }
                        >
                          <Link
                            key={index}
                            href={`/shop?category=${category.name}`}
                            className="flex w-fit text-blueGray-500 cursor-pointer  items-center "
                            onClick={closeDrawer}
                          >
                            {category.name}
                          </Link>
                        </AccordionHeader>
                        <AccordionBody className="border-l border-l-blueGray-150 ps-3 py-[12px]">
                          <div className="min-w-0 p-0 px-0 flex flex-col gap-3">
                            {categories
                              .filter(
                                (subcategory) =>
                                  subcategory.parent_id === category.category_id
                              )
                              .map((subcategory, i) => (
                                <Link
                                  key={i}
                                  href={`/shop?subcategory=${subcategory.name}`}
                                  onClick={closeDrawer}
                                  className="flex w-fit pt-1 text-blueGray-500 cursor-pointer  items-center "
                                >
                                  {subcategory.name}
                                </Link>
                              ))}
                          </div>
                        </AccordionBody>
                      </Accordion>
                    ) : (
                      <div
                        className=" text-base  
                         font-medium font-emirates p-0"
                        key={index}
                      >
                        <Link
                          key={index}
                          href={`/shop?category=${category.name}`}
                          onClick={closeDrawer}
                          className="flex w-full text-blueGray-500 cursor-pointer items-center "
                        >
                          {category.name}
                        </Link>
                      </div>
                    );
                  })}

                {categories && categories.length > 5 && (
                  <button
                    variant="text"
                    className="flex justify-start mt-4"
                    onClick={() => setIsShowMore(!isShowMore)}
                    ripple={false}
                  >
                    {isShowMore ? (
                      "Show Less"
                    ) : (
                      <>
                        <span className="flex items-center gap-2 text-gray-700">
                          Show More
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5"
                          >
                            <circle cx="7" cy="7" r="6.5" stroke="#676767" />
                            <path
                              d="M10 7.49902H7.5V9.99902C7.5 10.1316 7.44732 10.2588 7.35355 10.3526C7.25979 10.4463 7.13261 10.499 7 10.499C6.86739 10.499 6.74022 10.4463 6.64645 10.3526C6.55268 10.2588 6.5 10.1316 6.5 9.99902V7.49902H4C3.86739 7.49902 3.74021 7.44634 3.64645 7.35258C3.55268 7.25881 3.5 7.13163 3.5 6.99902C3.5 6.86642 3.55268 6.73924 3.64645 6.64547C3.74021 6.5517 3.86739 6.49902 4 6.49902H6.5V3.99902C6.5 3.86642 6.55268 3.73924 6.64645 3.64547C6.74022 3.5517 6.86739 3.49902 7 3.49902C7.13261 3.49902 7.25979 3.5517 7.35355 3.64547C7.44732 3.73924 7.5 3.86642 7.5 3.99902V6.49902H10C10.1326 6.49902 10.2598 6.5517 10.3536 6.64547C10.4473 6.73924 10.5 6.86642 10.5 6.99902C10.5 7.13163 10.4473 7.25881 10.3536 7.35258C10.2598 7.44634 10.1326 7.49902 10 7.49902Z"
                              fill="#676767"
                            />
                          </svg>
                        </span>
                      </>
                    )}
                  </button>
                )}
              </div>
            )}
          </div>
          <div className="block w-auto z-[99999]" id="navbar-default">
            <ul className="font-medium flex sm:hidden items-center gap-3 z-[99999]">
              <ProfileMenu placement="right-end" />
              {MenuLinks.map((link, i) => {
                return (
                  <li key={"linkmenu" + i} className="z-[99999]">
                    <Link
                      onClick={closeDrawer}
                      href={link.link}
                      aria-current="page"
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Drawer>
      <Drawer
        open={openSearch}
        onClose={closeSearchDrawer}
        overlayProps={{
          backdropBlur: false,
          className:
            "inset-0 bg-black bg-opacity-60 backdrop-blur-none pointer-events-auto",
        }}
        className="p-4 z-[10000] h-full"
        size={540}
      >
        <div className="flex flex-col h-full">
          <div>
            <div className="flex gap-[15px] items-center justify-between w-full">
              <Link
                href="/"
                className="flex items-center space-x-3 rtl:space-x-reverse"
                onClick={closeSearchDrawer}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_3175_15262)">
                    <path
                      d="M22.4734 11.5266L12.4734 1.52663C12.3484 1.40246 12.1795 1.33276 12.0034 1.33276C11.8272 1.33276 11.6583 1.40246 11.5334 1.52663L1.53335 11.5266C1.42413 11.6542 1.36706 11.8182 1.37354 11.986C1.38002 12.1538 1.44958 12.3129 1.56831 12.4317C1.68704 12.5504 1.8462 12.62 2.01398 12.6264C2.18177 12.6329 2.34582 12.5758 2.47335 12.4666L12 2.93996L21.5267 12.4733C21.6542 12.5825 21.8183 12.6396 21.9861 12.6331C22.1538 12.6266 22.313 12.5571 22.4317 12.4383C22.5505 12.3196 22.62 12.1604 22.6265 11.9927C22.633 11.8249 22.5759 11.6608 22.4667 11.5333L22.4734 11.5266Z"
                      fill="#1A1A1A"
                    />
                    <path
                      d="M18.6667 21.3334H15.3333V14.6668H8.66667V21.3334H5.33333V12.0001L4 13.3334V21.3334C4 21.687 4.14048 22.0262 4.39052 22.2762C4.64057 22.5263 4.97971 22.6668 5.33333 22.6668H10V16.0001H14V22.6668H18.6667C19.0203 22.6668 19.3594 22.5263 19.6095 22.2762C19.8595 22.0262 20 21.687 20 21.3334V13.1734L18.6667 11.8401V21.3334Z"
                      fill="#1A1A1A"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_3175_15262">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </Link>
              <div className="w-full">
                <Formik initialValues={formik.initialValues}>
                  <Form onSubmit={formik.handleSubmit} className="w-full">
                    <div className="flex items-center w-full justify-center">
                      <Menu
                        open={isMenuOpen}
                        handler={toggleMenu}
                        dismiss={{
                          itemPress: false,
                        }}
                        placement="bottom-start"
                      >
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
                        <MenuList className="max-h-[20rem] z-[99999] max-w-[18rem]">
                          <MenuItem
                            className="z-[99999]"
                            onClick={() => setCategory("All")}
                          >
                            All
                          </MenuItem>
                          {categories.length > 0 &&
                            categories.map((category, index) => {
                              return (
                                <MenuItem
                                  className="z-[99999]"
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
                        value={formik.values.search}
                        onChange={(e) => {
                          formik.handleChange(e);
                          setShowsuggestions(e.target.value);
                        }}
                        onBlur={formik.handleBlur}
                        className="h-10 border-[#E6E6E6] border-x-0 border-y-[1.5px] focus:outline-none px-3 placeholder:text-secondary-100 text-secondary-100 w-full"
                        // placeholder="Search my Jewlex"
                      />
                      <IconButton
                        type="submit"
                        className="hover:shadow-none shadow-none outline-none px-4   rounded-s-none focus:outline-none active:outline-none"
                      >
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
                  </Form>
                </Formik>
              </div>
            </div>
          </div>
          {showsuggestions !== "" ? (
            <div className="pt-[25px] pb-[9px]">
              <h2 className="text-base font-semibold font-playfairdisplay">
                Suggested Products
              </h2>
              <div className="w-full pt-5  overflow-auto">
                <div className="flex flex-col gap-2.5">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product, index) => (
                      <div
                        className="flex items-center gap-1 pb-2.5 cursor-pointer border-b border-b-blueGray-150"
                        key={index}
                      >
                        <svg
                          width="13"
                          height="13"
                          viewBox="0 0 13 13"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M9.54857 8.60319C10.3799 7.53143 10.7717 6.18321 10.6442 4.83283C10.5168 3.48245 9.87969 2.23134 8.86254 1.33403C7.84539 0.436713 6.52459 -0.0393977 5.16886 0.00255439C3.81313 0.0445065 2.5243 0.60137 1.56457 1.55986C0.604007 2.51901 0.0453228 3.80834 0.00236826 5.1651C-0.0405863 6.52186 0.435422 7.84395 1.33339 8.86194C2.23136 9.87993 3.4837 10.5172 4.83522 10.6439C6.18674 10.7706 7.53571 10.3772 8.60724 9.54386L8.6359 9.57386L11.4639 12.4025C11.5258 12.4645 11.5994 12.5136 11.6803 12.5471C11.7612 12.5806 11.848 12.5979 11.9356 12.5979C12.0232 12.5979 12.1099 12.5806 12.1908 12.5471C12.2718 12.5136 12.3453 12.4645 12.4072 12.4025C12.4692 12.3406 12.5183 12.267 12.5518 12.1861C12.5854 12.1052 12.6026 12.0185 12.6026 11.9309C12.6026 11.8433 12.5854 11.7565 12.5518 11.6756C12.5183 11.5947 12.4692 11.5211 12.4072 11.4592L9.57857 8.63119C9.56883 8.62158 9.55883 8.61225 9.54857 8.60319ZM8.16457 2.50319C8.54097 2.87351 8.84033 3.31469 9.04537 3.80128C9.25041 4.28787 9.35709 4.81025 9.35924 5.33827C9.36139 5.86629 9.25897 6.38952 9.0579 6.87776C8.85682 7.36601 8.56107 7.80961 8.1877 8.18298C7.81432 8.55636 7.37072 8.85211 6.88248 9.05318C6.39423 9.25426 5.87101 9.35667 5.34298 9.35452C4.81496 9.35237 4.29258 9.2457 3.80599 9.04066C3.3194 8.83561 2.87822 8.53626 2.5079 8.15986C1.76785 7.40765 1.35501 6.39348 1.3593 5.33827C1.3636 4.28306 1.78469 3.27228 2.53084 2.52613C3.277 1.77997 4.28777 1.35889 5.34298 1.35459C6.3982 1.35029 7.41236 1.76314 8.16457 2.50319Z"
                            fill="#999999"
                          />
                        </svg>
                        <div
                          className="text-base font-emirates"
                          key={index}
                          dangerouslySetInnerHTML={{
                            __html: highlightText(
                              product.product_name,
                              showsuggestions
                            ),
                          }}
                          onClick={() => {
                            router.push(`/shop?q=${product.product_name}`);
                            if (typeof window !== "undefined") {
                              let searchItems =
                                JSON.parse(
                                  localStorage.getItem("searchItems")
                                ) || [];
                              let searchTerm = product.product_name;
                              const termExists = searchItems.some(
                                (item) =>
                                  item.toLowerCase() ===
                                  searchTerm.toLowerCase()
                              );

                              if (!termExists) {
                                searchItems.push(searchTerm);
                                localStorage.setItem(
                                  "searchItems",
                                  JSON.stringify(searchItems)
                                );
                              }
                            }
                            closeSearchDrawer();
                          }}
                        />
                      </div>
                    ))
                  ) : (
                    <div>No products found</div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="pt-[25px] flex items-center justify-between  pb-[9px]">
                <h2 className="text-base font-semibold font-playfairdisplay ">
                  Recent Searches
                </h2>
                <button
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      localStorage.removeItem("searchItems");
                      router.refresh();
                      closeSearchDrawer();
                    }
                  }}
                  className="flex items-center gap-[13px]"
                >
                  Clear All{" "}
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.29299 4.9999L0.145991 0.853899C0.0995027 0.807411 0.0626266 0.752222 0.0374675 0.691483C0.0123084 0.630743 -0.000640869 0.565643 -0.000640869 0.499899C-0.00064087 0.434155 0.0123084 0.369055 0.0374675 0.308316C0.0626266 0.247576 0.0995027 0.192387 0.145991 0.145899C0.192479 0.0994111 0.247668 0.062535 0.308407 0.0373759C0.369147 0.0122168 0.434247 -0.000732422 0.499991 -0.000732422C0.565735 -0.000732421 0.630835 0.0122168 0.691574 0.0373759C0.752313 0.062535 0.807503 0.0994111 0.853991 0.145899L4.99999 4.2929L9.14599 0.145899C9.23988 0.0520124 9.36722 -0.000732422 9.49999 -0.000732422C9.63277 -0.000732422 9.7601 0.0520124 9.85399 0.145899C9.94788 0.239786 10.0006 0.367123 10.0006 0.499899C10.0006 0.632675 9.94788 0.760013 9.85399 0.853899L5.70699 4.9999L9.85399 9.1459C9.94788 9.23979 10.0006 9.36712 10.0006 9.4999C10.0006 9.63267 9.94788 9.76001 9.85399 9.8539C9.7601 9.94779 9.63277 10.0005 9.49999 10.0005C9.36722 10.0005 9.23988 9.94779 9.14599 9.8539L4.99999 5.7069L0.853991 9.8539C0.760104 9.94779 0.632766 10.0005 0.499991 10.0005C0.367215 10.0005 0.239877 9.94779 0.145991 9.8539C0.052104 9.76001 -0.000640869 9.63267 -0.000640869 9.4999C-0.000640869 9.36712 0.052104 9.23979 0.145991 9.1459L4.29299 4.9999Z"
                      fill="#010101"
                    />
                  </svg>
                </button>
              </div>
              <div className="w-full py-5 px-[15px] border border-[#CBCBCB] sm:border-secondary-400 rounded-sm  overflow-auto">
                <div className="flex justify-start items-center gap-2.5 flex-wrap">
                  {searchItems && searchItems.length > 0 ? (
                    searchItems.map((item, index) => (
                      <button
                        onClick={() => formik.setFieldValue("search", item)} // Wrap in an arrow function
                        key={index}
                        className="border leading-[18px] text-sm rounded-[2px] sm:rounded-lg text-secondary-100 border-[#CBCBCB] sm:border-[#F6F6F6] py-0.5 px-3.5 select-none hover:text-black"
                      >
                        {item}
                      </button>
                    ))
                  ) : (
                    <div>No Recent Searches</div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </Drawer>
    </>
  );
}

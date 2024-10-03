"use client";
import { checkPermission } from "@/utils/helper";
import {
  ListItem,
  ListItemPrefix,
  Spinner,
  List,
  Accordion,
  AccordionHeader,
  AccordionBody,
  ListItemSuffix,
} from "@material-tailwind/react";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

const Sidebar = () => {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const isActive = (name) => pathname.includes(name);
  const [open, setOpen] = useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
  if (status === "loading") {
    return (
      <aside className="w-1/5">
        <SimpleBar
          style={{ position: "sticky" }}
          className="top-0 left-0 h-screen border-r border-dashed space-y-2"
        >
          <div className="h-screen flex justify-center items-center">
            <Spinner className="h-8 w-8" />
          </div>
        </SimpleBar>
      </aside>
    );
  }

  const navItems = [
    {
      name: "Dashboard",
      href: "/admin/dashboard",
      permission: [
        "vendors_view",
        "vendor_create",
        "vendor_update",
        "vendor_delete",
        "customers_view",
        "customer_create",
        "customer_update",
        "customer_delete",
        "products_view",
        "product_create",
        "product_update",
        "product_delete",
      ],
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="currentColor"
          className={`fill-current ${
            isActive("/admin/dashboard") ? "text-white" : "text-blueGray-200"
          }`}
        >
          <path
            fill="currentColor"
            d="M4 13h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1m-1 7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1zm10 0a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1zm1-10h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1"
          />
        </svg>
      ),
    },
    {
      name: "Daily Metal Rate",
      href: "/admin/pricings",
      permission: ["metal_rate_view"],
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 50 50"
          className={`fill-current ${
            isActive("/admin/pricings") ? "text-white" : "text-blueGray-200"
          }`}
        >
          <g fill="none" stroke="currentColor" stroke-width="4">
            <path
              stroke-linejoin="round"
              d="m22.219 7.378l11.668 9.244L36.177 24l-10.914 2.085l-12.674-11.554l2.692-5.53z"
              clip-rule="evenodd"
            />
            <path stroke-linecap="round" d="m15.28 9.001l11.206 9.6" />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m25.263 26.085l1.224-7.953l7.4-1.51m-8.894 14.401l2.286 7.08l-11.678 2.276L4 29.014l2.57-6.389l5.458-1.271"
            />
            <path stroke-linecap="round" d="m6.57 22.625l10.714 10.133" />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m15.601 39.865l1.885-7.733l7.505-1.088"
            />
            <path
              stroke-linejoin="round"
              d="M34.887 29.608L34 36.8l9.236-1.801l-1.955-6.812z"
              clip-rule="evenodd"
            />
          </g>
        </svg>
      ),
    },
    {
      name: "Settings",
      href: "/admin/settings",
      permission: ["settings_view"],
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          className={`fill-current ${
            isActive("/admin/settings") ? "text-white" : "text-blueGray-200"
          }`}
        >
          <path
            fill="currentColor"
            d="M19.9 12.66a1 1 0 0 1 0-1.32l1.28-1.44a1 1 0 0 0 .12-1.17l-2-3.46a1 1 0 0 0-1.07-.48l-1.88.38a1 1 0 0 1-1.15-.66l-.61-1.83a1 1 0 0 0-.95-.68h-4a1 1 0 0 0-1 .68l-.56 1.83a1 1 0 0 1-1.15.66L5 4.79a1 1 0 0 0-1 .48L2 8.73a1 1 0 0 0 .1 1.17l1.27 1.44a1 1 0 0 1 0 1.32L2.1 14.1a1 1 0 0 0-.1 1.17l2 3.46a1 1 0 0 0 1.07.48l1.88-.38a1 1 0 0 1 1.15.66l.61 1.83a1 1 0 0 0 1 .68h4a1 1 0 0 0 .95-.68l.61-1.83a1 1 0 0 1 1.15-.66l1.88.38a1 1 0 0 0 1.07-.48l2-3.46a1 1 0 0 0-.12-1.17ZM18.41 14l.8.9l-1.28 2.22l-1.18-.24a3 3 0 0 0-3.45 2L12.92 20h-2.56L10 18.86a3 3 0 0 0-3.45-2l-1.18.24l-1.3-2.21l.8-.9a3 3 0 0 0 0-4l-.8-.9l1.28-2.2l1.18.24a3 3 0 0 0 3.45-2L10.36 4h2.56l.38 1.14a3 3 0 0 0 3.45 2l1.18-.24l1.28 2.22l-.8.9a3 3 0 0 0 0 3.98m-6.77-6a4 4 0 1 0 4 4a4 4 0 0 0-4-4m0 6a2 2 0 1 1 2-2a2 2 0 0 1-2 2"
          ></path>
        </svg>
      ),
    },
    {
      name: "Users",
      href: "/admin/users",
      permission: [
        "customers_view",
        "customer_create",
        "customer_update",
        "customer_delete",
      ],
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          className={`fill-current ${
            isActive("/admin/users") ? "text-white" : "text-blueGray-200"
          }`}
        >
          <path
            opacity="0.32"
            d="M2.28099 19.6575C2.36966 20.5161 2.93261 21.1957 3.77688 21.3755C5.1095 21.6592 7.6216 22 12 22C16.3784 22 18.8905 21.6592 20.2232 21.3755C21.0674 21.1957 21.6303 20.5161 21.719 19.6575C21.8505 18.3844 22 16.0469 22 12C22 7.95305 21.8505 5.6156 21.719 4.34251C21.6303 3.48389 21.0674 2.80424 20.2231 2.62451C18.8905 2.34081 16.3784 2 12 2C7.6216 2 5.1095 2.34081 3.77688 2.62451C2.93261 2.80424 2.36966 3.48389 2.28099 4.34251C2.14952 5.6156 2 7.95305 2 12C2 16.0469 2.14952 18.3844 2.28099 19.6575Z"
          />
          <path d="M13.9382 13.8559C15.263 13.1583 16.1663 11.7679 16.1663 10.1666C16.1663 7.8655 14.3008 6 11.9996 6C9.69841 6 7.83291 7.8655 7.83291 10.1666C7.83291 11.768 8.73626 13.1584 10.0612 13.856C8.28691 14.532 6.93216 16.1092 6.51251 18.0529C6.45446 18.3219 6.60246 18.5981 6.87341 18.6471C7.84581 18.8231 9.45616 19 12.0006 19C14.545 19 16.1554 18.8231 17.1278 18.6471C17.3977 18.5983 17.5454 18.3231 17.4876 18.0551C17.0685 16.1103 15.7133 14.5321 13.9382 13.8559Z" />
        </svg>
      ),
    },
    {
      name: "Vendors",
      href: "/admin/vendors",
      permission: [
        "vendors_view",
        "vendor_create",
        "vendor_update",
        "vendor_delete",
      ],
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          id="Layer_1"
          width={24}
          height={24}
          data-name="Layer 1"
          viewBox="0 -2 26 30"
          className={`fill-current ${
            isActive("/admin/vendors") ? "text-white" : "text-blueGray-200"
          }`}
        >
          <path d="m4,14.949v5.551c0,.276.224.5.5.5h7.5v3h-7.5c-1.93,0-3.5-1.57-3.5-3.5v-7.206c-.616-.77-1-1.733-1-2.794l.036-.325L2.297,0h19.406l2.297,10.5c0,.798-.226,1.537-.592,2.187-.537-1.021-1.398-1.846-2.469-2.296l-1.643-7.391h-2.297v3h-3v-3h-4v3h-3v-3h-2.297l-1.697,7.637c.069.763.713,1.363,1.494,1.363h1c.651,0,1.201-.419,1.408-1h3.184c.207.581.757,1,1.408,1h1c.651,0,1.201-.419,1.408-1h2.12c-1.147.857-1.912,2.191-2,3.715-.479.175-.99.285-1.529.285h-1c-1.157,0-2.202-.451-3-1.17-.798.72-1.843,1.17-3,1.17h-1c-.171,0-.334-.032-.5-.051Zm17,4.051h-4c-1.654,0-3,1.346-3,3v2h10v-2c0-1.654-1.346-3-3-3Zm-5-4c0,1.654,1.346,3,3,3s3-1.346,3-3-1.346-3-3-3-3,1.346-3,3Z" />
        </svg>
      ),
    },

    {
      name: "Products",
      href: "/admin/products",
      permission: [
        "products_view",
        "product_create",
        "product_update",
        "product_delete",
      ],
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="-2 -2 50 50"
          className={`fill-current ${
            isActive("/admin/products") || isActive("/admin/category")
              ? "text-white"
              : "text-blueGray-200"
          }`}
        >
          <g
            fill="none"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth={4}
          >
            <path d="M44 14L24 4L4 14v20l20 10l20-10z"></path>
            <path
              strokeLinecap="round"
              d="m4 14l20 10m0 20V24m20-10L24 24M34 9L14 19"
            ></path>
          </g>
        </svg>
      ),
      children: [
        {
          name: "List",
          href: "/admin/products",
          permission: [
            "products_view",
            "product_create",
            "product_update",
            "product_delete",
          ],
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="-100 0 2300 2048"
              className={`fill-current ${
                isActive("/admin/products") ? "text-white" : "text-blueGray-200"
              }`}
            >
              <path
                fill="currentColor"
                d="M768 256h1280v128H768zm0 768V896h1280v128zm0 640v-128h1280v128zM256 768q53 0 99 20t82 55t55 81t20 100q0 53-20 99t-55 82t-81 55t-100 20q-53 0-99-20t-82-55t-55-81t-20-100q0-53 20-99t55-82t81-55t100-20m0 400q30 0 56-11t45-31t31-46t12-56t-11-56t-31-45t-46-31t-56-12t-56 11t-45 31t-31 46t-12 56t11 56t31 45t46 31t56 12m0 240q53 0 99 20t82 55t55 81t20 100q0 53-20 99t-55 82t-81 55t-100 20q-53 0-99-20t-82-55t-55-81t-20-100q0-53 20-99t55-82t81-55t100-20m0 400q30 0 56-11t45-31t31-46t12-56t-11-56t-31-45t-46-31t-56-12t-56 11t-45 31t-31 46t-12 56t11 56t31 45t46 31t56 12M192 358L467 83l90 90l-365 365L19 365l90-90z"
              ></path>
            </svg>
          ),
        },
        {
          name: "Category",
          href: "/admin/category",
          permission: [
            "categories_view",
            "category_create",
            "category_update",
            "category_delete",
          ],
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              className={`fill-current ${
                isActive("/admin/category") ? "text-white" : "text-blueGray-200"
              }`}
            >
              <circle
                cx={17.5}
                cy={17.5}
                r={2.5}
                fill="currentColor"
                opacity={0.3}
              ></circle>
              <path
                fill="currentColor"
                d="M5 15.5h4v4H5zm7-9.66L10.07 9h3.86z"
                opacity={0.3}
              ></path>
              <path
                fill="currentColor"
                d="m12 2l-5.5 9h11zm0 3.84L13.93 9h-3.87zM17.5 13c-2.49 0-4.5 2.01-4.5 4.5s2.01 4.5 4.5 4.5s4.5-2.01 4.5-4.5s-2.01-4.5-4.5-4.5m0 7a2.5 2.5 0 0 1 0-5a2.5 2.5 0 0 1 0 5M11 13.5H3v8h8zm-2 6H5v-4h4z"
              ></path>
            </svg>
          ),
        },
      ],
    },
    {
      name: "Jewlex On Demand",
      href: "/admin/jod",
      permission: ["jods_view", "jod_create", "jod_update", "jod_delete"],
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="-2 -2 50 50"
          className={`fill-current ${
            isActive("/admin/jod") ? "text-white" : "text-blueGray-200"
          }`}
        >
          <g
            fill="none"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth={4}
          >
            <path d="M39 6H9a3 3 0 0 0-3 3v30a3 3 0 0 0 3 3h30a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3Z"></path>
            <path
              strokeLinecap="round"
              d="m13.44 29.835l5.657-5.657l4.388 4.377L34 18"
            ></path>
            <path strokeLinecap="round" d="M26 18h8v8"></path>
          </g>
        </svg>
      ),
    },
    {
      name: "Other Items",
      href: "admin/",
      permission: ["other_items"],
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 25 25"
          className={`fill-current
            ${
              isActive("/admin/countries") ||
              isActive("/admin/patterns") ||
              isActive("/admin/genders") ||
              isActive("/admin/collections") ||
              isActive("/admin/characteristics") ||
              isActive("/admin/attributes")
                ? "text-white"
                : "text-blueGray-200"
            }
            `}
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 17a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zm12 0a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2zM9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2zM6 15v-1a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v1m-6-6v3"
          ></path>
        </svg>
      ),
      children: [
        {
          name: "Patterns",
          href: "/admin/patterns",
          permission: "products_view",
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              className={`fill-current ${
                isActive("/admin/patterns") ? "text-white" : "text-blueGray-200"
              }`}
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm6 2v8m4-8v8m-6-6h8m-8 4h8"
              ></path>
            </svg>
          ),
        },
        {
          name: "Countries",
          href: "/admin/countries",
          permission: "products_view",
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="-50 -50 565 565"
              className={`fill-current ${
                isActive("/admin/countries")
                  ? "text-white"
                  : "text-blueGray-200"
              }`}
            >
              <path
                fill="currentColor"
                d="M236.3 65.6c1.2 0 2.7.6 4 2.4c-5.8-8.3 6.5-4.7 7.2-12.6c7-5.2 4.5-8.6 6.5-8.8l2.2-1.8c-4.3 1.6-5.8 1.9-7 1.9h-2c-1.5 0-4 .3-9.9 2.1c-13.5 1-23.2 15.6-27.8 16c-4.7 2.5-4.5 3-3.4 3c.3 0 .7-.1 1.1-.1s.7-.1 1-.1c1.1 0 .8.5-5.6 3.5c1.5.4-11.2 6-11.3 14.8c-.4 3.4 1 5.7 3.3 5.7c2 0 4.5-1.5 7.2-5.3c9-10.4 28-11.4 36.2-17.7c-5.1-.4-4.1-3-1.7-3m-45.7 3.5c-.9 0 .3-1.1 1.6-2.2c1.4-1.1 3-2.2 3-2.2l-.1.1c5.4-2.1 2.1-2.6 5-4h-.2c-.6 0 .5-.8 1.5-1.7c1-.8 1.9-1.7 1-1.7c-.5 0-1.8.3-4 1.2c.7-1 3.4-1.7 7.2-3.8c-5.5 1.8-9.8 2.9-10.3 2.9c-.4 0 1.9-.8 8.8-2.9c.3 0 .6.1.8.1c.7 0 1-.2.9-.4q-.15-.3-1.2-.3c-9.9.8-17.3 7-15.1 7.8c1.3-.4 2.2-.6 2.8-.6c1.3 0 .7 1.1-1.9 2.7c1.2 2.8-20 10-22.4 12.6c1.2-.7 2-.9 2.4-.9c1.6 0-.5 3.1-2.6 4.6c1.3 1.2 2.3 1.6 3.1 1.6c2.1 0 3-2.9 4.8-3.8c.4.8.8 1.2 1.3 1.2c1.7 0 3.8-4.2 5.5-6.4c.5.5 1.1.9 1.9.9c1.6 0 4-1.3 7.8-5c-.8.1-1.4.2-1.6.2m-23 18.4c-3.6 2.2-5.5 3.1-6.3 3.1c-1.5 0 .5-2.8 2.3-5.7c1.8-2.8 3.4-5.6 1.1-5.6c-1.1 0-3.1.6-6.3 2.2c-8.7 5.8-23.4 21.8-29.9 21.8h-.6c10.5-7.7 7.4-22.8 22.1-26.7c14.5-8.3 24.4-5.7 37.3-15.2c-3.8 1.9-9.4 4-10.7 4c-.8 0 .4-1 5.6-3.5c-.5.1-.9.2-1.2.2c-3.5 0 23-9.5 24.3-9.7c-10.9 1.5-28.5 10.6-30.9 10.6c-.3 0-.3-.1-.3-.3c.4-.3.4-.5 0-.5c-1.3 0-6.7 1.8-12.2 3.6c-5.4 1.8-10.9 3.7-12.1 3.7c-.4 0-.4-.2.2-.6c-47.2 26.8-86.6 72-98.9 125.6c5.1 11.7 1.6 34 10 40.5c9.6 8.1-8.2 31.6-3.5 46.1c4.8 26.2 25.5 44.1 27.7 70.9c3.8 18.4 17.7 40.9 23.5 52.6c4.4 4.4 16.5 17.1 18.6 17.1c.8 0 .3-1.9-2.9-7c-2-5.7-13.6-20.6-8-20.6c.3 0 .6 0 1 .1c-6.9-7 15.3-5.1-.2-14.6c-1.8-2.2-2.2-2.9-1.8-2.9c.5 0 1.9.8 3.5 1.6c1.7.8 3.7 1.6 5.3 1.6c2.5 0 4.2-1.7 3.2-7.9c.4.2.8.2 1.1.2c2.6 0 1.7-5.1 1.9-10.2s1.5-10.2 8.5-10.2c.8 0 1.7.1 2.6.2c16.2-8.8 2.1-33.1 20.7-42c-.7-20.2-27.8-21.2-38-29.4c-1.7 1-3.3 1.3-4.9 1.3c-1.8 0-3.4-.4-4.8-.9c-1.4-.4-2.7-.9-3.6-.9c-.2 0-.4 0-.6.1c17.4-4.6 4.7-28.8-9.7-28.8h-1c-1.1-10.5-6.5-6.5-7.1-15.2c-.9.5-1.8.7-2.7.7c-2.4 0-4.6-1.7-6.5-3.3c-1.9-1.7-3.5-3.3-4.9-3.3c-1.1 0-2.1 1.1-3 4.3c1-4.9.7-6.5-.3-6.5s-2.8 1.7-4.8 3.4c-1.9 1.7-4.1 3.4-5.8 3.4h-.5c-11.7-8.3.1-23-6.1-34.3c4-4.3 5.6-11.6 3.8-11.6c-.9 0-2.7 1.8-5.5 6.7c-4-10.2 6.6-33.3 15.6-34.6c.3 0 .5-.1.8-.1c1.6 0 3.2.8 4.6 2.5c.8 4.7-1.2 14.6-.4 14.6c.4 0 1.2-2 3.2-7.2c2.6-11.9 20.8-20.5 22.7-27.8c.1.1.1.1.2.1c2.1 0 15.6-11.9 21.5-13.2c2.3-2.3 3.9-3.1 5.1-3.1c1.3 0 2 1 2.5 1.9c.5 1 .9 1.9 1.4 1.9c.4 0 .9-.6 1.8-2.3c-3.1-6.1 4.9-11.9 2.7-11.9c-.8 0-3.2.8-8.1 2.8c-.8.4-1.2.5-1.4.5c-.6 0 1.8-1.6 5.3-3.2s7.9-3.2 11.6-3.2c1.8 0 3.4.4 4.6 1.4c15.5-3.7 7-8.8 7.8-8.8h.2c4.4-2.6 3.1-12.4 9.6-18.5m-69.3 40.9c-.2 0 .7-1.3 3.7-5c6.2-4.6 11.2-7.7 5.5-10.7c2.5-1.1 4.9-2.4 7.2-3.8c-.1 4.9-4.2 16.8-6.4 16.8c-.5 0-1-.7-1.2-2.2c1.3-2.3 1.4-3.2.9-3.2c-.8 0-3.1 2-5.3 4.1c-2.2 1.9-4.2 4-4.4 4m5.7 2.7c-2.7 0-2.2-1.7 6.1-3.4c3.6-.5.8-.3 5.1-1.3c-4.2 3.4-8.9 4.7-11.2 4.7M259.5 121c1.2-.2 2.1-.2 2.8-.2c2.9 0 1.6 1.2-.1 2.4s-3.8 2.4-2.6 2.4c.7 0 2.6-.4 6.5-1.5c19.7-1.4-7.7-18.1-3.3-23.7l-1.2-.4c-8.1 10.3 5.4 10.5-2.1 21m-8.2.4c1.4 0 3.2-1.6 5.1-6.1c2.6-3.1 1.5-3.5-1.3-5c-7.7 2-7 11.1-3.8 11.1m69 31.7c-.3 0-.5.1-.7.2c.8.2 1.6.4 2.4.4c-.8-.4-1.3-.6-1.7-.6M454.6 178c1.7 3.7 2.6 5.2 2.7 5.2c.7 0-12.6-32.4-18.1-38.2c-28.7-47.2-75.9-83.3-129.7-96.8h-.1c-1.4 0 .2.7 2.1 1.4s4.2 1.4 4.2 1.4s-1.5-.5-6.1-1.8c-5.1-1.5-10.3-2.6-15.6-3c-.9.3 21.9 9.3 37.2 14c-5.1-1.6-10.4-3-11.7-3c-.9 0 0 .6 3.7 2.2c-4.5-1.3-6.4-1.9-6.6-1.9c-.3 0 6 2.1 11.9 4.2c6 2.1 11.7 4.2 10.1 4.2c-.4 0-1.5-.2-3.2-.5c5.1 2.8 6.9 3.9 6.6 3.9c-.5 0-6.8-3-13.3-6c-6.4-3-12.9-6-13.8-6c-.5 0 .8 1 5.2 3.6c6 2.6 12 5.2 10.3 5.2c-.8 0-3.1-.5-7.6-1.8c10 5.1-7.1 3.1-1.3 10c-3.2-3-4.5-4-4.8-4s.5 1.2 1.3 2.4s1.4 2.4.7 2.4h-.2c7 7.6-4.9.8 3.6 7.6c-6.4-2.9-17.3-7.7-12.4-7.7c1.2 0 3.5.3 7.1 1.1c-6.5-7.6-24.9-7.9-25.3-8.8c-4.6.3-4.7 3.8-3.9 10.2c-.1 10.1-10 10.3-8.7 16.1c0-.1.1-.1.1-.1c.2 0 .3 2 .9 4.1c.7 2 1.9 4.1 4.5 4.1c1.4 0 3.2-.6 5.4-2.1c3.1 5.6 5.9 7.6 8.1 7.6c3.3 0 5.3-4.5 5.1-8.6c-3.6-2-8.3-18.6-3.1-18.6c.8 0 1.8.4 3.1 1.3c-8.1 19.9 32 6.6 9.3 15.7c5.1 6.7-3.2 6.4-.8 14.5c-3.9 1.1-8.2 2.1-12 2.1c-5.6 0-9.9-2.4-9.4-10.8c-7 3.7 7 16.2-6.9 16.2h-.8c-6.7 12.3-31.8 8.1-12.1 21.1c1.1 5.7-2.5 6.7-7.1 6.7c-1.2 0-2.5-.1-3.8-.2s-2.6-.1-3.8-.1c-5.2 0-8.9 1.3-5.7 9.4c-2.3 8.4 3.1 12.1 9.7 12.1c8 0 17.8-5.2 18.5-13.8c4.3-6.5 9.8-9.2 15.5-9.2c9 0 18.5 6.8 24.7 15.2c.5.8.9 1.1 1.1 1.1c.5 0 0-2-.2-4c-.2-1.6-.2-3.2.4-3.7c-8.9-2.5-15.7-13.3-12.7-13.3c1 0 3.1 1.2 6.5 4.4h.5c5.6 0 10 4.4 13.4 8.8c3.5 4.4 6.1 8.8 8.4 8.8c.9 0 1.8-.8 2.6-2.6c-.4-.6-1.4-2.3-1.9-4c-.6-2.1-.6-4.2 2.1-4.2c1.1 0 2.6.4 4.7 1.2c6.8-1.8-4.3-19.5 4.7-19.5c.9 0 2 .2 3.4.6c-.1 3.1 1.3 4.2 2.6 4.2c2.6 0 5.2-3.7-1.1-4.8c2.4-2.3 3.8-3.2 4.8-3.2c3.5 0 .7 11.6 12.8 11.6c4.1 9.7-35.6.7-22.9 19.3c2.9 2.1 6.5 2.5 10 2.5c1.1 0 2.1 0 3.1-.1c1 0 2-.1 2.9-.1c6.2 0 10.6 1.5 7.9 14.3c-3.3 2.4-7 3.2-10.8 3.2c-3.4 0-6.8-.6-10.1-1.2s-6.5-1.2-9.4-1.2c-4.5 0-8.1 1.5-10.3 6.7c-11.7-4.8-27.1-5-25.6-19.5c-20.4 2.9-41.7 1.4-56.7 13.9c-.9 18.3-32.3 24.2-24.7 45c-9.1 19.2 11 46.1 31.5 46.1c.7 0 1.5 0 2.2-.1c11.2-.1 22.5-5.1 32.4-5.1c5.1 0 9.7 1.3 13.7 5.3c.9-.1 1.7-.2 2.4-.2c15.3 0-4.9 24.3 13.4 28.4c16.6 17.2-10.2 34.9 2.9 51.4c1.4 12.9 7.8 23.7 7.8 36.3c1.7.2 3.3.3 5 .3c21.1 0 34.3-18.4 46.7-32.3c-3.8-20.8 29.5-24.9 18.1-48.2c-5.3-25.5 25.1-40.6 23.4-66.1c.3-3.6-.7-4.7-2.2-4.7s-3.7 1.1-5.8 2.1c-2.2 1.1-4.6 2.1-6.5 2.1c-2.5 0-4.4-1.7-4.6-7.3c-14.7-13.7-21.4-32.3-35.1-47.4c17.8 8.6 27.9 28 36.1 45.6c.7.2 1.4.3 2.2.3c14.5 0 34.7-34.7 12.7-43.1c-1.2 3.3-2.8 4.5-4.7 4.5c-3.3 0-7.1-4-9.8-7.9c-2.7-4-4.1-8-2.6-8c1 0 3.2 1.6 7 5.8c4.3 2.7 8.5 3.4 12.9 3.4c4.3 0 8.7-.7 13.3-1.1c5.8 2.3 8.3 9.7 10.1 9.7c.3 0 .7-.3 1-1c4.6 11 9.9 30.6 14.7 35.9c-2.5-16.8-3.1-34.6-7.4-51.1m-55.8-23.1c-11.3-2.9-15-16.9-23.9-25c-.1-2.2 3.2-1.8 2.4-5.5c12 3.7 8.1 7.4 7 8.1c4.4 7.3 16.7 12.3 14.5 22.4M243.5 78.8c-10.9 3.2-12.4-.3-10.5 6.4c.8.6 2.3.8 3.8.8c5.3.1 12.5-3 6.7-7.2m160.1 275.5c14.3-12.1 16.1-26.5 16.8-41.1c-6.4 12.5-25.4 26.3-16.8 41.1m-65.1-195c-.1.1-.1.1-.1.2c.1.2.2.2.2.2s0-.1-.1-.4M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0m0 492.3C125.5 492.3 19.7 386.5 19.7 256S125.5 19.7 256 19.7S492.3 125.5 492.3 256S386.5 492.3 256 492.3"
              ></path>
            </svg>
          ),
        },
        {
          name: "Genders",
          href: "/admin/genders",
          permission: "products_view",
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 256 256"
              className={`fill-current ${
                isActive("/admin/genders") ? "text-white" : "text-blueGray-200"
              }`}
            >
              <g fill="currentColor">
                <path
                  d="M176 112a56 56 0 1 1-56-56a56 56 0 0 1 56 56"
                  opacity={0.2}
                ></path>
                <path d="M208 24h-40a8 8 0 0 0 0 16h20.69l-25.15 25.15A64 64 0 1 0 112 175.48V192H88a8 8 0 0 0 0 16h24v24a8 8 0 0 0 16 0v-24h24a8 8 0 0 0 0-16h-24v-16.52a63.92 63.92 0 0 0 45.84-98L200 51.31V72a8 8 0 0 0 16 0V32a8 8 0 0 0-8-8m-88 136a48 48 0 1 1 48-48a48.05 48.05 0 0 1-48 48"></path>
              </g>
            </svg>
          ),
        },
        {
          name: "Collections",
          href: "/admin/collections",
          permission: "products_view",
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="-2 -2 25 25"
              className={`fill-current ${
                isActive("/admin/collections")
                  ? "text-white"
                  : "text-blueGray-200"
              }`}
            >
              <path
                fill="currentColor"
                d="M8 16h12V4h-2v7l-2.5-1.5L13 11V4H8zm0 2q-.825 0-1.412-.587T6 16V4q0-.825.588-1.412T8 2h12q.825 0 1.413.588T22 4v12q0 .825-.587 1.413T20 18zm-4 4q-.825 0-1.412-.587T2 20V6h2v14h14v2zm9-18h5zM8 4h12z"
              ></path>
            </svg>
          ),
        },
        {
          name: "Characteristics",
          href: "/admin/characteristics",
          permission: "products_view",
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              className={`fill-current ${
                isActive("/admin/characteristics")
                  ? "text-white"
                  : "text-blueGray-200"
              }`}
            >
              <path
                fill="currentColor"
                d="m17.402 4.723l2.718 10.142a2.75 2.75 0 0 1-1.945 3.368l-6.278 1.682a2.75 2.75 0 0 1-3.368-1.944L5.81 7.828A2.75 2.75 0 0 1 7.756 4.46l6.278-1.682a2.75 2.75 0 0 1 3.368 1.945m-6.438 3.019a1 1 0 1 0-1.932.517a1 1 0 0 0 1.932-.517m-5.163 3.917l1.762 6.57a3.73 3.73 0 0 0 1.002 1.713l-.443-.023a2.75 2.75 0 0 1-2.602-2.89zm-.925-1.479l-.355 6.796c-.037.699.12 1.363.424 1.94l-.414-.16a2.75 2.75 0 0 1-1.582-3.553z"
              ></path>
            </svg>
          ),
        },
        {
          name: "Attributes",
          href: "/admin/attributes",
          permission: "products_view",
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              id="Layer_1"
              data-name="Layer 1"
              height={24}
              width={24}
              viewBox="-3 0 28 28"
              className={`fill-current ${
                isActive("/admin/attributes")
                  ? "text-white"
                  : "text-blueGray-200"
              }`}
            >
              <path d="m20.5,8c-1.93,0-3.5,1.57-3.5,3.5s1.57,3.5,3.5,3.5,3.5-1.57,3.5-3.5-1.57-3.5-3.5-3.5Zm0,5c-.827,0-1.5-.673-1.5-1.5s.673-1.5,1.5-1.5,1.5.673,1.5,1.5-.673,1.5-1.5,1.5Zm0,4c-1.93,0-3.5,1.57-3.5,3.5s1.57,3.5,3.5,3.5,3.5-1.57,3.5-3.5-1.57-3.5-3.5-3.5Zm0,5c-.827,0-1.5-.673-1.5-1.5s.673-1.5,1.5-1.5,1.5.673,1.5,1.5-.673,1.5-1.5,1.5Zm-5.5-13c0,.552-.447,1-1,1H1c-.553,0-1-.448-1-1s.447-1,1-1h13c.553,0,1,.448,1,1ZM0,13c0-.552.447-1,1-1h10c.553,0,1,.448,1,1s-.447,1-1,1H1c-.553,0-1-.448-1-1Zm15,5c0,.552-.447,1-1,1H1c-.553,0-1-.448-1-1s.447-1,1-1h13c.553,0,1,.448,1,1Zm-3,4c0,.552-.447,1-1,1H1c-.553,0-1-.448-1-1s.447-1,1-1h10c.553,0,1,.448,1,1ZM3,6h18c1.654,0,3-1.346,3-3s-1.346-3-3-3H3C1.346,0,0,1.346,0,3s1.346,3,3,3Zm0-4h18c.552,0,1,.449,1,1s-.448,1-1,1H3c-.552,0-1-.449-1-1s.448-1,1-1Z" />
            </svg>
          ),
        },
      ],
    },
    // {
    //   name: "Product Review",
    //   href: "/admin/reviews/products",
    //   permission: "products_view",
    //   icon: (
    //     <svg
    //       xmlns="http://www.w3.org/2000/svg"
    //       width={24}
    //       height={24}
    //       viewBox="0 0 24 24"
    //       fill="none"
    //       className={`fill-current ${
    //         isActive("/admin/reviews/products")
    //           ? "text-white"
    //           : "text-blueGray-200"
    //       }`}
    //     >
    //       <path
    //         opacity="0.32"
    //         fillRule="evenodd"
    //         clipRule="evenodd"
    //         d="M4.12319 2.24369C5.3177 2.12083 7.30475 2 10.5 2C13.6952 2 15.6823 2.12083 16.8768 2.24369C17.8972 2.34863 18.6398 3.10549 18.7572 4.12444C18.8797 5.18775 19 6.7933 19 9C19 11.2067 18.8797 12.8123 18.7572 13.8756C18.6398 14.8945 17.8973 15.6514 16.877 15.7563C15.822 15.8648 14.1489 15.9717 11.571 15.9952C11.1714 15.9989 10.7875 16.1592 10.507 16.4437L8.816 18.1584C8.08185 18.9029 6.8125 18.4707 6.6853 17.4328L6.55145 16.3414C6.52175 16.099 6.3197 15.9137 6.0759 15.9011C5.26545 15.859 4.62502 15.8079 4.12397 15.7564C3.10365 15.6515 2.36022 14.8945 2.24278 13.8756C2.12023 12.8123 2 11.2067 2 9C2 6.7933 2.12023 5.18775 2.24278 4.12444C2.36022 3.10549 3.10287 2.34863 4.12319 2.24369ZM7 6C6.4477 6 6 6.4477 6 7C6 7.5523 6.4477 8 7 8H14C14.5523 8 15 7.5523 15 7C15 6.4477 14.5523 6 14 6H7ZM7 10.5C6.4477 10.5 6 10.9477 6 11.5C6 12.0523 6.4477 12.5 7 12.5H11C11.5523 12.5 12 12.0523 12 11.5C12 10.9477 11.5523 10.5 11 10.5H7Z"
    //       />
    //       <path d="M5.99925 7C5.99925 6.4477 6.44695 6 6.99925 6H13.9993C14.5516 6 14.9993 6.4477 14.9993 7C14.9993 7.5523 14.5516 8 13.9993 8H6.99925C6.44695 8 5.99925 7.5523 5.99925 7Z" />
    //       <path d="M5.99925 11.5C5.99925 10.9477 6.44695 10.5 6.99925 10.5H10.9993C11.5516 10.5 11.9993 10.9477 11.9993 11.5C11.9993 12.0523 11.5516 12.5 10.9993 12.5H6.99925C6.44695 12.5 5.99925 12.0523 5.99925 11.5Z" />
    //       <path d="M10.0259 16.9308L10.5063 16.4437C10.7868 16.1592 11.1707 15.9989 11.5703 15.9952C14.1481 15.9717 15.8213 15.8648 16.8763 15.7563C17.8966 15.6514 18.6391 14.8945 18.7565 13.8755C18.8365 13.1809 18.9156 12.2547 18.9608 11.0808C19.4676 11.1109 19.8667 11.1462 20.1775 11.1811C20.803 11.2514 21.2617 11.7033 21.3395 12.3279C21.4208 12.9808 21.4993 13.9995 21.4993 15.5C21.4993 17.0005 21.4208 18.0192 21.3395 18.6721C21.2617 19.2967 20.8024 19.7486 20.1769 19.8189C19.7588 19.8659 19.1811 19.9136 18.3964 19.9483C18.1644 19.9585 17.9675 20.1252 17.9226 20.3531L17.7519 21.219C17.6399 21.7868 16.9541 22.0192 16.52 21.6364L15.0714 20.3589C14.8031 20.1223 14.4578 19.9901 14.1001 19.9816C12.7852 19.9504 11.9012 19.884 11.3225 19.819C10.697 19.7488 10.2369 19.2967 10.1591 18.6721C10.1068 18.2528 10.0558 17.6826 10.0259 16.9308Z" />
    //     </svg>
    //   ),
    // },
    {
      name: "Orders",
      href: "/admin/orders",
      permission: [
        "orders_view",
        "orders_create",
        "orders_update",
        "orders_delete",
      ],
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          className={`fill-current ${
            isActive("/admin/orders") ? "text-white" : "text-blueGray-200"
          }`}
        >
          <path
            opacity="0.32"
            d="M3.41016 2.00012C2.71981 2.00012 2.16016 2.55977 2.16016 3.25012C2.16016 3.94048 2.71981 4.50012 3.41016 4.50012H4.25251C4.48986 4.50012 4.69436 4.66605 4.74281 4.89837C4.96591 5.96777 5.59766 8.95907 6.10461 11.0001C6.73135 13.5236 7.29935 15.342 7.6574 16.4029C8.09928 16.1467 8.61259 16 9.16016 16C10.446 16 11.5429 16.809 11.9697 17.9457C12.7178 17.9791 13.5912 18.0001 14.6046 18.0001C15.462 18.0001 16.2042 17.9851 16.8452 17.9602C17.2681 16.8159 18.3689 16 19.6602 16C20.2143 16 20.7334 16.1503 21.1789 16.4123C21.5323 15.5226 22.0073 14.0331 22.4102 11.7501C22.6992 10.1123 22.8768 8.88287 22.986 7.99032C23.1201 6.89392 22.2647 6.00012 21.1602 6.00012H7.66016L7.03891 3.51505C6.81631 2.62472 6.01636 2.00012 5.09861 2.00012H3.41016Z"
          />
          <path d="M17.5505 10.5941C17.6091 10.0083 17.1491 9.5 16.5604 9.5C16.0492 9.5 15.6212 9.88735 15.5703 10.3961L15.2694 13.4059C15.2108 13.9917 15.6708 14.5 16.2595 14.5C16.7707 14.5 17.1987 14.1126 17.2496 13.6039L17.5505 10.5941Z" />
          <path d="M12.7496 10.3961C12.6987 9.88735 12.2707 9.5 11.7595 9.5C11.1708 9.5 10.7108 10.0083 10.7694 10.5941L11.0703 13.6039C11.1212 14.1126 11.5492 14.5 12.0604 14.5C12.6491 14.5 13.1091 13.9917 13.0505 13.4059L12.7496 10.3961Z" />
          <path d="M16.6602 19C16.6602 20.6569 18.0033 22 19.6602 22C21.317 22 22.6602 20.6569 22.6602 19C22.6602 17.3432 21.317 16 19.6602 16C18.0033 16 16.6602 17.3432 16.6602 19Z" />
          <path d="M6.16016 19C6.16016 20.6569 7.50331 22 9.16016 22C10.817 22 12.1602 20.6569 12.1602 19C12.1602 17.3432 10.817 16 9.16016 16C7.50331 16 6.16016 17.3432 6.16016 19Z" />
        </svg>
      ),
    },
    {
      name: "Wishlist",
      href: "/admin/wishlist",
      permission: [
        "wishList_view",
        "whishList_product_add",
        "whishList_product_update",
        "whishList_product_remove",
      ],
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          className={`fill-current ${
            isActive("/admin/wishlist") ? "text-white" : "text-blueGray-200"
          }`}
        >
          <path
            opacity="0.32"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.12319 2.24369C5.3177 2.12083 7.30475 2 10.5 2C13.6952 2 15.6823 2.12083 16.8768 2.24369C17.8972 2.34863 18.6398 3.10549 18.7572 4.12444C18.8797 5.18775 19 6.7933 19 9C19 11.2067 18.8797 12.8123 18.7572 13.8756C18.6398 14.8945 17.8973 15.6514 16.877 15.7563C15.822 15.8648 14.1489 15.9717 11.571 15.9952C11.1714 15.9989 10.7875 16.1592 10.507 16.4437L8.816 18.1584C8.08185 18.9029 6.8125 18.4707 6.6853 17.4328L6.55145 16.3414C6.52175 16.099 6.3197 15.9137 6.0759 15.9011C5.26545 15.859 4.62502 15.8079 4.12397 15.7564C3.10365 15.6515 2.36022 14.8945 2.24278 13.8756C2.12023 12.8123 2 11.2067 2 9C2 6.7933 2.12023 5.18775 2.24278 4.12444C2.36022 3.10549 3.10287 2.34863 4.12319 2.24369ZM7 6C6.4477 6 6 6.4477 6 7C6 7.5523 6.4477 8 7 8H14C14.5523 8 15 7.5523 15 7C15 6.4477 14.5523 6 14 6H7ZM7 10.5C6.4477 10.5 6 10.9477 6 11.5C6 12.0523 6.4477 12.5 7 12.5H11C11.5523 12.5 12 12.0523 12 11.5C12 10.9477 11.5523 10.5 11 10.5H7Z"
          />
          <path d="M5.99925 7C5.99925 6.4477 6.44695 6 6.99925 6H13.9993C14.5516 6 14.9993 6.4477 14.9993 7C14.9993 7.5523 14.5516 8 13.9993 8H6.99925C6.44695 8 5.99925 7.5523 5.99925 7Z" />
          <path d="M5.99925 11.5C5.99925 10.9477 6.44695 10.5 6.99925 10.5H10.9993C11.5516 10.5 11.9993 10.9477 11.9993 11.5C11.9993 12.0523 11.5516 12.5 10.9993 12.5H6.99925C6.44695 12.5 5.99925 12.0523 5.99925 11.5Z" />
          <path d="M10.0259 16.9308L10.5063 16.4437C10.7868 16.1592 11.1707 15.9989 11.5703 15.9952C14.1481 15.9717 15.8213 15.8648 16.8763 15.7563C17.8966 15.6514 18.6391 14.8945 18.7565 13.8755C18.8365 13.1809 18.9156 12.2547 18.9608 11.0808C19.4676 11.1109 19.8667 11.1462 20.1775 11.1811C20.803 11.2514 21.2617 11.7033 21.3395 12.3279C21.4208 12.9808 21.4993 13.9995 21.4993 15.5C21.4993 17.0005 21.4208 18.0192 21.3395 18.6721C21.2617 19.2967 20.8024 19.7486 20.1769 19.8189C19.7588 19.8659 19.1811 19.9136 18.3964 19.9483C18.1644 19.9585 17.9675 20.1252 17.9226 20.3531L17.7519 21.219C17.6399 21.7868 16.9541 22.0192 16.52 21.6364L15.0714 20.3589C14.8031 20.1223 14.4578 19.9901 14.1001 19.9816C12.7852 19.9504 11.9012 19.884 11.3225 19.819C10.697 19.7488 10.2369 19.2967 10.1591 18.6721C10.1068 18.2528 10.0558 17.6826 10.0259 16.9308Z" />
        </svg>
      ),
    },
    {
      name: "Roles",
      href: "/admin/roles",
      permission: ["roles_view", "role_create", "role_update", "role_delete"],
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          className={`fill-current ${
            isActive("/admin/roles") ? "text-white" : "text-blueGray-200"
          }`}
        >
          <path
            fill="currentColor"
            d="M15 21h-2a2 2 0 0 1 0-4h2v-2h-2a4 4 0 0 0 0 8h2Zm8-2a4 4 0 0 1-4 4h-2v-2h2a2 2 0 0 0 0-4h-2v-2h2a4 4 0 0 1 4 4"
          ></path>
          <path
            fill="currentColor"
            d="M14 18h4v2h-4zm-7 1a5.989 5.989 0 0 1 .09-1H3v-1.4c0-2 4-3.1 6-3.1a8.548 8.548 0 0 1 1.35.125A5.954 5.954 0 0 1 13 13h5V4a2.006 2.006 0 0 0-2-2h-4.18a2.988 2.988 0 0 0-5.64 0H2a2.006 2.006 0 0 0-2 2v14a2.006 2.006 0 0 0 2 2h5.09A5.989 5.989 0 0 1 7 19M9 2a1 1 0 1 1-1 1a1.003 1.003 0 0 1 1-1m0 4a3 3 0 1 1-3 3a2.996 2.996 0 0 1 3-3"
          ></path>
        </svg>
      ),
    },
    {
      name: "Permission",
      href: "/admin/permission",
      permission: [
        "permissions_view",
        "permission_create",
        "permission_update",
        "permission_delete",
      ],
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 48 48"
          className={`fill-current ${
            isActive("/admin/permission") ? "text-white" : "text-blueGray-200"
          }`}
        >
          <g
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth={4}
          >
            <path
              strokeLinejoin="round"
              d="M20 10H6a2 2 0 0 0-2 2v26a2 2 0 0 0 2 2h36a2 2 0 0 0 2-2v-2.5"
            ></path>
            <path d="M10 23h8m-8 8h24"></path>
            <circle
              cx={34}
              cy={16}
              r={6}
              fill="currentColor"
              strokeLinejoin="round"
            ></circle>
            <path
              strokeLinejoin="round"
              d="M44 28.419C42.047 24.602 38 22 34 22s-5.993 1.133-8.05 3"
            ></path>
          </g>
        </svg>
      ),
    },
    {
      name: "Contacts",
      href: "/admin/contacts",
      permission: ["contacts_view"],
      icon: (
        <svg
          width={24}
          height={24}
          className={`fill-current ${
            isActive("/admin/contacts") ? "text-white" : "text-blueGray-200"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M14 11h7V6h-7zm3.5-1.25L15 8V7l2.5 1.75L20 7v1zM2 21q-.825 0-1.412-.587T0 19V5q0-.825.588-1.412T2 3h20q.825 0 1.413.588T24 5v14q0 .825-.587 1.413T22 21zm7-7q1.25 0 2.125-.875T12 11t-.875-2.125T9 8t-2.125.875T6 11t.875 2.125T9 14m-6.9 5h13.8q-1.05-1.875-2.9-2.937T9 15t-4 1.063T2.1 19"
          ></path>
        </svg>
      ),
    },
  ];

  // return (
  //   <aside className="w-1/5 ">
  //     <SimpleBar
  //       style={{ height: "100vh", position: "sticky" }}
  //       className="top-0 left-0 border border-[#cfd8dc] p-5 space-y-2 shadow  bg-[#ffffff] m-5 rounded-lg"
  //     >
  //       <div className="flex justify-center bg-white p-4 mb-2 shadow rounded-lg border border-[#cfd8dc]">
  //         <Link href="/" className="flex items-center gap-2">
  //           <Image width={150} height={150} src="/logo.svg" alt="logo" />{" "}
  //         </Link>
  //       </div>
  //       <div className="divide-y dark:divide-gray-300">
  //         <ul className="pt-2 pb-4 space-y-1 text-sm">
  //           {navItems.map((item) => {
  //             if (
  //               checkPermission(session?.user?.permissions, item.permission)
  //             ) {
  //               return (
  //                 <li
  //                   key={item.name}
  //                   className="dark:bg-gray-100 dark:text-gray-900 "
  //                 >
  //                   <Link href={item.href}>
  //                     <ListItem
  //                       className={`flex align-middle text-base	 bg-white select-none transition-all items-center py-4 px-4 font-emirates ${
  //                         isActive(item.href)
  //                           ? "bg-[#424242] hover:bg-[primary-100] focus:bg-[#424242] text-white"
  //                           : "hover:bg-blueGray-100"
  //                       }`}
  //                     >
  //                       <ListItemPrefix>{item.icon}</ListItemPrefix>
  //                       <span
  //                         className={`font-semibold ${
  //                           isActive(item.href)
  //                             ? "text-white"
  //                             : "text-blueGray-200"
  //                         } `}
  //                       >
  //                         {item.name}
  //                       </span>
  //                     </ListItem>
  //                   </Link>
  //                 </li>
  //               );
  //             } else {
  //               return null;
  //             }
  //           })}
  //         </ul>
  //       </div>
  //     </SimpleBar>
  //   </aside>
  // );

  return (
    <aside className="w-1/5">
      <SimpleBar
        style={{ height: "850px", position: "sticky" }}
        className="top-0 left-0 border border-[#cfd8dc] p-5 space-y-2 shadow bg-[#ffffff] mx-5 mt-5 rounded-lg"
      >
        <div className="flex justify-center bg-white p-3 mb-2 shadow rounded-lg border border-[#cfd8dc]">
          <Link href="/" className="flex items-center gap-2">
            <Image width={150} height={150} src="/logo.svg" alt="logo" />
          </Link>
        </div>
        <div className="divide-y dark:divide-gray-300">
          <List className="pt-2 pb-2 space-y-1 text-sm">
            {navItems.map((item, index) => {
              const isItemActive = item.children
                ? item.children.some((child) => isActive(child.href))
                : isActive(item.href);
              if (
                checkPermission(session?.user?.permissions, item.permission)
              ) {
                if (item.children) {
                  return (
                    <Accordion
                      key={index}
                      open={open === index + 1}
                      icon={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1em"
                          height="1em"
                          viewBox="0 0 24 24"
                          className={`ml-auto ${
                            open === index + 1 ? "rotate-180" : ""
                          }`}
                        >
                          <path
                            fill="currentColor"
                            d="m12 13.171l4.95-4.95l1.414 1.415L12 16L5.636 9.636L7.05 8.222z"
                          ></path>
                        </svg>
                      }
                    >
                      <AccordionHeader
                        className={`flex align-middle w-full rounded-lg text-base select-none transition-all items-center font-emirates pl-4 pr-2 py-4 border-b-0  
                          ${
                            isItemActive
                              ? `bg-[#434343] hover:bg-[#414141] hover:text-white focus:text-white focus:bg-[#424242] text-white`
                              : open === index + 1
                              ? "bg-blueGray-100"
                              : "hover:bg-blueGray-100"
                          }`}
                        selected={open === index + 1}
                        onClick={() => handleOpen(index + 1)}
                      >
                        <ListItemPrefix>{item.icon}</ListItemPrefix>
                        <span
                          className={`font-semibold
                             ${
                               isItemActive ? "text-white" : "text-blueGray-200"
                             } `}
                        >
                          {item.name}
                        </span>
                        <ListItemSuffix>
                          {/* <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="28"
                            height="28"
                            viewBox="0 0 24 24"
                            className={`ml-auto ${
                              open ? "rotate-180 text-white" : ""
                            }`}
                          >
                            <path
                              fill="currentColor"
                              d="m11.808 14.77l-3.715-4.458A.8.8 0 0 1 8.708 9h6.584a.8.8 0 0 1 .614 1.312l-3.714 4.458a.25.25 0 0 1-.384 0"
                            ></path>
                          </svg> */}
                        </ListItemSuffix>
                      </AccordionHeader>
                      <AccordionBody className={`px-0 py-0`}>
                        <List className="p-0 pt-2">
                          {item.children.map((childItem) => {
                            if (
                              checkPermission(
                                session?.user?.permissions,
                                childItem.permission
                              )
                            ) {
                              return (
                                <Link
                                  key={childItem.name}
                                  href={childItem.href}
                                >
                                  <ListItem
                                    className={`flex align-middle text-base bg-white select-none transition-all items-center py-4 px-4 font-emirates ${
                                      isActive(childItem.href)
                                        ? "bg-[#424242] hover:bg-[primary-100] focus:bg-[#424242] text-white"
                                        : "hover:bg-blueGray-100"
                                    }`}
                                  >
                                    <ListItemPrefix>
                                      {childItem.icon}
                                    </ListItemPrefix>
                                    <span
                                      className={`font-semibold ${
                                        isActive(childItem.href)
                                          ? "text-white"
                                          : "text-blueGray-200"
                                      }`}
                                    >
                                      {childItem.name}
                                    </span>
                                  </ListItem>
                                </Link>
                              );
                            } else {
                              return null;
                            }
                          })}
                        </List>
                      </AccordionBody>
                    </Accordion>
                  );
                } else {
                  return (
                    <Link href={item.href} key={index}>
                      <ListItem
                        className={`flex align-middle text-base bg-white select-none transition-all items-center py-4 px-4 font-emirates ${
                          isActive(item.href)
                            ? "bg-[#424242] hover:bg-[primary-100] focus:bg-[#424242] text-white"
                            : "hover:bg-blueGray-100"
                        }`}
                      >
                        <ListItemPrefix>{item.icon}</ListItemPrefix>
                        <span
                          className={`font-semibold ${
                            isActive(item.href)
                              ? "text-white"
                              : "text-blueGray-200"
                          } `}
                        >
                          {item.name}
                        </span>
                      </ListItem>{" "}
                    </Link>
                  );
                }
              } else {
                return null;
              }
            })}
          </List>
        </div>
      </SimpleBar>
    </aside>
  );
};

export default Sidebar;

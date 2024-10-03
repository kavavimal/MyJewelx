"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import DeviderX from "./DeviderX";

const LinkItem = ({ item }) => (
  <Link
    href={item.link}
    className={`${
      item.current ? "text-gray-400" : ""
    } font-emirates capitalize`}
  >
    {item.label}
  </Link>
);
const Seperator = () => <span className="saperator">/</span>;

const AutoBreads = () => {
  const paths = usePathname();
  const pathNames = paths.split("/").filter((path) => path);
  return pathNames.map((link, index) => {
    let href = `/${pathNames.slice(0, index + 1).join("/")}`;

    return (
      <React.Fragment key={"breadc" + index}>
        <Seperator />
        <LinkItem
          key={index}
          item={{
            link: href,
            label: link.replaceAll("-", " "),
            current: paths === href,
          }}
        />
      </React.Fragment>
    );
  });
};

export default function Breadcrumbs({
  items,
  autoBread = false,
  showDevider = false,
}) {
  return (
    <>
      <div className="flex items-center justify-start gap-2">
        <LinkItem item={{ link: "/", label: "Home" }} />
        {autoBread ? (
          <AutoBreads />
        ) : (
          <>
            {items && items?.length > 0
              ? items.map((linkitem) => (
                  <React.Fragment key={"bread" + linkitem.label}>
                    <Seperator />
                    <LinkItem key={"bread" + linkitem.label} item={linkitem} />
                  </React.Fragment>
                ))
              : ""}
          </>
        )}
      </div>
      {showDevider ? <DeviderX /> : ""}
    </>
  );
}

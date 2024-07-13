import Link from "next/link";
import React from "react";

const LinkItem = ({ item }) => (
  <Link
    href={item.link}
    className={`${item.current ? "text-gray-400" : ""} font-emirates`}
  >
    {item.label}
  </Link>
);
const Seperator = () => <span className="saperator">/</span>;
export default function Breadcrumbs({ items }) {
  return (
    <div className="flex items-center justify-start gap-2">
      <LinkItem item={{ link: "/home", label: "Home" }} />

      {items && items?.length > 0
        ? items.map((linkitem) => (
            <>
              <Seperator />
              <LinkItem key={"bread" + linkitem.label} item={linkitem} />
            </>
          ))
        : ""}
    </div>
  );
}

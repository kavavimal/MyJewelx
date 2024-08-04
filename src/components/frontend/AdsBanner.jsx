import Image from "next/image";
import Link from "next/link";

export default function AdsBanner({ image, title, link }) {
  return (
    <div className="relative h-[364px] flex flex-col items-center justify-center align-middle">
      <Image
        src={image}
        alt={title}
        width={350}
        height={364}
        responsive
        className="w-full h-full"
      />
      <div className="absolute top-[23px] flex flex-col items-center text-center justify-center">
        <h3 className="font-playfairdisplay font-semibold text-[24px] text-white pb-2.5">
          {title}
        </h3>
        <p className="flex items-center gap-2 text-[10px] text-white font-emirates pb-6">
          <svg
            width="50"
            height="1"
            viewBox="0 0 50 1"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M50 0.5H0" stroke="white" />
          </svg>
          LAB GROWN DIOMAND
          <svg
            width="50"
            height="1"
            viewBox="0 0 50 1"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M50 0.5H0" stroke="white" />
          </svg>
        </p>
        {link && link !== false ? (
          <Link
            className="border border-white pt-[8px] pb-[6px] pl-[25px] pr-[24px] rounded-sm text-center text-white"
            href={link.link}
          >
            {link.label}
          </Link>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

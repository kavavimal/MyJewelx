export default function Paragraph({ children, classes, size, color, block }) {
  return (
    <span
      className={` text-${color ? color : "blueGray-300"} text-${
        size ? size : "18px"
      } ${classes} `}
    >
      {children}
    </span>
  );
}


export default function Paragraph({ children, classes, size, color, block }) {
  return (
    <span
      className={` text-${color ? color : "gray-500"} text-${
        size ? size : "sm"
      } ${classes} `}
    >
      {children}
    </span>
  );
}

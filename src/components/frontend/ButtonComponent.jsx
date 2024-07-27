export default function ButtonComponent({
  children,
  onClick,
  classes,
  type,
  fullWidth = true,
}) {
  return (
    <button
      type={type ? type : "button"}
      className={`block ${
        fullWidth ? "w-full" : "w-auto"
      } middle none rounded bg-primary-200 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-black shadow-md shadow-primary-200/10 transition-all hover:shadow-lg hover:primary-200/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ${classes}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

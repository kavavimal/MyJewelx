export default function ButtonComponent({ children, onClick, classes, type }) {
  return (
    <button
      type={type ? type : "button"}
      className={`flex text-center justify-center text-black weight-700 bg-[#F0AE11] border-0 py-2 flex-1 px-3 mr-2 focus:outline-none hover:bg-yellow-600 rounded ${classes}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

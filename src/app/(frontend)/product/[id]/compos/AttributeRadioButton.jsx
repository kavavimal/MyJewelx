import React from "react";

export default function AttributeRadioButton({
  handleRadioChange,
  name,
  selectedOption,
  value,
  label,
  bgColor,
}) {
  const style = {};
  if (bgColor) {
    style['backgroundColor'] = bgColor;
  }
  return (
    <label
      className={`flex items-center justify-center w-8 h-8 py-1 text-black rounded-full cursor-pointer font-normal text-[12px] leading-[14px] ${
        selectedOption === value
          ? "ring-1  ring-offset-[3px] ring-[#F0AE11] bg-[#F0AE11]"
          : "border border-gray-500"
      }`}
      style={style}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={selectedOption === value}
        onChange={handleRadioChange}
        className="hidden"
      />
      {label}
    </label>
  );
}

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
    style["backgroundColor"] = bgColor;
  }

  return (
    <label
      className={`flex items-center justify-center w-8 h-8 py-1 text-black rounded-full cursor-pointer font-normal text-[12px] leading-[14px] ${
        selectedOption === value
          ? `ring-1  ring-offset-[3px]  ring-primary-200  bg-primary-200`
          : `border border-blueGray-400`
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
      {bgColor ? "" : label}
    </label>
  );
}

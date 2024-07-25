import React, { useCallback, useEffect, useState, useRef } from "react";

export default function PriceFilter({ filterByPrice }) {
  const [minRangePrice, setMinRangePrice] = useState(1);
  const [maxRangePrice, setMaxRangePrice] = useState(200000);

  const min = 0;
  const max = 2000000;

  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const range = useRef(null);

  const getPercent = useCallback(
    (value) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);

  // useEffect(() => {
  //   filterByPrice(minVal, maxVal);
  // }, [minVal, maxVal]);

  return (
    // <div className="flex w-64 m-auto items-center h-32 justify-center">
    //   Min:{" "}
    //   <input
    //     type="number"
    //     name="minrangeprice"
    //     value={minRangePrice}
    //     max={maxRangePrice - 1}
    //     onChange={(e) => setMinRangePrice(e.target.value)}
    //   />
    //   Max:{" "}
    //   <input
    //     type="number"
    //     name="maxrangeprice"
    //     min={minRangePrice + 1}
    //     value={maxRangePrice}
    //     onChange={(e) => setMaxRangePrice(e.target.value)}
    //   />
    //   <button
    //     type="button"
    //     onClick={() => filterByPrice(minRangePrice, maxRangePrice)}
    //   >
    //     Filter
    //   </button>
    // </div>

    <div className="ms-60">
      <input
        type="range"
        min={min}
        max={max}
        value={minVal}
        onChange={(event) => {
          const value = Math.min(Number(event.target.value), maxVal - 1);
          setMinVal(value);
          minValRef.current = value;
        }}
        className="thumb thumb--left"
        style={{ zIndex: minVal > max - 100 && "5" }}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={maxVal}
        onChange={(event) => {
          const value = Math.max(Number(event.target.value), minVal + 1);
          setMaxVal(value);
          maxValRef.current = value;
        }}
        className="thumb thumb--right"
      />

      <div className="slider">
        <div className="slider__track" />
        <div ref={range} className="slider__range" />
        <div className="slider__left-value">{minVal}</div>
        <div className="slider__right-value">{maxVal}</div>
      </div>
    </div>
  );
}

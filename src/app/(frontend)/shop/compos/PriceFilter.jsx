import React, { useState } from "react";

export default function PriceFilter({ filterByPrice }) {
  const [minRangePrice, setMinRangePrice] = useState(1);
  const [maxRangePrice, setMaxRangePrice] = useState(200000);

  return (
    <div className="flex w-64 m-auto items-center h-32 justify-center">
      Min:{" "}
      <input
        type="number"
        name="minrangeprice"
        value={minRangePrice}
        max={maxRangePrice - 1}
        onChange={(e) => setMinRangePrice(e.target.value)}
      />
      Max:{" "}
      <input
        type="number"
        name="maxrangeprice"
        min={minRangePrice + 1}
        value={maxRangePrice}
        onChange={(e) => setMaxRangePrice(e.target.value)}
      />
      <button
        type="button"
        onClick={() => filterByPrice(minRangePrice, maxRangePrice)}
      >
        Filter
      </button>
    </div>
  );
}

import React from "react";

export type PriceRange = {
  min: number;
  max?: number;
  selected: boolean;
  id: number;
};

type PriceRangeFilterProps = {
  priceRanges: PriceRange[];
  handleSelectedPriceRangesChange: (value: PriceRange) => void;
};

export function PriceRangeFilter(props: PriceRangeFilterProps) {
  const { priceRanges, handleSelectedPriceRangesChange } = props;

const generatePriceRangeLabel = (range: PriceRange): string => {
  if (range.max === undefined) {
    return `R${range.min} +`;
  }
  return `R${range.min} - R${range.max}`;
};

  const handlePriceRangeChange = (costRange: PriceRange) => {
    handleSelectedPriceRangesChange(costRange);
  };

  return (
    <div>
      {priceRanges.map((costRange, i) => (
        <div key={i}>
          <label htmlFor={`cost-range-${i}`}>
            <input
              id={`cost-range-${i}`}
              type="checkbox"
              checked={costRange.selected}
              onChange={() => handlePriceRangeChange(costRange)}
            />
            {generatePriceRangeLabel(costRange)}
          </label>
        </div>
      ))}
    </div>
  );
}
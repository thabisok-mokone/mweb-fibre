import React from "react";
import type { Provider } from "../../services-infomation/providerInfo";
import { PriceRangeFilter } from "../price-range-filter/PriceRangeFilter";
import { ProviderFilter } from "../../services-filter/servicesFilter";


interface ProductFilterMenuBarProps {
  priceRanges: PriceRange[];
  handleSelectedPriceRangesChange: (value: PriceRange) => void;
  providers: Provider[];
  handleSelectedProvidersChange: (value: Provider) => void;
}
interface PriceRange {
  min: number;
  max?: number;
  selected: boolean;
  id: number;
}

export const ProductFilter: React.FC<ProductFilterMenuBarProps> = ({
  providers,
  handleSelectedProvidersChange,
  priceRanges,
  handleSelectedPriceRangesChange,
}) => {
  const selectedProviders = providers.filter((provider) => provider.selected);
  const selectedPriceRanges = priceRanges.filter((priceRange) => priceRange.selected);


  return (
    <div>
      <div>
        <div>
          <h1>Product Price Range</h1>
          <span>{selectedPriceRanges.length}</span>
        </div>
        <div>
          <PriceRangeFilter
            priceRanges={priceRanges}
            handleSelectedPriceRangesChange={handleSelectedPriceRangesChange}
          />
        </div>
      </div>
      <div>
        <div>
          <h1>Providers</h1>
          <span>{selectedProviders.length}</span>
        </div>
        <div>
          <ProviderFilter
            providers={providers}
            handleSelectedProvidersChange={handleSelectedProvidersChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;

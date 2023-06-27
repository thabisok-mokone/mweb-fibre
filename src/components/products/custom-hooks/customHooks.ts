import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { type CampaignRes, useCampaigns } from "@/components/campaigns/CampaignSelector";
import { type Provider, providerInfo } from "../../services-infomation/providerInfo";
import axios from "axios";
import {
 FILTER_PRICE,
  getProductsPromo,
  applyFiltersOnProducts,
} from "../utils";
import {
  type ProductPromoResponse,
  type ProductsFilter,
  type PriceRange,
} from "../types";

const BASE_URL = "https://apigw.mweb.co.za/prod/baas/proxy";

export const generatePromoCodeProductsURL = (promocodes: string[]) => {
  return `${BASE_URL}/marketing/products/promos/${promocodes.join(
    ","
  )}?sellable_online=true`;
};

export const fetchProducts = (
  promoCodes: string[]
): Promise<ProductPromoResponse> =>
  axios
    .get<ProductPromoResponse>(generatePromoCodeProductsURL(promoCodes))
    .then((response) => response.data);

export const useProducts = (params: {
  promoCodes: string[];
  filters: ProductsFilter;
}) => {
  const { promoCodes, filters } = params;

  const promoProductsQuery = useQuery({
    queryKey: ["promoProducts", promoCodes],
    queryFn: () => fetchProducts(promoCodes),
    enabled: !!promoCodes.length,
  });

  const { data } = promoProductsQuery;
  const products = data ? data.map(getProductsPromo).flat() : undefined;

  // Remove duplicates in the returned product response
  const productSet =
    products?.filter(
      (value, index, self) => self.findIndex((m) => m.id === value.id) === index
    ) || [];

  const filteredProducts = applyFiltersOnProducts(productSet, filters);

  return {
    products: filteredProducts,
    productsQuery: promoProductsQuery,
  };
};

export const useProductSelection = (
  prefetchedCampaignResponse?: CampaignRes
) => {
 const campaignQuery = useCampaigns({
    initialData: prefetchedCampaignResponse,
  });

  const [selectedCampaign, setSelectedCampaign] = useState(
    prefetchedCampaignResponse?.campaigns[0]
  );

  const [priceRanges, setPriceRanges] = useState(FILTER_PRICE);
  const [providers, setProviders] = useState(providerInfo);

  const selectedPriceRanges = priceRanges.filter((range) => range.selected);
  const selectedProviders = providers
    .filter((provider) => provider.selected)
    .map((provider) => provider.name);

  const promoCodes = selectedCampaign?.promocodes || [];
  const { products, productsQuery } = useProducts({
    promoCodes,
    filters: {
      selectedPriceRanges,
      selectedProviders,
    },
  });

  const handleSelectedCampaignChange = (value: string) => {
    const campaign = campaignQuery.data?.campaigns.find(
      (campaign) => campaign.code === value
    );
    setSelectedCampaign(campaign);
  };

  const handleSelectedPriceRangesChange = (value: PriceRange) => {
    const newPriceRanges = priceRanges.map((range) => {
      if (range.id === value.id) {
        return { ...range, selected: !range.selected };
      }
      return range;
    });
    setPriceRanges(newPriceRanges);
  };

const handleSelectedProvidersChange = (value: Provider) => {
  const newProviders = providers.map((provider) =>
    provider.code === value.code ? { ...provider, selected: !provider.selected } : provider
  );
  setProviders(newProviders);
};

const handleClearSelectedFilters = () => {
  const newPriceRanges = priceRanges.map((range) => ({
    ...range,
    selected: false,
  }));

  const newProviders = providers.map((provider) => ({
    ...provider,
    selected: false,
  }));

  setPriceRanges(newPriceRanges);
  setProviders(newProviders);
};

  return {
    products,
    productsQuery,

    selectedCampaign,
    campaignQuery,

    priceRanges,
    providers,

    handleSelectedCampaignChange,
    handleSelectedPriceRangesChange,
    handleSelectedProvidersChange,
    handleClearSelectedFilters,
  };
};

import {
  type ProductSummary as FormattedProduct,
  type ProductsFilter,
  type PriceRange,
  type NetSpeeds,
  type Parameter,
} from "./types";

export const FILTER_PRICE: PriceRange[] = [
  {
    id: 1,
    min: 0,
    selected: false,
    max: 699,
  },
  {
    id: 2,
    min: 700,
    max: 999,
    selected: false,
  },
  {
    id: 3,
    min: 1000,
    selected: false,
  },
];

type Product = {
  productCode: string;
  productName: string;
  category: string;
  subcategory: string;
  consumerCategory?: string;
  productDescription: string;
  productRate: number;
  productDiscountType: string;
  productDiscountAmount: number;
  productDiscountPeriod: number;
  productDiscountSequence: number;
  onceOffCharge: boolean;
  summary: string;
  isHero: boolean;
  heroOption: string;
  heroTagLine?: string;
  heroImage?: string;
  sellOnline: boolean;
  accessLimit: number;
  accessLimitUnits: string;
  highlight1?: string;
  highlight2: string;
  highlight3: string;
  highlight1Icon: string;
  highlight2Icon: string;
  highlight3Icon: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
  includes: unknown[]; // Have no idea what this is supposed to be
  highlights: string[];
  technicalTerms?: string;
  lineSpeed: number;
  parameters: Parameter[];
  hasPreProduct: boolean;
  preProduct?: PreProduct;
  genericWorkflowImplementation?: GenericWorkflowImplementation;
  productDescriptionAlternative?: string;
  friendlyName: string;
  invoiceRollupDescription: string;
  minimumContractMonths: number;
  productType: string;
  chargePeriod: string;
  highlight4?: string;
  highlight5?: string;
  highlight6?: string;
  highlight4Icon: string;
  highlight5Icon: string;
  highlight6Icon: string;
  displayPrice?: number;
  tagLine: string;
  id: string;
};

type GenericWorkflowImplementation = {
  id: number;
  name: string;
  supportsGenericLocationLookup: boolean;
  supportsPreOrders: boolean;
  locationIdRequired: LocationIdRequired;
  supportedLocationLookupTypes: SupportedLocationLookupTypes;
};

export type PreProduct = {
  preProductCode: string;
  preProductName: string;
  preProductFriendlyName: string;
  preProductInvoiceRollupDescription: string;
  preProductRate: number;
  preProductDiscountAmount: number;
  preProductDiscountType: string;
  preProductDiscountedProductRate: number;
  preProductDiscountPeriodInDays: number;
  preProductDiscountSavings: number;
  preProductDisplay: string;
};

export type LocationIdRequired = {
  RECONNECT: boolean;
  CHANGE: boolean;
  NEW: boolean;
  SWITCH_LINE: boolean;
};

export type SupportedLocationLookupTypes = {
  ONT_SERIAL: boolean;
  COORDINATES_WITH_RADIUS: boolean;
  COORDINATES: boolean;
  LOCATION_NUMBER: boolean;
  FULL_ADDRESS: boolean;
};

export function formatProductResponse(product: Product): FormattedProduct {
  const provider = extractProviderFromSubcategory(product.subcategory);
  const netSpeeds = extractSpeedsFromProductParams(product.parameters);
  return { ...product, provider, netSpeeds };
}

function extractProviderFromSubcategory(subcategory: string): string {
  const provider = subcategory.replace(/(Uncapped|Capped)/g, "").trim();
  return provider;
}

type ProductPromoCode = {
  promoCode: string;
  promoCodeDescription: string;
  promoCodeTagLine: string;
  promoCodeCategory: string;
  promoCodeSubcategory: string;
  provider: string;
  coverageStatusOptionKey: string;
  coverageStatusDisplayValue: string;
  promoUrlSlug?: string;
  promoProductTagline?: string;
  promoProductDescription?: string;
  products: Product[];
};

export const getProductsPromo = (
  promo: ProductPromoCode
): FormattedProduct[] => {
  return promo.products.map(formatProductResponse);
};

export const applyFiltersOnProducts = (
  products: FormattedProduct[],
  filters: ProductsFilter
) => {
  const { selectedProviders: providers, selectedPriceRanges } = filters;

  const selectedProviders = new Set(providers);

  return products
    .filter((p) => {
      if (providers.length === 0) {
        return true;
      }
      return selectedProviders.has(p.provider);
    })
    .filter((p) => filterByPriceRanges(p, selectedPriceRanges));
};

export function isPriceWithinRange(
  price: number,
  min: number,
  max: number | undefined
): boolean {
  return max === undefined ? price >= min : price >= min && price <= max;
}

export function isAnyPriceRangeSelected(selectedPriceRanges: PriceRange[]): boolean {
  return selectedPriceRanges.length === 0;
}

export function filterByPriceRanges(
  product: FormattedProduct,
  selectedPriceRanges: PriceRange[]
): boolean {
  if (isAnyPriceRangeSelected(selectedPriceRanges)) {
    return true;
  }

  return selectedPriceRanges.some((range) =>
    isPriceWithinRange(product.productRate, range.min, range.max)
  );
}

export function convertToMbps(speed: string): number {
  const speedInKbps = parseFloat(speed);
  const speedInMbps = speedInKbps / 1000;
  return Math.floor(speedInMbps);
}

export function extractSpeedsFromProductParams(params: Parameter[]): NetSpeeds {
  let speeds: NetSpeeds = {
    download: "0",
    upload: "0",
  };

  for (const param of params) {
    if (param.name === "downloadSpeed") {
      speeds = {
        ...speeds,
        download: `${convertToMbps(param.value)}`,
      };
    } else if (param.name === "uploadSpeed") {
      speeds = {
        ...speeds,
        upload: `${convertToMbps(param.value)}`,
      };
    }
  }

  return speeds;
}

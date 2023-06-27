import { type InferGetServerSidePropsType } from "next";
import CampaignSelector, { fetchCampaigns } from "@/components/campaigns/CampaignSelector";

import { ProductList } from "@/components/products/product-list/ProductList";
import { ProductFilter } from "@/components/products/product-filter/ProductFilter";

import { useProductSelection } from "@/components/products/custom-hooks/customHooks";
import { ProviderPicker } from "@/components/services-provider/ProviderSelector";

import Head from "next/head";

const Home = ({
  preloadedCampaignResponse
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const {
    products,
    productsQuery,
    selectedCampaign,
    campaignQuery,
    priceRanges,
    providers,
    handleSelectedCampaignChange,
    handleSelectedPriceRangesChange,
    handleSelectedProvidersChange
  } = useProductSelection(preloadedCampaignResponse);

  return (
    <>
      <Head>
        <title>Fibre</title>
        <meta name="description" content="Mweb Fibre" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <h1>MWEB Fibre products</h1>
        <div>
          <div>
            <ProviderPicker
          providers={providers}
          handleSelectedProvidersChange={handleSelectedProvidersChange}
        />
            </div> 
          <div>
            <CampaignSelector
              selectedCampaign={selectedCampaign?.code}
              handleSelectedCampaignChange={handleSelectedCampaignChange}
              campaigns={campaignQuery.data?.campaigns || []}
            />
          </div>
          <div>
            <ProductFilter
              priceRanges={priceRanges}
              handleSelectedPriceRangesChange={handleSelectedPriceRangesChange}
              providers={providers}
              handleSelectedProvidersChange={handleSelectedProvidersChange}
            />
          </div>
        </div>

        <ProductList
          products={products}
          isLoading={productsQuery.isLoading || campaignQuery.isLoading}
          isError={productsQuery.isError || campaignQuery.isError}
        />
      </div>
    </>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const preloadedCampaignResponse = await fetchCampaigns();

  return { props: { preloadedCampaignResponse } };
};

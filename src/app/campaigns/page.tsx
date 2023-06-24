'use client';

import useSWR from 'swr';
import React, { useState } from 'react';

interface Campaign {
  links: any[]; // Update the type if you have a specific structure for links
  code: string;
  name: string;
  description: string;
  category: string;
  urlSlug: string;
  isStandardCampaign: boolean;
  isDefaultCampaign: boolean;
  isPrivateCampaign: boolean;
  promocodes: string[];
}

const fetcher = async (url: string): Promise<any> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
};

const campaignsURL = "https://apigw.mweb.co.za/prod/baas/proxy/marketing/campaigns/fibre?channels=120&visibility=public";
const promocodeProductsURL = "https://apigw.mweb.co.za/prod/baas/proxy/marketing/products/promos/";

const Campaigns = (): JSX.Element => {
  const { data, error } = useSWR(
    campaignsURL,
    fetcher
  );

  const [selectedCampaignCode, setSelectedCampaignCode] = useState<string>('');
  const [selectedCampaignCategory, setSelectedCampaignCategory] = useState<string>('');
  const [selectedCampaignPromoCodes, setSelectedCampaignPromoCodes] = useState<string[]>([]);
  const [promocodeProductsURLWithPromocodes, setPromocodeProductsURLWithPromocodes] = useState<string>('');

  if (error) {
    return <div>Error fetching data</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  const campaigns: Campaign[] = data.campaigns as Campaign[];
  const campaignOptions = campaigns.map((campaign) => ({
    label: campaign.name,
    value: campaign.code,
    category: campaign.category,
    promocodes: campaign.promocodes, // Added promocodes
  }));

  const handleCampaignChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCode = event.target.value;
    setSelectedCampaignCode(selectedCode);

    // Find the selected campaign and update the category and promo codes
    const selectedCampaign = campaignOptions.find((option) => option.value === selectedCode);
    if (selectedCampaign) {
      setSelectedCampaignCategory(selectedCampaign.category);
      setSelectedCampaignPromoCodes(selectedCampaign.promocodes);

      // Generate the URL with the selected promo codes
      const promoCodeUrlSegment = selectedCampaign.promocodes.join(",");
      const updatedPromocodeProductsURLWithPromocodes = `${promocodeProductsURL}${promoCodeUrlSegment}?sellable_online=true`;
      setPromocodeProductsURLWithPromocodes(updatedPromocodeProductsURLWithPromocodes);
    }
  };

  return (
    <div>
      <div>
        <label htmlFor="campaign-select">Select Fibre Campaign:</label>
        <select id="campaign-select" value={selectedCampaignCode} onChange={handleCampaignChange}>
          {campaignOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {selectedCampaignCategory && (
        <div>
          <p>Selected Campaign Category:</p>
          <p>{selectedCampaignCategory}</p>
        </div>
      )}
      {selectedCampaignPromoCodes.length > 0 && (
        <div>
          <p>Selected Campaign Promo Codes:</p>
          <ul>
            {selectedCampaignPromoCodes.map((promoCode) => (
              <li key={promoCode}>{promoCode}</li>
            ))}
          </ul>
          <p>URL with Selected Promo Codes:</p>
          <a href={promocodeProductsURLWithPromocodes}>{promocodeProductsURLWithPromocodes}</a>
        </div>
      )}
    </div>
  );
};

export default Campaigns;
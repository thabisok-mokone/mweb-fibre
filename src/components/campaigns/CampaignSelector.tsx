import React, { ChangeEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";


export type Campaign = {
  links: string[];
  code: string;
  name: string;
  description: string;
  category: string;
  urlSlug: string;
  isStandardCampaign: boolean;
  isDefaultCampaign: boolean;
  isPrivateCampaign: boolean;
  promocodes: string[];
};

export type CampaignRes = {
  campaigns: Campaign[];
  links: string[];
};

type CampaignSelectorProps = {
  selectedCampaign?: string;
  handleSelectedCampaignChange: (value: string) => void;
  campaigns: Campaign[];
};

const campaignsURL =
  "https://apigw.mweb.co.za/prod/baas/proxy/marketing/campaigns/fibre?channels=120&visibility=public";

export const fetchCampaigns = async (): Promise<CampaignRes> => {
  const response = await axios.get<CampaignRes>(campaignsURL);
  return response.data;
};

export const useCampaigns = (params: { initialData?: CampaignRes }) => {
  const { initialData } = params;
  return useQuery<CampaignRes>(["campaigns"], fetchCampaigns, {
    initialData,
  });
};

const CampaignSelector: React.FC<CampaignSelectorProps> = ({
  selectedCampaign,
  handleSelectedCampaignChange,
  campaigns,
}) => {
  return (
    <div>
      <label htmlFor="promotion-select">Select a promotion:</label>
      <select
        id="promotion-select"
        value={selectedCampaign}
        onChange={(event: ChangeEvent<HTMLSelectElement>) =>
          handleSelectedCampaignChange(event.target.value)
        }
      >
        <option value="">Please choose a promotion</option>
        {campaigns.map((campaignItem) => (
          <option key={campaignItem.code} value={campaignItem.code}>
            {campaignItem.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CampaignSelector;

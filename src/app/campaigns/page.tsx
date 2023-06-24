'use client';

import useSWR from 'swr';

interface Campaign {
  code: string;
  name: string;
  description: string;
  category: string; 
  urlSlug: string;
  isStandardCampaign: boolean;
  isDefaultCampaign: boolean;
  isPrivateCampaign: boolean; 

  // Add other properties as needed
}

const fetcher = async (url: string): Promise<any> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
};

const Campaigns = (): JSX.Element => {
  const { data, error } = useSWR(
    'https://apigw.mweb.co.za/prod/baas/proxy/marketing/campaigns/fibre?channels=120&visibility=public',
    fetcher
  );

  if (error) {
    return <div>Error fetching data</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  const campaigns: Campaign[] = data.campaigns; // Explicitly specify the type as Campaign[]

  return (
    <div>
      {campaigns.map((campaign: Campaign) => (
        <div key={campaign.code}>
          <h2>{campaign.name}</h2>
          <p>{campaign.description}</p>
          <p>{campaign.category}</p>
          {/* Render other campaign details as needed */}
        </div>
      ))}
    </div>
  );
};

export default Campaigns;
'use client';

import { useEffect, useState } from 'react';
import useSWR from 'swr';

interface Product {
  promoCode: string;
  promoCodeDescription: string;
  promoCodeTagLine: string;
  promoCodeCategory: string;
  promoCodeSubcategory: string;
  provider: string;
  coverageStatusOptionKey: string;
  coverageStatusDisplayValue: string;
  promoUrlSlug: string;
  promoProductTagline: string;
  promoProductDescription: string;
  products: string[];
}

const fetcher = async (url: string): Promise<any> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
};

const promocodeProductsURL =
  'https://apigw.mweb.co.za/prod/baas/proxy/marketing/products/promos/VUMA-REACH-RECURRING?sellable_online=true';

const Products = (): JSX.Element => {
  const { data, error } = useSWR(promocodeProductsURL, fetcher);


  if (error) {
    return <div>Error fetching data</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {data.map((product: Product) => (
        <div key={product.promoCode}>
          <h3>{product.promoCode}</h3>
          <p>{product.promoCodeDescription}</p>
        </div>
      ))}
    </div>
  );
};

export default Products;

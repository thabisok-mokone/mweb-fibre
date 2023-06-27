import React from "react";
import { type ProductSummary } from "../types";
import { providerInfo } from "../../services-infomation/providerInfo";
import Image from "next/image";


type ProductCardListProps = {
  products?: ProductSummary[];
  isLoading?: boolean;
  isError?: boolean;
};

export function ProductList(props: ProductCardListProps) {
  const { products, isLoading, isError } = props;

  const getProviderImageSrcLink = (provider: string) => {
    return providerInfo.find((p) => p.name === provider)?.url || "";
  };

  return (
    <div>
      {products?.length === 0 && !isLoading && !isError && (
        <div>
          <div>
            Found No Products In This Catergory 
          </div>
        </div>
      )}
      {products?.length !== 0 && (
        <div>
          {products?.map((product) => (
            <div
              key={`${product.id}-${product.productCode}`}>
              <div>
                <div>
                  <div>
                    <div>
                      {product.friendlyName}
                    </div>
                    <div>
                      R{product.productRate} pm
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div>
                  {product.highlights.map((highlight, idx) => (
                    <div key={idx}>
                      <div>{highlight}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div>
                  <div>
                    <Image
                      src={getProviderImageSrcLink(product.provider)}
                      alt={product.provider}
                      height={90}
                      width={90}
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {isLoading && (
        <div>
          {Array(8)
            .fill(0)
            .map((_, index) => (
              <div key={index}/>
            ))}
        </div>
      )}
      {isError && (
        <div>
          <div>
            Error
          </div>
        </div>
      )}
    </div>
  );
}


import { type Provider } from "../services-infomation/providerInfo";
import Image from "next/image";

export type ProviderPickerProps = {
  providers: Provider[];
  handleSelectedProvidersChange: (value: Provider) => void;
};

export function ProviderPicker(props: ProviderPickerProps) {
  const { providers, handleSelectedProvidersChange } = props;

  return (
    <div>
      {providers.map((provider) => (
        <div
          key={provider.code}
          onClick={() => handleSelectedProvidersChange(provider)}
        >
          <div>
            <Image
              src={provider.url}
              alt={provider.name}
              height={70}
              width={70}
              priority
            />
          </div>
          {provider.selected && (
            <div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

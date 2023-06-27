import { type ProviderPickerProps } from "../services-provider/ProviderSelector";

type ProviderFilterProps = ProviderPickerProps;

export function ProviderFilter(props: ProviderFilterProps) {
  const { providers, handleSelectedProvidersChange } = props;

  return (
    <div>
      {providers.map((provider, idx) => (
        <div key={idx}>
          <label htmlFor="price-range">
            <input
              id="price-range"
              type="checkbox"
              checked={provider.selected}
              onChange={() => handleSelectedProvidersChange(provider)}
            />
            {provider.name}
          </label>
        </div>
      ))}
    </div>
  );
}

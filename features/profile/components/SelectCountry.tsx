import { getCountries } from "@/lib/data-service";

type SelectCountryProps = {
  defaultCountry: string | undefined | null;
  name: string;
  id: string;
  className: string;
};

type country = {
  name: string;
  flag: string;
  independent: boolean;
};

async function SelectCountry({
  defaultCountry,
  name,
  id,
  className,
}: SelectCountryProps) {
  const countries: country[] = await getCountries();

  const flag =
    countries.find((country: country) => country.name === defaultCountry)
      ?.flag ?? "";

  return (
    <select
      key={defaultCountry}
      name={name}
      id={id}
      defaultValue={`${defaultCountry}%${flag}`}
      className={className}
    >
      <option value="">Select country...</option>
      {countries.map((c) => (
        <option key={c.name} value={`${c.name}%${c.flag}`}>
          {c.name}
        </option>
      ))}
    </select>
  );
}

export default SelectCountry;

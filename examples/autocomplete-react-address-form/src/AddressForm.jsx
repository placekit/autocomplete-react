import { PlaceKit } from '@placekit/autocomplete-react';
import { useCallback, useState } from 'react';

import FormField from './FormField';

const AddressForm = () => {
  const [values, setValues] = useState({});
  
  const updateValue = useCallback(
    (e) => {
      setValues((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    },
    []
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      alert(JSON.stringify(values, null, 2));
    },
    [values]
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="p-8 grid grid-cols-2 gap-4 items-end rounded-lg bg-white border border-slate-200"
    >
      <header className="col-span-full mb-2">
        <h2 className="font-medium text-xl text-slate-400">Shipping address</h2>
      </header>
      <div className="col-span-full">
        <label
          htmlFor="address"
          className="block mb-1 text-sm font-medium text-slate-700"
        >
          Address
        </label>
        <PlaceKit
          name="address"
          apiKey={process.env.PLACEKIT_API_KEY}
          options={{
            countries: ['fr'],
          }}
          onPick={(value, item) => {
            setValues({
              address: value,
              city: item.city,
              zipcode: item.zipcode[0],
              country: item.country,
            });
          }}
        />
      </div>
      <FormField
        name="city"
        label="City"
        value={values.city}
        onChange={updateValue}
        className="col-span-full"
      />
      <FormField
        name="zipcode"
        label="Post code"
        value={values.zipcode}
        onChange={updateValue}
      />
      <FormField
        name="country"
        label="Country"
        value={values.country}
        onChange={updateValue}
      />
      <div className="col-span-full mt-5 grid">
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded border border-transparent bg-accent-600 px-2.5 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-accent-700"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default AddressForm;

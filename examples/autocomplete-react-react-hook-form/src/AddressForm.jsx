import { PlaceKit } from '@placekit/autocomplete-react';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';

import FormField from './FormField';

const AddressForm = () => {
  const methods = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  const onSubmit = useCallback(
    (values) => {
      alert(JSON.stringify(values, null, 2));
    },
    []
  );

  return (
    <form
      onSubmit={methods.handleSubmit(onSubmit)}
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
          onPick={(_,  item) => {
            methods.setValue('address', item.name);
            methods.setValue('city', item.city);
            if (item.zipcode[0]) {
              methods.setValue('zipcode', item.zipcode[0]);
            }
            methods.setValue('country', item.country);
          }}
          {...methods.register('address')}
        />
      </div>
      <FormField
        name="city"
        label="City"
        {...methods.register('city')}
        className="col-span-full"
      />
      <FormField
        name="zipcode"
        label="Post code"
        {...methods.register('zipcode')}
      />
      <FormField
        name="country"
        label="Country"
        {...methods.register('country')}
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

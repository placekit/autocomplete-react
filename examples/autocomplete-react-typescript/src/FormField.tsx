import { forwardRef, useId } from 'react';

type IFormFieldProps = {
  label: string;
  id?: string;
  className?: string;
  [key: string]: any;
};

const FormField = forwardRef((
  { className, label, ...inputProps }: IFormFieldProps,
  ref: React.ForwardedRef<HTMLInputElement>
) => {
  const id = inputProps.id || useId();
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="block mb-1 text-sm font-medium text-slate-700"
      >
        {label}
      </label>
      <input
        {...inputProps}
        id={id}
        ref={ref}
        className="block w-full bg-white px-2.5 py-1.5 text-sm text-black rounded border border-slate-300 shadow-sm"
      />
    </div>
  );
});

export default FormField;
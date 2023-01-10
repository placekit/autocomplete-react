import PropTypes from 'prop-types';
import { forwardRef, useId } from 'react';

const FormField = forwardRef(({
  className,
  label,
  ...inputProps
}, ref) => {
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

FormField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  className: PropTypes.string,
}

export default FormField;
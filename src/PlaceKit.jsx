import PropTypes from 'prop-types';
import React, { forwardRef, useEffect } from 'react';

import { usePlaceKit } from './usePlaceKit';

const PlaceKit = forwardRef(({
  apiKey,
  className,
  useGeolocation,
  options,
  onOpen,
  onClose,
  onResults,
  onPick,
  onError,
  onDirty,
  onEmpty,
  onFreeForm,
  onState,
  onGeolocation,
  ...inputProps
}, ref) => {
  const { target, client, state } = usePlaceKit(apiKey, {
    ...options,
    handlers: {
      onOpen,
      onClose,
      onResults,
      onPick,
      onError,
      onDirty,
      onEmpty,
      onFreeForm,
      onState,
      onGeolocation,
    },
  });

  useEffect(
    () => {
      if (target.current && ref) {
        if (typeof ref === 'function') {
          ref(target.current);
        } else {
          ref.current = target.current;
        }
      }
    },
    [target.current]
  );

  return (
    <div
      className={[
        'pka-input',
        className
      ].filter((c) => c).join(' ')}
    >
      {!!useGeolocation && (
        <button
          type="button"
          className={[
            'pka-input-geolocation',
            state.hasGeolocation ? 'pka-enabled' : '',
          ].filter((c) => c).join(' ')}
          title="Activate geolocation"
          role="switch"
          aria-checked={state.hasGeolocation}
          onClick={client?.requestGeolocation}
          disabled={inputProps.disabled}
        >
          <span className="pka-sr-only">Activate geolocation</span>
        </button>
      )}
      <button
        type="button"
        className="pka-input-clear"
        title="Clear value"
        aria-hidden={state.empty}
        onClick={client?.clear}
        disabled={inputProps.disabled}
      >
        <span className="pka-sr-only">Clear value</span>
      </button>
      <input
        {...inputProps}
        type="search"
        ref={target}
      />
    </div>
  );
});

PlaceKit.defaultProps = {
  useGeolocation: true,
  options: {},
  placeholder: "Search places...",
};

PlaceKit.propTypes = {
  // component options
  useGeolocation: PropTypes.bool,
  className: PropTypes.string,

  // PlaceKit Autocomplete JS options
  apiKey: PropTypes.string.isRequired,
  options: PropTypes.shape({
    offset: PropTypes.number,
    template: PropTypes.func,
    formatValue: PropTypes.func,
    strategy: PropTypes.oneOf(['absolute', 'fixed']),
    flip: PropTypes.bool,
    countryAutoFill: PropTypes.bool,
    className: PropTypes.string,
    timeout: PropTypes.number,
    maxResults: PropTypes.number,
    types: PropTypes.arrayOf(PropTypes.string),
    language: PropTypes.string,
    countryByIP: PropTypes.bool,
    countries: PropTypes.arrayOf(PropTypes.string),
    coordinates: PropTypes.string,
  }),

  // event handlers
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  onResults: PropTypes.func,
  onPick: PropTypes.func,
  onError: PropTypes.func,
  onDirty: PropTypes.func,
  onEmpty: PropTypes.func,
  onFreeForm: PropTypes.func,
  onState: PropTypes.func,
  onGeolocation: PropTypes.func,

  // other HTML input props get forwarded
};

export default PlaceKit;
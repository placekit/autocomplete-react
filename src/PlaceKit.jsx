import PropTypes from 'prop-types';
import React, { forwardRef, useEffect, useMemo } from 'react';

import { usePlaceKit } from './usePlaceKit';

const PlaceKit = forwardRef(({
  apiKey,
  useGeolocation,
  className,
  options,
  onOpen,
  onClose,
  onResults,
  onPick,
  onError,
  onGeolocation,
  onFreeForm,
  ...inputProps
}, ref) => {
  const opts = useMemo(
    () => {
      const output = options;
      if (!output.handlers) {
        output.handlers = {};
      }
      output.handlers.onOpen = onOpen;
      output.handlers.onClose = onClose;
      output.handlers.onResults = onResults;
      output.handlers.onPick = onPick;
      output.handlers.onError = onError;
      output.handlers.onGeolocation = onGeolocation;
      output.handlers.onFreeForm = onFreeForm;
      return output;
    },
    [
      options,
      onOpen,
      onClose,
      onResults,
      onPick,
      onError,
      onGeolocation,
      onFreeForm,
    ]
  );
  
  const { target, client, state } = usePlaceKit(apiKey, opts);

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
    [target]
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
        aria-hidden={state.isEmpty}
        onClick={client?.clear}
        disabled={inputProps.disabled}
      >
        <span className="pka-sr-only">Clear value</span>
      </button>
      <input
        placeholder="Search places..."
        {...inputProps}
        ref={target}
        type="search"
      />
    </div>
  );
});

PlaceKit.defaultProps = {
  useGeolocation: true,
  options: {},
};

PlaceKit.propTypes = {
  apiKey: PropTypes.string.isRequired,
  useGeolocation: PropTypes.bool,
  className: PropTypes.string,
  options: PropTypes.shape({
    offset: PropTypes.number,
    template: PropTypes.func,
    formatValue: PropTypes.func,
    strategy: PropTypes.oneOf(['absolute', 'fixed']),
    flip: PropTypes.bool,
    className: PropTypes.string,
    timeout: PropTypes.number,
    maxResults: PropTypes.number,
    types: PropTypes.arrayOf(PropTypes.string),
    language: PropTypes.string,
    countries: PropTypes.arrayOf(PropTypes.string),
    coordinates: PropTypes.string,
  }),
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  onResults: PropTypes.func,
  onPick: PropTypes.func,
  onError: PropTypes.func,
  onEmpty: PropTypes.func,
  onFreeForm: PropTypes.func,
  onGeolocation: PropTypes.func,
};

export default PlaceKit;
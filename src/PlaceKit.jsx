import PropTypes from 'prop-types';
import React, { forwardRef, memo, useEffect } from 'react';

import { usePlaceKit } from './usePlaceKit';

const PlaceKit = memo(forwardRef((props, ref) => {
  const { target, client, state } = usePlaceKit(props.apiKey, {
    ...props.options,
    handlers: {
      onOpen: props.onOpen,
      onClose: props.onClose,
      onResults: props.onResults,
      onPick: props.onPick,
      onError: props.onError,
      onGeolocation: props.onGeolocation,
      onEmpty: props.onEmpty,
      onFreeForm: props.onFreeForm,
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
    [target]
  );

  return (
    <div
      className={[
        'pka-input',
        props.className
      ].filter((c) => c).join(' ')}
    >
      {!!props.useGeolocation && (
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
          disabled={props.disabled}
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
        disabled={props.disabled}
      >
        <span className="pka-sr-only">Clear value</span>
      </button>
      <input
        ref={target}
        id={props.id}
        name={props.name}
        placeholder={props.placeholder}
        disabled={props.disabled}
        required={props.required}
        autoFocus={props.autoFocus}
        type="search"
      />
    </div>
  );
}));

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
  onEmpty: PropTypes.func,
  onFreeForm: PropTypes.func,
  onGeolocation: PropTypes.func,

  // native HTML input props
  id: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  autoFocus: PropTypes.bool,
};

export default PlaceKit;
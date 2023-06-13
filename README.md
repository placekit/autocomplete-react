<h1 align="center">
  PlaceKit Autocomplete React Library
</h1>

<p align="center">
  <b>All-in-one autocomplete experience for your React web apps</b>
</p>

<div align="center">

  [![NPM](https://img.shields.io/npm/v/@placekit/autocomplete-react?style=flat-square)](https://www.npmjs.com/package/@placekit/autocomplete-react?activeTab=readme)
  [![LICENSE](https://img.shields.io/github/license/placekit/autocomplete-react?style=flat-square)](./LICENSE)
  
</div>

<p align="center">
  <a href="#-quick-start">Quick start</a> • 
  <a href="#-component-properties">Component properties</a> • 
  <a href="#-custom-hook">Custom hook</a> • 
  <a href="#-Troubleshoot">Troubleshoot</a> • 
  <a href="#%EF%B8%8F-license">License</a>
</p>

---

PlaceKit Autocomplete React Library is a React wrapper of [PlaceKit Autocomplete JS](https://github.com/placekit/autocomplete-js).
It features a [compoment](./src/PlaceKit.jsx) ready to use, and a [custom hook](./src/usePlaceKit.js) for custom implementations.
It also is **TypeScript compatible**.

## 🎯 Quick start

First, install PlaceKit Autocomplete React using [npm](https://docs.npmjs.com/getting-started) package manager:

```sh
npm install --save @placekit/autocomplete-react
```

Then import the package and perform your first address search:

```jsx
import { PlaceKit } from '@placekit/autocomplete-react';

const MyComponent = (props) => {
  return (
    <PlaceKit
      apiKey="<your-api-key>"
      options={{
        countries: ['fr']
      }}
    />
  );
};

export default MyComponent;
```

**Important**: the `countries` option is **required** at search time, but we like to keep it optional across all methods so developers remain free on when and how to define it.

Also, import default style from `@placekit/autocomplete-js/dist/placekit-autocomplete.css` (`@placekit/autocomplete-js` is set as a dependency of this package and will automatically be installed). It will style the suggestions list and the input.
If you have trouble importing CSS from `node_modules`, copy/paste [its content](https://github.com/placekit/autocomplete-js/blob/main/src/placekit.css) into your own CSS.

👉 **Check out our [examples](./examples) for different use cases!**

## ⚙️ Component properties

```jsx
<PlaceKit
  // component options
  useGeolocation={false} // hide "ask geolocation" button
  className="your-custom-classes" // <div> wrapper custom classes

  // PlaceKit Autocomplete JS options
  apiKey="<your-api-key>"
  options={{
    offset: 4,
    template: (item, index) => {},
    formatValue: (item) => {},
    noResults: '',
    strategy: 'absolute',
    flip: false,
    countryAutoFill: false,
    className: 'panel-custom-class',
    timeout: 5000,
    maxResults: 5,
    types: ['city'],
    language: 'fr',
    countryByIP: false,
    countries: ['fr'],
    coordinates: '48.86,2.29',
  }}

  // event handlers (⚠️ use useCallback, see notes)
  onClient={(client) => {}}
  onOpen={() => {}}
  onClose={() => {}}
  onResults={(query, results) => {}}
  onPick={(value, item, index) => {}}
  onError={(error) => {}}
  onDirty={(bool) => {}}
  onEmpty={(bool) => {}}
  onFreeForm={(bool) => {}}
  onGeolocation={(bool, position) => {}}
  onState={(state) => {}}

  // other HTML input props get forwarded
  id="my-input"
  name="address"
  placeholder="Search places..."
  disabled={true}
  defaultValue="France"
  // ...
/>
```

Please refer to [PlaceKit Autocomplete JS](https://github.com/placekit/autocomplete-js#pkaoptions) documentation for more details about the options.

Some additional notes:
- If you want to customize the input style, create your own component using our [custom hook](#-custom-hook). You can reuse our component as a base.
- If you want to customize the suggestions list style, don't import our stylesheet and create your own following [PlaceKit Autocomplete JS](https://github.com/placekit/autocomplete-js#-customize) documentation.
- Handlers are exposed directly as properties for ease of access.
- It's recommended to memoize handler functions with `useCallback`, see [Avoid re-renders](#avoid-re-renders).
- ⚠️ The `<input>` it is an **uncontrolled component**. See [dynamic default value](#dynamic-default-value).

## 🪝 Custom hook

If our component doesn't suit your needs, you can build your own using the provided custom hook `usePlaceKit()`:

```jsx
import { usePlaceKit } from '@placekit/autocomplete-react';

const MyComponent = (props) => {
  const { target, client, state } = usePlaceKit('<your-api-key>', {
    countries: ['fr'],
    // other options
  });

  return (
    <input ref={target} />
  );
};
```

Please refer to [PlaceKit Autocomplete JS](https://github.com/placekit/autocomplete-js#pkaoptions) documentation for more details about the options.

Some additional notes:
- `target` is a React `ref` object.
- The handlers can be passed through `options.handlers`, but also be set with `client.on()` (better use a `useState()` in that case) except for `onClient` which is specific to Autocomplete React.
- `state` exposes stateless client properties (`dirty`, `empty`, `freeForm`, `geolocation`) as stateful ones.

⚠️ **NOTE:** you are **not** allowed to hide the PlaceKit logo unless we've delivered a special authorization. To request one, please contact us using [our contact form](https://placekit.io/about#contact).

## 🚒 Troubleshoot

### Access Autocomplete JS client from parent component

Use the extra `onClient` handler to access the client from the parent component:

```jsx
import { PlaceKit } from '@placekit/autocomplete-react';
import { useEffect, useState } from 'react';

const MyComponent = (props) => {
  const [client, setClient] = useState();

  useEffect(
    () => {
      if (client) {
        // do something
      }
    },
    [client]
  );

  return (
    <PlaceKit
      apiKey="<your-api-key>"
      onClient={setClient}
      options={{
        countries: ['fr']
      }}
    />
  );
};
```

`onClient` is an exception for handlers: it's **specific to Autocomplete React** and isn't passed in `options.handlers` to Autocomplete JS, so updating it doesn't trigger `pka.configure()`.

Please refer to [PlaceKit Autocomplete JS](https://github.com/placekit/autocomplete-js#-reference) documentation for more details about the client methods.

### Avoid re-renders

Because of the way React works, object/array/function literals are always considered fresh values and may cause unnecessary re-renders.

`<PlaceKit>` is mostly just a wrapper around [PlaceKit Autocomplete JS](https://github.com/placekit/autocomplete-js): it uses `useEffect` to mount it and update options. We've made it quite resilient to updates, but each time `options` updates, `pka.configure()` is called and makes some computations.

To avoid unnecessary re-renders, memoize or hoist those literals:

```jsx
import { PlaceKit } from '@placekit/autocomplete-react';
import { useCallback } from 'react';

// hoisting option functions (declaring outside of the component)
const formatValue = (item) => item.name;

const MyComponent = (props) => {

  // memoizing event handlers with useCallback
  const handlePick = useCallback(
    (value, item) => {
      console.log(item);
    },
    []
  );

  return (
    <PlaceKit
      apiKey="<your-api-key>"
      options={{
        countries: ['fr'],
        formatValue,
      }}
      onPick={handlePick}
    />
  );
};
```

⚠️ If you need `apiKey` to be set dynamically, use `useMemo` to memoize it, otherwise the whole autocomplete will reset at each component update, flushing the suggestions list.

### Dynamic default value

The `<input>` is an [**uncontrolled component**](https://react.dev/learn/sharing-state-between-components#controlled-and-uncontrolled-components) and should be treated as such. Making it controlled may cause typing glitches because React state in controlled components can conflict with Autocomplete JS internal state management.

You can dyamically set a `defaultValue` and it'll update the input value as long as it has not been touched by the user (`state.dirty === false`).

⚠️ Passing a non-empty value to `defaultValue` will automatically trigger a first search request when the user focuses the input.

## ⚖️ License

PlaceKit Autocomplete React Library is an open-sourced software licensed under the [MIT license](./LICENSE).

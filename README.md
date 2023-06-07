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
  <a href="#-avoid-re-renders">Avoid re-renders</a> • 
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
  onOpen={() => {}}
  onClose={() => {}}
  onResults={(query, results) => {}}
  onPick={(value, item, index) => {}}
  onError={(error) => {}}
  onDirty={(dirty) => {}}
  onEmpty={(empty) => {}}
  onFreeForm={(freeForm) => {}}
  onState={(state) => {}}
  onGeolocation={(hasGeolocation, position) => {}}

  // other HTML input props get forwarded
  id="my-input"
  name="address"
  placeholder="Search places..."
  disabled={true}
  defaultValue="France"
  // ...
/>
```

Please refer to [PlaceKit Autocomplete JS](https://github.com/placekit/autocomplete-js) documentation for more details about the options.

Some additional notes:
- The `<input>` is using React `ref` attribute. It is therefore an [uncontrolled component](https://reactjs.org/docs/uncontrolled-components.html) and should be treated as such.
- If you want to customize the input style, create your own component using our [custom hook](#-custom-hook). You can reuse our component as a base.
- If you want to customize the suggestions list style, don't import our stylesheet and create your own following [PlaceKit Autocomplete JS](https://github.com/placekit/autocomplete-js#-customize) documentation.
- Handlers are exposed directly as properties for ease of access.
- ⚠️ Make sure you memoize handler functions with `useCallback`, see [Avoid re-renders](#-avoid-re-renders).
- ⚠️ Passing a non-empty value to `defaultValue` will automatically trigger a first search request when the user focuses the input.

## 🪝 Custom hook

If our component doesn't suit your needs, you can build your own using the provided custom hook `usePlaceKit()`:

```jsx
import { usePlaceKit } from '@placekit/autocomplete-react';

const MyComponent = (props) => {
  const { target, client, state } = usePlaceKit('<your-api-key>', {
    countries: ['fr'],
  });

  return (
    <input ref={target} />
  );
};
```

Please refer to [PlaceKit Autocomplete JS](https://github.com/placekit/autocomplete-js) documentation for more details about the options.

Some additional notes:
- `target` is a React `ref` object.
- The handlers can be passed through `options.handlers`, but also be set with `client.on()` (better use a `useState()` in that case).
- `state` exposes stateless client properties (`dirty`, `empty`, `freeForm`, `hasGeolocation`) as stateful ones.

⚠️ **NOTE:** you are **not** allowed to hide the PlaceKit logo unless we've delivered a special authorization. To request one, please contact us using [our contact form](https://placekit.io/about#contact).

## 🔁 Avoid re-renders

`<PlaceKit>` is mostly just a wrapper around [PlaceKit Autocomplete JS](https://github.com/placekit/autocomplete-js): it uses `useEffect` to mount it and any change made in the options will cause it to reset and flush the suggestions list.

Because of the way React works, object/array/function literals are always considered fresh values and may cause an unwanted reset of autocomplete JS. Since 1.1.5, `options` object can be passed as literal thanks to [useStableValue](./src/useStableValue.js), but functions and event handlers will still cause re-renders if not memoized.

To avoid re-renders, memoize or hoist those literals:

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

## ⚖️ License

PlaceKit Autocomplete React Library is an open-sourced software licensed under the [MIT license](./LICENSE).

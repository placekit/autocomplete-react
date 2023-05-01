# Leaflet integration example

[![Open in CodeSandbox](https://img.shields.io/badge/Open%20in-CodeSandbox-blue?style=flat-square&logo=codesandbox)](https://githubbox.com/placekit/autocomplete-react/tree/main/examples/autocomplete-react-leaflet)

[LeafletJS](https://leafletjs.com) is an open-source JavaScript library for interactive maps.
This example uses the official [Leaflet React library](https://react-leaflet.js.org).

Only using [TailwindCSS](https://tailwindcss.com) as a convenience for the basic styling of the example.

## Run

```sh
# clone project and access this example
git clone git@github.com:placekit/autocomplete-react.git
cd autocomplete-react/examples/autocomplete-react-leaflet

# install dependencies
npm install

# create .env file
cp .env.sample .env
```

Open the `.env` file and replace `<your-api-key>` with your PlaceKit API key.

Then run:

```sh
npm run dev
```

And your project will be served at http://localhost:5173.
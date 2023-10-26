# Address form example

[![Open in CodeSandbox](https://img.shields.io/badge/Open%20in-CodeSandbox-blue?style=flat-square&logo=codesandbox)](https://githubbox.com/placekit/autocomplete-react/tree/main/examples/autocomplete-react-countries-whitelist)

Make a custom country selector to dynamically change the autocomplete country.
In some use-cases, you may want control over the list of allowed countries. Our built-in country selector is actually a country search and we do not support whitelists (nor blacklists) at the moment. Therefore we suggest this example as a workaround.

Only using [TailwindCSS](https://tailwindcss.com) as a convenience for the basic styling of the example.

## Run

```sh
# clone project and access this example
git clone git@github.com:placekit/autocomplete-react.git
cd autocomplete-react/examples/autocomplete-react-countries-whitelist

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
# PlaceKit Autocomplete React basic example

Only using [TailwindCSS](https://tailwindcss.com) as a convenience for the basic styling of the example.

Adding [Time Zone Country](https://github.com/placekit/tzc) package to populate `countries` options based on user's timezone.

## Run

```sh
# clone project and access this example
git clone git@github.com:placekit/autocomplete-react.git
cd client-js/examples/basic

# install dependencies
npm install

# create .env file
cp .env.sample .env
```

Open the `.env` file and replace `<your-api-key>` with your PlaceKit API key.

Then run:

```sh
npm start
```

And your project will be served at http://localhost:1234.
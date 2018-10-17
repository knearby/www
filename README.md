# Knearby Website

# Getting Started

## Development

1. Provision configuration:

```sh
cat > .firebaserc <<EOF
{
  "projects": {
    "default": "dev-env",
    "development": "dev-env",
    "production": "prd-env"
  }
}
>EOF;
```

> (replace the `dev-env` and `prd-env` as required)

Then run `firebase use development`

2. Install dependencies:

```sh
npm install;
```

3. Start the application:

```sh
npm start;
```

4. Build the production files:

```sh
npm run build;
```

5. Deploy the site:

```sh
npm run deploy;
```

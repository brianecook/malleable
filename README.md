# Malleable

Malleable is a starter repository for Shopify theme development. View demo store [here](https://eloquent-development.myshopify.com) (pw: eloquent).

## Features

- Section scoped styles and scripts in [Shopify 2.0](https://shopify.dev/docs/themes/os20)
- [SASS](https://sass-lang.com/)
- [Typescript](https://www.typescriptlang.org/)
- [Preact](https://preactjs.com/)
- Component testing in [Jest](https://jestjs.io/)
  - Includes [Github Actions](https://docs.github.com/en/actions) file for plug and play CICD
- [ESLint](https://eslint.org/)
- Useful helper functions
- DOM Manipulation using [selectricity](https://www.npmjs.com/package/selectricity)

## Requirements
- [Node / NPM](https://nodejs.org/en)
- [Shopify CLI](https://shopify.dev/themes/tools/cli)
- [Git](https://git-scm.com)

## Setup

To get started, clone this repository:

```
git clone https://github.com/brianecook/malleable
```

Open a new terminal tab in Visual Studio Code (or your preferred editor with an integrated terminal). Install dependencies:

```
npm install
```

After dependencies are installed run `npm start`. This will prompt you to log into the Shopify storefront that you plan on working on.

Once logged in, open a **separate** terminal tab. In this tab run `npm run watch`. This command will watch for changes in the scripts and styles directories and output the appropriate files in the assets folder.

## Storefront API Access Token

This theme uses the [Storefront API](https://shopify.dev/docs/api/storefront) to fetch product data on the client (search, quickshop, product accordions). You'll need to create a custom app in your Shopify admin and grab its public access token.

1. In your Shopify admin, go to **Settings → Apps and sales channels → Develop apps**. Enable custom app development if prompted.
2. Click **Create an app**, give it a name (e.g. `Theme Storefront`), and create it.
3. Open the **Configuration** tab and click **Configure** under *Storefront API integration*.
4. Enable the following unauthenticated scopes:
   - `unauthenticated_read_product_listings`
   - `unauthenticated_read_product_inventory`
   - `unauthenticated_read_product_pickup_locations`
   - `unauthenticated_read_product_tags`
   - `unauthenticated_read_metaobjects`
   - `unauthenticated_read_selling_plans`
5. Save, then open the **API credentials** tab and click **Install app**.
6. Under *Storefront API access token*, copy the token.
7. Paste it into `scripts/head.ts` as the `publicAccessToken` value passed to `createStorefrontApiClient`.

The Storefront API is read-only and this token is designed to be exposed in client-side code, so committing it to the repo is expected. Avoid adding scopes you don't need — in particular, customer-related scopes touch PII and should only be enabled if you're building account flows.

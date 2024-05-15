# Malleable

Starter repository for Shopify theme development. View demo store [here](https://eloquent-development.myshopify.com) (pw: eloquent).

## Features

- SASS
- Typescript
- Preact
- Component testing in Jest
- ESLint
- Useful helper functions
- DOM Manipulation using [Selectricity](https://www.npmjs.com/package/selectricity)

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

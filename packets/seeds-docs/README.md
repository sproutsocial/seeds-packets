# SEEDS Docs

```bash
yarn docs # Build the docs to a static folder
yarn develop # Run a hot reload server
```

## `src/components/examples`

This folder contains the React components used to render tokens for a particular package. If you specified a token using the `yarn create-package`, then there is already a file here waiting for you. If you need to make one manually, create a file called `seeds-[package_name].js`, export a React component, and it will be rendered onto the page for that package automatically below the overview.

## `src/components/utilities`

This folder contains React components for utilities that would appear at the top of a page. An example of this is the "Find the Nearest Color" tool in the [color package](https://sproutsocial.github.io/seeds/packets/color/). Simply create a file called `seeds-[package_name].js`, export a React component, and it will be rendered onto the page next to the overview.
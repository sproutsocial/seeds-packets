# SEEDS
Sprout's Exquisitely Executed Design System

## Development

We use [Lerna](https://lernajs.io) to manage inter-package dependencies in this monorepo. Builds are orchestrated via [Gulp 4](http://gulpjs.com/) tasks.

### Building packages

To build SEEDS packages, simply install dependencies by running `yarn` and build tokens and documentation with `yarn build`.

- `yarn build` - Builds packages
- `yarn docs` - Builds packages and docs
- `yarn docs-serve` - Builds packages, docs, and then serves them through Jekyll (Jekyll needs to be installed to run this command)
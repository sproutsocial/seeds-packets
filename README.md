# SEEDS
Sprout's Exquisitely Executed Design System

- [GitHub Pages](https://sproutsocial.github.io/seeds/)

## Development

We use [Lerna](https://lernajs.io) to manage inter-package dependencies in this monorepo.

### Building Packages

To build SEEDS packages, simply install dependencies by running `yarn` and build packets with `yarn build`.

- `yarn build` - Build packages


### Creating a New Package

SEEDS comes with a generator to scaffold a new package.

- `yarn create-package` - Run a wizard to scaffold out a new package.

Your new package files can be found in `packages/seeds-<packageName>`.

### Publishing Package Updates to npm

- Put your PR changes in
- Get approval
- Merge PR
- Pull down latest from `upstream`
- Run `lerna publish`, to publish new packages to npm
- Do `git push upstream master --tags`, to push the new tags to the repo

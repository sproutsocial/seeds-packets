# SEEDS
Sprout's Exquisitely Executed Design System

- [GitHub Pages](https://sproutsocial.github.io/seeds/)

## Development

We use [Lerna](https://lernajs.io) to manage inter-package dependencies in this monorepo.
Builds are orchestrated via [Gulp 4](http://gulpjs.com/) tasks.
Documentation is statically built using [GatsbyJS](https://www.gatsbyjs.org/).

### Building Packages

To build SEEDS packages, simply install dependencies by running `yarn` and build tokens and documentation with `yarn build`.

- `yarn build` - Build packages
- `yarn docs-serve` - Build packages, docs, and runs a hot-reload server
- `yarn docs-publish` - Build packages and docs, then publish it to **your fork’s** Github Pages
  - If you run `yarn docs-publish -- -o upstream` locally, you can publish the docs to **production** Github Pages if you have an `upstream` remote set in git.


### Creating a New Package

SEEDS comes with a generator to scaffold a new package.

- `yarn create-package` - Run a wizard to scaffold out a new package.
- `yarn docs-serve` - Build packages, docs, and runs a hot-reload server.

Your new package files can be found in `packages/seeds-<packageName>`. In addition, an example component for the docs can be found in `packages/seeds-docs/components/examples/seeds-<packageName>`.

### Publishing Package Updates to npm

- Put your PR changes in
- Get approval
- Merge PR
- Pull down latest from `upstream`
- Run `lerna publish`, to publish new packages to npm
- Do `git push upstream master --tags`, to push the new tags to the repo
- Run `yarn docs-publish -- -o upstream`, to publish the new docs to production Github Pages

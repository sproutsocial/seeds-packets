# SEEDS
Sprout's Exquisitely Executed Design System

- [GitHub Pages](https://sproutsocial.github.io/seeds/)

## Development

We use [Lerna](https://lernajs.io) to manage inter-package dependencies in this monorepo. Builds are orchestrated via [Gulp 4](http://gulpjs.com/) tasks.

### Building Packages

To build SEEDS packages, simply install dependencies by running `yarn` and build tokens and documentation with `yarn build`.

- `yarn build` - Builds packages
- `yarn docs` - Builds packages and docs (Jekyll needs to be installed to run this and other docs commands)
- `yarn docs-publish` - Builds packages and docs, then publishes it to **your fork’s** Github Pages
  - If you run `yarn docs-publish -- -o upstream` locally, you can publish the docs to **production** Github Pages if you have an `upstream` remote set in git.
- `yarn docs-serve` - Builds packages, docs, and then serves them through Jekyll

### Publishing Package Updates to npm

- Put your PR changes in
- Get approval
- Merge PR
- Pull down latest from `upstream`
- Run `lerna publish`, to publish new packages to npm
- Do `git push upstream master --tags`, to push the new tags to the repo
- Run `yarn docs-publish -- -o upstream`, to publish the new docs to production Github Pages

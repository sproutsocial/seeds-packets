# SEEDS
Sprout's Exquisitely Executed Design System

- [GitHub Pages](https://sproutsocial.github.io/seeds/)

## Development

We use [Lerna](https://lernajs.io) to manage inter-package dependencies in this monorepo. Builds are orchestrated via [Gulp 4](http://gulpjs.com/) tasks.

### Building packages

To build SEEDS packages, simply install dependencies by running `yarn` and build tokens and documentation with `yarn build`.

- `yarn build` - Builds packages
- `yarn docs` - Builds packages and docs
- `yarn docs-publish` - Builds packages and docs, then publishes it to `upstream`
- `yarn docs-serve` - Builds packages, docs, and then serves them through Jekyll (Jekyll needs to be installed to run this command)

### Versioning/updating process

- Put your PR changes in
- Get approval
- Merge PR
- Pull down latest from `upstream`
- Run `lerna publish`, to publish new packages to npm
- Do `git push upstream master --tags`, to push the new tags to the repo
- Run `yarn docs-publish`, to publish the new docs to the Github Pages
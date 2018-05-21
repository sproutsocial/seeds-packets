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

### Testing packet changes locally

Test any local packet in another project by utilizing [yarn link](https://yarnpkg.com/lang/en/docs/cli/link/). Below is an example workflow to link `seeds-packets` to `seeds`.

* Navigate to your local copy of any SEEDS packet in a terminal window

  ```shell
  $ cd ~/YourCodeFolder/seeds-packets/seeds-{packet name}
  $ yarn link # only needs to be run once
  $ yarn build
  ```

* Navigate to the folder where you wish to use the packets in your terminal (such as `seeds`) and complete the link

  ```shell
  $ cd ~/YourCodeFolder/seeds
  $ yarn link "@sproutsocial/seeds-{packet name}"
  $ yarn start
  ```

* You can now use any packet from your local instance of SEEDS in your project.

* **When you are done, be sure to unlink SEEDS so you are using the published version of the packets**

  ```
  $ yarn unlink "@sproutsocial/seeds-{packet name}"
  ```

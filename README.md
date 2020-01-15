# seeds-packets

This repository is the home of the design tokens that power Sprout Social's design system, [Seeds](https://sproutsocial.com/seeds). Each package in this repository contains a set of values related to core design needs like color, space, typography, etc. This codebase takes those values and transforms them into tokens that are consumable across several platforms (CSS variables, JaveScript constants, Sketch palettes, etc.).

You can view [the documentation for our design tokens](https://sproutsocial.com/seeds/resources/tokens/) on Seeds.

## Development

We use [Lerna](https://lernajs.io) to manage inter-package dependencies in this monorepo.

### Building Packages

To build Seeds packages, simply install dependencies by running `yarn` and build packets with `yarn build`.

- `yarn build` - Build packages


### Committing Changes

We use [standard-version](https://github.com/conventional-changelog/standard-version) to automatically update the changelog and decide new version numbers. As such, we need commit messages to follow a consistent format (drawn from [conventional commits](https://conventionalcommits.org/)).

Example commit messages (simply match this pattern and your commit message will be accepted):

- `git commit -m "feat: add seeds-example packet"`
- `git commit -m "fix(seeds-color): fix table layout for green colors" -m "fixes RD-999"`
- `git commit -m "feat(seeds-border): add new 8px border radius token"`
- `git commit -m "docs: update asset file paths"`
- `git commit -m "feat(dependencies): upgrade classnames to 2.2.5"`
- `git commit -m "chore(dependencies): upgrade babel dependencies to latest version"` (chore because they are devDependencies)
- `git commit -m "feat(build): add linting to commit messages"`

Commit message format:

```
type(scope?): subject

body?

footer?
```

`type` is one of the following:

- **fix**: Solves a bug
- **feat**: Adds a new feature
- **build**: Affects the build system or external dependencies
- **docs**: Adds or alters documentation
- **perf**: Improves performance
- **test**: Adds or modifies tests
- **chore**: Other changes that don't modify `src` or `test` files

`scope` is optional but, with few exceptions, should be used for all `feat` and `fix` commits. Common scopes include:

- **[seeds-{Packet Name}]**: Changes to a Seeds packet
- **dependencies**: Changes to `dependencies` should be `feat`, and `devDependencies` should be `chore`
- **build**: Changes to the build that make significant changes to the published package, should be a `feat` or `fix`

Feel free to suggest additional scope options.

`subject` requirements:

- starts with lower case
- uses the imperative, present tense: "change" not "changed" nor "changes"
- includes motivation for the change and contrasts with previous behavior

`body` is optional and allows for more details to be added

`footer` contains meta-information about pull requests, e.g. "fixes DS-999", referring to a Jira ticket.

### Publishing Package Updates to npm

- Create a pull request against the `develop` branch
- Get approval
- Merge PR then create a new PR to the `master` branch and merge it. Jenkins will notify a successful build notifying that the seeds-packets were published to NPM, once that is complete create a final pull request from `master` to `develop`


### Testing packet changes locally

Test any local packet in another project by utilizing [yarn link](https://yarnpkg.com/lang/en/docs/cli/link/). Below is an example workflow to link `seeds-packets` to `seeds`.

* Navigate to your local copy of any Seeds packet in a terminal window

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

* You can now use any packet from your local instance of Seeds in your project.

* **When you are done, be sure to unlink Seeds so you are using the published version of the packets**

  ```
  $ yarn unlink "@sproutsocial/seeds-{packet name}"
  ```

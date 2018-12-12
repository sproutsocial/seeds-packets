# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## 1.1.0 (2018-12-11)
⭐️ **Added:**
- Unitless JavaScript export: the package now offers a JavaScript export file that provides unitless numbers for the duration values. These numbers are in seconds. 

## 1.0.0 (2018-12-04)
- Easing: The `ease in` token value has changed from `cubic-bezier(.4, 0, 1, 1)` to `cubic-bezier(.4, 0, .7, .2)`

🚨 **Breaking Changes:**
- Easing: The `linear` token has been removed in favor if the `linear` CSS keyword.
- Duration: The `immediately` token has been removed
- Duration: The following duration token values have changed
	- `quickly` is now `fast` with a value change from `0.1s` to `0.15s`
	- `promptly` is now `medium` with a value change from `0.2s` to `0.3s`
	- `slowly` is now `slow` with a value change from `0.4s` to `0.6s`

## 0.4.4 (2018-11-19)
Remove metadata comment from output files.

## 0.4.3 (2018-11-13)
Refactored build system to use [Style Dictionary](https://amzn.github.io/style-dictionary). No impactful changes.

<a name="0.4.2"></a>
## [0.4.2](https://github.com/sproutsocial/seeds/compare/@sproutsocial/seeds-motion@0.4.1...@sproutsocial/seeds-motion@0.4.2) (2018-07-11)




**Note:** Version bump only for package @sproutsocial/seeds-motion

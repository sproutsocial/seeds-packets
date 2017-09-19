## Examples

### App Downloads

- <a href="_generated/{{page.package}}.{{ site.data.versions[page.package].version }}.json" download>Sketch Styles</a> (Requires [Shared Text Styles plugin](https://github.com/nilshoenson/shared-text-styles))
- [Adobe Creative Cloud Library](https://assets.adobe.com/assets/libraries/a4c2bfd3-f701-470c-ab88-1ba696d9f628e)


### Get the Code

For SCSS or Javascript:

- `yarn add @sproutsocial/{{page.package}}`
- `npm install @sproutsocial/{{page.package}} --save`


### Typefaces

- Sprout Social’s primary font family is Proxima Nova.
- Bambu’s primary font families are Clean Sanchez (alternate glyphs), Proxima Nova.
- Native mobile apps utilize the system font families: San Francisco for iOS and Roboto for Android.
- When Proxima Nova or Sanchez are unavailable, we attempt to default to [system font families](https://css-tricks.com/snippets/css/system-font-stack/). Defaulting to these fonts helps also with emoji rendering. The Proxima and Sanchez tokens already include theses system font fallbacks; **do not use the system font stack on its own unless you are using SEEDS in a situtation where loading Proxima or Sanchez is impossible or unwise**.

{% include_relative example-family.html %}


### Font Weights

For simplicity and performance, we use two font weights on the web.

{% include_relative example-weight.html %}


### Type Scale

Line heights are calculated to ensure at least three lines align to an 8px grid. Use the associated line-height values only.

{% include_relative example-size.html %}


<!-- Scripts needed to render examples -->

{% include_relative example-scripts.html %}

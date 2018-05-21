## Usage

### App Downloads

- <del><a href="/seeds/downloads/seeds-typography.json" download>Sketch Styles</a> (Requires [Shared Text Styles plugin](https://github.com/nilshoenson/shared-text-styles))</del> **Deprecated. See [changelog](#changelog).**
- [Adobe Creative Cloud Library](https://assets.adobe.com/assets/libraries/a4c2bfd3-f701-470c-ab88-1ba696d9f628e)


### Get the Code

For CSS, SCSS, or Javascript:

- `yarn add @sproutsocial/seeds-typography`
- `npm install @sproutsocial/seeds-typography --save`


### Best Practices

Make every effort to use the type tokens in any manner that suits the needs of your project. However, below are some standards we've defined to help get you started.

#### Base Font Sizes
- Sprout & Bambu - Size 300
- Marketing - Size 400
- iOS, Android - Size 300
- Mobile Web scales down based on viewport.

#### Headings
- Used to separate sections of content.
- Large Heading - Size 900
- Medium Heading - Size 800
- Small Heading - Size 600
- X-Small Heading - Size 400
- XX-Small Heading - Size 200

#### Lead Paragraphs
- An opening paragraph used to draw the reader into the text.
- Large Lead - Size 600
- Lead Paragraph - Size 500

#### Paragraphs
- A distinct section of writing, dealing with a single theme.
- Paragraph - Base Size
- Small Paragraph - Base Size -100

#### Blockquotes
- Quotations that are more than four lines. Visually distinctive from other text on the page.
- Blockquote - Size 700
- Small Blockquote - Size 500
- Attribution - Size 200

#### On Light Backgrounds
- Neutral 800 is used for paragraphs.
- Neutral 1000 is used for headlines.
    ![typography](/assets/SEEDS-Type-LightBackground.svg)

#### On Dark Backgrounds
- Neutral 200 is used for paragraphs.
- Neutral 0 is used for headlines.
    ![typography](/assets/SEEDS-Type-DarkBackground.svg)


### Do’s and Don’ts
- **DON’T:** Use any Proxima Nova extended families.
- **DON’T:** Use italic styles anywhere.
- **DO:** Use letter-spacing with uppercase text.
- **DON’T:** Use uppercase for lines longer than 3 words.
    ![typography](/assets/SEEDS-Type-Dont-Uppercase.svg)
- **DO:** Use between 50-80 characters per line.
    ![typography](/assets/SEEDS-Type-Do-Characters.svg)
- **DON’T:** Use letter-spacing for title case or sentence case text.
- **DO:** Use Space Size 400 after paragraphs.
- **DON’T:** Use hyphens for line breaks.
    ![typography](/assets/SEEDS-Type-Dont-Hyphens.svg)
- **DON’T:** Use puncuation such as colons, semi-colons, and commas in headlines.
    ![typography](/assets/SEEDS-Type-Dont-Puncuation.svg)
- **DO:** Use curly quotes and curly apostrophes in text.
    ![typography](/assets/SEEDS-Type-Do-CurlyQuotes.svg)
- **DON’T:** Use inch marks or typewriter apostrophes in text.
    ![typography](/assets/SEEDS-Type-Dont-InchMarks.svg)

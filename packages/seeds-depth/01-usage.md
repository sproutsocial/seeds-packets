## Usage

### Get the Code

For CSS, SCSS, or Javascript:

- `yarn add @sproutsocial/seeds-depth`
- `npm install @sproutsocial/seeds-depth --save`

### Best Practices

* Contextual 'floating' elements get minimal box-shadows
* Elements with a 'raised' state animate towards user, not top of screen
* Shadows on non-interactive elements denote high importance of content/information
* Limit shadow nesting to 3 levels *
	* Interactive UI "stacking" should not be deeply nested.
* Elements with raised states need at least a border (or a shadow) when not focused/hovered

### Do’s and Don’ts

- **DO:** Use Depth to indicate interactivity on stylized / atypical buttons.
- **DO:** Increase Depth on hover of interactive elements with a default Depth.
- **DON’T:** Increase Depth on hover of non-interactive elements with a default Depth.

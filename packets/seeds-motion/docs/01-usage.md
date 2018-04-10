## Usage

### Get the Code

For CSS, SCSS, or Javascript:

- `yarn add {{name}}`
- `npm install {{name}} --save`

### Best Practices

#### User initiated interactions (dismiss, hide, send, etc..)
- Use `ease in` to remove an element from the screen to shift user’s attention elsewhere
- Use `ease inout` to shift the user's attention to an element that has changed position or scale on the screen

#### System reactions (alerts, warnings, errors, notifications)
Use `ease out` to shift user's attention to an element that was previously not in view and has entered the screen

#### Fades and color changes
Use `linear` motion to communicate a consistent start to finish of an action on an element that has not changed its shape or position.


### Do’s and Don’ts

- **DO:** Use natural movement – remain true to real world physics.
- **DO:** Be Intentional and aware – animations should have a purpose.
- **DO:** Be subtle – make animations brief to avoid user discomfort and anxiety.
- **DO:** Add charisma – make the user feel anticipation and delight.

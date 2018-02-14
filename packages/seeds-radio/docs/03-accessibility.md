## Accessibility

We aspire to meet the WCAG 2.0 AA Standards.

- Semantic HTML should always be used when possible. `<input type="radio" />`
- If semantic HTML is not an option, use the ARIA-role for radio button wrapped in a radio group role.
  ```html
  <div role="radiogroup" aria-labelledby="pizza-crust">
    <h3 id="pizza-crust">Pizza Crust</h3>
    <div role="radio" aria-checked="true" tabindex="0">
      Regular crust
    </div>

    <div role="radio" aria-checked="false" tabindex="-1">
      Deep dish
    </div>

    <div role="radio" aria-checked="false" tabindex="-1">
      Thin crust
    </div>
  </div>
  ```
  If using the "radio" role, developer is required to keep track of selected state using `aria-checked` attribute
  - `aria-checked` is "true" if radio button is selected
  - `aria-checked` is "false" if radio button is not selected
- All radio buttons must have an associated label
  ```html
  <span role="radio" aria-checked="false" tabindex="0" id="chk1"></span>
  <label for="chk1">Remember my preferences</label>
  ```
- Since a radio button is an interactive control it must be focusable and keyboard accessible.
- If the role is applied to a non-focusable element, the `tabindex` attribute will have to be used to change this.
- The expected keyboard shortcut for activating a radio button is focusing the element with the arrow keys.
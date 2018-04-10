## Accessibility

We aspire to meet the WCAG 2.0 AA Standards.

- Semantic HTML should always be used when possible. `<input type="checkbox" />`
- If semantic HTML is not an option, use the ARIA-role for checkbox. `<tag role="checkbox" />`. If using the "checkbox" role, developer is required to keep track of selected state using aria-checked attribute
  - aria-checked is "true" if checkbox is selected
  - aria-checked is "false" if checkbox is not selected
  - aria-checked is "mixed" if checkbox is indetermiate
- All checkboxes must have an associated label
  ```<span role="checkbox" aria-checked="false" tabindex="0" id="chk1"></span>
  <label for="chk1">Remember my preferences</label>```
- Since a checkbox is an interactive control it must be focusable and keyboard accessible.
- If the role is applied to a non-focusable element, the tabindex attribute will have to be used to change this.
- The expected keyboard shortcut for activating a checkbox is the Space key.
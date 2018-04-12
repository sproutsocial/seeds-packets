---
title: Accessibility
layout: default
---

We aim to make our software accessible to the widest audience possible. Empowering all people to successfully use our Platforms requires taking a Universal approach to design and development. 


## Practice

### Accessibility Compliance Goals

For all of Sprout's web apps, we strive to achieve the Web Content Accessibility Guidelines 2.0 AA level of compliance. This ensures:
- that we are reaching our widest-possible audience
- we have the ability to sell to institutions that receive federal funding
- our company values are an integral part of how we build our products

### Best Practices

Accessibility is for everyone.
- Accessibility is about ensuring _equal access_ to our platforms for all peoples.
- This does include people with disabilities but also benefits many other aspects such as personal preference, power users, SEO and more.
- Thus, we approach Accessibility with Universal Design, rather than "othering" sequestered experiences just for those with disabilities.

### Do’s and Don’ts

- **DO:** Use the native browser `outline` on focus
	![focus]({{{siteUrl}}}/assets/SEEDS-focus-outline.svg)
- **DON’T:** Subdue or alter the native browser `outline`
	![focus]({{{siteUrl}}}/assets/SEEDS-focus-no-outline.svg)
- **DO:** Consider Accessibility practices as a continuous responsibility for all team members
- **DON'T:** Allow Accessibility features to be an after-thought
- **DO:** Understand expected keyboard navigation before beginning development.
- **DO:** Understand what parts of the feature/product need to be read aloud for Screen Readers, and which parts are decorations that need no explanation.

## Universal Design

### One Experience to Rule Them All

A Universal Design approach means we consistently focus on these aspects of User Experience
- Clean, intuitive and logical design and semantic structure
	- Use semantic headings to segment and label pages
	- Consider the "outline" version of a page
- Clear, concise and straightforward copy
	- Sprout Social app is currently accessible to speakers of English, French, Spanish, Italian, and Portuguese. In order to best accommodate these audiences, keep copy short and to the point, as translations are more likely to greatly increase in size (character count) and lose clarity from a "wordy" English source.
	- **Acronyms** - must always be defined out upon first-use
- Usage
	- **Equitable** - the design and fair and impartial
	- **Flexible** - the app allows for multiple input/output methods to accommodate user needs/preferences
	- **Perceptible** - Can the information be easily digested and understood? Either visually, through audio, or through other Assistive Technologies (ATs)?
	- **Tolerance For Error** - Does the app degrade gracefully?
	- **Forgiving** - Can a user feel confident that they can explore without fear of breaking something or reverting a change?
	- **Low Physical Effort** - Is it physically strenuous to use the app? Are there other paths of interaction if a user has a motor impairment?

	
## Keyboard Navigation

We aspire to meet the WCAG 2.0 AA Standards.

### Expected Keyboard Navigation Interactions

| Interaction        | Keystrokes           | Notes  |
| ------------------ |:--------------------| :------|
| Navigate to most elements      | <ul><li><div class='keybutton'>tab</div> - navigate forward</li><li><div class='keybutton'>shift</div> + <div class='keybutton'>tab</div> - navigate backward</li></ul> | <ul><li>Clear, browser-native focus outlines must be present on focused element</li> <li>Navigation order should be logical and intuitive</li></ul>|
| Links      | <ul><li><div class='keybutton'>enter</div></li></ul> | |
| Buttons | <ul><li><div class='keybutton'>enter</div> or <div class='keybutton'>space</div></li></ul> | Ensure elements with ARIA `role="button"` can be activated with both key commands. |
| Checkboxes | <ul><li><div class='keybutton'>space</div> - toggles checked / unchecked</li></ul> |  |
| Radios | <ul><li><div class='keybutton'>tab</div> - to enter/leave the radio group</li><li><div class='keybutton'>↑</div> <div class='keybutton'>↓</div> - change selection when radios are stacked</li><li><div class='keybutton'>←</div> <div class='keybutton'>→</div> - change selection when radios are in a row</li></ul> | Radio selection should update automatically on keyup |
| Select (Dropdown) Menu | <ul><li><div class='keybutton'>space</div> - to expand a select (sub)menu</li><li><div class='keybutton'>↑</div> <div class='keybutton'>↓</div> - to traverse menu items</li></ul> |  <ul><li>Consider each element in a Select Menu to be a button, thus <div class='keybutton'>enter</div> or <div class='keybutton'>space</div> will activate that item. </li><li>If the menu item will open up a submenu, focus on the first element in submenu upon opening.</li></ul> |
| Autocomplete | <ul><li>Type to begin filtering</li><li><div class='keybutton'>↑</div> <div class='keybutton'>↓</div> - to traverse options</li><li><div class='keybutton'>enter</div> - to select an option</li></ul> | Upon selection of an auto-complete option, focus should go back to the autocomplete text field |
| Dialog / Modal / Takeover | <ul><li><div class='keybutton'>esc</div> - to initiate teardown</li></ul> | This will usually just close the modal unless a confirmation/warning modal is required to fully dismiss |
| Sliders | <ul><li><div class='keybutton'>↑</div> <div class='keybutton'>↓</div> OR </li><li><div class='keybutton'>←</div> <div class='keybutton'>→</div> - to increase/decrease slider value</li></ul> |  |
| Range Sliders | <ul><li><div class='keybutton'>tab</div> and <div class='keybutton'>shift</div>+<div class='keybutton'>tab</div> - focus on either slider handle</li><li>Standard interaction for sliders once focused on a slider handle</li></ul> | <ul><li>On PCs, it is standard for <div class='keybutton'>home</div> and <div class='keybutton'>end</div> to send a focused slider handle to the lowest/highest value.</li><li><div class='keybutton'>page up</div> and <div class='keybutton'>page down</div> can also be used to change slider's values by larger increments (usually 10)</li></ul> |
| Tab Panel (Tab Group) | <ul><li><div class='keybutton'>tab</div> - to enter and leave the tab panel</li><li><div class='keybutton'>↑</div> <div class='keybutton'>↓</div> OR </li><li><div class='keybutton'>←</div> <div class='keybutton'>→</div> - to change tab selection</li></ul> | <ul><li>This is specifically for "application" tabs that do not require a page reload, if the tab group will reload the page, then consider them as a list of Links, where <div class='keybutton'>tab</div> and <div class='keybutton'>enter</div> are more appropriate interactions</li><li>Tab content should update automatically upon change of the selected tab</ul> |
| Tree | <ul><li><div class='keybutton'>tab</div> - to enter and leave the tab panel</li><li><div class='keybutton'>↑</div> <div class='keybutton'>↓</div> - navigate previous/next menu options</li><li><div class='keybutton'>←</div> <div class='keybutton'>→</div> - collapse/expand submenu, move up/down one level</li></ul> |  |
| Scrolling | <ul><li><div class='keybutton'>↑</div> <div class='keybutton'>↓</div> - vertical scroll</li><li><div class='keybutton'>←</div> <div class='keybutton'>→</div> - horizontal scroll</li><li><div class='keybutton'>space</div> / <div class='keybutton'>space</div>+<div class='keybutton'>shift</div> - vertical scroll by page.</li> | Always minimize or eliminate horizontal scrolling within our supported viewport sizes. |

## Resources

### Links

- Our keyboard nav is heavily taken from the [Expected Keyboard Navigation](https://webaim.org/techniques/keyboard/#testing) table from WebAim.
- For a detailed look, check out the [Web Content Accessibility Guidelines 2.0 AA Standards](https://www.w3.org/WAI/WCAG20/quickref/) from W3.
## Resources

### App Downloads

- [Sketch Palette](_generated/seeds-color.{{ site.versions.seeds-color }}.sketchpalette) (Requires [Sketch Palettes Plugin](https://github.com/andrewfiorillo/sketch-palettes))
- [Adobe Swatch Exchange](_generated/seeds-color.{{ site.versions.seeds-color }}.ase)
- [macOS System Palette](_generated/seeds-color.{{ site.versions.seeds-color }}.clr)


### Get the Code

- For SCSS or Javascript:
  - `yarn add @sproutsocial/seeds-color`
  - `npm install @sproutsocial/seeds-color --save`
- [Python]({{ site.baseurl }}/_generated/seeds_color.py)
- [Android XML]({{ site.baseurl }}/_generated/seeds_color.xml)
- [Swift]({{ site.baseurl }}/_generated/UIColor+SeedsColor.swift)

### Links Downloads

- [Contrast Grid](http://contrast-grid.eightshapes.com/)

### Find the Nearest Color Tool

<form>
  <div>
    <label>
      Color to Match
      <input id="color-closest" type="color" placeholder="#000 or #000000">
    </label>
  </div>
  <div>
    <label>
      <input type="checkbox" id="color-include-bambu" checked>
      Include Bambu Brand Colors
    </label>
  </div>
  <div>
    <span style="display: inline-block; border: 1px solid #f3f4f4">
      <span id="color-closest-selected" style="display: inline-block; width: 2em; height: 2em;" title="Your color"></span><span id="color-closest-found" style="display: inline-block; width: 2em; height: 2em;" title="Nearest Color"></span>
    </span>
    <label>
      <span>Nearest Color Name</span>
      <input id="color-closest-name" type="text">
    </label>
    <label>
      <span>Nearest Color Value</span>
      <input id="color-closest-value" type="text">
    </label>
  </div>
</form>
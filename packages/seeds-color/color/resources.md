## Resources

### Links

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
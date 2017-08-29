## Examples

<h3>App Downloads</h3>
<ul>
  <li>
    <a href="{{ site.baseurl }}/_generated/{{page.package}}.{{ site.data.versions[page.package].version }}.json" download>Sketch Styles</a> (Requires <a href="https://github.com/nilshoenson/shared-text-styles">Shared Text Styles plugin</a>)
  </li>
  <li>
    <a href="https://assets.adobe.com/assets/libraries/a4c2bfd3-f701-470c-ab88-1ba696d9f628e">Adobe Creative Cloud Library</a>
  </li>
</ul>

<h3>Get the Code</h3>
<p>For SCSS or Javascript:</p>
<ul>
  <li>
    <code>yarn add @sproutsocial/{{page.package}}</code>
  </li>
  <li>
    <code>npm install @sproutsocial/{{page.package}} --save</code>
  </li>
</ul>

### Typefaces

- Sprout Social’s primary font family is Proxima Nova.
- Bambu’s primary font families are Clean Sanchez (alternate glyphs), Proxima Nova.
- Native mobile apps utilize the system font families: San Francisco for iOS and Roboto for Android.
- When limited to system fonts we use Helvetica. 

<table class="table">
  <thead>
    <th scope="col" style="white-space: nowrap;">
      Name
    </th>
    <th scope="col">Example</th>
  </thead>
  
  <tbody>
    <tr>
      <th>Proxima Nova</th>
      <td>
        <div class="Typography-size--700">
          ABCDEFGHIJKLMNOPQRSTUVWXYZ<br>
          abcdefghijklmnopqrstuvwxyz<br>
          0987654321
        </div>
      </td>
    </tr>

    <tr>
      <th>Clean Sanchez</th>
      <td>
        <div class="Typography-size--700 Typography-weight--semibold Typography-family--sanchez">
        ABCDEFGHIJKLMNOPQRSTUVWXYZ<br>
        abcdefghijklmnopqrstuvwxyz<br>
        0987654321
        </div>
      </td>
    </tr>
  </tbody>
</table>

{% include_relative scale.html %}

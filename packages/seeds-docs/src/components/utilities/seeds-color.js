import React from 'react';
import Colors from '@sproutsocial/seeds-color';
import tokens from '@sproutsocial/seeds-color/dist/tokens.json';
import {hexToLab, cie1994} from '@sproutsocial/seeds-utils/color-functions';
import tinycolor from 'tinycolor2';

import CopyContent from '../copy-content';

class ClosestColorTool extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentColor: '',
      includeBambu: true,
      format: 'app'
    };
  }

  setCurrentColor = e => {
    this.setState({
      currentColor: e.currentTarget.value
    });
  };

  getCloestColor = () => {
    const {currentColor, includeBambu, format} = this.state;
    if (!currentColor.match(/^#?(?:[0-9a-fA-F]{3}){1,2}$/)) {
      return {};
    }

    const colorsToCheck = tokens.filter(color => {
      const isBambuColor = color.category == 'bambu';
      return !color.deprecated && (includeBambu || !isBambuColor);
    });

    const lab = hexToLab(currentColor);
    let distance = cie1994(lab, hexToLab(colorsToCheck[0].value.hex));
    let closestColor = 0;

    colorsToCheck.forEach((color, i) => {
      const thisDistance = cie1994(lab, hexToLab(color.value.hex));
      if (thisDistance < distance) {
        closestColor = i;
        distance = thisDistance;
      }
    });

    return {
      name: colorsToCheck[closestColor][format],
      value: colorsToCheck[closestColor].value.hex
    };
  };

  setIncludeBambu = e => {
    this.setState({
      includeBambu: !!e.currentTarget.checked
    });
  };

  setFormat = e => {
    this.setState({
      format: e.currentTarget.value
    });
  };

  render() {
    const {currentColor, includeBambu, format} = this.state;
    const closestColor = this.getCloestColor();

    return (
      <div className="Utility">
        <h3>Find the Nearest Color Tool</h3>
        <form>
          <div>
            <label>
              Color to Match
              <input type="color" placeholder="#000 or #000000" onChange={this.setCurrentColor} />
            </label>
          </div>

          <div>
            <label>
              Name Format
              <select onChange={this.setFormat} value={format}>
                <option value="palette">Design App</option>
                <option value="sass">Sass</option>
                <option value="javascript">Javascript</option>
                <option value="swift">Swift</option>
                <option value="android">Android XML</option>
                <option value="python">Python</option>
              </select>
            </label>
          </div>

          <div>
            <label>
              <input type="checkbox" checked={includeBambu} onChange={this.setIncludeBambu} />
              Include Bambu Brand Colors
            </label>
          </div>
        </form>

        <h4>Nearest Color</h4>
        <div
          className="Swatch"
          style={{
            backgroundColor: closestColor.value,
            color: closestColor.value && tinycolor(closestColor.value).isDark() ? Colors.COLOR_WHITE : 'currentColor'
          }}
        >
          <span>
            <strong>
              <CopyContent>
                <pre>{closestColor.name || 'Use the color picker above to choose a color to match.'}</pre>
              </CopyContent>
            </strong>
          </span>

          <span>
            <CopyContent>
              <pre>{closestColor.value}</pre>
            </CopyContent>
          </span>
        </div>
      </div>
    );
  }
}

export default ClosestColorTool;

import React from 'react';
import tokens from '@sproutsocial/seeds-typography/dist/tokens.json';

const FamilyExample = ({token}) => {
  const styles = {
    fontFamily: token.value
  };

  return (
    <div className="Typography-size--700" style={styles}>
      ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />
      abcdefghijklmnopqrstuvwxyz<br />
      0987654321
    </div>
  );
};

const WeightExample = ({token}) => {
  const styles = {
    fontWeight: token.value
  };

  return (
    <div className="Typography-size--700" style={styles}>
      weight
    </div>
  );
};

const SizeExample = ({token}) => {
  const styles = {
    fontSize: token.value.fontSize,
    lineHeight: `${token.value.lineHeightPx}`,
    overflow: 'hidden',
    height: `calc(${token.value.lineHeightPx} * 3)`,
    maxWidth: '15em',
    margin: 0
  };

  return (
    <p style={styles}>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur unde delectus neque, similique. Numquam vero
      debitis quidem veniam porro incidunt temporibus quas quasi eum, provident, consectetur minus, praesentium a
      commodi.
    </p>
  );
};

const TypographyExample = ({ExampleTable}) => {
  return (
    <div>
      <h3>Typefaces</h3>
      <ul>
        <li>Sprout Social’s primary font family is Proxima Nova.</li>
        <li>Bambu’s primary font families are Clean Sanchez (alternate glyphs), Proxima Nova.</li>
        <li>Native mobile apps utilize the system font families: San Francisco for iOS and Roboto for Android.</li>
        <li>
          When Proxima Nova or Sanchez are unavailable, we attempt to default to{' '}
          <a href="https://css-tricks.com/snippets/css/system-font-stack/">system font families</a>. Defaulting to these
          fonts helps also with emoji rendering. The Proxima and Sanchez tokens already include theses system font
          fallbacks;{' '}
          <strong>
            do not use the system font stack on its own unless you are using SEEDS in a situtation where loading Proxima
            or Sanchez is impossible or unwise
          </strong>.
        </li>
      </ul>
      <ExampleTable tokens={tokens.filter(token => token.category == 'font family')} ChildClass={FamilyExample} />

      <h3>Font Weights</h3>
      <p>For simplicity and performance, we use two font weights on the web.</p>
      <ExampleTable tokens={tokens.filter(token => token.category == 'font weight')} ChildClass={WeightExample} />

      <h3>Type Scale</h3>
      <p>
        Line heights are calculated to ensure at least three lines align to an 8px grid. Use the associated line-height
        values only.
      </p>
      <ExampleTable tokens={tokens.filter(token => token.category == 'font size')} ChildClass={SizeExample} />
    </div>
  );
};

module.exports = TypographyExample;

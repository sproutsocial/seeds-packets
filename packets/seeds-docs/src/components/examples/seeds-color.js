import React from 'react';
import ExampleTable from '../example-table';
import Colors from '@sproutsocial/seeds-color';
import tokens from '@sproutsocial/seeds-color/dist/tokens.json';
import tinycolor from 'tinycolor2';
import upperFirst from 'lodash.upperfirst';

const ColorExample = props => {
  const categories = Array.from(new Set(tokens.map(token => token.category)));
  const tables = categories.map(category => (
    <div key={category}>
      <h3>{upperFirst(category)}</h3>
      <ExampleTable
        tokens={tokens.filter(token => token.category == category)}
        rowStyle={token => ({
          backgroundColor: token.value.hex,
          color: tinycolor(token.value.hex).isDark() ? Colors.COLOR_WHITE : 'currentColor'
        })}
      />
    </div>
  ));
  return <div>{tables}</div>;
};

export default ColorExample;

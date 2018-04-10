import React from 'react';
import ExampleTable from '../example-table';
import tokens from '@sproutsocial/seeds-border/dist/tokens.json';

const BorderTemplate = ({token}) => {
  const styles =
    token.category == 'width'
      ? {
          borderWidth: token.value
        }
      : {
          borderRadius: token.value
        };

  return <div className="Example-border" style={styles} />;
};

const BorderExample = props => {
  return (
    <div>
      <h3>Border Radius</h3>
      <ExampleTable tokens={tokens.filter(token => token.category == 'radius')} ChildClass={BorderTemplate} />

      <h3>Border Width</h3>
      <ExampleTable tokens={tokens.filter(token => token.category == 'width')} ChildClass={BorderTemplate} />
    </div>
  );
};

export default BorderExample;

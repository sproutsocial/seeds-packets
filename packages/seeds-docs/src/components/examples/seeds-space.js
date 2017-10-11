import React from 'react';
import ExampleTable from '../example-table';
import tokens from '@sproutsocial/seeds-space/dist/tokens.json';

const SpaceExample = ({token}) => {
  const styles = {
    width: token.value,
    height: token.value,
  };

  return (
    <div className="space-sample" style={styles}></div>
  );
};

const Example = (props) => {
  return (
    <div>
      <h3>Size</h3>
      <ExampleTable
        tokens={tokens}
        ChildClass={SpaceExample}
      />
    </div>
  );
};

export default Example;

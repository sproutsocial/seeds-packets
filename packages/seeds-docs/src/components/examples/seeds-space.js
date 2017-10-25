import React from 'react';
import ExampleTable from '../example-table';
import tokens from '@sproutsocial/seeds-space/dist/tokens.json';

const SpaceTemplate = ({token}) => {
  const styles = {
    width: token.value.value,
    height: token.value.value
  };

  return <div className="space-sample" style={styles} />;
};

const SpaceExample = props => {
  return (
    <div>
      <h3>Size</h3>
      <ExampleTable tokens={tokens} ChildClass={SpaceTemplate} />
    </div>
  );
};

export default SpaceExample;

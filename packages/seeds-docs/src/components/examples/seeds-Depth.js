import React from 'react';
import ExampleTable from '../example-table';
import tokens from '@sproutsocial/seeds-depth/dist/tokens.json';

const DepthTemplate = ({token}) => {
  const styles = {};

  return (
    <div className="Depth" style={styles}>Example</div>
  );
};

const DepthExample = (props) => {
  return (
    <div>
      <h3>Depth</h3>
      <ExampleTable
        tokens={tokens}
        ChildClass={DepthTemplate}
      />
    </div>
  );
};

export default DepthExample;

import React from 'react';
import ExampleTable from '../example-table';
import tokens from '@sproutsocial/seeds-<%= packageName %>/dist/tokens.json';

const <%= packageNameTitlecase %>Template = ({token}) => {
  const styles = {};

  return (
    <div className="<%= packageNameTitlecase %>" style={styles}>Example</div>
  );
};

const <%= packageNameTitlecase %>Example = (props) => {
  return (
    <div>
      <h3><%= packageNameTitlecase %></h3>
      <ExampleTable
        tokens={tokens}
        ChildClass={<%= packageNameTitlecase %>Template}
      />
    </div>
  );
};

export default <%= packageNameTitlecase %>Example;

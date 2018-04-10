import React from 'react';
import ExampleTable from '../example-table';
import tokens from '@sproutsocial/seeds-<%= packetName %>/dist/tokens.json';

const <%= packetNameTitlecase %>Template = ({token}) => {
  const styles = {};

  return (
    <div className="<%= packetNameTitlecase %>" style={styles}>Example</div>
  );
};

const <%= packetNameTitlecase %>Example = (props) => {
  return (
    <div>
      <h3><%= packetNameTitlecase %></h3>
      <ExampleTable
        tokens={tokens}
        ChildClass={<%= packetNameTitlecase %>Template}
      />
    </div>
  );
};

export default <%= packetNameTitlecase %>Example;

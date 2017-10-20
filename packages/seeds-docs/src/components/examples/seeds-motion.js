import React from 'react';
import ExampleTable from '../example-table';
import tokens from '@sproutsocial/seeds-motion/dist/tokens.json';

const EasingExample = ({token}) => {
  const styles = {
    transitionTimingFunction: token.value
  };

  return (
    <div className="Example-motion">
      <div className="Example-motion-ball" style={styles}></div>
    </div>
  );
};

const MotionExample = (props) => {
  return (
    <div>
      <h3>Easing</h3>
      <ExampleTable
        tokens={tokens}
        ChildClass={EasingExample}
      />
    </div>
  );
};

export default MotionExample;

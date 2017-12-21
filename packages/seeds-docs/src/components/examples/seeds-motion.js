import React from 'react';
import ExampleTable from '../example-table';
import tokens from '@sproutsocial/seeds-motion/dist/tokens.json';

const EasingExample = ({token}) => {
  const styles = {
    transitionTimingFunction: token.value
  };

  return (
    <div className="Example-motion">
      <div className="Example-motion-ball" style={styles} />
    </div>
  );
};

const SimultaneousMotionExample = () => {
  const els = document.querySelectorAll('.Example-motion');
  let i;

  for (i = 0; i < els.length; i++) {
    els[i].className = els[i].className.includes('animated') ? 'Example-motion' : 'Example-motion animated';
  }
}

const MotionExample = props => {
  return (
    <div className='seeds-motion-table'>
      <h3>Easing</h3>
      <button className='seeds-motion-table-button' onClick={SimultaneousMotionExample}>Compare easings</button>
      <ExampleTable tokens={tokens} ChildClass={EasingExample} />
    </div>
  );
};

export default MotionExample;

import React from 'react';
import ExampleTable from '../example-table';
import tokens from '@sproutsocial/seeds-motion/dist/tokens.json';

function getEasingExample(isAnimated = false) {
  const exampleClassName = ['Example-motion-ball', isAnimated ? 'isAnimated' : ''].join(' ');

  return ({token}) => {
    const styles = {
      transitionTimingFunction: token.value,
      animationTimingFunction: token.value
    };

    return (
      <div className="Example-motion">
        <div className={exampleClassName} style={styles} />
      </div>
    );
  };
}

class MotionExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isAnimated: false
    };
  }

  toggleIsAnimated = () => {
    this.setState({
      isAnimated: !this.state.isAnimated
    });
  };

  render() {
    const {isAnimated} = this.state;
    return (
      <div>
        <h3>Easing</h3>
        <ExampleTable
          tokens={tokens}
          ChildClass={getEasingExample(isAnimated)}
          exampleAction={
            <button type="button" onClick={this.toggleIsAnimated} title="Hover balls to view animations individually">
              {!isAnimated ? 'Play' : 'Stop'}
            </button>
          }
        />
      </div>
    );
  }
}

export default MotionExample;

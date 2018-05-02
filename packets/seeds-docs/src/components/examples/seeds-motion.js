import React from 'react';
import ExampleTable from '../example-table';
import tokens from '@sproutsocial/seeds-motion/dist/tokens.json';
import upperFirst from 'lodash.upperfirst';

function getEasingExample(isAnimated = false) {
  const exampleClassName = ['Example-motion-ball isEasing', isAnimated ? 'isAnimated' : ''].join(' ');

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

function getTimingExample(isAnimated = false) {
  const exampleClassName = ['Example-motion-ball isTiming', isAnimated ? 'isAnimated' : ''].join(' ');

  return ({token}) => {
    const styles = {
      transitionDuration: token.value,
      animationDuration: token.value
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
      isAnimatingEasing: false,
      isAnimatingTiming: false
    };
  }

  toggleEasingAnimation = () => {
    this.setState({isAnimatingEasing: !this.state.isAnimatingEasing});
  };

  toggleTimingAnimation = () => {
    this.setState({isAnimatingTiming: !this.state.isAnimatingTiming});
  };

  shouldComponentUpdate = (nextProps, nextState) => {
    return (
      this.state.isAnimatingEasing !== nextState.isAnimatingEasing ||
      this.state.isAnimatingTiming !== nextState.isAnimatingTiming
    );
  };

  render() {
    const {isAnimatingEasing, isAnimatingTiming} = this.state;

    return (
      <div>
        <h3>Easing</h3>
        <ExampleTable
          tokens={tokens.filter(token => token.category === 'easing')}
          ChildClass={getEasingExample(isAnimatingEasing)}
          exampleAction={
            <button
              type="button"
              onClick={this.toggleEasingAnimation}
              title="Hover balls to view animations individually"
            >
              {!isAnimatingEasing ? 'Play' : 'Stop'}
            </button>
          }
        />

        <h3>Duration</h3>
        <ExampleTable
          tokens={tokens.filter(token => token.category == 'duration')}
          ChildClass={getTimingExample(isAnimatingTiming)}
          exampleAction={
            <button
              type="button"
              onClick={this.toggleTimingAnimation}
              title="Hover balls to view animations individually"
            >
              {!isAnimatingTiming ? 'Play' : 'Stop'}
            </button>
          }
        />
      </div>
    );
  }
}

export default MotionExample;

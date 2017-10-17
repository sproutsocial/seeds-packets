import React from 'react';
import PropTypes from 'prop-types';

class CopyContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      copied: false
    };
  }

  copyContent = e => {
    if (this.state.copied) return;
    const temp = document.createElement('input');
    const text = e.currentTarget.innerText;

    document.body.appendChild(temp);
    temp.value = text;
    temp.select();
    document.execCommand('copy');
    temp.remove();
    this.setState({
      copied: true
    });
    setTimeout(() => this.setState({copied: false}), 500);
  };

  render() {
    const {copied} = this.state;

    return (
      <span className="CopyContent" title="Click to copy" onClick={this.copyContent}>
        {copied ? 'Copied!' : this.props.children}
      </span>
    );
  }
}

export default CopyContent;

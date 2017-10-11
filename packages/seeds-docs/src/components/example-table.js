import React from 'react';
import PropTypes from 'prop-types';

class ExampleTable extends React.Component {
  static propTypes = {
    tokens: PropTypes.array,
    rowStyle: PropTypes.object,
    ChildClass: PropTypes.func
  };

  constructor(props) {
    super(props);
    // Grab the first token and determine available token types
    const firstToken = props.tokens[0];
    const types = {
      app: firstToken.app,
      sass: firstToken.sass,
      javascript: firstToken.javascript,
      swift: firstToken.swift,
      android: firstToken.android,
      python: firstToken.python
    };
    const availableTypes = Object.keys(types).filter(type => types[type]);

    this.state = {
      availableTypes,
      selectedType: availableTypes[0]
    };
  }

  displayName = type => {
    const displayNames = {
      app: 'Design App',
      sass: 'Sass',
      javascript: 'JavaScript',
      swift: 'Swift',
      android: 'Android',
      python: 'Python'
    };

    return displayNames[type];
  };

  changeTokenType = e => {
    this.setState({
      selectedType: e.target.value
    });
  }

  render() {
    const {tokens, rowStyle, ChildClass} = this.props;
    const {availableTypes, selectedType} = this.state;
    const preStyle = {whiteSpace: 'normal'};
    
    return (
      <table>
        <thead>
          <tr>
            <th scope="col">
              Name
              <select value={selectedType} onChange={this.changeTokenType}>
                {availableTypes.map(type => <option key={type} value={type}>{this.displayName(type)}</option>)}
              </select>
            </th>

            {typeof tokens[0].deprecated != 'undefined' && <th />}
            
            {typeof tokens[0].value == 'object' ? (
              Object.keys(tokens[0].value).map(key => (
                <th scope="col" key={key}>
                    {key}
                </th>
              ))
            ) : (
              <th scope="col">
                  Value
              </th>
            )}

            {ChildClass && <th scope="col">Example</th>}
          </tr>
        </thead>

        <tbody>
          {tokens.map(token => (
            <tr key={JSON.stringify(token)} style={rowStyle && rowStyle(token)} className={`num${token.value}`}>
              <th scope="row">
                <pre>{token[selectedType]}</pre>
              </th>
                
              {typeof token.deprecated != 'undefined' && (
                <td>
                  {token.deprecated && (
                    <span className="Tag Tag--deprecated Tag--inverse">Deprecated</span>
                  )}
                </td>
              )}

              {typeof token.value == 'object' ? (
                Object.keys(token.value).map(key => (
                  <td key={key}>
                    <pre style={preStyle}>{token.value[key]}</pre>
                  </td>
                ))
              ) : (
                <td key={token.value}>
                    <pre style={preStyle}>{token.value}</pre>
                </td>
              )}

              <td>
                {ChildClass && <ChildClass token={token} />}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
}

export default ExampleTable;

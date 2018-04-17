import React from 'react';
import PropTypes from 'prop-types';
import CopyContent from './copy-content';

class ExampleTable extends React.Component {
  static propTypes = {
    tokens: PropTypes.array,
    rowStyle: PropTypes.func,
    ChildClass: PropTypes.func,
    exampleAction: PropTypes.node
  };

  constructor(props) {
    super(props);
    // Grab the first token and determine available token types
    const firstToken = props.tokens[0];
    const types = {
      app: firstToken.app,
      sass: firstToken.sass,
      javascript: firstToken.javascript,
      css: firstToken.css,
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
      css: 'CSS',
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
  };

  render() {
    const {tokens, rowStyle, ChildClass, exampleAction} = this.props;
    const {availableTypes, selectedType} = this.state;

    return (
      <div style={{overflowX: 'auto'}}>
        <table>
          <thead>
            <tr>
              <th scope="col">
                Token Name
                <select value={selectedType} onChange={this.changeTokenType}>
                  {availableTypes.map(type => (
                    <option key={type} value={type}>
                      {this.displayName(type)}
                    </option>
                  ))}
                </select>
              </th>

              {typeof tokens[0].deprecated !== 'undefined' && <th />}

              {typeof tokens[0].value == 'object' ? (
                Object.keys(tokens[0].value).map(key => (
                  <th scope="col" key={key}>
                    {key}
                  </th>
                ))
              ) : (
                <th scope="col">Value</th>
              )}

              {ChildClass && <th scope="col">Example {exampleAction}</th>}
            </tr>
          </thead>

          <tbody>
            {tokens.map(token => (
              <tr
                key={JSON.stringify(token)}
                style={rowStyle && rowStyle(token)}
                className={token['app'] && token['app'].split(' ').join('')}
              >
                <th scope="row">
                  <CopyContent>
                    {selectedType == 'app' ? <span>{token[selectedType]}</span> : <pre>{token[selectedType]}</pre>}
                  </CopyContent>
                </th>

                {typeof token.deprecated != 'undefined' && (
                  <td>{token.deprecated && <span className="Tag Tag--deprecated Tag--inverse">Deprecated</span>}</td>
                )}

                {typeof token.value == 'object' ? (
                  Object.keys(token.value).map(key => (
                    <td key={key}>
                      <CopyContent>
                        <pre>{token.value[key]}</pre>
                      </CopyContent>
                    </td>
                  ))
                ) : (
                  <td key={token.value}>
                    <CopyContent>
                      <pre>{token.value}</pre>
                    </CopyContent>
                  </td>
                )}

                {ChildClass && (
                  <td>
                    <ChildClass token={token} />
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ExampleTable;

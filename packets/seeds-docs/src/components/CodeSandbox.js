import React from 'react';
import styled from 'styled-components';

import {LiveProvider, LiveEditor, LiveError, LivePreview} from 'react-live';

import CodeSamples from './CodeSamples';

import {
  COLOR_NEUTRAL_100,
  COLOR_NEUTRAL_200,
  COLOR_NEUTRAL_900,
  COLOR_RED_100,
  COLOR_RED_900
} from '@sproutsocial/seeds-color';

import {SPACE_SIZE_400} from '@sproutsocial/seeds-space';
import {TYPOGRAPHY_SIZE_300} from '@sproutsocial/seeds-typography';

const Container = styled.div`
  .react-live {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    background: ${COLOR_NEUTRAL_100};
    border: 1px solid ${COLOR_NEUTRAL_200};
    border-radius: 4px;
    margin: 2em 0;
  }

  .react-live-editor {
    flex-basis: 50%;
    order: 2;
    * {
      font-family: monospace;
    }
    padding: ${SPACE_SIZE_400};
    background: ${COLOR_NEUTRAL_900};
    ${TYPOGRAPHY_SIZE_300};
  }

  .react-live-preview {
    flex-basis: 50%;
    order: 1;
    padding: ${SPACE_SIZE_400};
  }

  .react-live-error {
    flex-basis: 100%;
    order: 3;
    background: ${COLOR_RED_100};
    color: ${COLOR_RED_900};
    padding: ${SPACE_SIZE_400};
  }
`;

export default class CodeSandbox extends React.Component {
  render() {
    const editorScope = {styled};
    const code = this.props.name && CodeSamples[this.props.name];

    return (
      <Container>
        <LiveProvider
          code={code || this.props.children.toString()}
          scope={editorScope}
          noInline={!this.props.inline || !this.props.inline === 'true'}
        >
          <LiveEditor className="react-live-editor" contentEditable={!this.props.static} />
          <LiveError />
          <LivePreview />
        </LiveProvider>
      </Container>
    );
  }
}

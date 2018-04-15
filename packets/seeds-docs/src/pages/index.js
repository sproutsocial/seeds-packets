import React from 'react';
import CodeSandbox from '../components/CodeSandbox';
import RenderDoc from '../components/RenderDocumentation';
import outdent from 'outdent';

class IndexPage extends React.Component {
  render() {
    return <div>{RenderDoc(this.props.data.indexPage.htmlAst)}</div>;
  }
}

export default IndexPage;

export const query = graphql`
  query IndexQuery {
    indexPage: markdownRemark(fileAbsolutePath: {regex: "/design-systems/README/"}) {
      htmlAst
    }
  }
`;

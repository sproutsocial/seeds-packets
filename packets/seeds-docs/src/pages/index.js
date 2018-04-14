import React from 'react';
import Link from 'gatsby-link';

class IndexPage extends React.Component {
  render() {
    return <div dangerouslySetInnerHTML={{__html: this.props.data.dsPages.html}} />;
  }
}

export default IndexPage;

export const query = graphql`
  query IndexQuery {
    dsPages: markdownRemark(fileAbsolutePath: {regex: "/design-systems/README/"}) {
      html
    }
  }
`;

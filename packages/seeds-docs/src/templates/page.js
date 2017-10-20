import React from 'react';
import fm from 'front-matter';
import marked from 'marked';
import Helmet from 'react-helmet';

export default class Page extends React.Component {
  constructor(props) {
    super(props);
    marked.setOptions({
      renderer: new marked.Renderer(),
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: false,
      smartLists: true,
      smartypants: true
    });
  }

  render() {
    const {data} = this.props;
    const page = data.markdownRemark;

    return (
      <div>
        <Helmet
          title={`${page.frontmatter.title} | SEEDS`}
        />
        <h1>{page.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{__html: marked(fm(page.internal.content).body)}} />
      </div>
    );
  }
}

export const query = graphql`
  query PageQuery($slug: String!) {
    markdownRemark(fields: {slug: {eq: $slug}}) {
      id
      internal {
        content
      }
      frontmatter {
        title
      }
    }
  }
`;

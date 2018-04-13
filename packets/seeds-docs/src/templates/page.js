import React from 'react';
import fm from 'front-matter';
import marked from 'marked';
import Helmet from 'react-helmet';
import Mustache from 'mustache';

export default class Page extends React.Component {
  constructor(props) {
    super(props);
    const renderer = new marked.Renderer();
    renderer.listitem = function(text) {
      if (text.match(/<strong>DO:<\/strong>/g)) {
        return '<li class="do">' + text + '</li>\n';
      } else if (text.match(/<strong>DON[’']T:<\/strong>/g)) {
        return '<li class="dont">' + text + '</li>\n';
      } else {
        return '<li>' + text + '</li>\n';
      }
    };

    marked.setOptions({
      renderer: renderer,
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
    const html = Mustache.render(
      marked(fm(page.internal.content).body),
      Object.assign({}, {siteUrl: __PREFIX_PATHS__ ? __PATH_PREFIX__ : ''})
    );

    return (
      <div>
        <Helmet title={`${page.frontmatter.title} | SEEDS`} />
        <h1>{page.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{__html: html}} />
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

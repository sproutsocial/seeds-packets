import React from 'react';
import ExampleTable from '../components/example-table';
import Mustache from 'mustache';
import marked from 'marked';
import Helmet from 'react-helmet';
import upperFirst from 'lodash.upperfirst';

export default class PackagePage extends React.Component {
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
    const pkg = data.seedsPackage;
    const title = upperFirst(pkg.packageName.replace('seeds-', ''));
    const sections = data.sections.edges;
    // Try to import example and resource components for the package
    const exampleComponent = `../components/examples/${pkg.packageName}`;
    const utilityComponent = `../components/utilities/${pkg.packageName}`;
    let Examples = null;
    let Utility = null;

    try {
      Examples = require(`../components/examples/${pkg.packageName}`);
    } catch (error) {
      console.info('Module missing:', exampleComponent);
    }

    try {
      Utility = require(`../components/utilities/${pkg.packageName}`);
    } catch (error) {
      console.info('Module missing:', utilityComponent);
    }

    return (
      <article className={pkg.packageName}>
        <Helmet title={`${title} | SEEDS`} />
        <h1>
          {title}{' '}
          <small>
            {pkg.version} {pkg.stability}
          </small>
        </h1>

        {sections.map(({node}) => {
          if (node.fields.baseName == 'README') return;
          const html = Mustache.render(
            marked(node.internal.content),
            Object.assign({}, pkg, {siteUrl: __PREFIX_PATHS__ ? __PATH_PREFIX__ : ''})
          );

          if (node.fields.baseName.includes('overview')) {
            return (
              <div key={node.id}>
                <header className="Header">
                  <div className="Typography-size--500" dangerouslySetInnerHTML={{__html: html}} />
                  {Utility && <Utility key="resources" />}
                </header>
                <hr />
                {Examples && (
                  <section>
                    <h2 id="examples">Examples</h2>
                    <Examples ExampleTable={ExampleTable} />
                  </section>
                )}
              </div>
            );
          } else {
            return <section key={node.id} dangerouslySetInnerHTML={{__html: html}} />;
          }
        })}
      </article>
    );
  }
}

export const query = graphql`
  query PackageQuery($packageName: String!) {
    seedsPackage(packageName: {eq: $packageName}) {
      packageName
      name
      version
      stability
    }
    sections: allMarkdownRemark(
      filter: {fields: {packageName: {eq: $packageName}}}
      sort: {fields: [fields___baseName], order: ASC}
    ) {
      edges {
        node {
          id
          internal {
            content
          }
          frontmatter {
            title
          }
          fields {
            baseName
          }
        }
      }
    }
  }
`;

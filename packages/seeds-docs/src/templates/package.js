import React from 'react';
import ExampleTable from '../components/example-table';
import Mustache from 'mustache';
import marked from 'marked';
import upperFirst from 'lodash.upperfirst';

export default class PackagePage extends React.Component {
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
    const pkg = data.seedsPackage;
    const sections = data.sections.edges;
    // Try to import example and resource components for the package
    const exampleComponent = `../components/examples/${pkg.packageName}`;
    const resourceComponent = `../components/resources/${pkg.packageName}`;
    let Examples = null;
    let Resources = null;

    try {
      Examples = require(`../components/examples/${pkg.packageName}`);
    } catch (error) {
      console.info('Module missing:', exampleComponent);
    }

    try {
      Resources = require(`../components/resources/${pkg.packageName}`);
    } catch (error) {
      console.info('Module missing:', resourceComponent);
    }

    return (
      <article className={pkg.packageName}>
        <h1>
          {upperFirst(pkg.packageName.replace('seeds-', ''))}{' '}
          <small>
            {pkg.version} {pkg.stability}
          </small>
        </h1>

        {sections.map(({node}) => {
          if (node.fields.baseName == 'README') return;
          const html = Mustache.render(marked(node.internal.content), pkg);

          if (node.fields.baseName.includes('overview')) {
            return (
              <div key={node.id}>
                <header className="Typography-size--500" dangerouslySetInnerHTML={{__html: html}} />
                <hr />
                {Examples && (
                  <section>
                    <h2 id="examples">Examples</h2>
                    <Examples ExampleTable={ExampleTable} />
                  </section>
                )}
              </div>
            );
          } else if (node.fields.baseName.includes('resources')) {
            return (
              <section key={node.id}>
                <div key="content" dangerouslySetInnerHTML={{__html: html}} />
                {Resources && <Resources key="resources" />}
              </section>
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

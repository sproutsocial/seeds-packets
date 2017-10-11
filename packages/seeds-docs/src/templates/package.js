import React from 'react';
import ExampleTable from '../components/example-table';
import Mustache from 'mustache';
import marked from 'marked';

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

export default ({data}) => {
  console.log(data);
  const pkg = data.seedsPackage;
  const sections = data.sections.edges;
  const exampleComponent = `../components/examples/${pkg.packageName}`;
  const resourceComponent = `../components/resources/${pkg.packageName}`;
  let Examples = null;
  let Resources = null;
  
  try {
    Examples = require(`../components/examples/${pkg.packageName}`);
  } catch (error) {
    console.log('Module missing:', exampleComponent);
  }

  try {
    Resources = require(`../components/resources/${pkg.packageName}`);
  } catch (error) {
    console.log('Module missing:', exampleComponent);
  }

  return (
    <article>
      <h1>
        {pkg.packageName}{' '}
        <small>
          {pkg.version} {pkg.stability}
        </small>
      </h1>

      {sections.map(({node}) => {
        if (node.fields.baseName.includes('overview')) {
          const html = Mustache.render(marked(node.internal.content), pkg);
          return (
            <div key={node.id}>
              <header className="Typography-size--500" dangerouslySetInnerHTML={{__html: html}} />
              <hr />
              {Examples && (
                <section>
                  <h2>Examples</h2>
                  <Examples ExampleTable={ExampleTable} />
                </section>
              )}
            </div>
          );
        } else if (node.fields.baseName.includes('resources')) {
          const html = Mustache.render(marked(node.internal.content), pkg);
          return (
            [
              <div key="content" dangerouslySetInnerHTML={{__html: html}} />,
              Resources && (
                <Resources key="resources" />
              )
            ]
          );
        } else if (node.fields.baseName == 'README') {
          return;
        } else {
          const html = Mustache.render(marked(node.internal.content), pkg);
          return <section key={node.id} dangerouslySetInnerHTML={{__html: html}} />;
        }
      })}
    </article>
  );
};

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
          html
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

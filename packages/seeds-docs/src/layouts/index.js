import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import upperFirst from 'lodash.upperfirst';

import './index.scss';

const Sidebar = ({data}) => (
  <nav>
    <ul className="Nav flex-column">
      <li className="Nav-item">
        {/*<button className="Nav-link Nav-link--primary js-jira-issue">Submit SEEDS Ticket</button>*/}
      </li>

      {data.pages.edges.map(edge => {
        const item = edge.node;
        if (item.fields.slug == '/') return;
        return (
          <li className="Nav-item" key={item.id}>
            <Link className="Nav-link" to={item.fields.slug}>
              {item.frontmatter.title}
            </Link>

            {item.children && (
              <ul className="Nav">
                {item.children.map(entry => (
                  <li className="Nav-item">
                    <Link className="Nav-link" to={entry.url}>
                      {entry.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        );
      })}

      {data.packages.edges.map(edge => {
        const item = edge.node;
        return (
          <li className="Nav-item" key={item.id}>
            <Link className="Nav-link" to={`/${item.packageName}/`}>
              {upperFirst(item.packageName.replace('seeds-', ''))}
            </Link>

            {item.children && (
              <ul className="Nav">
                {item.children.map(entry => (
                  <li className="Nav-item">
                    <Link className="Nav-link" to={entry.url}>
                      {entry.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        );
      })}
    </ul>
  </nav>
);

const TemplateWrapper = ({children, data}) => (
  <div className="Page">
    <Helmet title={data.site.siteMetadata.title} meta={[{name: 'description', content: 'Sample'}]}>
      <meta name="author" content="Sprout Social" />
      <meta name="robots" content="noindex" />
    </Helmet>

    <div className="Sidebar">
      <Link className="Sidebar-brand" to="/">
        {data.site.siteMetadata.title}
      </Link>

      <div className="Sidebar-nav nav">
        <Sidebar data={data} />
      </div>
    </div>

    <main role="main">{children()}</main>
  </div>
);

TemplateWrapper.propTypes = {
  children: PropTypes.func,
  data: PropTypes.object
};

export default TemplateWrapper;

export const query = graphql`
  query LayoutQuery {
    site {
      siteMetadata {
        title
      }
    }
    pages: allMarkdownRemark(sort: {fields: [frontmatter___title], order: ASC}, filter: {fileAbsolutePath: {regex: "/src\/pages/"}}) {
      edges {
        node {
          id
          frontmatter {
            title
          }
          fields {
            slug
          }
        }
      }
    }
    packages: allSeedsPackage {
      edges {
        node {
          id
          packageName
        }
      }
    }
  }
`;

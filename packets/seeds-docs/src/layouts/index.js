import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';

import Sidebar from '../components/sidebar';
import './scss/index.scss';

/**
 * Function to build out a list of subnav links from all h2's in the main content area.
 *
 * @returns [Link] - An array of link objects
 */
function getSubnavLinks() {
  return [].map
    .call(document.querySelectorAll('main h2'), heading => {
      return {
        url: heading.id ? `#${heading.id}` : null,
        title: heading.innerText
      };
    })
    .filter(link => !!link.url);
}

const adverbs = [
  'Extremely',
  'Exquisitely',
  'Expressively',
  'Expertly',
  'Enticingly',
  'Enterprisingly',
  'Enduringly',
  'Electrically',
  'Efficiently',
  'Economically'
];
const adjectives = [
  'Excellent',
  'Executed',
  'Expandable',
  'Exemplary',
  'Exceptional',
  'Exhilarating',
  'Enviable',
  'Empathetic',
  'Effective',
  'Ebullient'
];

function getRandomArrayValue(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Main layout component for the site.
 *
 * @class TemplateWrapper
 * @extends {React.Component}
 */
class TemplateWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subnavLinks: [],
      adverb: getRandomArrayValue(adverbs),
      adjective: getRandomArrayValue(adjectives)
    };
  }

  componentDidMount() {
    // Wait until children render to build out subnav links
    requestAnimationFrame(() =>
      this.setState({
        subnavLinks: getSubnavLinks()
      })
    );
  }

  componentWillReceiveProps() {
    this.setState({
      adverb: getRandomArrayValue(adverbs),
      adjective: getRandomArrayValue(adjectives)
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.children) {
      requestAnimationFrame(() =>
        this.setState({
          subnavLinks: getSubnavLinks()
        })
      );
    }
  }

  render() {
    const {children, data, location} = this.props;
    const {adverb, adjective} = this.state;
    const description = `${adverb} ${adjective}`;

    return (
      <div className="Page">
        <Helmet
          title={`${data.site.siteMetadata.title} | SEEDS`}
          meta={[{name: 'description', content: `SEEDS is Sprout Social’s ${description} Design System.`}]}
        >
          <meta name="author" content="Sprout Social" />
          <meta name="robots" content="noindex" />
          <script src="https://sprout.atlassian.net/s/d41d8cd98f00b204e9800998ecf8427e-T/qqo0b4/b/c/7ebd7d8b8f8cafb14c7b0966803e5701/_/download/batch/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector.js?locale=en-US&collectorId=e1ee1c3e" />
        </Helmet>

        <div className="Sidebar">
          <Link className="Sidebar-brand" to="/">
            <abbr title={`Sprout’s ${description} Design System`} style={{textDecoration: 'none'}}>
              {data.site.siteMetadata.title}
            </abbr>
          </Link>
          <div className="Sidebar-nav nav">
            <Sidebar
              pages={data.pages.edges}
              packets={data.packets.edges}
              activePage={location.pathname}
              subnavLinks={this.state.subnavLinks}
            />
          </div>
        </div>

        <main role="main">{children()}</main>
      </div>
    );
  }
}

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
    pages: allMarkdownRemark(
      sort: {fields: [frontmatter___title], order: ASC}
      filter: {fileAbsolutePath: {regex: "/pages/"}}
    ) {
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
    packets: allSeedsPacket(sort: {fields: [packetName], order: ASC}) {
      edges {
        node {
          id
          packetName
        }
      }
    }
  }
`;

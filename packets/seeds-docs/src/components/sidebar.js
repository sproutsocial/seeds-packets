import React from 'react';
import Link from 'gatsby-link';
import upperFirst from 'lodash.upperfirst';

const NavItem = ({isActive, id, href, text, subnavLinks}) => (
  <li className={`Nav-item ${isActive ? 'Nav-item--active' : ''}`} key={id}>
    <Link className="Nav-link" activeClassName="isActive" to={href}>
      {text}
    </Link>

    {isActive &&
      subnavLinks && (
        <ul className="Nav">
          {subnavLinks.map(link => (
            <li className="Nav-item" key={link.url}>
              <Link className="Nav-link" to={`${href}${link.url}`}>
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
  </li>
);

export default class Sidebar extends React.Component {
  componentDidMount() {
    window.ATL_JQ_PAGE_PROPS = {
      triggerFunction: showCollectorDialog => {
        const button = document.querySelector('.js-jira-issue');
        button &&
          button.addEventListener('click', e => {
            e.preventDefault();
            showCollectorDialog();
          });
      }
    };
  }

  render() {
    const {pages, packets, activePage, subnavLinks} = this.props;
    const expandDocs = {};
    const expandPackets = {};

    //Open Documentation accordion by default unless Packets is specified in URL
    if (
      (typeof window !== 'undefined' && window.location.hash === '#documentation') ||
      (typeof window !== 'undefined' && window.location.hash != '#packets')
    ) {
      expandDocs['open'] = true;
    } else if (typeof window !== 'undefined' && window.location.hash === '#packets') {
      expandPackets['open'] = true;
    }

    return (
      <nav>
        <ul className="Nav flex-column">
          <li className="Nav-item">
            <button className="Nav-link Nav-link--primary js-jira-issue">Submit Ticket</button>
          </li>
          <li className="Nav-item">
            <details {...expandDocs}>
              <summary className="Nav-link">Documentation</summary>
              <ul className="Nav">
                {pages.map(edge => {
                  const item = edge.node;
                  if (item.fields.slug == '/') return;
                  const isActive = activePage.includes(item.fields.slug);

                  return (
                    <NavItem
                      isActive={isActive}
                      key={item.id}
                      href={item.fields.slug}
                      text={item.frontmatter.title}
                      subnavLinks={subnavLinks}
                    />
                  );
                })}
              </ul>
            </details>
          </li>
          <li className="Nav-item">
            <details>
              <summary className="Nav-link">Components</summary>
              <ul className="Nav">
                <li>
                  <a href="https://racine.int.sproutsocial.com" className="Nav-link" target="_blank">
                    Racine
                  </a>
                </li>
                <li>
                  <a href="https://dearborn.int.getbambu.com" className="Nav-link" target="_blank">
                    Dearborn
                  </a>
                </li>
                <li>
                  <a href="https://sproutsocial.github.io/600-west/" className="Nav-link" target="_blank">
                    600 West
                  </a>
                </li>
              </ul>
            </details>
          </li>
          <li className="Nav-item">
            <details {...expandPackets}>
              <summary className="Nav-link">Packets</summary>
              <ul className="Nav">
                {packets.map(edge => {
                  const item = edge.node;
                  const slug = item.packetName.replace('seeds-', '');
                  const pathname = `/packets/${slug}/`;
                  const isActive = activePage.includes(pathname);

                  return (
                    <NavItem
                      isActive={isActive}
                      key={item.id}
                      href={pathname}
                      text={upperFirst(slug)}
                      subnavLinks={subnavLinks}
                    />
                  );
                })}
              </ul>
            </details>
          </li>
        </ul>
      </nav>
    );
  }
}

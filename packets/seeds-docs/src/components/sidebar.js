import React from 'react';
import Link from 'gatsby-link';
import upperFirst from 'lodash.upperfirst';

const NavItem = ({isActive, id, href, text, subnavLinks}) => (
  <li className={`Nav-item ${isActive ? 'Nav-item--active' : ''}`} key={id}>
    <Link className="Nav-link" to={href}>
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
    return (
      <nav>
        <ul className="Nav flex-column">
          <li className="Nav-item">
            <button className="Nav-link Nav-link--primary js-jira-issue">Submit Ticket</button>
          </li>

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
      </nav>
    );
  }
}

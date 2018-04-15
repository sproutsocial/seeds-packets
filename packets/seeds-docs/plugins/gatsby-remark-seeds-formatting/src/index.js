'use strict';
const select = require(`unist-util-select`);
const is = require('unist-util-is');
const modifyChildren = require('unist-util-modify-children');
const parents = require('unist-util-parents');

module.exports = ({markdownAST}) => {
  var wrappedAST = parents(markdownAST);

  var allValues = ``;
  var list = {};

  select(wrappedAST, 'listItem paragraph').forEach(node => {
    const modifier = (child, index, parent) => {
      if (is('strong', child)) {
        list = parent.parent.parent.node;

        const directive = child.children[0];
        const text = parent.children[index + 1];

        if (directive && text) {
          const newValue = `
            <li class="${directive.value === 'DO:' ? 'do' : 'dont'}">
              <strong>${directive.value}</strong>
              ${text.value}
            </li>\n
          `;

          allValues = `${allValues}${newValue}`;

          parent.parent.node.type = `html`;
          parent.parent.node.value = newValue;
        }
      }
    };

    list.type = `html`;

    list.value = `
      <ul class="do-s-and-don-ts">
        ${allValues}
      </ul>
    `;

    modifyChildren(modifier)(node);
  });

  return wrappedAST;
};

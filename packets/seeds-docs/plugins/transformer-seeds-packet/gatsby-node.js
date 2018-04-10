const {createFilePath} = require('gatsby-source-filesystem');
const path = require('path');
const crypto = require('crypto');

exports.onCreateNode = async function onCreateNode({node, getNode, boundActionCreators, loadNodeContent}) {
  const {createNodeField, createNode, createParentChildLink} = boundActionCreators;
  /**
   * Associate Markdown files with package names
   */
  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({node, getNode, basePath: 'pages'});
    const packetName = node.fileAbsolutePath.match(/@sproutsocial\/([a-z-]*)\//);
    const baseName = path.parse(node.fileAbsolutePath).name;

    createNodeField({
      node,
      name: 'slug',
      value: slug
    });

    createNodeField({
      node,
      name: 'packetName',
      value: packetName && packetName[1]
    });

    createNodeField({
      node,
      name: 'baseName',
      value: baseName
    });
  }

  /**
   * Create nodes for SEEDS packets from package.json files
   */
  if (node.internal.mediaType === 'application/json' && node.base == 'package.json') {
    const content = await loadNodeContent(node);
    const packet = JSON.parse(content);
    if (packet.private) return;

    const contentDigest = crypto
      .createHash('md5')
      .update(JSON.stringify(content))
      .digest('hex');

    const packetNode = {
      id: `${node.id} >>> SeedsPacket`,
      children: [],
      parent: node.id,
      internal: {
        content,
        contentDigest,
        type: 'SeedsPacket'
      },
      packetName: packet.name.replace('@sproutsocial/', ''),
      ...packet
    };
    createNode(packetNode);
    createParentChildLink({parent: node, child: packetNode});
  }
};

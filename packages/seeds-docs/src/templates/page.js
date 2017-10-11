import React from 'react';

export default ({data}) => {
  console.log(data);
  const page = data.markdownRemark;

  return (
    <div>
      <h1>{page.frontmatter.title}</h1>
      <p dangerouslySetInnerHTML={{__html: page.html}} />
    </div>
  );
};

export const query = graphql`
  query PageQuery($slug: String!) {
    markdownRemark(fields: {slug: {eq: $slug}}) {
      id
      html
      frontmatter {
        title
      }
    }
  }
`;

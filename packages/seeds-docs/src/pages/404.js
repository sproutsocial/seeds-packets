import React from 'react'
import Helmet from 'react-helmet'

const NotFoundPage = () => (
  <div>
    <Helmet
      title="Not Found | Gatsby Default Starter"
      meta={[
        { name: 'description', content: 'The page you are looking for cannot be found.' },
        {
          name: 'robots',
          value: 'noindex,nofollow'
        }
      ]}
    />
    <h1>Not Found</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
  </div>
)

export default NotFoundPage

import * as React from "react"
import {  graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogPostTemplate = ({ data, location }) => {
  const post = data.ghostPost
  const siteTitle = data.site.siteMetadata?.title || `Title`

  return (
    <Layout location={location} title={siteTitle}>
      <Seo
        title={post.title}
        description={post.excerpt || post.excerpt}
      />
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{post.title}</h1>
          <p>{post.published_at_pretty}</p>
        </header>
        {post.feature_image ? (
            <figure>
                <img 
                    className="feature-image"
                    src={post.feature_image}
                    alt={post.title}
                />
            </figure>
        ) : null}
        <section
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        />
        <hr />
        <footer>
        </footer>
      </article>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    ghostPost(slug: { eq: $slug }) {
      id
      title
      slug
      excerpt
      published_at_pretty: published_at(formatString: "DD MMMM, YYYY")
      html
      feature_image
    }
  }
`

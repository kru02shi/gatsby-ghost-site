import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allGhostPost.edges
  const navPages = data.allGhostPage.edges

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Seo title="All posts" />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <ul className="navStyle">
        {navPages.map(navPage => {

            return (
              <li key={navPage.node.slug}>
                    <h2>
                      <Link to={navPage.node.slug}>{navPage.node.slug}</Link>
                    </h2>
              </li>
            )
        })}
      </ul>
      <Seo title="All posts" />
      <ol style={{ listStyle: `none` }}>
        {posts.map(post => {
          const title = post.node.title || post.node.slug

          return (
            <li key={post.node.slug}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <h2>
                    <Link to={post.node.slug} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                  <small>{post.node.published_at_pretty}</small>
                </header>
                <section>
                {post.node.feature_image ? (
                    <figure>
                        <img 
                            className="post-image"
                            src={post.node.feature_image}
                            alt={post.node.title}
                        />
                    </figure>
                ) : null}
                  <p className="para"
                    dangerouslySetInnerHTML={{
                      __html: post.node.excerpt || post.excerpt,
                    }}
                    itemProp="description"
                  />
                </section>
              </article>
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allGhostPost(sort: { fields: [published_at], order: DESC }) {
      edges {
        node {
          id
          title
          slug
          excerpt
          published_at_pretty: published_at(formatString: "DD MMMM, YYYY")
          feature_image
        }
      }
    }
    allGhostPage {
      edges {
        node {
          title
          slug
        }
      }
    }
  }
`

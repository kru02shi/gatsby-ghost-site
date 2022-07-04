import * as React from "react"
import {  graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const pageTemplate = ({ data, location }) => {
    const page = data.ghostPage;
    const siteTitle = data.site.siteMetadata?.title || `Title`

    return (
        <>
            <Layout location={location} title={siteTitle}>
            <Seo
                title={page.title}
                description={page.excerpt || page.excerpt}
            />
                <div className="container">
                    <article className="content">
                        <h1 className="content-title">{page.title}</h1>
                        {page.feature_image ? (
                            <figure>
                                <img 
                                    className="feature-image"
                                    src={page.feature_image}
                                    alt={page.title}
                                />
                            </figure>
                        ) : null}
                        {/* The main page content */}
                        <section
                            className="content-body load-external-scripts"
                            dangerouslySetInnerHTML={{ __html: page.html }}
                        />
                    </article>
                </div>
            </Layout>
        </>
    )
}

export default pageTemplate

export const pageQuery = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    ghostPage(slug: { eq: $slug }) {
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

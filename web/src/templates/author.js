import React from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import { mapEdgesToNodes } from "../lib/helpers";
import BlogPostPreviewGrid from "../components/blog-post-preview-grid";
import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
import SEO from "../components/seo";
import Layout from "../containers/layout";

import { responsiveTitle1 } from "../components/typography.module.css";

export const query = graphql`
  query AuthorTemplateQuery($id: String!) {
    author: sanityAuthor(id: { eq: $id }) {
      name
      image {
        asset {
          fluid {
            ...GatsbySanityImageFluid
          }
        }
        alt
        caption
      }
      _rawBio
    }
    posts: allSanityPost(
      filter: {
        authors: { elemMatch: { author: { _id: {} } } }
        slug: { current: { ne: null } }
        publishedAt: { ne: null }
      }
      sort: { fields: [publishedAt], order: DESC }
    ) {
      edges {
        node {
          id
          publishedAt
          mainImage {
            ...SanityImage
            alt
          }
          title
          _rawExcerpt
          slug {
            current
          }
          categories {
            slug {
              current
            }
          }
        }
      }
    }
  }
`;
const AuthorPageTemplate = (props) => {
  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  const { data, errors } = props;
  const { name, image, _rawBio: bio } = data && data.author;
  const postNodes = data && data.posts && mapEdgesToNodes(data.posts);

  console.log(bio);

  return (
    <Layout>
      <SEO title={`Blog author ${name}`} description={image.caption} />
      <Container>
        <h1 className={responsiveTitle1}>{name}</h1>
        <Img fluid={image.asset.fluid} />
        <figcaption>{image.caption}</figcaption>
        <h2>Posts</h2>
        {postNodes && postNodes.length > 0 && <BlogPostPreviewGrid nodes={postNodes} />}
      </Container>
    </Layout>
  );
};

export default AuthorPageTemplate;

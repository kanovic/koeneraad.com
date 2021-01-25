import React from "react";
import { graphql } from "gatsby";
import { mapEdgesToNodes, buildImageObj } from "../lib/helpers";
import { imageUrlFor } from "../lib/image-url";
import BlogPostPreviewGrid from "../components/blog-post-preview-grid";
import PortableText from "../components/portableText";
import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import styles from "../components/author.module.css";

export const query = graphql`
  query AuthorTemplateQuery($id: String!) {
    author: sanityAuthor(id: { eq: $id }) {
      name
      image {
        ...SanityImage
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
    projects: allSanityProject(
      filter: {
        members: { elemMatch: { author: { _id: {} } } }
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
          _type
        }
      }
    }
  }
`;
const AuthorPageTemplate = (props) => {
  const { data, errors } = props;

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  const { name, image, _rawBio } = data && data.author;
  const postNodes = data && data.posts && mapEdgesToNodes(data.posts);
  const projectNodes = data && data.projects && mapEdgesToNodes(data.projects);

  return (
    <Layout>
      <SEO title={`Blog author ${name}`} description={image.caption} />
      <article className={styles.root}>
        {image && image.asset && (
          <div className={styles.mainImage}>
            <img
              src={imageUrlFor(buildImageObj(image))
                .width(1200)
                .height(Math.floor((9 / 16) * 1200))
                .fit("crop")
                .auto("format")
                .url()}
              alt={image.alt}
            />
          </div>
        )}
        <Container>
          <div className={styles.mainContent}>
            <h1 className={styles.title}>{name}</h1>
            {_rawBio && <PortableText blocks={_rawBio} />}
          </div>
          <h2>Projects</h2>
          {projectNodes && projectNodes.length > 0 && <BlogPostPreviewGrid nodes={projectNodes} />}
          <h2>Posts</h2>
          {postNodes && postNodes.length > 0 && <BlogPostPreviewGrid nodes={postNodes} />}
        </Container>
      </article>
    </Layout>
  );
};

export default AuthorPageTemplate;

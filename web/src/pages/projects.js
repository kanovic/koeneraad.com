import React from "react";
import { graphql } from "gatsby";
import { mapEdgesToNodes } from "../lib/helpers";
import BlogPostPreviewGrid from "../components/blog-post-preview-grid";
import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
import SEO from "../components/seo";
import Layout from "../containers/layout";

import { responsiveTitle1 } from "../components/typography.module.css";

export const query = graphql`
  query ProjectPageQuery {
    projects: allSanityProject(
      sort: { fields: [publishedAt], order: DESC }
      filter: { slug: { current: { ne: null } }, publishedAt: { ne: null } }
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

const ProjectPage = (props) => {
  const { data, errors } = props;

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  const projectNodes = data && data.projects && mapEdgesToNodes(data.projects);

  return (
    <Layout>
      <SEO title="Projects" />
      <Container>
        <h1 className={responsiveTitle1}>Projects</h1>
        {projectNodes && projectNodes.length > 0 && <BlogPostPreviewGrid nodes={projectNodes} />}
      </Container>
    </Layout>
  );
};

export default ProjectPage;

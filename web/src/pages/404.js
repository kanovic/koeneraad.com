import React from "react";

import Layout from "../components/layout";
import Container from "../components/container";
import SEO from "../components/seo";

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <Container>
      <h1>Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist...</p>
    </Container>
  </Layout>
);

export default NotFoundPage;

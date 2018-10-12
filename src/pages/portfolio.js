import PropTypes from "prop-types";
import React from "react";
import { graphql } from "gatsby";
import { ThemeContext } from "../layouts";
import Portfolio from "../components/Blog";
import Seo from "../components/Seo";
import Article from "../components/Article";
import Headline from "../components/Article/Headline";

class PortfolioPage extends React.Component {

  render() {
    const {
      data: {
        posts: { edges: posts = [] },
        site: {
          siteMetadata: { facebook }
        }
      }
    } = this.props;

    return (
      <React.Fragment>
        <ThemeContext.Consumer>
          {theme => (
            <Article theme={theme}>
              <header>
                <Headline type="primary" title="Portfolio" theme={theme} />
              </header>
              <Portfolio posts={posts} theme={theme} />
            </Article>
          )}
        </ThemeContext.Consumer>

        <Seo facebook={facebook} />
      </React.Fragment>
    );
  }
}

PortfolioPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default PortfolioPage;

//eslint-disable-next-line no-undef
export const query = graphql`
  query PortfolioQuery {
    posts: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "//portfolio/[0-9]+.*--/" } }
      sort: { fields: [fields___prefix], order: DESC }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
            prefix
          }
          frontmatter {
            title
            category
            cover {
              children {
                ... on ImageSharp {
                  fluid(maxWidth: 800, maxHeight: 360) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
          }
        }
      }
    }
    site {
      siteMetadata {
        facebook {
          appId
        }
      }
    }
  }
`;

//hero-background

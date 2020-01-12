module.exports = {
  siteMetadata: {
    title: `Tobias Busch`,
    name: `Tobias Busch`,
    siteUrl: `https://tobiasbusch.xyz`,
    description: `Personal website of Tobias Busch.`,
    hero: {
      heading: `Hi, I'm Tobias! I write about R and data visualization.`,
      maxWidth: 652,
    },
    social: [
      {
        name: `twitter`,
        url: `https://twitter.com/drtobilotti`,
      },
      {
        name: `github`,
        url: `https://github.com/teebusch`,
      },
      {
        name: `instagram`,
        url: `https://instagram.com/tobilotti`,
      },
      {
        name: `linkedin`,
        url: `https://www.linkedin.com/tobias-busch/`,
      },
    ],
  },
  plugins: [
    {
      resolve: "@narative/gatsby-theme-novela",
      options: {
        contentPosts: "content/posts",
        contentAuthors: "content/authors",
        basePath: "/",
        authorsPage: true,
        sources: {
          local: true,
          // contentful: true,
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Novela by Narative`,
        short_name: `Novela`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#fff`,
        display: `standalone`,
        icon: `src/assets/favicon.png`,
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-100070749-2",
      },
    },
  ],
};

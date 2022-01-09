module.exports = {
  pathPrefix: '/calendar-converter',
  siteMetadata: {
    title: 'calendar-converter',
    siteUrl: 'https://stephenweixu.github.io/calendar-converter',
  },
  plugins: [
    'gatsby-plugin-sass',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Calendar Converter',
        short_name: 'Calendar Converter',
        description: 'Welcome to this beautiful calendar converter. Provide fast and accurate calendar conversion. Convert a calendar date among various calendars including Gregorian calendar, Lunar calendar, Hebrew/Jewish calendar, Islamic calendar, Julian calendar, Persian calendar, Indian National calendar...',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#000000',
        display: 'standalone',
        icons: [
          {
            src: 'static/images/favicon.ico',
            sizes: '48x48',
            type: 'image/ico',
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-google-gtag',
      options: {
        trackingIds: [
          'G-VKGPQB291W',
        ],
        pluginConfig: {
          head: true,
        },
      },
    },
  ],
  flags: {
    DEV_SSR: false,
  }
};
  
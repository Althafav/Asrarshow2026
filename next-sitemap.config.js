/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.asrarshow.com/",
  generateRobotsTxt: true,
  sitemapSize: 100000,
  generateIndexSitemap: false,
  transform: async (config, path) => {
    let priority = 1.0;

    if (path === "/") {
      priority = 1.0;
    } else if (path.startsWith("/about")) {
      priority = 0.9;
    } else if (path.startsWith("/fashion")) {
      priority = 0.9;
    } else if (path.startsWith("/beauty")) {
      priority = 0.9;
    } else if (path.startsWith("/weddings")) {
      priority = 0.9;
    } else if (path.startsWith("/event-information")) {
      priority = 0.9;
    } else if (path.startsWith("/exhibitor-information")) {
      priority = 0.9;
    } else if (path.startsWith("/contact")) {
      priority = 0.9;
    } else if (path.startsWith("/register-interest")) {
      priority = 0.9;
    } else if (path.startsWith("/master-classes")) {
      priority = 0.7;
    }

    return {
      loc: path,
      changefreq: "weekly",
      priority: priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
};

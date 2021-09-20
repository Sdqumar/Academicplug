const siteUrl = "https://www.academicplug.com/";

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", disallow: "/AddSchool" },
      { userAgent: "*", allow: "/" },
    ],
    additionalSitemaps: [
      `${siteUrl}schools-sitemap.xml`,
      `${siteUrl}facultySiteMaps/`,
      `${siteUrl}facultySiteMaps/Futminna-sitemap.xml`,
      `${siteUrl}coursesSiteMap/`,
      `${siteUrl}coursesSiteMap/Health-Education-sitemap.xml`,
    ],
  },
  exclude: ["/AddSchool"],
};
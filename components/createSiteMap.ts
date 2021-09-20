export default async function createSiteMap  (data, page: string)  {
    const fs = await import("fs");
  
    const sitemap = `
  <?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${data
          .map((item) => {
            const route = item.name.replace(/\s/g, "-");
            return `<url>
      <loc>${`https://www.academicplug.com/${route}`}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
  </url>`;
          })
          .join("")}
    </urlset>
  `;
  
    fs.writeFileSync(`public/${page}-sitemap.xml`, sitemap);
  };

  
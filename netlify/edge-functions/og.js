export default async (request, context) => {
  const url = new URL(request.url);
  const path = url.pathname;

  // Choose OG data based on route
  let title = "Try-FF";
  let description = "Welcome to Try-FF";
  let image = "https://try-ff.vercel.app/og-home.jpg";
  let pageTitle = "Home | Try-FF";

  if (path.includes("/about")) {
    title = "About Try-FF";
    description = "Learn more about Try-FF.";
    image = "https://try-ff.vercel.app/og-about.jpg";
    pageTitle = "About | Try-FF";
  }

  return new Response(
    `<!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>${pageTitle}</title>
            <meta property="og:title" content="${title}" />
            <meta property="og:description" content="${description}" />
            <meta property="og:image" content="${image}" />
            <meta property="og:url" content="${url.href}" />
          </head>
          <body>
            <h1>OG Preview Page</h1>
          </body>
        </html>`,
    {
      headers: { "content-type": "text/html" },
    }
  );
};

export const config = {
  path: "/og-preview/**",
};

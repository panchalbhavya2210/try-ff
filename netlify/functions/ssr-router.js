exports.handler = async (event) => {
  const path = event.rawUrl;
  const userAgent = event.headers["user-agent"] || "";

  console.log("Path: ", path); // Log path for debugging
  console.log("User-Agent: ", userAgent); // Log user-agent for debugging

  const isBot = /bot|crawl|slurp|spider|mediapartners/i.test(userAgent);

  // Default Open Graph (OG) tags
  let og = {
    title: "Try-FF",
    desc: "Welcome to Try-FF",
    image: "https://try-ff.vercel.app/og-home.jpg",
    url: "https://try-ff.vercel.app/",
  };

  // Modify OG tags for /about route
  if (path.includes("/about")) {
    og = {
      title: "About Try-FF",
      desc: "Learn more about Try-FF.",
      image: "https://try-ff.vercel.app/og-about.jpg",
      url: "https://try-ff.vercel.app/about",
    };
  }

  // If the path is /about or similar, serve the HTML with OG tags
  if (isBot && path.includes("/about")) {
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "text/html",
      },
      body: `<!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>${og.title}</title>
            <meta property="og:title" content="${og.title}" />
            <meta property="og:description" content="${og.desc}" />
            <meta property="og:image" content="${og.image}" />
            <meta property="og:url" content="${og.url}" />
            <link rel="icon" type="image/svg+xml" href="/vite.svg" />
          </head>
          <body>
            <h1>${og.title}</h1>
            <p>${og.desc}</p>
          </body>
        </html>`,
    };
  }

  // Avoid redirect loop for /about or any other paths you want to render directly
  if (path.includes("/about")) {
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "text/html",
      },
      body: `<!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>About Try-FF</title>
            <meta name="description" content="Learn more about Try-FF" />
            <link rel="icon" type="image/svg+xml" href="/vite.svg" />
          </head>
          <body>
            <h1>About Try-FF</h1>
            <p>Learn more about Try-FF.</p>
          </body>
        </html>`,
    };
  }

  // For other paths (non /about), redirect to the original path
  return {
    statusCode: 302,
    headers: {
      Location: path,
    },
  };
};

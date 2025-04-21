exports.handler = async (event) => {
  const path = event.rawUrl;
  const userAgent = event.headers["user-agent"] || "";

  // Check if the user is a bot
  const isBot = /bot|crawl|slurp|spider|mediapartners/i.test(userAgent);

  // If it's a bot, serve OG HTML
  if (isBot) {
    let og = {
      title: "Try-FF",
      desc: "Welcome to Try-FF",
      image: "https://try-ff.vercel.app/og-home.jpg",
      url: "https://try-ff.vercel.app/",
    };

    // Example: if the path is /about, change the OG tags
    if (path.includes("/about")) {
      og = {
        title: "About Try-FF",
        desc: "Learn more about Try-FF.",
        image: "https://try-ff.vercel.app/og-about.jpg",
        url: "https://try-ff.vercel.app/about",
      };
    }

    // Return OG HTML for bot requests
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
          </head>
          <body>
            <h1>${og.title}</h1>
          </body>
        </html>`,
    };
  }

  // For non-bot users, redirect to the actual page
  return {
    statusCode: 302,
    headers: {
      Location: path,
    },
  };
};

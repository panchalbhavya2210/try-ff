exports.handler = async (event) => {
  const path = event.rawUrl;
  const userAgent = event.headers["user-agent"] || "";

  const isBot = /bot|crawl|slurp|spider|mediapartners/i.test(userAgent);

  if (!isBot) {
    // Let normal users access React app
    return {
      statusCode: 302,
      headers: {
        Location: path,
      },
    };
  }

  // Bot is requesting
  let og = {
    title: "Try-FF",
    desc: "Welcome to Try-FF",
    image: "https://try-ff.vercel.app/og-home.jpg",
    url: "https://try-ff.vercel.app/",
  };

  if (path.includes("/about")) {
    og = {
      title: "About Try-FF",
      desc: "Learn more about Try-FF.",
      image: "https://try-ff.vercel.app/og-about.jpg",
      url: "https://try-ff.vercel.app/about",
    };
  }

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
};

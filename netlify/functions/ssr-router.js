exports.handler = async (event) => {
  const path = event.rawUrl;
  const userAgent = event.headers["user-agent"] || "";

  console.log("Path: ", path); // Log path for debugging
  console.log("User-Agent: ", userAgent); // Log user-agent for debugging

  const isBot = /bot|crawl|slurp|spider|mediapartners/i.test(userAgent);

  // Default OG tags for home
  let og = {
    title: "Try-FF",
    desc: "Welcome to Try-FF",
    image: "https://try-ff.vercel.app/og-home.jpg",
    url: "https://try-ff.vercel.app/",
  };

  // If the path is /about, adjust the OG tags for the About page
  if (path.includes("/about")) {
    og = {
      title: "About Try-FF",
      desc: "Learn more about Try-FF.",
      image: "https://try-ff.vercel.app/og-about.jpg",
      url: "https://try-ff.vercel.app/about",
    };
  }

  // If the request is from a bot, return static HTML with OG tags for either page
  if (isBot) {
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
            <p>${og.desc}</p>
            <img src="${og.image}" alt="Image" />
          </body>
        </html>`,
    };
  }

  // For non-bot users, serve the content with the correct route
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
            <p>${og.desc}</p>
            <img src="${og.image}" alt="Image" />
            <script src="path-to-your-react-app.js"></script> 
          </body>
        </html>`,
  };
};

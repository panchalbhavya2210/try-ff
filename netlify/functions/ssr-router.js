exports.handler = async (event) => {
  const path = event.path; // Use event.path to get the requested path
  const userAgent = event.headers["user-agent"] || ""; // Get user-agent from headers

  console.log("Path:", path); // Log path for debugging
  console.log("User-Agent:", userAgent); // Log user-agent for debugging

  // Simple regex to detect bots
  const isBot = /bot|crawl|slurp|spider|mediapartners/i.test(userAgent);

  // Default OG tags
  let og = {
    title: "Try-FF",
    desc: "Welcome to Try-FF",
    image: "https://try-ff.vercel.app/og-home.jpg",
    url: "https://try-ff.vercel.app/",
  };

  // Modify OG tags if the path includes '/about'
  if (path.includes("/about")) {
    og = {
      title: "About Try-FF",
      desc: "Learn more about Try-FF.",
      image: "https://try-ff.vercel.app/og-about.jpg",
      url: "https://try-ff.vercel.app/about",
    };
  }

  // If it's a bot, return the OG tags in HTML
  if (isBot) {
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "text/html", // Set content type to HTML
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

  // If it's not a bot, redirect to the original path
  return {
    statusCode: 302,
    headers: {
      Location: path, // Redirect to the original path
    },
  };
};

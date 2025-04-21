exports.handler = async (event) => {
  const path = event.rawUrl;
  const userAgent = event.headers["user-agent"] || "";

  console.log("Path: ", path);
  console.log("User-Agent: ", userAgent);

  const isBot = /bot|crawl|slurp|spider|mediapartners/i.test(userAgent);

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

  // 🧠 For bots: send meta-rich HTML
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

  // 🚀 For normal users: redirect to real page
  if (path.includes("/about")) {
    return {
      statusCode: 302,
      headers: {
        Location: "/about",
      },
    };
  }

  // Default to home
  return {
    statusCode: 302,
    headers: {
      Location: "/",
    },
  };
};

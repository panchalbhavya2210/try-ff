import { Helmet } from "react-helmet-async";

function Homepage() {
  return (
    <>
      <Helmet>
        <title>Home | Try-FF</title>
        <meta property="og:title" content="Welcome to the Home Page" />
        <meta
          property="og:description"
          content="This is the homepage of Try-FF."
        />
        <meta
          property="og:image"
          content="https://try-ff.vercel.app/og-home.jpg"
        />
        <meta property="og:url" content="https://try-ff.vercel.app/" />
      </Helmet>
      <h1>Home Page</h1>
    </>
  );
}

export default Homepage;

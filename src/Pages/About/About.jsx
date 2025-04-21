import { Helmet } from "react-helmet-async";

function About() {
  return (
    <>
      <Helmet>
        <title>About | Try-FF</title>
        <meta property="og:title" content="About Try-FF" />
        <meta property="og:description" content="Learn more about Try-FF." />
        <meta
          property="og:image"
          content="https://try-ff.vercel.app/og-about.jpg"
        />
        <meta property="og:url" content="https://try-ff.vercel.app/about" />
      </Helmet>
      <h1>About Page</h1>
    </>
  );
}

export default About;

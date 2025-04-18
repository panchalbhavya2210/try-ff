import React from "react";
import { Helmet } from "react-helmet-async";

const Homepage = () => {
  return (
    <section>
      <Helmet>
        <title>Homepage</title>
        <meta name="description" content="Homepage" />
      </Helmet>

      <div className="hello">hello</div>
    </section>
  );
};

export default Homepage;

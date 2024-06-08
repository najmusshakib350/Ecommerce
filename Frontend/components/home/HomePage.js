import React from "react";
import Layout from "../shared/layout";
import Head from "next/head";

const HomePage = () => {
  return (
    <>
      <Head>
        <title>{"You can put your description"}</title>
        <meta
          name="description"
          content={
            "Our featured products which shows just a glimpse of what we have to offer to bring out the best of you."
          }
        />
        <meta name="keywords" content={"All Natural Products"} />
      </Head>
      <Layout></Layout>
    </>
  );
};

export default HomePage;

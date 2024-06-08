import React from "react";
import Layout from "./shared/layout";

const NotFound = () => {
  const style = {
    fontWeight: "bold",
    textAlign: "center",
  };

  return (
    <Layout>
      <p style={style}>Sorry We {`Can\'t`} Find that Page</p>
    </Layout>
  );
};

export default NotFound;

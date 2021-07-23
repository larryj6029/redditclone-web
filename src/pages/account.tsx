import { withUrqlClient } from "next-urql";
import React from "react";
import { Layout } from "../components/Layout";
import { createUrqlClient } from "../utils/createUrqlClient";

interface accountProps {}

const Account: React.FC<accountProps> = ({}) => {
  return <Layout></Layout>;
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Account);

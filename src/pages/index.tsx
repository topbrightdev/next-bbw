import React, { useContext, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import parseHtml from "html-react-parser";
import get from "lodash/get";

import DataContext from "@context/DataContext";
import Loader from "@components/Common/ScreenLoader";
import { parseOptions } from "@utils/webflow";

interface IndexPageProps {
  headContent: any;
  bodyContent: any;
}

const IndexPage: NextPage<IndexPageProps> = ({ headContent, bodyContent }) => {
  const router = useRouter();
  const { currentUserWithDetails, loading } = useContext(DataContext);
  useEffect(() => {
    if (currentUserWithDetails && !loading) {
      router.push("/businesses");
    }
  }, [loading, currentUserWithDetails]);

  if (currentUserWithDetails) {
    return <Loader />;
  }
  return (
    <>
      <Head>{parseHtml(headContent)}</Head>
      {parseHtml(bodyContent, parseOptions)}
    </>
  );
};

export default IndexPage;

export async function getStaticProps(ctx) {
  // Import modules in here that aren't needed in the component
  const cheerio = await import(`cheerio`);
  const axios = (await import(`axios`)).default;

  let url = get(ctx, `params.path`, []);
  url = url.join(`/`);
  if (url.charAt(0) !== `/`) {
    url = `/${url}`;
  }
  const fetchUrl = process.env.WEBFLOW_URL + url;

  // Fetch HTML
  let res = await axios(fetchUrl).catch((err) => {
    console.error(err);
  });
  const html = (res && res?.data) || "";

  // Parse HTML with Cheerio
  const $ = cheerio.load(html);
  const bodyContent = $(`body`)
    .html()
    .replace(/opacity:0/g, "opacity:1");
  const headContent = $(`head`).html();

  // Send HTML to component via props
  return {
    props: {
      bodyContent,
      headContent,
    },
  };
}

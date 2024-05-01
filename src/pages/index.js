// pages/index.js
import Head from "next/head";
import Bubble from "../components/bubble";
import styles from "@/styles/Home.module.css";
import fetch from 'node-fetch';
import * as d3 from "d3";

// URL to the raw CSV data on GitHub
const csvUrl = 'https://raw.githubusercontent.com/BalaElla/ivfinal/main/Netflix_Titles_Updated_Final.csv';

export async function getStaticProps() {
  // Fetch the CSV data
  const response = await fetch(csvUrl);
  const csvData = await response.text();

  // Parse the CSV data
  const parsedData = d3.csvParse(csvData, d => ({
    Country: d.Country,
    date_added: +d.date_added,  // Convert 'date_added' to integer
    Movie: +d.Movie,            // Convert 'Movie' count to integer
    TV_Show: +d.TV_Show         // Convert 'TV Show' count to integer
  }));

  return {
    props: {
      data: parsedData
    }
  };
}

export default function Home({ data }) {
  return (
    <>
      <Head>
        <title>Entertainment Analysis</title>
        <meta name="description" content="Visualizing Top Entertainment Countries" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1>Top Entertainment Producing Countries</h1>
        <Bubble data={data} />
      </main>
    </>
  );
}

// pages/index.js
import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col } from "react-bootstrap";

import Head from "next/head";
import Bubble from "../components/bubble"; // Adjust the import to your path and component name
import styles from "@/styles/Home.module.css";

import { csv } from 'd3-fetch';
import groupByCountry from '../components/utils'; // Make sure to correctly import the function from utils.js

export async function getStaticProps() {
  const csvUrl = 'https://raw.githubusercontent.com/BalaElla/ivfinal/main/Netflix_Titles_Updated_Final.csv';

  try {
    const data = await csv(csvUrl, d => ({
      Country_0: d.Country_0, // Assuming 'Country_0' is your primary country column
      type: d.type           // Keeping the type in case you need it later for different purposes
    }));

    // console.log("groupByCountry function:", groupByCountry); // 输出 groupByCountry 函数

    // Use groupByCountry from utils.js to process the data
    const processedData = groupByCountry(data);

    console.log(processedData); // Log the processed data to see the output

    return {
      props: {
        data: processedData
      }
    };
  } catch (error) {
    console.error("Error fetching or parsing data:", error);
    return {
      props: {
        data: [] // Return an empty array in case of error
      }
    };
  }
}

export default function Home({ data }) {
  return (
    <>
      <Head>
        <title>Netflix Entertainment Analysis</title>
        <meta name="description" content="Visualizing Netflix Content Distribution by Country" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1>Netflix Content Distribution by Country</h1>
        <Container fluid>
          <Row>
            <Col>
              <Bubble width={600} height={400} data={data} />
            </Col>
          </Row>
        </Container>
      </main>
    </>
  );
}

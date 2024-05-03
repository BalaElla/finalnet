// pages/index.js
import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col } from "react-bootstrap";

import Head from "next/head";
import Bubble from "../components/bubble"; 
import Top5LineChart from '../components/top5line'; 
import styles from "@/styles/Home.module.css";
import Treemap from '../components/treemap';

import { csv } from 'd3-fetch';
import groupByCountry from '../components/utils'; // Make sure to correctly import the function from utils.js
import groupByCountryYear from '../components/utils_li'; 
import groupByCountryTypeAndGenre from '../components/utils_3'; 

export async function getStaticProps() {
  const csvUrl = 'https://raw.githubusercontent.com/BalaElla/ivfinal/main/Netflix_Titles_Updated_Final.csv';
  

  try {
    const data = await csv(csvUrl, d => ({
      Country_0: d.Country_0, // Assuming 'Country_0' is your primary country column
      type: d.type,           // Keeping the type in case you need it later for different purposes
      date_added: d.date_added,
      Theme_0: d.Theme_0
    }));

    // console.log("groupByCountry function:", groupByCountry); // 输出 groupByCountry 函数

    // Use groupByCountry from utils.js to process the data
    // const processedData = groupByCountryYear(data)
    const bubbleData = groupByCountry(data);
    const lineChartData = groupByCountryYear(data);
    const treemapData = groupByCountryTypeAndGenre(data);


    // console.log(processedData); // Log the processed data to see the output

    return {
      props: {
        bubbleData,
        lineChartData,
        treemapData
      }
    };
  } catch (error) {
    console.error("Error fetching or parsing data:", error);
    return {
      props: {
        bubbleData: [],
        lineChartData: [], // Return an empty array in case of error
        treemapData: []
      }
    };
  }
}

export default function Home({ bubbleData, lineChartData, treemapData}) {
  return (
    <>
      {/* <Head>
        <title>Netflix Entertainment Analysis</title>
        <meta name="description" content="Visualizing Netflix Content Distribution by Country" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1>Netflix Content Distribution by Country</h1>
        <Container fluid>
          <Row>
            <Col>
            <h2>Entertainment Across Countries</h2>
              <Bubble width={600} height={400} data={ bubbleData } />
            </Col>
            <Col md={6}>
            <h2>Movie v.s. TV Trend among Top 5 Counrties</h2>
            <Top5LineChart data={ lineChartData } />
            </Col>
          </Row>
          <Row>
            <Col>
            <h2> Genre Analysis among Top 5 countries</h2>
              <Treemap data={treemapData} width={800} height={600} />
            </Col>
          </Row>
        </Container>
      </main>
    </>
  );
} */}
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
              <h2>Entertainment Across Countries</h2>
              <Bubble width={600} height={400} data={ bubbleData } />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h2>Movie v.s. TV Trend among Top 5 Countries</h2>
              <Top5LineChart data={ lineChartData } />
            </Col>
          </Row>
          <Row>
            <Col>
              <h2>Genre Analysis among Top 5 Countries</h2>
              <Treemap data={treemapData} width={800} height={600} />
            </Col>
          </Row>
        </Container>
      </main>
    </>
  );
}
// utils_3.js
export const groupByCountryTypeAndGenre = (data) => {
  const groupedData = {};

  data.forEach((row) => {
    const country = row['Country_0'];
    const type = row['type'];
    const genre = row['Theme_0'];

    if (!groupedData[country]) {
      groupedData[country] = {};
    }
    if (!groupedData[country][type]) {
      groupedData[country][type] = {};
    }
    if (!groupedData[country][type][genre]) {
      groupedData[country][type][genre] = 0;
    }
    groupedData[country][type][genre]++;
  });

  return groupedData;
};



// function groupByCountryTypeAndGenre(data) {
//   const groupedData = [];

//   data.forEach((row) => {
//     let countryNode = groupedData.find(item => item.name === row['Country_0']);
//     if (!countryNode) {
//       countryNode = { name: row['Country_0'], children: [] };
//       groupedData.push(countryNode);
//     }

//     let typeNode = countryNode.children.find(item => item.name === row['type']);
//     if (!typeNode) {
//       typeNode = { name: row['type'], children: [] };
//       countryNode.children.push(typeNode);
//     }

//     let genreNode = typeNode.children.find(item => item.name === row['Theme_0']);
//     if (!genreNode) {
//       genreNode = { name: row['Theme_0'], value: 0 };
//       typeNode.children.push(genreNode);
//     }

//     genreNode.value++;
//   });

//   return groupedData;
// }

// export default groupByCountryTypeAndGenre;

function groupByCountryTypeAndGenre(data) {
  const selectedCountries = ['United States', 'India', 'United Kingdom', 'Canada', 'Japan'];
  const groupedData = [];

  data.forEach((row) => {
    if (selectedCountries.includes(row['Country_0'])) {
      let countryNode = groupedData.find(item => item.name === row['Country_0']);
      if (!countryNode) {
        countryNode = { name: row['Country_0'], children: [] };
        groupedData.push(countryNode);
      }

      let typeNode = countryNode.children.find(item => item.name === row['type']);
      if (!typeNode) {
        typeNode = { name: row['type'], children: [] };
        countryNode.children.push(typeNode);
      }

      let genreNode = typeNode.children.find(item => item.name === row['Theme_0']);
      if (!genreNode) {
        genreNode = { name: row['Theme_0'], value: 0 };
        typeNode.children.push(genreNode);
      }

      genreNode.value++;
    }
  });

  return groupedData;
}

export default groupByCountryTypeAndGenre;

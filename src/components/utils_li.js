function groupByCountryYear(data) {
  let result = data.reduce((acc, item) => {
    const country = item.Country_0 || 'Unknown';
    if (!acc[country]) {
      acc[country] = { country: country, Years: {} };
    }
    const year = item.date_added; // 确保这是年份
    if (item.type && year) {
      if (!acc[country].Years[year]) {
        acc[country].Years[year] = { year: year, Movies: 0, TVShows: 0 };
      }
      if (item.type === 'Movie') {
        acc[country].Years[year].Movies++;
      } else if (item.type === 'TV Show') {
        acc[country].Years[year].TVShows++;
      }
    }
    return acc;
  }, {});

  // 将数据转换为数组，并计算每个国家的总产量
  let countries = Object.values(result).map(countryData => {
    countryData.Years = Object.values(countryData.Years);
    countryData.totalCount = countryData.Years.reduce((sum, current) => sum + current.Movies + current.TVShows, 0);
    return countryData;
  });

  // 根据总产量排序并选择前五名
  countries.sort((a, b) => b.totalCount - a.totalCount);
  return countries.slice(0, 5); // 只返回前五名
}

export default groupByCountryYear;

  
  
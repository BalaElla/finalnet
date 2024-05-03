function groupByCountry(data) {
    let result = data.reduce((acc, item) => {
        const country = item.Country_0 || 'Unknown';
        if (!acc[country]) {
            acc[country] = { Country: country, MovieCount: 0, TvCount: 0 };
        }
        if (item.type === 'Movie') {
            acc[country].MovieCount += 1;
        } else if (item.type === 'TV Show') {
            acc[country].TvCount += 1;
        }
        return acc;
    }, {});

    return Object.values(result).map(item => ({
        ...item,
        TotalCount: item.MovieCount + item.TvCount
    })).sort((a, b) => b.TotalCount - a.TotalCount);
}

export default groupByCountry;
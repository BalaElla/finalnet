// function groupByCountry(data) {
//     let result = data.reduce((acc, item) => {
//         const country = item.Country_0 || 'Unknown'; // Fallback to 'Unknown' if no country specified
//         if (!acc[country]) {
//             acc[country] = { Country: country, Count: 0 };
//         }
//         acc[country].Count += 1; // Increment count regardless of type
//         return acc;
//     }, {});

//     // Convert the object to an array and sort by the count
//     result = Object.values(result);
//     result.sort((a, b) => b.Count - a.Count);
//     return result;
// }



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
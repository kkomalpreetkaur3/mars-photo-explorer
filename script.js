const searchBtn = document.getElementById("searchBtn");
const resultsDiv = document.getElementById("results");

async function fetchTrees(commonName) {
    const apiUrl = `https://data.winnipeg.ca/resource/d3jk-hb6j.json?$where=lower(common_name) LIKE lower('%25${commonName}%25')&$order=diameter_at_breast_height DESC&$limit=100`;
    const encodedUrl = encodeURI(apiUrl);

    try {
        const response = await fetch(encodedUrl);
        if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);
        const data = await response.json();
        displayResults(data);
    } catch (error) {
        console.error(error);
        resultsDiv.innerHTML = `<p class="error">Failed to fetch data. Please try again later.</p>`;
    }
}

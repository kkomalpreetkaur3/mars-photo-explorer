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

function displayResults(data) {
    if (data.length === 0) {
        resultsDiv.innerHTML = "<p>No trees found for this search.</p>";
        return;
    }

    let tableHTML = `<table>
                        <tr>
                            <th>Common Name</th>
                            <th>Scientific Name</th>
                            <th>Diameter (cm)</th>
                            <th>Height (m)</th>
                            <th>Address</th>
                        </tr>`;

    data.forEach(tree => {
        const { common_name, scientific_name, diameter_at_breast_height, height, address } = tree;
        tableHTML += `<tr>
                        <td>${common_name || "N/A"}</td>
                        <td>${scientific_name || "N/A"}</td>
                        <td>${diameter_at_breast_height || "N/A"}</td>
                        <td>${height || "N/A"}</td>
                        <td>${address || "N/A"}</td>
                      </tr>`;
    });

    tableHTML += "</table>";
    resultsDiv.innerHTML = tableHTML;
}

searchBtn.addEventListener("click", () => {
    const treeName = document.getElementById("treeName").value.trim();
    if (treeName) fetchTrees(treeName);
    else resultsDiv.innerHTML = "<p>Please enter a tree name to search.</p>";
});


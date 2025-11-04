const searchBtn = document.getElementById("searchBtn");
const treeInput = document.getElementById("treeName");
const resultsDiv = document.getElementById("results");

// Async function to fetch trees
async function fetchTrees(commonName) {
    const apiUrl = `https://data.winnipeg.ca/resource/d3jk-hb6j.json?$where=lower(common_name) LIKE lower('%${commonName}%')&$order=diameter_at_breast_height DESC&$limit=100`;
    const encodedUrl = encodeURI(apiUrl);

    resultsDiv.innerHTML = "<p>Loading results...</p>"; // Loading state

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

// Function to display results in table
function displayResults(data) {
    if (data.length === 0) {
        resultsDiv.innerHTML = "<p>No trees found for this search.</p>";
        return;
    }

    let tableHTML = `<table>
                        <tr>
                            <th scope="col">Common Name</th>
                            <th scope="col">Scientific Name</th>
                            <th scope="col">Diameter (cm)</th>
                            <th scope="col">Height (m)</th>
                            <th scope="col">Address</th>
                        </tr>`;

    data.forEach(tree => {
        const { common_name, scientific_name, diameter_at_breast_height, height, address } = tree;
        tableHTML += `<tr>
                        <td>${common_name || "N/A"}</td>
                        <td>${scientific_name || "N/A"}</td>
                        <td>${diameter_at_breast_height ? parseFloat(diameter_at_breast_height).toFixed(1) : "N/A"}</td>
                        <td>${height ? parseFloat(height).toFixed(1) : "N/A"}</td>
                        <td>${address || "N/A"}</td>
                      </tr>`;
    });

    tableHTML += "</table>";
    resultsDiv.innerHTML = tableHTML;
}

// Function to handle search
function handleSearch() {
    const treeName = treeInput.value.trim();
    if (treeName) fetchTrees(treeName);
    else resultsDiv.innerHTML = "<p>Please enter a tree name to search.</p>";
}

// Event listeners
searchBtn.addEventListener("click", handleSearch);

// Allow Enter key to trigger search
treeInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleSearch();
});

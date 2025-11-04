### Debugging Analysis - Winnipeg Tree Inventory Explorer

## Breakpoint 1: Before making API request

- Location: script.js inside fetchTrees() function, before fetch(encodedUrl)
- Reason: To inspect the API URL and ensure the request is ready to be sent

- Variables inspected:
commonName: "Ash" (user input from search field)
apiUrl: "https://data.winnipeg.ca/resource/d3jk-hb6j.json?$where=lower(common_name) LIKE lower('%Ash%')&$order=diameter_at_breast_height DESC&$limit=100"
encodedUrl: "https://data.winnipeg.ca/resource/d3jk-hb6j.json?$where=lower(common_name)%20LIKE%20lower('%25Ash%25')&$order=diameter_at_breast_height%20DESC&$limit=100"

- Step-through observation:
The URL is correctly formatted and encoded.
No network request has been sent yet.
Execution pauses at debugger;, allowing inspection of the call stack and variable values.

## Breakpoint 2: After parsing JSON response

- Location: script.js inside fetchTrees() function, after const data = await response.json();
- Reason: To verify that the JSON response from the API is correctly parsed and contains expected data

- Variables inspected:
data: Array of tree objects (length ≤ 100)
Example object:
{
  "common_name": "Ash",
  "scientific_name": "Fraxinus americana",
  "diameter_at_breast_height": "35.0",
  "height": "15.5",
  "address": "123 Main St"
}

- Step-through observation:

JSON data correctly parsed into JavaScript objects.
Each object contains common_name, scientific_name, diameter_at_breast_height, height, and address.
Program execution moves to displayResults(data) for table generation.

## Breakpoint 3: Before updating DOM
- Location: script.js inside displayResults() function, before resultsDiv.innerHTML = tableHTML;
- Reason: To inspect the HTML table generated from API data before rendering it on the page

- Variables inspected:
tableHTML: Full HTML table string containing rows for all tree objects
Example snippet:
<tr>
  <td>Ash</td>
  <td>Fraxinus americana</td>
  <td>35.0</td>
  <td>15.5</td>
  <td>123 Main St</td>
</tr>

- Step-through observation:
Table content correctly formatted with all rows and columns.
Execution paused allows verification of table structure.
Stepping over resultsDiv.innerHTML = tableHTML renders the table in the DOM.
The search results appear correctly on the webpage.
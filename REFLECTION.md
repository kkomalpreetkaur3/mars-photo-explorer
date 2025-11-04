### REFLECTION.md

## Can I explain what my code does?

The code allows users to search Winnipeg’s Tree Inventory by common name. HTML provides the layout, CSS styles it, and JavaScript fetches data asynchronously from the API, parses the JSON, displays it in a table, and handles errors.

## What was my coding process?

I started by planning the project structure, separating HTML, CSS, and JavaScript for clarity. 
I organized my work by first building the HTML layout with input fields and a results container, then styling it with CSS. 
For JavaScript, I developed incrementally: setting up event listeners, constructing API URLs dynamically, fetching data asynchronously with async/await, parsing JSON, and updating the DOM. 
I also implemented error handling and ensured accessibility. 
I used Git to track progress, making frequent, meaningful commits to document each step

## What challenges did I have?

I faced challenges with asynchronous API calls, constructing dynamic URLs, error handling, and accessibility. 
I overcame them by using async/await, template literals with encodeURI(), try…catch blocks with user-friendly messages, and proper HTML labeling and headers. These solutions ensured data was fetched correctly, errors were handled gracefully, and the UI was accessible.

## What would I do differently now?

If I were to start over, I would structure JavaScript more modularly, add live search functionality, improve error messages, implement automated tests, and enhance mobile responsiveness and UI accessibility. I would also plan the Git workflow more carefully to document each development step more clearly.
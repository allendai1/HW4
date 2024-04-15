// Function to fetch and process the CSV file
let data = [];
function fetchAndDisplayCSV() {
    fetch("data.csv").then((response)=>response.text()).then((csvText)=>{
        const rows = csvText.split("\n");
        rows.forEach((row)=>{
            const columns = row.split(",").slice(1);
            data.push(columns);
        });
        console.log(data);
    }).catch((error)=>{
        console.error("Error fetching CSV file:", error);
    });
}
// Call the function when the page loads
window.onload = fetchAndDisplayCSV;

//# sourceMappingURL=index.c36f364e.js.map

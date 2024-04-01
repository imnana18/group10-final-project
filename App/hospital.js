
const dropdown = d3.select("#sel-dataset");

console.log(dropdown)

function optionChanged(newID) {
    console.log("Selected ID: ", newID);
  }

// Data retrieval function
async function csvRead(){
    try {
    // Use d3.csv() to load and parse the CSV file
    const data = await d3.csv("../Data/fetal_health.csv");

    // 'data' contains the parsed CSV data as an array of objects
    console.log(data);
    return data;

    } catch (error) {
        // Handle any errors that occur during loading
        console.error("Error loading the CSV file:", error);
        throw error; // rethrow the error to propagate it
    }
}



// Populate dropdown menu
function dropDownInit(csvData){
    
    for (var i = 1; i < csvData.length; i++) {
        const option = document.createElement("option");

        console.log(option)
        console.log(dropdown)
        // Set the value and text content of the option element
        option.value = "Option Value";
        option.textContent = "Option Text";

        // Append the option element to the select element
        dropdown.append(option);
        
    }
    console.log(dropdown)
    return dropdown
};


// Init function
async function init(){
 
    // create variable for JSON data after data is pulled
    csvData = await csvRead()

    console.log(csvData)
    console.log(csvData.length)
    // Add array numbers as options

    const dropdown = dropDownInit(csvData)

 
    
    

};
  
init()
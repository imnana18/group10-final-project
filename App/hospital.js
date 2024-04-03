const searchBar = document.getElementById("searchBabyID");
console.log(searchBar)

let data

// Data retrieval
async function dataPull(){
    // define the URL of your JSON file
    const jsonPath = 'fetal_data.json';
  
    // promise Pending
    const dataPromise = d3.json(jsonPath);
  
    // fetch JSON data and console log
    await dataPromise;

    // return fetched data
    return dataPromise;
  }


// Function to handle search by baby ID
function searchBaby() {
    // Get the value entered in the search bar
    const babyID = searchBar.value;
    console.log(babyID)
    displayBabyInfo(babyID);
};

// Function to display baby information
function displayBabyInfo(babyID) {
    // Example: Display baby information in the "sample-metadata" div
    const metadataDiv = document.getElementById("sample-metadata");
    
    console.log(data)
    const searchedBaby = data[babyID]
    console.log()
    console.log(searchedBaby)
    metadataDiv.innerHTML = `<h4>Baby ID: ${babyID}</h4>` 
    +`\n<h4>FHR_hist_max : ${searchedBaby['FHR_hist_max']} </h4>`
    +`\n<h4>FHR_hist_mean : ${searchedBaby['FHR_hist_mean']} </h4>`
    +`\n<h4>FHR_hist_median : ${searchedBaby['FHR_hist_median']} </h4>`
    +`\n<h4>FHR_hist_min : ${searchedBaby['FHR_hist_min']} </h4>`
    +`\n<h4>FHR_hist_mode : ${searchedBaby['FHR_hist_mode']} </h4>`
    +`\n<h4>FHR_hist_num_peaks : ${searchedBaby['FHR_hist_num_peaks']} </h4>`
    +`\n<h4>FHR_hist_num_zeroes : ${searchedBaby['FHR_hist_num_zeroes']} </h4>`
    +`\n<h4>FHR_hist_tendency : ${searchedBaby['FHR_hist_tendency']} </h4>`
    +`\n<h4>FHR_hist_variance : ${searchedBaby['FHR_hist_variance']} </h4>`
    +`\n<h4>FHR_hist_width : ${searchedBaby['FHR_hist_width']} </h4>`
    +`\n<h4>abnorm_LT_Var_Perc : ${searchedBaby['abnorm_LT_Var_Perc']} </h4>`
    +`\n<h4>abnorm_ST_Var_Perc : ${searchedBaby['abnorm_ST_Var_Perc']} </h4>`
    +`\n<h4>accelerations : ${searchedBaby['accelerations']} </h4>`
    +`\n<h4>baseline_FHR_bpm : ${searchedBaby['baseline_FHR_bpm']} </h4>`
    +`\n<h4>fetal_movement : ${searchedBaby['fetal_movement']} </h4>`
    +`\n<h4>light_decelerations : ${searchedBaby['light_decelerations']} </h4>`
    +`\n<h4>mean_LT_Var : ${searchedBaby['mean_LT_Var']} </h4>`
    +`\n<h4>mean_ST_Var : ${searchedBaby['mean_ST_Var']} </h4>`
    +`\n<h4>prolonged_decelerations : ${searchedBaby['prolonged_decelerations']} </h4>`
    +`\n<h4>severe_decelerations : ${searchedBaby['severe_decelerations']} </h4>`
    +`\n<h4>uterine_contractions : ${searchedBaby['uterine_contractions']} </h4>`
}


// Function to update the baby image based on initial data or default state
function updateBabyImageInitial() {
  const babyImage = document.getElementById("baby-image");
  babyImage.src = "baby-image.png"; // Set default image
  babyImage.style.filter = "grayscale(100%)"; // Set default color (grayscale)
}

// Function to update the baby image based on model output
function updateBabyImage(prediction) {
  const babyImage = document.getElementById("baby-image");
  if (prediction === "green") {
      babyImage.style.filter = "hue-rotate(120deg)"; // Turn green
  } else if (prediction === "yellow") {
      babyImage.style.filter = "hue-rotate(60deg)"; // Turn yellow
  } else if (prediction === "red") {
      babyImage.style.filter = "hue-rotate(0deg)"; // Keep original color (red)
  }
}


// Init function
async function init(){

    // create variable for JSON data after data is pulled
    data = await dataPull()
  
    // create variable for each data col
    const babyID = data.map(row => row['Fetal ID']);
    const babyData = data
    console.log(babyData)
    console.log(babyID); // Print the 'Fetal ID' column

    var input = document.getElementById("searchBabyID");
    input.addEventListener("keyup", function(event) {
      if (event.keyCode === 13) {
        event.preventDefault();
        searchBaby();
      }
    });
    
    // call default initial ID
    const initSelectID = babyID[0]
}

init()
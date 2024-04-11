// import * as tf from "./node_modules/@tensorflow/tfjs/dist/tf.fesm.js";
console.log(tf.version);

const metadataDiv = document.getElementById("sample-metadata");
const searchBar = document.getElementById("searchBabyID");
const CTGStatus = document.getElementsByClassName("panel-heading")[0];
const CTGStatusTitle = document.getElementsByClassName("panel-title")[0];

console.log(searchBar)

let data

// Data retrieval
async function dataPull(){
    // define the URL of your JSON file
    const jsonPath = 'App/src/data/fetal_data.json';
  
    // promise Pending
    const dataPromise = d3.json(jsonPath);

    console.log(dataPromise)
  
    // fetch JSON data and console log
    await dataPromise;

    // return fetched data
    return dataPromise;
  }

// Function to display baby information
function displayBabyInfo(babyID) {
  // Example: Display baby information in the "sample-metadata" div
  
  console.log(data)
  const searchedBaby = data[babyID]

  metadataDiv.innerHTML = `<div class="meta-info">Baby ID: ${babyID}</div>` 
  +`\n<div class="meta-info">FHR_hist_max : ${searchedBaby['FHR_hist_max']} </div>`
  +`\n<div class="meta-info">FHR_hist_mean : ${searchedBaby['FHR_hist_mean']} </div>`
  +`\n<div class="meta-info">FHR_hist_median : ${searchedBaby['FHR_hist_median']} </div>`
  +`\n<div class="meta-info">FHR_hist_min : ${searchedBaby['FHR_hist_min']} </div>`
  +`\n<div class="meta-info">FHR_hist_mode : ${searchedBaby['FHR_hist_mode']} </div>`
  +`\n<div class="meta-info">FHR_hist_num_peaks : ${searchedBaby['FHR_hist_num_peaks']} </div>`
  +`\n<div class="meta-info">FHR_hist_num_zeroes : ${searchedBaby['FHR_hist_num_zeroes']} </div>`
  +`\n<div class="meta-info">FHR_hist_tendency : ${searchedBaby['FHR_hist_tendency']} </div>`
  +`\n<div class="meta-info">FHR_hist_variance : ${searchedBaby['FHR_hist_variance']} </div>`
  +`\n<div class="meta-info">FHR_hist_width : ${searchedBaby['FHR_hist_width']} </div>`
  +`\n<div class="meta-info">abnorm_LT_Var_Perc : ${searchedBaby['abnorm_LT_Var_Perc']} </div>`
  +`\n<div class="meta-info">abnorm_ST_Var_Perc : ${searchedBaby['abnorm_ST_Var_Perc']} </div>`
  +`\n<div class="meta-info">accelerations : ${searchedBaby['accelerations']} </div>`
  +`\n<div class="meta-info">baseline_FHR_bpm : ${searchedBaby['baseline_FHR_bpm']} </div>`
  +`\n<div class="meta-info">fetal_movement : ${searchedBaby['fetal_movement']} </div>`
  +`\n<div class="meta-info">light_decelerations : ${searchedBaby['light_decelerations']} </div>`
  +`\n<div class="meta-info">mean_LT_Var : ${searchedBaby['mean_LT_Var']} </div>`
  +`\n<div class="meta-info">mean_ST_Var : ${searchedBaby['mean_ST_Var']} </div>`
  +`\n<div class="meta-info">prolonged_decelerations : ${searchedBaby['prolonged_decelerations']} </div>`
  +`\n<div class="meta-info">severe_decelerations : ${searchedBaby['severe_decelerations']} </div>`
  +`\n<div class="meta-info">uterine_contractions : ${searchedBaby['uterine_contractions']} </div>`
}

function indexOfMax(arr) {
  if (arr.length === 0) {
      return -1;
  }

  var max = arr[0];
  var maxIndex = 0;

  for (var i = 1; i < arr.length; i++) {
      if (arr[i] > max) {
          maxIndex = i;
          max = arr[i];
      }
  }

  return maxIndex;
}


async function model_predict(babyID) {
  let result_dict = {}
  const searchedBaby = data[babyID]
  const model = await tfdf.loadTFDFModel('http://127.0.0.1:5500/App/src/tfjs_model/model.json');
    
  // Perform an inference
  const result = await model.executeAsync({
    "fhr_hist_width": tf.tensor([searchedBaby['fhr_hist_width']]),
    "prolonged_decelerations": tf.tensor([searchedBaby['prolonged_decelerations']]), 
    "mean_st_var": tf.tensor([searchedBaby['mean_st_var']]), 
    "fhr_hist_num_peaks": tf.tensor([searchedBaby['fhr_hist_num_peaks']]), 
    "abnorm_st_var_perc": tf.tensor([searchedBaby['abnorm_st_var_perc']]), 
    "fhr_hist_mean": tf.tensor([searchedBaby['fhr_hist_mean']]), 
    "fetal_movement": tf.tensor([searchedBaby['fetal_movement']]),  
    "abnorm_lt_var_perc": tf.tensor([searchedBaby['abnorm_lt_var_perc']]), 
    "fhr_hist_tendency": tf.tensor([searchedBaby['fhr_hist_tendency']]), 
    "uterine_contractions": tf.tensor([searchedBaby['uterine_contractions']]), 
    "accelerations": tf.tensor([searchedBaby['accelerations']]), 
    "fhr_hist_median": tf.tensor([searchedBaby['fhr_hist_median']]), 
    "fhr_hist_max": tf.tensor([searchedBaby['fhr_hist_max']]), 
    "fhr_hist_mode": tf.tensor([searchedBaby['fhr_hist_mode']]), 
    "fhr_hist_min": tf.tensor([searchedBaby['fhr_hist_min']]), 
    "fhr_hist_num_zeroes": tf.tensor([searchedBaby['fhr_hist_num_zeroes']]), 
    "fhr_hist_variance": tf.tensor([searchedBaby['fhr_hist_variance']]), 
    "light_decelerations": tf.tensor([searchedBaby['light_decelerations']]), 
    "severe_decelerations": tf.tensor([searchedBaby['severe_decelerations']]), 
    "mean_lt_var": tf.tensor([searchedBaby['mean_lt_var']]), 
    "baseline_fhr_bpm": tf.tensor([searchedBaby['baseline_fhr_bpm']])

  }).then(predictions=> { //, 'detection_classes', 'detection_scores'
    let data = predictions.dataSync()
    console.log('Predictions: ', data);
    data = data.slice(5, 8)
    console.log(data)

    // buffer
    data[1] = data[1] * 5

    prediction_result = indexOfMax(data) + 1

  
    
    console.log(prediction_result)
    switch(prediction_result) {
      case 1:
        console.log(CTGStatus)
        CTGStatus.style.backgroundColor = ' #50C878';
        CTGStatusTitle.textContent = 'CTG Status: Healthy'
        if (data[1] > 0.1){
          CTGStatus.style.backgroundColor = ' #f9c74f';
          CTGStatusTitle.textContent = 'CTG Status: Suspect'
        }
        break;
      case 2:
        CTGStatus.style.backgroundColor = ' #ef233c';
        CTGStatusTitle.textContent = 'CTG Status: Pathological'
        break;
      default:
        // code block
    }
    // if (){
    //   result_dict[indexOfMax(data)] += 1
    // }
    // else{
    //   result_dict[indexOfMax(data)] = 1
    // }
    // console.log(result_dict);
    
  });
      
    

}

// Function to handle search by baby ID
function searchBaby() {
    // Get the value entered in the search bar
    const babyID = searchBar.value;
    console.log(babyID)
    displayBabyInfo(babyID);
    model_predict(babyID);    
};



// Init function
async function init(){

    // create variable for JSON data after data is pulled
    data = await dataPull()
  
    // create variable for each data col
    const babyID = data.map(row => row['Fetal ID']);
    const babyData = data

    displayBabyInfo(babyID[0]);

    console.log(babyData)
    console.log(babyID); // Print the 'Fetal ID' column

    var input = document.getElementById("searchBabyID");
    input.addEventListener("keyup", function(event) {
      if (event.keyCode === 13) {
        event.preventDefault();
        searchBaby();
      }
    
      // Make prediction using the loaded model
    })
    
}




init()
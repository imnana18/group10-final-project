// import * as tf from "./node_modules/@tensorflow/tfjs/dist/tf.fesm.js";
console.log(tf.version);

const metadataDiv = document.getElementById("sample-metadata");
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

// Function to display baby information
function displayBabyInfo(babyID) {
  // Example: Display baby information in the "sample-metadata" div
  
  
  const searchedBaby = data[babyID]

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
  const model = await tfdf.loadTFDFModel('http://127.0.0.1:5500/App/tfjs_model/model.json');
    
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
    data = data.slice(5, 7)
    if (result_dict[indexOfMax(data)]){
      result_dict[indexOfMax(data)] += 1
    }
    else{
      result_dict[indexOfMax(data)] = 1
    }
    console.log(result_dict);
    
  });
      
   
    // data.forEach(async baby =>  {
    //   // Perform an inference
    //   const result =  model.predict({
    //     "fhr_hist_width": tf.tensor([baby['fhr_hist_width']]),
    //     "prolonged_decelerations": tf.tensor([baby['prolonged_decelerations']]), 
    //     "mean_st_var": tf.tensor([baby['mean_st_var']]), 
    //     "fhr_hist_num_peaks": tf.tensor([baby['fhr_hist_num_peaks']]), 
    //     "abnorm_st_var_perc": tf.tensor([baby['abnorm_st_var_perc']]), 
    //     "fhr_hist_mean": tf.tensor([baby['fhr_hist_mean']]), 
    //     "fetal_movement": tf.tensor([baby['fetal_movement']]),  
    //     "abnorm_lt_var_perc": tf.tensor([baby['abnorm_lt_var_perc']]), 
    //     "fhr_hist_tendency": tf.tensor([baby['fhr_hist_tendency']]), 
    //     "uterine_contractions": tf.tensor([baby['uterine_contractions']]), 
    //     "accelerations": tf.tensor([baby['accelerations']]), 
    //     "fhr_hist_median": tf.tensor([baby['fhr_hist_median']]), 
    //     "fhr_hist_max": tf.tensor([baby['fhr_hist_max']]), 
    //     "fhr_hist_mode": tf.tensor([baby['fhr_hist_mode']]), 
    //     "fhr_hist_min": tf.tensor([baby['fhr_hist_min']]), 
    //     "fhr_hist_num_zeroes": tf.tensor([baby['fhr_hist_num_zeroes']]), 
    //     "fhr_hist_variance": tf.tensor([baby['fhr_hist_variance']]), 
    //     "light_decelerations": tf.tensor([baby['light_decelerations']]), 
    //     "severe_decelerations": tf.tensor([baby['severe_decelerations']]), 
    //     "mean_lt_var": tf.tensor([baby['mean_lt_var']]), 
    //     "baseline_fhr_bpm": tf.tensor([baby['baseline_fhr_bpm']])

    //   }).then(predictions=> { //, 'detection_classes', 'detection_scores'
    //     console.log(predictions)
    //     const data = predictions.dataSync()
    //     console.log('Predictions: ', data);
    //     if (result_dict[indexOfMax(data)]){
    //       result_dict[indexOfMax(data)] += 1
    //     }
    //     else{
    //       result_dict[indexOfMax(data)] = 1
    //     }
    //     console.log(result_dict);
        
    //   });
    //   console.log(result)
      
    // })
    
    

    // Load the model.
    // Tensorflow.js currently needs the absolute path to the model including the full origin.
  

    
    
    // The result is a 6-dimensional vector, the first half may be ignored
    
  // const model = await tfdf.loadTFDFModel('http://127.0.0.1:5500/App/tfjs_model/model.json');
  //     // Perform an inference
  //     const result = await model.executeAsync({
  //           "island": tf.tensor(["Dream"]),
  //           "bill_length_mm": tf.tensor([50.3]),
  //           "bill_depth_mm": tf.tensor([20]),
  //           "flipper_length_mm": tf.tensor([197]),
  //           "body_mass_g": tf.tensor([3300]),
  //           "sex": tf.tensor(["Female"]),
  //           "year": tf.tensor([2008], [1], 'int32'),
  //     });
  //     // The result is a 6-dimensional vector, the first half may be ignored
  //     result.print();
}

// Function to handle search by baby ID
function searchBaby() {
    // Get the value entered in the search bar
    const babyID = searchBar.value;
    console.log(babyID)
    displayBabyInfo(babyID);
    model_predict(babyID);    
};


// // Function to update the baby image based on model output
// function updateBabyImage(prediction) {
//   const babyImage = document.getElementById("baby-image");
//   if (prediction === 1) {
//       babyImage.style.filter = "hue-rotate(120deg)"; // Turn green
//   } else if (prediction === 2) {
//       babyImage.style.filter = "hue-rotate(60deg)"; // Turn yellow
//   } else if (prediction === 3) {
//       babyImage.style.filter = "hue-rotate(0deg)"; // Keep original color (red)
//   }
// }


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
    
      // Make prediction using the loaded model
    })
    
}




init()
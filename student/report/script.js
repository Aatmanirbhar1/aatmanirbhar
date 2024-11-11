//gobal variables
const BASE_URL = "https://script.google.com/macros/s/AKfycbyBanhiGhs7wcUDJUYI_MbEXKLoRWzUCvSI-ACC76GuVJb_eS96ssenJR5rVV3D_jaB/exec";


// selectors
const batchList = document.getElementById("batch-list");
const resultDiv = document.getElementById("result-table");


// event listeners



//init function
fetchAllBatches();



function fetchAllBatches() {
    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    fetch("https://script.google.com/macros/s/AKfycbyBanhiGhs7wcUDJUYI_MbEXKLoRWzUCvSI-ACC76GuVJb_eS96ssenJR5rVV3D_jaB/exec/batches", requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
}
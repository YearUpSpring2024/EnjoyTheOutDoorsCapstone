'use strict';

window.onload = function () {
    const mountainSearchDropdown = document.getElementById("mountainSearchDropdown");
    const showResultDiv = document.getElementById("showResultDiv");
    // Populate dropdown with mountain names
    for (let index = 0; index < mountainsArray.length; index++) {
        // get the current mountain obj from the mountains array
        const mountain = mountainsArray[index];
        // create a new option
        let option = document.createElement("option");
        // set the value of the of the atttribute to the the index and convert it into a string
        option.value = index.toString();
        // set the innerHTML to the name
        option.innerHTML = mountain.name;
        // add the option to the mountainSearchDropDown
        mountainSearchDropdown.appendChild(option)
    }
    // Event listener for dropdown change
    mountainSearchDropdown.onchange = function () {
        // grab the current selected mountain and 
        let selectedMountainIndex = mountainSearchDropdown.value;
        // start empty
        showResultDiv.innerHTML = "";
        // check if the mountain index selected is a valid number and it is within bounds
        if (!isNaN(selectedMountainIndex) && selectedMountainIndex >= 0 && selectedMountainIndex < mountainsArray.length) {
            // grab the selected mountains object from the array
            let selectedMountain = mountainsArray[selectedMountainIndex];
            // showing the results of the selected Mountain
            showResults(selectedMountain);
            // fetch the sunrise and sunset for a selected mountain's coordinate
            getMountSunset(selectedMountain.coords.lat, selectedMountain.coords.lng)
                // if the sunrise and sunset times are successfully fetched do the following
                .then(function (result) {
                    // result -> has sunrise and sunset properties
                    // have access to those properties 'result.sunrise and result.sunset
                    //This updates the webpage to dsiplay the sunrise and sunset
                    showResultDiv.innerHTML += `<span>Sunrise: ${result.sunrise}</span> <span>Sunset: ${result.sunset}</span>
                    `;
                })
                // if there is any erro during the fetching do the following
                .catch(function (error) {
                    // log the error message 
                    // console.error is use to log error message to the console
                    console.error('No Sunrise available:', error);
                });
        }
    };

    // Function to display mountain information
    function showResults(mountain) {
        // creating the elements to add mountain info
        let nameOfMountain = document.createElement("h3");
        let imageOfMountain = document.createElement("img");
        let elevationOfMountain = document.createElement("p");
        let effortMountain = document.createElement("p");
        let descMountain = document.createElement("p");
        let coordsMountain = document.createElement("p");


        // adding info
        nameOfMountain.innerHTML = mountain.name;
        imageOfMountain.src = `images/${mountain.img}`;
        imageOfMountain.alt = mountain.name;
        elevationOfMountain.innerHTML = "Elevation: " + mountain.elevation + " feet";
        effortMountain.innerHTML = "Effort: " + mountain.effort;
        coordsMountain.innerHTML = "Coordinates: Latitude " + mountain.coords.lat + ", Longitude " + mountain.coords.lng;
        descMountain.innerHTML = mountain.desc;

        // adding the infor inside of the parent tag
        showResultDiv.appendChild(nameOfMountain);
        showResultDiv.appendChild(imageOfMountain);
        showResultDiv.appendChild(elevationOfMountain);
        showResultDiv.appendChild(effortMountain);
        showResultDiv.appendChild(descMountain);
        showResultDiv.appendChild(coordsMountain);
    }
    // fetch sunrise or sunset data for the selected mountains
    async function getMountSunset(latitude, longitude) {
        // fetch the sunrise and sunset data from the api
        let response = await fetch(
            `https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}&date=today`
        );
        // wait for the conversion of the response body to json format
        let data = await response.json();
        // return the the results property from the json data
        return data.results;
    }
};
"use strict";

// accessing the DOM element by their ID's
const selectedPark = document.getElementById('parkSelect');
const stateSelect = document.getElementById('stateSelect');
const parkTypeSelect = document.getElementById('parkTypeSelect');
// view all
const viewAllButton = document.getElementById('viewAllButton');
// clear buttons
const clearFilterButton = document.getElementById('clearFilterButton');
// row
const nationalParkRow = document.getElementById("nationalParkRow");

// when the window loads, execute this function
window.onload = function () {

    // Getting length of the National parks Array
    let nationalParksArrayLength = nationalParksArray.length;
    // adding the selected park dropDown menu
    for (let i = 0; i < nationalParksArrayLength; i++) {
        let option = document.createElement("option");
        option.value = nationalParksArray[i].LocationName;
        option.innerHTML = nationalParksArray[i].LocationName;
        selectedPark.appendChild(option);
    }
    //initializing an empty array to store each unique state
    let setOfState = [];
    // grabbing the link
    let lengthOfNationalPark = nationalParksArray.length;
    // loop through each state of national Park
    for (let i = 0; i < lengthOfNationalPark; i++) {

        //flag it if the state already exist
        let stateExist = false;

        //loop through each state of the list
        for (let j = 0; j < setOfState.length; j++) {

            //check if the current state matches the state of the national park
            if (setOfState[j] === nationalParksArray[i].State) {

                //if match is found set flag to true
                stateExist = true;

                //exit loop if match is found
                break;
            }
        }
        // if state does not exist in the list add it
        if (!stateExist) {
            setOfState.push(nationalParksArray[i].State);
        }
    }

    //add the state in the dropDown Menu
    let setOfstateLength = setOfState.length;
    for (let i = 0; i < setOfstateLength; i++) {
        let option = document.createElement("option");
        option.value = setOfState[i];
        option.innerHTML = setOfState[i];
        stateSelect.appendChild(option)
    }

    //add the parkType to the dropdown Menu
    let parkTypeLength = parkTypesArray.length;
    for (let i = 0; i < parkTypeLength; i++) {
        let option = document.createElement("option");
        option.value = parkTypesArray[i];
        option.innerHTML = parkTypesArray[i];
        parkTypeSelect.appendChild(option);
    }

    // show all of the parks
    viewAllButton.onclick = function () {
        nationalParkRow.innerHTML = '';
        // call showResultss -> while passing it nationaParksArray
        showResults(nationalParksArray);
    }

    // clear the filters
    clearFilterButton.onclick = function () {
        // set the it to an empty string
        nationalParkRow.innerHTML = '';
    }
    // showing the results
    function showResults(parks) {
        let lengthOfPark = parks.length;
        // if there is no park
        if (lengthOfPark === 0) {
            //add a message to say no park has been found
            nationalParkRow.innerHTML = 'No park has been found';
            return;
        }
        // or create add it to the row one by one
        let parksLength = parks.length;
        for (let i = 0; i < parksLength; i++) {
            let parkElement = createParkColumn(parks[i]);
            // add it in the row
            nationalParkRow.appendChild(parkElement);
        }
    }

    //function to create column for each element
    function createParkColumn(nationalPark) {
        //first start with the div
        // class cold-md-4
        let parkColumnDiv = document.createElement("div");
        parkColumnDiv.className = "col-md-4";

        // class card h-100
        let parksCardDiv = document.createElement("div");
        parksCardDiv.className = 'card h-100';
        parkColumnDiv.appendChild(parksCardDiv);

        // card image
        // class card-img-top
        let parkImage = document.createElement("img");
        // random image & find pictures of Parks
        parkImage.src = "https://picsum.photos/500/500?parks=" + Math.floor(Math.random() * 1000); //return a number between 0 and 1000
        parkImage.className = 'card-img-top';
        parkImage.alt = nationalPark.LocationName;
        parksCardDiv.appendChild(parkImage)

        // class = card-body
        let cardBodydiv = document.createElement('div');
        cardBodydiv.className = 'card-body';
        parksCardDiv.appendChild(cardBodydiv);

        // header
        // class = card-title
        let parkHeader = document.createElement("h4");
        parkHeader.className = 'card-title';
        parkHeader.innerHTML = nationalPark.LocationName;
        cardBodydiv.appendChild(parkHeader);

        //class = card-text
        let parkState = document.createElement("p");
        parkState.className = 'card-text';
        parkState.innerHTML = "State " + nationalPark.State;
        cardBodydiv.appendChild(parkState);

        let cityOfThePark = document.createElement("p");
        cityOfThePark.className = 'card-text';
        cityOfThePark.innerHTML = "City: " + nationalPark.City;
        cardBodydiv.appendChild(cityOfThePark);
        // if there is no phone
        if (!nationalPark.Phone) {
            let noParkPhone = document.createElement("p");
            // set it equals to an empty string
            noParkPhone.innerHTML = ''
            cardBodydiv.appendChild(noParkPhone)
        } else {
            let parkPhone = document.createElement("p")
            parkPhone.className = 'card-text';
            parkPhone.innerHTML = "Phone: " + nationalPark.Phone;
            cardBodydiv.appendChild(parkPhone)
        }
        // if there is no phone present
        if (!nationalPark.Fax) {
            let noParkFax = document.createElement("p");
            // set it to an empty string
            noParkFax.innerHTML = "";
            cardBodydiv.appendChild(noParkFax)
        } else {
            let ParkFax = document.createElement("p");
            ParkFax.className = 'card-text';
            ParkFax.innerHTML = "Fax: " + nationalPark.Fax;
            cardBodydiv.appendChild(ParkFax)
        }
        let parkAddress = document.createElement("p");
        parkAddress.className = "card-text";
        parkAddress.innerHTML = "Address: " + nationalPark.Address + ' ' + nationalPark.City + " " + nationalPark.State + " " + nationalPark.ZipCode;
        cardBodydiv.appendChild(parkAddress);


        // checking to see if there is a link to vitsit
        if (nationalPark.Visit) {
            let parkVisitLink = document.createElement("a");
            parkVisitLink.href = nationalPark.Visit;
            parkVisitLink.target = "_blank";
            parkVisitLink.className = 'btn btn-primary';
            parkVisitLink.innerHTML = "visit Park";
            cardBodydiv.appendChild(parkVisitLink);
        } else {
            let parkVisitNoLink = document.createElement("p");
            parkVisitNoLink.innerHTML = ''
            cardBodydiv.appendChild(parkVisitNoLink)
        }
        return parkColumnDiv
    }

    // and parkType is the string representing the parkType Filter
    function filterByParkTypes(park, parkType) {
        // to store the filtered parks
        let filterParks = [];
        let parksLength = park.length;
        // loop over each park objeck in the park array
        for (let i = 0; i < parksLength; i++) {
            // if the current park object matches the specified park
            //1 does so by parkType is empty indicating no filtering
            // 2 or if the locationName property of the park object contains the park
            if (parkType === "" || park[i].LocationName.indexOf(parkType) !== -1) { // index return the first time parkType of ParkType in LocationName if it's not -1 that means parkType string is found within locationName
                // if the park object fit the critaria push it into the filterParks array
                filterParks.push(park[i]);
            }
        }
        // return the array of the filterParks
        return filterParks
    }
    function onlyByState(parks, state) {
        let filterParks = [];
        let parkLength = parks.length;
        // loop over each park object in the parks array
        for (let i = 0; i < parkLength; i++) {
            // if the current park is an amtpty string
            if (state === "" || parks[i].State === state) {
                filterParks.push(parks[i]);
            }
        }
        return filterParks;
    }
    function filterByName(park, name) {
        let filterName = [];
        let parksLength = park.length;
        for (let i = 0; i < parksLength; i++) {
            if (name === "" || park[i].LocationName === name) {
                filterName.push(park[i]);
            }
        }
        return filterName;
    };
    //event selecter for the selected park dropDown
    selectedPark.onchange = function () {
        let parkSelect = selectedPark.value;
        nationalParkRow.innerHTML = '';
        let filterParks = filterByName(nationalParksArray, parkSelect);
        // show the result
        showResults(filterParks);
    }
    // event listener for the parkType
    parkTypeSelect.onchange = function () {
        let selectedParkByType = parkTypeSelect.value;
        nationalParkRow.innerHTML = '';
        let filterByParkTyp = filterByParkTypes(nationalParksArray, selectedParkByType);
        showResults(filterByParkTyp);
    }


    // event listering for the state
    stateSelect.onchange = function () {
        let selectedStateValue = stateSelect.value;
        nationalParkRow.innerHTML = '';
        let filterParks = onlyByState(nationalParksArray, selectedStateValue);
        // show the results
        showResults(filterParks)
    }

}
"use strict";
console.log(mountainsArray)

window.onload = function () {
    const mountainSearchDropdown = document.getElementById("mountainSearchDropdown");
    const showResultDiv = document.getElementById("showResultDiv");

    // looping through array and adding each element
    let mountainsArrayLength = mountainsArray.length;
    for (let i = 0; i < mountainsArrayLength; i++) {
        let option = document.createElement("option");
        option.value = mountainsArray[i];
        option.innerHTML = mountainsArray[i].name;
        mountainSearchDropdown.appendChild(option);
    }
}
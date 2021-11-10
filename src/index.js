const init = () => {
    challengeOne();
    challengeTwo();
    whenDropDownChanges()
}

//function to fetch the dog images and insert the HTML
function challengeOne () {
    const placeToPutDogs = document.querySelector('#dog-image-container');
        fetch('https://dog.ceo/api/breeds/image/random/4')
        .then(response => response.json())
        .then(data => {
            const dogArray = data.message;
            let html = '';
            dogArray.forEach(element => {
            html = html + createImgHtml(element);
            })
                placeToPutDogs.innerHTML = html;
        })
}

//function to create the html for the images
function createImgHtml(image) {
return `<img src="${image}"><br>`;
}

//Breeds needs to sit globally so I can use it in multiple functions
let breeds;

//function to fetch the list of breeds
function challengeTwo () {
    fetch('https://dog.ceo/api/breeds/list/all')
    .then(response => response.json())
    .then(data => {
        breeds = Object.keys(data.message);
        createListOfBreeds ()
    })
}

//function to create and filter the list of breeds from the fetched data
function createListOfBreeds () {
    let selection = document.querySelector('#breed-dropdown')
    let html = '';
    let listOfBreeds = document.querySelector('#dog-breeds');
    let filteredBreedList = breeds.filter((item) => item[0] === selection.value);
            filteredBreedList.forEach(element => {
                html = html + createListHtml(element);
            })
                listOfBreeds.innerHTML = html;
                changeColour();
}


//function to change the color of the link text for the list of breeds
    function changeColour () {
        const targetAnchor = document.querySelector('#dog-breeds');    
        targetAnchor.addEventListener('click', (event) => {
            event.preventDefault();
            const anchor = event.target.closest("a");
            anchor.style.color = 'green';
        })
    }

//function to handle the filter drop down being changed
    function whenDropDownChanges() {
        let selection = document.querySelector('#breed-dropdown')
        selection.onchange = function () {
            createListOfBreeds ()
            changeColour();
        }
}

//function to create the html for the list of breeds
function createListHtml(breed) {
    return `<li><a href="#">${breed}</a></li><br>`;
    }


//holding off functions until the DOM has loaded
document.addEventListener('DOMContentLoaded', init);
//First we want to give the number of the page 
//we want to load up when we open the page
let firstPage = 1;
//this is passed into the function that generates the url (see function updateUrl)
updateUrl(firstPage);



//we can also take the textContent of each page number button, and pass that through as a arguement to the updateUrl function
//by identifying the class of the buttons, iterating through all of them and assigning an event listener to each of them.
//when someone "click"s the button, we then take the textcontent of the button and pass it as an argument to the updateUrl function.
const pageButton = document.querySelectorAll(".page_button");
pageButton.forEach(button=>{
    button.addEventListener("click",function(event){
        //event should always be the first argument referenced.
        let pageNumber = event.target.textContent;
        updateUrl(pageNumber);
    })
});



//This function takes a number as an arguement 
//(given to us by either the firstPage variable or the event listener for the page buttons).
//the function then concatenates the url assigned as a string to the nextUrl variable
//and the number brought in as the function argument to create a new url.
//the new url is then passed to the getFetch function.
function updateUrl(number){
    let nextUrl = "https://swapi.co/api/people/?page=";
    let fetchUrl = nextUrl + number;
    getFetch(fetchUrl);
} 


//the getFetch function takes the url passed as a string from the updateUrl function as an argument, 
//and passes that argument to the fetch function.
//the .then methods then extract the json object from the API and passes the properties of the 'results' 
//(a key within the json object) array stored within to the generateCharList function.
function getFetch(url) {
    fetch(url)
        .then(response => {
            return response.json();
        })
        .then(body => {
            generateCharList(body.results);
        })
}

//This function then takes the array passed from the getFetch function as an argument, iterates over each
//object stored in it, and forEach 'character' object in the array it creates an empty <li></li> element in the
// html. By dot notating into the character object, we can access any of the properties within, in this case
// the name. We assign the character.name to the empty li element that then looks like this <li>${character.name}</li>.
//we can then identify the parent node to which we want to add the <li> elemennt (in this case, we can see it's the
// <ul> in the html with the class name "characters" or .characters). we then append the li that we have created, called 
//characterItem, to the parentNode, called charactersNode. 
function generateCharList(characterArray){
    characterArray.forEach(character => {
    let charactersNode = document.querySelector(".characters");
    let characterItem = document.createElement("li");
    characterItem.textContent = character.name;
    charactersNode.appendChild(characterItem);
    });
}

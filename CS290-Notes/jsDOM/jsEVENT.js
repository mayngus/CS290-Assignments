//EVENT LISTENERS

//This function is more vaible than on click
//Responding to clicks for first box
var firstBox = document.querySelector('.box');
// (what we're listening for, function)
// firstBox.addEventListener('click', function() {
//   firstBox.classList.toggle('highlighted');
// });

var allBoxes = document.getElementsByClassName('box');

function respondToBoxClick(event) {
  //event is all the information about the click
  console.log("== Responding to box click, event.target:", event.target);
  console.log("== Responding to box click, event.currentTarget:", event.currentTarget);
  //better to use this, more general use, does the same thing as above
  event.target.classList.toggle('highlighted');
  //event.currentTarget.classList.toggle('highlighted'); //makes it so only box gets highlighted

  // event.stopPropagation(); //wont allow window event listener to go
}

// allBoxes[0].addEventListener('click', respondToBoxClick);
// allBoxes[1].addEventListener('click', respondToBoxClick);
//to add to all boxes, can use for loop
for(var i = 0; i < allBoxes.length; i++) {
  allBoxes[i].addEventListener('click', respondToBoxClick);
  //allBoxes[i].onclick = respondToBoxClick; //Don't use this, this only allows for one listener
}
//not passing function(), passing reference
//if you pass function(), it will call function and return its value
//firstBox.addEventListener('click', respondToBoxClick);

//Stopping the hierachy of event listeners
window.addEventListener('click', function (event) {
  console.log('== Window Clicked, event.target:', event.target);
});

//chaning what the link does
var websiteLink = document.getElementById('website-link');
websiteLink.addEventListener('click', function (event) {
  // var linkElement = event.target;
  event.preventDefault();
  alert("Clicked on the link!");
});

//For adding A LOT of listeners
//EVENT DELEGATION
//Places listener on parent of 1000 childs, event.target tell which button was pressed
function delegatedButtonListener(event) {
  console.log("== delegatedButtonListener fired, target: ", event.target);
  if (event.target.classList.contains('in-box-button')) {
    console.log("== Got a button click!");
  }
}

var boxContainer = document.getElementById('box-container');
boxContainer.addEventListener('click', delegatedButtonListener);

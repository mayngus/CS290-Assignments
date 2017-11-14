//The DOM
//Two classesin DOM tree, Node and Element
//These 2 classes allow us to do alot with DOM
//Elements are Nodes
console.log("document:", document);
console.log("document.body", document.body);

//acceses all of body
var body = document.body;
console.log("body.childNodes:", body.childNodes);

var bodyChildren = body.childNodes;
for (var i = 0; i < bodyChildren.length; i++)
{

}

//getting first and last child in body
var bodyFirstChild = body.firstChild;
var bodyLastChild = body.lastChild;
console.log("bodyFirstChild:", bodyFirstChild);
console.log("bodyLastChild:", bodyLastChild);

//going through siblings
var elem = bodyFirstChild;
while (elem)
{
  console.log("elem:", elem);
  elem = elem.nextSibling;
}

//accessing parent node
var firstChileParent = bodyFirstChild.parentNode;
console.log("bodyFirstChild.parentNode", bodyFirstChild.parentNode);

//traversing through the DOM, for trying to access certain piece of info
//This is for id numbers
var photoCardContainer = document.getElementById('photo-card-container');
console.log("photoCardContainer:", photoCardContainer);

//This is for classes in html
//This is a HTML collection not an Array!!! (can't use foreach, have to use for loop)
//Removing or adding elements, it will automatically change the collection
//Only gets one class!!!
var photoCards = document.getElementsByClassName('photo-card');
console.log("photoCards:", photoCards);
console.log("photoCards[0]:", photoCards[0]);
//photoCards.forEach(function() {});

//Similar to ClassName but its based on html tag
//Dynamic array by object
var links = document.getElementsByTagName('a');
console.log("links:", links);

//Gets specific class names(takes in multiple classes)
//Used same way as css
//Only returns one value
var rightNavItem = document.querySelector('.navitem.right');
console.log("rightNavItem:", rightNavItem);

var firstPhotoCard = document.querySelector('.photo-card:first-child');
console.log("firstPhotoCard:", firstPhotoCard);

//Returns all quereys
var allPersonImages = document.querySelectorAll('.img-container img');
console.log("allPersonImages:", allPersonImages);


//writing into innerHTML is very DANGEROUS
//Ex. user inputs maleware and you put it into ur html = bad news
console.log("firstPhotoCard.innerHTML:", firstPhotoCard.innerHTML);

//More Safe: not interperated as HTML
console.log("firstPhotoCard.textContent:", firstPhotoCard.textContent);

//can print src or href info
//can use this to change src or href
console.log("allPersonImages[0].src:", allPersonImages[0].src);
console.log("links[0].href:", links[0].href);

//Figuring out width or height within screen
var lastPhotoCard = document.querySelector('.photo-card:last-child');
//Gives size of padding + content, not border or magin
console.log("lastPhotoCard.width:", lastPhotoCard.clientWidth);
console.log("lastPhotoCard.height:", lastPhotoCard.clientHeight);
//inclueds content + padding + border (if there is a scroll bar it adds it)
console.log("lastPhotoCard.offsetWidth:", lastPhotoCard.offsetWidth);
console.log("lastPhotoCard.offsetHeight:", lastPhotoCard.offsetHeight);
//total size, including text that goes off screen (think about his loerm ipsum card)
console.log("lastPhotoCard.scrollWidth:", lastPhotoCard.scrollWidth);
console.log("lastPhotoCard.scrollHeight:", lastPhotoCard.scrollHeight);
//If there is a scroll bar, it will tell u how far down u have scrolled down or right
console.log("lastPhotoCard.scrollLeft:", lastPhotoCard.scrollLeft);
console.log("lastPhotoCard.scrollTop:", lastPhotoCard.scrollTop);
//total scroll of window in client
//Can be used for listener events
console.log("window.scrollX:", window.scrollX);
console.log("window.scrollY:", window.scrollY);
//Get all info about node, realtive to viewport
console.log("lastPhotoCard.getBoundingClientRect():", lastPhotoCard.getBoundingClientRect());

//INSERTING AND REMOVING THINGS FROM DOM (MODERN WEB STUFF)

//Creating functional photo-card
function createPhotoCard(photoURL, caption) {
  var photoCardSection = document.createElement('section');
  photoCardSection.classList.add('photo-card');

  var imgContainerDiv = document.createElement('div');
  imgContainerDiv.classList.add('img-container');
  photoCardSection.appendChild(imgContainerDiv);

  var img = document.createElement('img');
  img.classList.add('person-photo-img');
  img.src = photoURL;
  imgContainerDiv.appendChild(img);

  var captionDiv = document.createElement('div');
  captionDiv.classList.add('caption');
  captionDiv.textContent = caption; //okay to use .textContent becasue that all this node is for
  photoCardSection.appendChild(captionDiv);

  console.log("photoCardSection:", photoCardSection);

  photoCardSection.setAttribute('data-price', '500');

  return photoCardSection;
}

var newPhotoCard = createPhotoCard("https://placekitten.com/320/320/", "A cute kitty");

var photoCardContainer = document.getElementById('photo-card-container');

photoCardContainer.appendChild(newPhotoCard);
// photoCardContainer.insertBefore(newPhotoCard, photoCardContainer.firstChild);
// photoCardContainer.replaceChild(newPhotoCard, photoCardContainer.firstChild);

newPhotoCard.setAttribute('id', 'newly-added-photo-card');
console.log(newPhotoCard.getAttribute('data-price'));
//Creating new div
//can use .innerHTMl to directly add it to the page, BUT IS BAD PRACTICE
var userSpecifiedContent = "<img src=x onerror=\"alert('Uh oh!')\">"; //Cross site scripting, allows users to run scripts
// photoCardContainer.innerHTML += "<div class=\"photo-card\">" + userSpecifiedContent + "</div>";

// photoCardContainer.textContent += userSpecifiedImg;

//Creating new div
var newDiv = document.createElement('div');

//newDiv.textContent = userSpecifiedContent; //Inserting text, don't use if you want other things added to div

//Adding and removing classes
newDiv.classList.add('photo-card'); //adding class to div
newDiv.classList.add('ugly');
newDiv.classList.remove('ugly'); //removing class from div

//inline style, but try to seperate style to css
// newDiv.style.color = 'orange';
// newDiv.style.border = '3px dashed purple';
newDiv.classList.add('ugly');

//Adding nodes into newDiv
var newSpan = document.createElement('span');
newSpan.classList.add('ugly'); //css

var newTextNode = document.createTextNode(userSpecifiedContent);
newSpan.appendChild(newTextNode); //adding text into newSpan
newDiv.appendChild(newSpan);

console.log("newDiv:", newDiv);
//inserting into photoCardContainer
photoCardContainer.appendChild(newDiv);
//Can change nodes after everything is set, will still change, like pointers

newSpan.textContent = "hi";
// newDiv.remove(); //not supported by all browsers
newDiv.parentNode.removeChild(newDiv);

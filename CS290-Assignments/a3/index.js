/*
 * Name: Gregory Sanchez
 * Class: CS 290
 * Date: 11/6/2017
 * Description: Adds functionality of modal and filter
 */
var posts = document.getElementById('posts');

var filter = document.querySelector('.filter-container');
var dropDown = document.getElementById('filter-city');
var update = document.getElementById('filter-update-button');

var sellButton = document.getElementById('sell-something-button');
var modalBackdrop = document.getElementById('modal-backdrop');
var modal = document.getElementById('sell-something-modal');
var create = document.getElementById('modal-accept');
var cancel = modal.getElementsByClassName('modal-hide-button');

var filteredPosts = [];
var userInput = new Array(5);
var userFilter = new Array (9);


/*
 * Description: toggles css classes to display the modal
 */
function displayModal() {
	modalBackdrop.classList.toggle('hidden');
	modal.classList.toggle('hidden');
}

/*
 * Description: Erases all modal user inputs and resets the modal.
 */
function clearModal() {
	userInput = new Array(5);
  	var userValues = modal.getElementsByTagName('input');
  	for(var i = 0; i < userValues.length - 5; i++) { //Goes through input boxes minus the amount of radio buttons
  		userValues[i].value = '';
  	}
  	document.getElementById('post-condition-new').checked = true;
}

/*
 * Description: toggles css classes to display the modal and calls function to clear the modal.
 */
function hideModal() {
 	clearModal();
 	modalBackdrop.classList.toggle('hidden');
 	modal.classList.toggle('hidden');
}

/*
 * Description: creates html elements to add a new card created by the user.
 * param: title of card, url for the card picture, price of object, city location of object, condition of object
 * return: new html card element
 */
function createPhotoCard(title, photoURL, price, city, condition) {
	var post = document.createElement('div');
	post.classList.add('post')
	post.setAttribute('data-price', price);
	city = city.charAt(0).toUpperCase() + city.slice(1);
	post.setAttribute('data-city', city);
	post.setAttribute('data-condition', condition);

	var postContents = document.createElement('div');
	postContents.classList.add('post-contents');
	post.appendChild(postContents);

	var postImgContainer = document.createElement('div');
	postImgContainer.classList.add('post-image-container');
	postContents.appendChild(postImgContainer);

	var img = document.createElement('img');
	img.src = photoURL;
	img.alt = title;
	postImgContainer.appendChild(img);

	var postInfo = document.createElement('div');
	postInfo.classList.add('post-info-contianer');
	postContents.appendChild(postInfo);

	var postTitle = document.createElement('a');
	postTitle.href = '#';
	postTitle.classList.add('post-title');
	postTitle.textContent = title;
	postInfo.appendChild(postTitle);

	var postPrice = document.createElement('span');
	postPrice.classList.add('post-price');
	postPrice.textContent ="$" +  price;
	postInfo.appendChild(postPrice);

	var postCity = document.createElement('span');
	postCity.classList.add('post-city');
	postCity.textContent = "(" + city + ")";
	postInfo.appendChild(postCity);

	console.log("== New Post Created");

	return post;
}

/*
 *  Description: checks if there is a new city that was entered by the user in the modal.
 *  param: city to check if it already exists.
 */
function checkNewCity(userCity) {
	var dropDownCities = document.getElementById('filter-city').options;

	for(var i = 1; i < dropDownCities.length; i++) {
		if( dropDownCities[i].value.toLowerCase().match("\\b" + userCity.toLowerCase().replace(' ', "\\b \\b") + "\\b") != null) {
			console.log("-- User city already in drop down menu");
			return;
		}
	}
	var newCity = document.createElement('option');
	newCity.textContent = userCity.charAt(0).toUpperCase() + userCity.slice(1);

	dropDown.appendChild(newCity);
	console.log("-- User city inserted into drop down menu");
}

/*
 * Description: checks to see if all fields were entered in modal by user
 */
function checkAndAddCard() {
	if(!userInput[4]) {
		userInput[4] = "new";
	}
	for(var i = 0; i < userInput.length - 1; i++) {
		if(!userInput[i]) {
			alert("Fill out all fields");
			return;
		}
	}

	var newPost = createPhotoCard(userInput[0], userInput[1], userInput[2], userInput[3], userInput[4]);
	checkNewCity(userInput[3]);


	posts.appendChild(newPost);
	hideModal();
}

/*
 * Description: controls user inputs in modal
 * param: which box is being typed/click on
 */
function handleWordsChange(event) {
	var wordsText = event.target.value;

	switch (event.target.id) {
		case 'post-text-input':
			userInput[0] = wordsText;
		break;
		case 'post-photo-input':
			userInput[1] = wordsText;
		break;
		case 'post-price-input':
			userInput[2] = wordsText;
		break;
		case 'post-city-input':
			userInput[3] = wordsText;
		break;
	}
	if (event.target.id.includes('post-condition')) {
		userInput[4] = wordsText;
	}
}

/*
 * Description: checks to see if a card needs to be removed based on filters
 * param: card that is being checked
 * return: true if the cards needs to be removed, false if it doesn't
 */
function childToRemove(card) {
	var toRemove = false;
	var removeDueToCondition = false;

	for(var i = 4; i < userFilter.length; i++) {

		if(userFilter[i] && !card.getAttribute('data-condition').includes(userFilter[i])) {
			toRemove = true;
		}
		else if (userFilter[i] && card.getAttribute('data-condition').includes(userFilter[i])) {
				toRemove = false;
				break;
		}
	}
	if(userFilter[0] && !card.getElementsByClassName('post-title')[0].textContent.toLowerCase().includes(userFilter[0].toLowerCase())) {
		toRemove = true;
	}
	if(userFilter[1] && (parseInt(card.getAttribute('data-price')) <  parseInt(userFilter[1]))) {
		toRemove = true;
	}
	if(userFilter[2] && (parseInt(card.getAttribute('data-price')) >  parseInt(userFilter[2]))) {
		toRemove = true;
	}
	if(userFilter[3] != '' && card.getAttribute('data-city').toLowerCase().match("\\b" + userFilter[3].toLowerCase().replace(' ', "\\b \\b") + "\\b") == null) {
		toRemove = true;
	}

	return toRemove;
}

/*
 * Description: loops through each card, removing or leaving it in the DOM
 */
function filterContainer() {
	var everyPost = posts.childNodes;

	for(var i = 0; i < everyPost.length; i++) {
		if(everyPost[i].nodeType == 1 && childToRemove(everyPost[i])) {

			filteredPosts.push(everyPost[i]);
			posts.removeChild(everyPost[i]);
			i--;
		}
	}
	console.log("-- Elements Filtered");
}

/*
 * Description: Gets every user inputed filter, filtering accordingly
 */
function filterPosts() {
	console.log("\n====NEW FILTER ===\n");
	var inputs = filter.getElementsByTagName('input');

	if(filteredPosts.length > 0) {
		for(var k = 0; k < filteredPosts.length; k++) {
			posts.appendChild(filteredPosts[k]);
		}
		filteredPosts = [];
		console.log("-- Filtered Posts put back into the DOM");
	}

	//Gets user text from text boxes
	for(var i = 0; i < inputs.length - 5; i++) {
		if (inputs[i].value) {
			userFilter[i] = inputs[i].value;
		}
		else {
			userFilter[i] = null;
		}
	}

	//Gets city selected by the user
	var cityFilter = document.getElementById('filter-city');
	userFilter[3] = cityFilter.options[cityFilter.selectedIndex].value;

	//Gets which boxes were checked by user
	for(var j = 3; j < inputs.length; j++) {
		if(inputs[j].checked) {
			userFilter[j + 1] = inputs[j].value;
		}
		else {
			userFilter[j + 1] = null;
		}
	}

	filterContainer();
}


//Fixed button event listener
sellButton.addEventListener('click', displayModal);

//Modal Event Listeners
modal.addEventListener('change', handleWordsChange);
create.addEventListener('click', checkAndAddCard);
for(var i = 0; i < cancel.length; i++) { cancel[i].addEventListener('click', hideModal); }

//Filter update button event Listener
update.addEventListener('click', filterPosts);

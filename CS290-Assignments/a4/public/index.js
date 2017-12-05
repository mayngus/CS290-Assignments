/*
 * Write your JS code in this file.
 */

var allPostElems = [];
var allCities = [];

/*
 * This function shows the "sell something" modal by removing the "hidden"
 * class from the modal and backdrop.
 */
function showSellSomethingModal() {

  var showSomethingModal = document.getElementById('sell-something-modal');
  var modalBackdrop = document.getElementById('modal-backdrop');

  showSomethingModal.classList.remove('hidden');
  modalBackdrop.classList.remove('hidden');

}


/*
 * This function clears any user-entered inputs in the "sell something" modal.
 */
function clearSellSomethingModalInputs() {

  var postTextInputElements = [
    document.getElementById('post-text-input'),
    document.getElementById('post-photo-input'),
    document.getElementById('post-price-input'),
    document.getElementById('post-city-input')
  ];

  /*
   * Clear any text entered in the text inputs.
   */
  postTextInputElements.forEach(function (inputElem) {
    inputElem.value = '';
  });

  /*
   * Grab the originally checked radio button and make sure it's checked.
   */
  var checkedPostConditionButton = document.querySelector('#post-condition-fieldset input[checked]');
  checkedPostConditionButton.checked = true;

}


/*
 * This function hides the "sell something" modal by adding the "hidden"
 * class from the modal and backdrop.  It also clears any existing inputs in
 * the modal's input fields when the modal is hidden.
 */
function hideSellSomethingModal() {

  var showSomethingModal = document.getElementById('sell-something-modal');
  var modalBackdrop = document.getElementById('modal-backdrop');

  showSomethingModal.classList.add('hidden');
  modalBackdrop.classList.add('hidden');

  clearSellSomethingModalInputs();

}


/*
 * This function generates a new HTML element representing a complete post,
 * given the specified information about the item to be sold.  The new post
 * element has the following structure:
 *
 * <div class="post" data-price="{{price}}" data-city="{{city}}" data-condition="{{condition}}">
 *   <div class="post-contents">
 *     <div class="post-image-container">
 *       <img src="{{photoURL}}" alt="{{itemText}}">
 *     </div>
 *     <div class="post-info-container">
 *       <a href="#" class="post-title">{{itemText}}</a> <span class="post-price">${{price}}</span> <span class="post-city">({{city}})</span>
 *     </div>
 *   </div>
 * </div>
 */
function createPostElement(itemText, photoURL, price, city, condition) {

  // Create the containing <div> element.
  var postDiv = document.createElement('div');
  postDiv.classList.add('post');
  postDiv.setAttribute('data-price', price);
  postDiv.setAttribute('data-city', city);
  postDiv.setAttribute('data-condition', condition);

  // Create the inner post-contents <div> and add it to the post <div>.
  var postContentsDiv = document.createElement('div');
  postContentsDiv.classList.add('post-contents');
  postDiv.appendChild(postContentsDiv);

  /*
   * Create the post-image-container <div> and its <img> contents and add
   * them into the post-contents <div>.
   */
  var postImageContainerDiv = document.createElement('div');
  postImageContainerDiv.classList.add('post-image-container');
  postContentsDiv.appendChild(postImageContainerDiv);

  var postImg = document.createElement('img');
  postImg.src = photoURL;
  postImg.alt = itemText;
  postImageContainerDiv.appendChild(postImg);

  /*
   * Create the post-info-container <div> and all of its contents and add
   * them into the post-contents <div>.
   */
  var postInfoContainerDiv = document.createElement('div');
  postInfoContainerDiv.classList.add('post-info-container');
  postContentsDiv.appendChild(postInfoContainerDiv);

  var postLink = document.createElement('a');
  postLink.classList.add('post-title');
  postLink.href = '#';
  postLink.textContent = itemText;
  postInfoContainerDiv.appendChild(postLink);

  var spaceText1 = document.createTextNode(' ');
  postInfoContainerDiv.appendChild(spaceText1);

  var postPriceSpan = document.createElement('span');
  postPriceSpan.classList.add('post-price');
  postPriceSpan.textContent = '$' + price;
  postInfoContainerDiv.appendChild(postPriceSpan);

  var spaceText2 = document.createTextNode(' ');
  postInfoContainerDiv.appendChild(spaceText2);

  var postCitySpan = document.createElement('span');
  postCitySpan.classList.add('post-city');
  postCitySpan.textContent = '(' + city + ')';
  postInfoContainerDiv.appendChild(postCitySpan);

  return postDiv;

}


/*
 * This function creates a new <option> element containing a given city name.
 */
function createCityOption(city) {
  var newCityOption = document.createElement('option');
  newCityOption.textContent = city;
  return newCityOption;
}


/*
 * This function handles a click on the modal's "accept" button by checking
 * whether all of the required inputs were supplied by the user and, if so,
 * inserting a new post into the page constructed using this inputs.  If the
 * user did not supply a required input, they instead recieve an alert, and
 * no new post is inserted.
 */
function handleModalAcceptClick() {

  var itemText = document.getElementById('post-text-input').value.trim();
  var photoURL = document.getElementById('post-photo-input').value.trim();
  var price = document.getElementById('post-price-input').value.trim();
  var city = document.getElementById('post-city-input').value.trim();
  var condition = document.querySelector('#post-condition-fieldset input:checked').value;

  if (!itemText || !photoURL || !price || !city || !condition) {
    alert("You must fill in all of the fields!");
  } else {

    var newPostElem = createPostElement(itemText, photoURL, price, city, condition);
    allPostElems.push(newPostElem);

    var postsSection = document.getElementById('posts');
    postsSection.appendChild(newPostElem);

    /*
     * If city doesn't already exist in the list of cities by which we can
     * filter, add it.
     */
    if (allCities.indexOf(city.toLowerCase()) === -1) {
      allCities.push(city.toLowerCase());
      var newCityOption = createCityOption(city);
      var filterCitySelect = document.getElementById('filter-city');
      filterCitySelect.appendChild(newCityOption);
    }

    hideSellSomethingModal();

  }

}


/*
 * A function to apply the current filters to a specific post.  Returns true
 * if the post passes the filters and should be displayed and false otherwise.
 */
function postPassesFilters(postElem, filters) {

  if (filters.text) {
    var postText = postElem.textContent.toLowerCase();
    var filterText = filters.text.toLowerCase();
    if (postText.indexOf(filterText) === -1) {
      return false;
    }
  }

  if (filters.minPrice) {
    var postPrice = Number(postElem.getAttribute('data-price'));
    var filterMinPrice = Number(filters.minPrice);
    if (postPrice < filterMinPrice) {
      return false;
    }
  }

  if (filters.maxPrice) {
    var postPrice = Number(postElem.getAttribute('data-price'));
    var filterMaxPrice = Number(filters.maxPrice);
    if (postPrice > filterMaxPrice) {
      return false;
    }
  }

  if (filters.city) {
    var postCity = postElem.getAttribute('data-city').toLowerCase();
    var filterCity = filters.city.toLowerCase();
    if (postCity !== filterCity) {
      return false;
    }
  }

  if (filters.conditions && filters.conditions.length > 0) {
    var postCondition = postElem.getAttribute('data-condition');
    if (filters.conditions.indexOf(postCondition) === -1) {
      return false;
    }
  }

  return true;

}


/*
 * Applies the filters currently entered by the user to the set of all posts.
 * Any post that satisfies the user's filter values will be displayed,
 * including posts that are not currently being displayed because they didn't
 * satisfy an old set of filters.  Posts that don't satisfy the filters are
 * removed from the DOM.
 */
function doFilterUpdate() {

  /*
   * Grab values of filters from user inputs.
   */
  var filters = {
    text: document.getElementById('filter-text').value.trim(),
    minPrice: document.getElementById('filter-min-price').value,
    maxPrice: document.getElementById('filter-max-price').value,
    city: document.getElementById('filter-city').value.trim(),
    conditions: []
  }

  var filterConditionCheckedInputs = document.querySelectorAll("#filter-condition input:checked");
  for (var i = 0; i < filterConditionCheckedInputs.length; i++) {
    filters.conditions.push(filterConditionCheckedInputs[i].value);
  }

  /*
   * Remove all "post" elements from the DOM.
   */
  var postContainer = document.getElementById('posts');
  while(postContainer.lastChild) {
    postContainer.removeChild(postContainer.lastChild);
  }

  /*
   * Loop through the collection of all "post" elements and re-insert ones
   * that meet the current filtering criteria.
   */
  allPostElems.forEach(function (postElem) {
    if (postPassesFilters(postElem, filters)) {
      postContainer.appendChild(postElem);
    }
  });

}


/*
 * Wait until the DOM content is loaded, and then hook up UI interactions, etc.
 */
window.addEventListener('DOMContentLoaded', function () {

  /*
   * Remember all of the initial post elements initially displayed in the page.
   */
  var postElems = document.getElementsByClassName('post');
  for (var i = 0; i < postElems.length; i++) {
    allPostElems.push(postElems[i]);
  }

  /*
   * Grab all of the city names already in the filter dropdown.
   */
  var filterCitySelect = document.getElementById('filter-city');
  var filterCityOptions = filterCitySelect.querySelectorAll('option:not([selected])');
  for (var i = 0; i < filterCityOptions.length; i++) {
    allCities.push(filterCityOptions[i].value.trim().toLowerCase());
  }

  var sellSomethingButton = document.getElementById('sell-something-button');
  sellSomethingButton.addEventListener('click', showSellSomethingModal);

  var modalAcceptButton = document.getElementById('modal-accept');
  modalAcceptButton.addEventListener('click', handleModalAcceptClick);

  var modalHideButtons = document.getElementsByClassName('modal-hide-button');
  for (var i = 0; i < modalHideButtons.length; i++) {
    modalHideButtons[i].addEventListener('click', hideSellSomethingModal);
  }

  var filterUpdateButton = document.getElementById('filter-update-button');
  filterUpdateButton.addEventListener('click', doFilterUpdate)

});

var photoCardTemplate = null;

function createPhotoCard(photoURL, caption) {

  var photoCardTemplateArgs = { //left is object for html, right is whats passed in function
    photoURL: photoURL,
    caption: caption,
  };


//This does all the work below but just from template
  var photoCardHTML = Handlebars.templates.photoCard(photoCardTemplateArgs);
  console.log("== photoCardHTML", photoCardHTML);


  return photoCardHTML;

  // var photoCardSection = document.createElement('section');
  // photoCardSection.classList.add('photo-card');
  //
  // var imgContainerDiv = document.createElement('div');
  // imgContainerDiv.classList.add('img-container');
  // photoCardSection.appendChild(imgContainerDiv);
  //
  // var img = document.createElement('img');
  // img.classList.add('person-photo-img');
  // img.src = photoURL;
  // imgContainerDiv.appendChild(img);
  //
  // var captionDiv = document.createElement('div');
  // captionDiv.classList.add('caption');
  // captionDiv.textContent = caption;
  // photoCardSection.appendChild(captionDiv);
  //
  // return photoCardSection;

}


function handleModalAcceptClick() {

  var photoURL = document.getElementById('photo-url-input').value.trim();
  var caption = document.getElementById('photo-caption-input').value.trim();

  if (!photoURL || !caption) {
    alert("You must fill in all of the fields!");
  } else {

    var newPhotoCard = createPhotoCard(photoURL, caption);
    var photoCardContainer = document.querySelector('.photo-card-container');

    //Can no longer do this as what we are returning is a string and not a DOM element
    //photoCardContainer.appendChild(newPhotoCard);

    //insertAdjacentHTML(where, html)
    //where: 'before begin', 'after begin', 'before end', 'after end'
    //Ex.
    // 1
    // <div>
    //  2
    //  content
    //  3
    // <div>
    // 4
    photoCardContainer.insertAdjacentHTML('beforeend', newPhotoCard);

    hideModal();

  }

}


function showModal() {

  var modal = document.getElementById('add-photo-modal');
  var modalBackdrop = document.getElementById('modal-backdrop');

  modal.classList.remove('hidden');
  modalBackdrop.classList.remove('hidden');

}


function clearModalInputs() {

  var modalInputElements = document.querySelectorAll('#add-photo-modal input')
  for (var i = 0; i < modalInputElements.length; i++) {
    modalInputElements[i].value = '';
  }

}


function hideModal() {

  var modal = document.getElementById('add-photo-modal');
  var modalBackdrop = document.getElementById('modal-backdrop');

  modal.classList.add('hidden');
  modalBackdrop.classList.add('hidden');

  clearModalInputs();

}


/*
 * Wait until the DOM content is loaded, and then hook up UI interactions, etc.
 */
window.addEventListener('DOMContentLoaded', function () {

  var addPhotoButton = document.getElementById('add-photo-button');
  addPhotoButton.addEventListener('click', showModal);

  var modalAcceptButton = document.getElementById('modal-accept');
  modalAcceptButton.addEventListener('click', handleModalAcceptClick);

  var modalHideButtons = document.getElementsByClassName('modal-hide-button');
  for (var i = 0; i < modalHideButtons.length; i++) {
    modalHideButtons[i].addEventListener('click', hideModal);
  }

  //photocard elem using templates
  // var photoCardTemplateElem = document.getElementById('photo-card-template');
  // photoCardTemplate = Handlebars.compile(photoCardTemplateElem.innerHTML); //needs to be compiled so it can be called later
});

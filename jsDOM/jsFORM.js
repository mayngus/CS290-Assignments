var allWords = [];
var currentWord = 0;


//Gets words everytime they're changed
function handleWordsChange(event) {
	var wordsText = event.currentTarget.value; //Gets value of all text
  allWords = wordsText.replace(/[!"#$%&\\'()\*+,\-\.\/:;<=>?@\[\\\]\^_`{|}~]/g, '').toLowerCase().split(' ');
  currentWord = 0;

  console.log("== words changed:", allWords);
}

function generateWordElem(word, highlightColor) {
  var wordSpan = document.createElement('span');
  wordSpan.classList.add('word');
  wordSpan.textContent = word;

	if(highlightColor){
		wordSpan.classList.add('highlight');
		wordSpan.classList.add(highlightColor)
	}

  return wordSpan;
}

function getHighlightColor() {
	//long way
	// var highlightColor = null;
	// var highlightColorInputs = [
	// 	document.getElementById('highlight-color-red'),
	// 	document.getElementById('highlight-color-green'),
	// 	document.getElementById('highlight-color-blue'),
	// ];
	//
	// highlightColorInputs.forEach(function (input) {
	//
	// 	if(input.checked) {
	// 		highlightColor = input.value;
	// 	}
	// });
	// return highlightColor;

	//square brackets for attributes
	var selectedColorInput = document.querySelector('input[name="highlight-color"]:checked');

	return selectedColorInput.value;
}

//goes through each word
function handleAddWordButtonClick(event) {

  var word = allWords[currentWord];

  if (word) {
    console.log("==Handling add word button clicked:", word);

		var everyNthSelect = document.getElementById('every-nth-select');
		var everyNth = everyNthSelect.value; //returning string by default (text content of option)
		everyNth = parseInt(everyNth);
		console.log("everyNth:", everyNth);

		var highlightColor = null;
		if(!((currentWord + 1) % everyNth)) {
			highlightColor = getHighlightColor();
		}

    var wordElem = generateWordElem(word, highlightColor);
    var container = event.currentTarget.parentNode.parentNode;
    //can use container instead of doucment as we only need childs of container
    var wordsContainer = container.querySelector('.words-container');
    wordsContainer.appendChild(wordElem);

    currentWord = (currentWord + 1) % allWords.length;
  }

}

function handleWordsContainerClick(event) {

  var wordsContainer = event.currentTarget;
  var clickedElem = event.target;

	if (clickedElem.classList.contains('word')) {
			// wordsContainer.remove(clickedElem); //more modern (doesnt work on IE 11)

			wordsContainer.removeChild(clickedElem);
	}

  }


var wordsInput = document.getElementById('words-input');
//GOes off when text box is not in focus
wordsInput.addEventListener('change', handleWordsChange);
//Goes off everysingle letter change
// wordsInput.addEventListener('input', handleWordsChange);

var addWordButtons = document.getElementsByClassName('add-word-button');
for (var i = 0; i < addWordButtons.length; i++) {
	addWordButtons[i].addEventListener('click', handleAddWordButtonClick);
}

var wordsContainers = document.getElementsByClassName('words-container');
for (var i = 0; i < wordsContainers.length; i++) {
	wordsContainers[i].addEventListener('click', handleWordsContainerClick)
}

// choiceOption Variables
var choiceOptionsInput = document.getElementById('choiceOptionsInput');
var choiceOptionsOutput = document.getElementById('choiceOptionsOutput');
var choiceOptionsSubmit = document.getElementById('choiceOptionsSubmit');

// Selection Variables
var selectionSubmit = document.getElementById('selectionSubmit');
var selectionOutput = document.getElementById('selectionOutput');

var choiceOptionsArray = [];
var choiceOptionsExist = false;

var choiceOptionsInputPlaceholderText = 'Enter a few choice options...';

// Debug
var saveArray = document.getElementById("saveArray");
var loadArray = document.getElementById("loadArray");
var clearArray = document.getElementById("clearArray");

// Button bindings
choiceOptionsSubmit.addEventListener('click', function () {
	createChoiceOption(choiceOptionsInput.value);
});

selectionSubmit.addEventListener('click', function () {
	pickChoiceOptionFromList();
});

saveArray.addEventListener('click', function () {
	saveChoiceOptionsArray();
});

loadArray.addEventListener('click', function () {
	loadChoiceOptionsArray();
});

clearArray.addEventListener('click', function () {
	clearChoiceOptionsArray();
});

function createChoiceOption(choiceOptionName) {
	pushChoiceOption(choiceOptionName);
	displayChoiceOption(choiceOptionName);
	resetInput();
}

function pushChoiceOption(choiceOptionName) {
	choiceOptionsArray.push(choiceOptionName);
	if (choiceOptionsExist === false) {
		choiceOptionsExist = true;
	}
}

function displayChoiceOption(choiceOptionName) {
	var choiceOption = document.createElement('li');
	choiceOption.classList.add('choiceOption');
	choiceOption.innerHTML = choiceOptionName;
	choiceOptionsOutput.append(choiceOption);
}

function resetInput() {
	choiceOptionsInput.value = '';
	choiceOptionsInput.setAttribute("placeholder", choiceOptionsInputPlaceholderText);
}

function pickChoiceOptionFromList() {
	if (choiceOptionsExist === true) {
		var selectedchoiceOptionIndex = Math.floor(Math.random() * choiceOptionsArray.length);
		console.log(selectedchoiceOptionIndex);
		selectionOutput.innerHTML = choiceOptionsArray[selectedchoiceOptionIndex];
	} else {
		selectionOutput.innerHTML = 'Add some choice options first!'
	}
}

function saveChoiceOptionsArray() {
	window.localStorage.removeItem("choiceOptions");
	window.localStorage.setItem("choiceOptions", choiceOptionsArray);
}

function loadChoiceOptionsArray() {
	var savedChoiceOptionsArrayString = window.localStorage.getItem("choiceOptions");
	choiceOptionsArray = savedChoiceOptionsArrayString.split(",");
	for (i = 0; i < choiceOptionsArray.length; i++) { 
		displayChoiceOption(choiceOptionsArray[i]);
	}
}

function autoLoadChoiceOptionsArray(){
	var savedChoiceOptionsArrayString = window.localStorage.getItem("choiceOptions");
	if (savedChoiceOptionsArrayString != null) {
		loadChoiceOptionsArray();
	}
}

autoLoadChoiceOptionsArray();

function clearChoiceOptionsArray() {
	window.localStorage.removeItem("choiceOptions");
}
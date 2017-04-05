/**
 * u3162501
 * Personality Quiz
 */



var questions = [{
	ask: "Can you fucking not?",
	answers: [
		'Yes',
		'No'
	]
}, {
	ask: "Do you worry about things?",
	answers: [
		'You\'re an ass',
		'No'
	]
}, {
	ask: "I don't know",
	answers: [
		'You\'re a faggot',
		'No'
	]
}];

var answers = [{

}]


/**
 * Box Variables
 */
var box;
var heading;
var content;
var answers;


/**
 * Question Item
 * Defines each individual quiz
 * @type {function}
 */
var question = new function() {
    this.content = "";
	this.options = [{}];

	return this;
}

/**
 * Quiz Item
 * Quizes contain questions and allows for a more OOP based quiz
 * @type {function}
 */
var quiz = new function() {
	this.questions = questions;

	this.displayQuestion = function(index) {
		var questionToDisplay = questions[index];
		if(questionToDisplay != null) {
			heading.innerHTML = "Question " + (index + 1);
			content.innerHTML = questionToDisplay.ask;
			answers.innerHTML = ""
			for(var i = 0; i < questionToDisplay.answers.length; i++) {
				answers.innerHTML += '<button class="answer" onClick="quiz.displayQuestion(' + (index+1) + ')">' + questionToDisplay.answers[i] + '</button>'
			}
		}
	}
}


/* ------------------ */


/**
 * The initalisation function
 * Starts the Quiz
 * @type {function}
 * @return {[type]} [description]
 */
function init() {
	// Set Dom Variables
	querySetDOMElements();
	quiz.displayQuestion(0);
}



/**
 * Set all variables to their element ID
 */
function querySetDOMElements() {
	box = document.querySelector("#box");
	heading = box.querySelector("h1");
	content = box.querySelector("p");
	answers = box.querySelector(".answers");
}

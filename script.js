/**
* u3162501
* Personality Quiz
* JS&F Semester 1 / 2017
*/


// Questions
var questions = [{
	ask: "Would you consider yourself social?",
	answers: [
		{
			text: 'Yes',
			attributes: {
				happiness: 2,
				selfish: 0,
				lonelyness: -1,
			}
		},
		{
			text: 'No',
			attributes: {
				happiness: -1,
				lonelyness: 1,
			}
		}
	],
}];

var attributes = {
	happiness: 0,
	lonelyness: 0,
	selfish: 0,
	perfectionist: 0,
	optimist: 0
}

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
* Class of each individual question
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

	/**
	 * nextQuestion Function
	 * The onClick Handler for each answer
	 * @param  {int} qi    Selected Answer index
	 * @param  {int} index Index of next question
	 */
	this.nextQuestion = function(qi, index) {
		/* Save question answer */
		/* Index Minus One is the current question, as index
		   specifies the next question */
		this.saveQuestion(qi, index - 1)

		/* Display the next question */
		this.displayQuestion(index)
	}

	/**
	 * Display Question Function
	 * @param  {Integer} index
	 */
	this.displayQuestion = function(index) {
		/* Display the next question */
		var questionToDisplay = questions[index];
		if(questionToDisplay != null) {
			heading.innerHTML = "Question " + (index + 1);
			content.innerHTML = questionToDisplay.ask;
			answers.innerHTML = ""
			for(var i = 0; i < questionToDisplay.answers.length; i++) {
				answers.innerHTML += '<button class="answer" onClick="quiz.nextQuestion(' + i + ', ' + (index+1) + ')">' + questionToDisplay.answers[i].text + '</button>'
			}
		} else {
			heading.innerHTML = "Answer";
			content.innerHTML = "Answer"
			answers.innerHTML = '<button class="reset" onClick="quiz.resetQuiz()">Reset Quiz</button>'
		}
	}

	this.saveQuestion = function(qi, index) {
		/* The question in question */
		/* Ha, Ha. See what I did there? */
		var qiq = this.questions[index];
		var answer = qiq.answers[qi];
		for(var attr in answer.attributes) {
			attributes[attr] += answer.attributes[attr];
		}
		console.log(attributes)
	}

	this.resetQuiz = function() {
		for(var attr in attributes) {
			attributes[attr] = 0;
		}
		this.displayQuestion(0);
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

/**
 * u3162501
 * Personality Quiz
 * JS&F Semester 1 / 2017
 */


/**
 * Questions
 * Lists all the questions and their answers,
 * and the attributes those answers convey
 * @type {Array}
 */
var questions = [{
        ask: "Would you consider yourself social?",
        answers: [{
                text: 'Yes',
                attributes: {
                    happiness: 2,
                    optimist: 1,
                    lonelyness: -1,
                }
            },
            {
                text: 'No',
                attributes: {
                    happiness: -1,
                    lonelyness: 1,
                    optimist: -1
                }
            }
        ],
    },
    {
        ask: "Are you open to new experiences?",
        answers: [{
                text: 'Yes',
                attributes: {
                    optimist: 2,
                    happiness: 1,
                    lonelyness: -1,
                }
            },
            {
                text: 'No',
                attributes: {
                    optimist: -2,
                    happiness: -1,
                    lonelyness: 1,
                }
            }
        ],
    },
    {
        ask: "Do unfinished things bother you?",
        answers: [{
                text: 'Yes',
                attributes: {
                    perfectionist: 5,
                    optimist: -1
                }
            },
            {
                text: 'No',
                attributes: {
                    perfectionist: -2,
                    optimist: 1
                }
            },
            {
                text: 'Sometimes',
                attributes: {
                    perfectionist: 2,
                    happiness: 2,
                    optimist: 1
                }
            },
        ],
    },
    {
        ask: "Do you see yourself as dependable, self-disciplined?",
        answers: [{
                text: 'Yes',
                attributes: {
                    perfectionist: 2,
                    optimist: 2,
                    happiness: 2,
                    selfish: 1,
                }
            },
            {
                text: 'No',
                attributes: {
                    perfectionist: -2,
                    optimist: -1,
                    happiness: -1,
                }
            }
        ],
    },
    {
        ask: "Do you believe that 42 is the answer to life, the universe and everyting?",
        answers: [{
                text: 'Yes',
                attributes: {
                    optimist: -2,
                    happiness: 5
                }
            },
            {
                text: 'No',
                attributes: {
                    optimist: 2,
                    happiness: 1
                }
            },
            {
                text: 'What?',
                attributes: {
                    selfish: 1,
                    happiness: -2
                }
            }
        ],
    },
    {
        ask: "Do you watch the Big Bang theory?",
        answers: [{
                text: 'No',
                attributes: {
                    happiness: 1
                }
            },
            {
                text: 'No',
                attributes: {
                    lonelyness: 1,
                    happiness: 1
                }
            },
        ],
    }
];


/**
 * All possible attributes
 * These are added up at the end to find out the correct answer
 * @type {Object}
 */
var attributes = {
    happiness: 0,
    lonelyness: 0,
    selfish: 0,
    perfectionist: 0,
    optimist: 0
}

/**
 * Attribute descriptions
 * @type {Object}
 */
var attributesDescriptions = {
    happiness: ["happy", "You probably surround youself with other happy people."],
    lonelyness: ["lonely", "You're probably pretty lonely given your responses."],
    selfish: ["selfish", "I'm serious, you should probably get a mirror or something."],
    perfectionist: ["perfectionistic", "You've probably got your thoughts ordered by hue, contrast and alphabetically."],
    optimist: ["omtimistic", "Life's currently looking pretty good for you eh? Just you wait, life is waiting around that corner with a baseball bat and a bad attitude. Have your towel with you at all times, and DON'T PANIC."]
}


/**
 * DOM Variables
 */
var box;
var heading;
var content;
var answers;

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

        // Set the next question in a variable
        var questionToDisplay = questions[index];

		// If the question exists,
		// then get the question data
        if (questionToDisplay != null) {

			// Set the question number and heading
            heading.innerHTML = "Question " + (index + 1);

			// Set the question text
            content.innerHTML = questionToDisplay.ask;

			// Clear the answers in preparation for
			// inserting answer buttons
            answers.innerHTML = ""

			// For each possible answer loop
            for (var i = 0; i < questionToDisplay.answers.length; i++) {
				// Make a button for each answer
				// Each button has an onClick event to
				// capture the answer index
                answers.innerHTML += '<button class="answer" onClick="quiz.nextQuestion(' + i + ', ' + (index + 1) + ')">' + questionToDisplay.answers[i].text + '</button>'
            }
		// If there is no next question that exists
		// Let's set the answers
        } else {

			// Sort the accumulated attributes
			// This is done by converting to array, and sorting by subtraction
			// b - a to get descending
			// a - b to get ascending
            var attrSorted = Object.keys(attributes).sort(function(a, b) {
                return this.attributes[b] - this.attributes[a]
            })

			// Get the top attribute and attribute description from
			// the
            var personality = attributesDescriptions[attrSorted[0]][0];
            var description = attributesDescriptions[attrSorted[0]][1];

			// Set the heading content
            heading.innerHTML = "Answer";

			// Set the paragraph content
            content.innerHTML = "After taking this quiz, your look pretty " + personality + ". " + description + " But what do I know, I'm just a quiz";

			// Set a reset button to reset the quiz
			// Done with a "resetQuiz" function
            answers.innerHTML = '<button class="reset" onClick="quiz.resetQuiz()">Reset Quiz</button>'
        }
    }

	/**
	 * Save Question Function
	 * @param  {integer} qi    Answer Index
	 * @param  {integer} index Index of Question
	 */
    this.saveQuestion = function(qi, index) {

        /* The question in question */
        /* Ha, Ha. See what I did there? */
        var qiq = this.questions[index];

		// The answer is the index of the clicked button
        var answer = qiq.answers[qi];

		//
		// This is probably the most complex loop in the whole script
		// For each attribute in the answer's attribute, get the name
		// of the attribute, go to that same index in the global
		// attribute variable, and add the value of the answer's
		// attribute value to that of the global variable.
		//
		// So when		answer.attribute = { happiness: -2 }
		// and 			attributes = { happiness: 3 }
		//
		// add one to the other so:
		//
		// 				attributes = { happiness: 1 }
		//
        for (var attr in answer.attributes) {
            attributes[attr] += answer.attributes[attr];
        }
    }

	/**
	 * Reset Quiz function
	 * Exists to reset variables and set the quiz
	 * question to the first one
	 */
    this.resetQuiz = function() {

		// For each attribute
        for (var attr in attributes) {
			// Reset the attribute to zero
            attributes[attr] = 0;
        }
		// Display the first question
        this.displayQuestion(0);
    }
}


/* ------------------ */


/**
 * The initalisation function
 * Starts the Quiz
 * @type {function}
 */
function init() {

    // Set Dom Variables
    querySetDOMElements();

	// Display the first question
    quiz.displayQuestion(0);
}



/**
 * Set all variables to their element ID
 */
function querySetDOMElements() {
	// querySelector is like getElementById, but more like jQuery.
    box = document.querySelector("#box");
    heading = box.querySelector("h1");
    content = box.querySelector("p");
    answers = box.querySelector(".answers");
}

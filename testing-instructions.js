function displayTestingInstructions() {
	d3.select('body').html(testingInstructionsHTML);
	setupFinishedReadingTestingInstructionsButtonListener();
}

function teardownTestingInstructions() {
	d3.select('#instructions').remove();
}

function setupFinishedReadingTestingInstructionsButtonListener() {
	d3.select('#advance')
		.on('click', function() {
			teardownTestingInstructions();
			initializePhaseTwo();
		});
}

var testingInstructionsHTML = "" +
	"<div id='instructions'>" +
		"<p>" +
			"You will now see arrangements of blocks and it is your job to decide if each one is a Tog or not. Respond by clicking \"Yes\" or \"No\" to each arrangement." +
		"</p>" +
		"<div id='advanceButtonDiv'>" +
  		"<button style='margin-top: 2%; margin-left: 2%; width: 30%; height: 4%; float: right;' id='advance'>Next</button>" +
  	"</div>"
	"</div>";
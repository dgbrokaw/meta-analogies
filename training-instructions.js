function displayTrainingInstructions() {
	d3.select('body').html(trainingInstructionsHTML);
	setupFinishedReadingTrainingInstructionsButtonListener();
}

function teardownTrainingInstructions() {
	d3.select('#instructions').remove();
}

function setupFinishedReadingTrainingInstructionsButtonListener() {
	d3.select('#advance')
		.on('click', function() {
			teardownTrainingInstructions();
			initializePhaseOne();
			collectPhaseOneData('start');
		});
}

var trainingInstructionsHTML = "" +
	"<div id='instructions'>" +
		"<p>" +
			"Today you will see arrangements of blocks created by the Pintox culture. The Pintox culture has a name for arranging objects in a certain way; these arrangements are known as \"Togs.\" Your job is to learn as much as you can about what makes a Tog a Tog.  Keep in mind, training will be short and you will be tested on your knowledge of Togs later, so make the most of training!" +
		"</p>" +
		"<p>" +
			"On each training trial, you will see two sets of blocks contained by a border (one on the left and one on the right). Both left and right sets contain a Tog. To learn what makes a Tog a Tog, you may find it helpful to look at the two sets together." +
		"</p>" +
		"<p>" +
			"In addition to comparing the two sets you will be given the opportunity to interact with the left set (refer to the paper cheat sheet about ways you can change the left set). When the border around the set is green, it indicates that a Tog is present; when the border is red, a Tog is <strong>not</strong> present. By changing the location, color, and size of the blocks -- and seeing what makes the border turn green/red -- you can check to see what defines a Tog. When you find something that is important to being a Tog, keep searching for other things! Try to find as many things that are important to being a Tog as you can." +
		"</p>" +
		"<p>" +
			"After you feel you have learned as much as you can from the trial you are on, move on to the next trial by clicking \"Next example.\"  There will only be three trials, so make the most of each of them! When you are ready, click \"Next\" to begin." +
		"</p>" +
		"<div id='advanceButtonDiv'>" +
  		"<button style='margin-top: 2%; margin-left: 2%; width: 30%; height: 4%; float: right;' id='advance'>Next</button>" +
  	"</div>"
	"</div>";
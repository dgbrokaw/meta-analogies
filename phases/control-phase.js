var ControlPhase = function(stimuli, settings) {
	this.initSettings(settings);

	this.board = new Board(this.settings.boardArrangement, this.settings);

	this.initRockSettings(stimuli);
}
asGamePhase.call(ControlPhase);

phases['control'] = ControlPhase;

ControlPhase.defaultSettings = {
	boardArrangement: [ ['margin', 'rockZone', 'margin']
										, ['button', 'margin', 'button'] ]

, rockZone1ContentType: 'png' // 'code'

, buttonHeight: 150
, buttonWidth: 600

, correctPositiveResponse: 'Correct, this is a Tog.'
, incorrectPositiveResponse: 'No, this is not a Tog.'
, correctNegativeResponse: 'Correct, this is not a Tog.'
, incorrectNegativeResponse: 'Incorrect, this is a Tog.'

, button1Text: 'Not a Tog'
, button2Text: 'Tog'
}

ControlPhase.prototype.initSettings = function(settings) {
	var settings = settings || {};

  var defaults = tools.deepCopy(phases.defaultSettings);
  defaults = tools.extend(defaults, ControlPhase.defaultSettings || {});

	this.settings = tools.extend(defaults, settings);
}

ControlPhase.prototype.initRockSettings = function(stimuli) {
	this.stimuli = stimuli;

	var temp = this.settings;
	temp.smallRockDimension = temp.baseRockDimension;
	temp.mediumRockDimension = temp.baseRockDimension * temp.mediumSizeMultiplier;
	temp.largeRockDimension = temp.baseRockDimension * temp.largeSizeMultiplier;

	this.collection = new RockCollection(this.settings);
}

ControlPhase.prototype.start = function() {
	this.board.initElements();

	this.setupNoButton();
	this.setupYesButton();

	this.currentStateSatisfiesCategory = false;

	this.stimuli.shuffle();

	this.t1 = Date.now();
	this.setupImage(this.board.positions[0][1], this.stimuli.getNextStimulus().file);

	this.events.start();
}

ControlPhase.prototype.setupNoButton = function() {
	var button = d3.select('#button0');
	button.select('text').text(this.settings.button1Text).attr('transform', 'translate(75, -10)');
	button.on('click', this.clickNo.bind(this));
}

ControlPhase.prototype.clickNo = function() {
	if (this.givingFeedback) return;
	this.responseGiven(false);
}

ControlPhase.prototype.setupYesButton = function() {
	var button = d3.select('#button1');
	button.select('text').text(this.settings.button2Text).attr('transform', 'translate(120, -10)');
	button.on('click', this.clickYes.bind(this));
}

ControlPhase.prototype.clickYes = function() {
	if (this.givingFeedback) return;
	this.responseGiven(true);
}

ControlPhase.prototype.responseGiven = function(response) {
	this.t2 = Date.now();
	var phase = this;
	this.collectData(response);
	this.givingFeedback = true;
	this.displayFeedback(response);
	setTimeout(function() {
		var nextStimulus = phase.stimuli.getNextStimulus();
		d3.select('#feedback').remove();
		phase.givingFeedback = false;
		if (nextStimulus) {
			this.t1 = Date.now();
			phase.clearImage();
			phase.setupImage(phase.board.positions[0][1], nextStimulus.file);
		} else {
			phase.teardown();
			phase.events.end(phase.phaseNum);
		}
	}, 2500);
}

ControlPhase.prototype.displayFeedback = function(response) {
	var phase = this;
	var feedbackBox = d3.select('#board').append('svg')
											.attr('id', 'feedback')
											.attr('x', phase.board.settings.boardWidth*2/5)
											.attr('y', phase.board.settings.boardHeight*2/5)

	feedbackBox.append('rect')
  	.style({ 'width': phase.board.settings.buttonWidth*1/2
  				 , 'height': phase.board.settings.buttonHeight*1/2
  				 , 'stroke': 'black'
  				 , 'stroke-width': '6'
  				 , 'fill': 'white' });

	var answerIsCorrect = response===this.stimuli.getCurrentStimulus().answer;
	if (answerIsCorrect && response===true)
		feedbackBox.append('text').text(this.settings.correctPositiveResponse).attr('transform', 'translate(60, 35)');
	else if (answerIsCorrect && response===false)
		feedbackBox.append('text').text(this.settings.correctNegativeResponse).attr('transform', 'translate(60, 35)');
	else if (!answerIsCorrect && response===true)
		feedbackBox.append('text').text(this.settings.incorrectPositiveResponse).attr('transform', 'translate(60, 35)');
	else if (!answerIsCorrect && response===false)
		feedbackBox.append('text').text(this.settings.incorrectNegativeResponse).attr('transform', 'translate(60, 35)');
}

ControlPhase.prototype.collectData = function(response) {
	var dataRow = new Row();

	var currentStimulus = this.stimuli.getCurrentStimulus();

	// dataRow.subjectID = game.getSubjectID();
	dataRow.phase = 'control';
	dataRow.trialNum = this.stimuli.currentStimulus;

	for (var descriptor in currentStimulus.description) {
		dataRow[descriptor] = currentStimulus.description[descriptor];
	}
	dataRow.stimInformation = currentStimulus.code;

	dataRow.response = response;
	dataRow.accuracy = response === currentStimulus.answer ? 1 : 0;
	dataRow.reaction = this.t2 - this.t1;

	console.log(dataRow);
	this.events.data(dataRow);
}
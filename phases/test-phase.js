var TestPhase = function(stimuli, settings) {
	this.initSettings(settings);

	this.board = new Board(this.settings.boardArrangement, this.settings);

	this.initRockSettings(stimuli);
}
asGamePhase.call(TestPhase);

phases['test'] = TestPhase;

TestPhase.defaultSettings = {
	boardArrangement: [ ['margin', 'rockZone', 'margin']
										, ['button', 'margin', 'button'] ]

, rockZone1ContentType: 'png' // 'code'

, buttonHeight: 150
, buttonWidth: 600
, incorrectColor: 'rgb(112,112,112)'

, button1Text: 'Not a Tog'
, button2Text: 'Tog'
}

TestPhase.prototype.initSettings = function(settings) {
	var settings = settings || {};

  var defaults = tools.deepCopy(phases.defaultSettings);
  defaults = tools.extend(defaults, TestPhase.defaultSettings || {});

	this.settings = tools.extend(defaults, settings);
}

TestPhase.prototype.initRockSettings = function(stimuli) {
	this.stimuli = stimuli;

	var temp = this.settings;
	temp.smallRockDimension = temp.baseRockDimension;
	temp.mediumRockDimension = temp.baseRockDimension * temp.mediumSizeMultiplier;
	temp.largeRockDimension = temp.baseRockDimension * temp.largeSizeMultiplier;

	this.collection = new RockCollection(this.settings);
}

TestPhase.prototype.start = function() {
	this.board.initElements();

	this.setupNoButton();
	this.setupYesButton();

	this.currentStateSatisfiesCategory = false;

	this.stimuli.shuffle()

	this.t1 = Date.now();
	this.setupImage(this.board.positions[0][1], this.stimuli.getNextStimulus().file);

	this.events.start();
}

TestPhase.prototype.setupNoButton = function() {
	var button = d3.select('#button0');
	button.select('text').text(this.settings.button1Text).attr('transform', 'translate(75, -10)');
	button.on('click', this.clickNo.bind(this));
}

TestPhase.prototype.clickNo = function() {
	this.responseGiven(false);
}

TestPhase.prototype.setupYesButton = function() {
	var button = d3.select('#button1');
	button.select('text').text(this.settings.button2Text).attr('transform', 'translate(120, -10)');
	button.on('click', this.clickYes.bind(this));
}

TestPhase.prototype.clickYes = function() {
	this.responseGiven(true);
}

TestPhase.prototype.responseGiven = function(response) {
	this.t2 = Date.now();
	var phase = this;
	this.collectData(response);
	var nextStimulus = this.stimuli.getNextStimulus();
	if (nextStimulus) {
		this.t1 = Date.now();
		this.clearImage();
		this.setupImage(this.board.positions[0][1], nextStimulus.file);
	} else {
		phase.teardown();
		phase.events.end(phase.phaseNum);
	}
}

TestPhase.prototype.collectData = function(response) {
	var dataRow = new Row();

	var currentStimulus = this.stimuli.getCurrentStimulus();

	// dataRow.subjectID = game.getSubjectID();
	dataRow.phase = 'test';
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
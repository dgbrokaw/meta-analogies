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
	this.stimuli = stimuli.stimuli;
	this.answers = stimuli.answers;

	var temp = this.settings;
	temp.smallRockDimension = temp.baseRockDimension;
	temp.mediumRockDimension = temp.baseRockDimension * temp.mediumSizeMultiplier;
	temp.largeRockDimension = temp.baseRockDimension * temp.largeSizeMultiplier;

	this.collection = new RockCollection(this.settings);

	if (this.settings.rockZone1ContentType === 'code') {
		this.stimuli = this.stimuli.map(this.parseRockCode);
	}

	// for (var i=0; i<this.stimuli.length; i++) {
	// 	var stimulus = this.stimuli[i].rocks;
	// 	for (var j=0; j<stimulus.length; j++) {
	// 		var rock = stimulus[j];
	// 		rock.x += this.board.positions[0][1][0]; // [0][1] is the location of the rock zone it the board arrangement
	// 		rock.y += this.board.positions[0][1][1];
	// 	}
	// }
}

ControlPhase.prototype.start = function() {
	this.board.initElements();

	this.setupNoButton();
	this.setupYesButton();

	this.currentStimulus = 0;
	this.currentStateSatisfiesCategory = false;

	this.stimuli = tools.shuffle(this.stimuli);
	console.log(this.stimuli);

	if (this.settings.rockZone1ContentType === 'code') {
		this.collection.extendCollection(this.stimuli[this.currentStimulus]);
		this.setupRocks();
	} else {
		console.log('hi', this.board.positions[0][1], this.stimuli[this.currentStimulus])
		this.clearImage();
		this.setupImage(this.board.positions[0][1], this.stimuli[this.currentStimulus]);
	}

	this.events.start();
}

ControlPhase.prototype.setupNoButton = function() {
	var button = d3.select('#button0');
	button.select('text').text(this.settings.button1Text).attr('transform', 'translate(75, -10)');
	button.on('click', this.clickNo.bind(this));
}

ControlPhase.prototype.clickNo = function() {
	if (this.givingFeedback) return;
	this.responseGiven("no");
}

ControlPhase.prototype.setupYesButton = function() {
	var button = d3.select('#button1');
	button.select('text').text(this.settings.button2Text).attr('transform', 'translate(120, -10)');
	button.on('click', this.clickYes.bind(this));
}

ControlPhase.prototype.clickYes = function() {
	if (this.givingFeedback) return;
	this.responseGiven("yes");
}

ControlPhase.prototype.createPhaseTwoRockGroupSelection = function(rock) {
	var board = d3.select('#board');
	var d = rock.getData();
	var rockGroup = board.append('g')
										.datum(d)
										.attr('id', rock.getID()+'group');
	return rockGroup;
}

ControlPhase.prototype.createPhaseTwoRockSelection = function(rock, group) {
	var phase = this;
	if (!rock.getData().w) {
		console.log(rock.getData());
	}
	var r = group.append('rect')
						.attr('id', rock.getID())
						.attr('x', function(d) { return d.x })
						.attr('y', function(d) { return d.y })
						.attr('width', function(d) { return d.w })
						.attr('height', function(d) { return d.h })
						.style('fill', function(d) { return phase.settings.rockColors[d.c] })
						.attr({'stroke-width': 3, 'stroke': (rock.borderColor ? rock.borderColor : 'black'), 'opacity': 1})
		    		.style('fill-opacity', 0.75);
  return r;
}

ControlPhase.prototype.setupRocks = function() {
	var rocks = this.collection.getRocks();
	for (var i=0; i<rocks.length; i++) {
		var rock = rocks[i];
		var groupSelection = this.createPhaseTwoRockGroupSelection(rock);
		var rockSelection = this.createPhaseTwoRockSelection(rock, groupSelection);
		rock.setGroupSelection(groupSelection);
		rock.setRockSelection(rockSelection);
	}
}

ControlPhase.prototype.responseGiven = function(response) {
	var phase = this;
	this.collectData(response);
	this.givingFeedback = true;
	this.displayFeedback(response);
	setTimeout(function() {
		phase.currentStimulus++;
		phase.collection.clearCollection();
		d3.select('#feedback').remove();
		phase.givingFeedback = false;
		if (phase.currentStimulus<phase.stimuli.length) {
			if (phase.settings.rockZone1ContentType === 'code') {
				phase.collection.extendCollection(phase.stimuli[phase.currentStimulus]);
				phase.setupRocks();
			} else {
				phase.clearImage();
				phase.setupImage(phase.board.positions[0][1], phase.stimuli[phase.currentStimulus]);
			}
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

	var answerIsCorrect = response===this.answers[this.currentStimulus];
	if (answerIsCorrect && response==='yes')
		feedbackBox.append('text').text(this.settings.correctPositiveResponse).attr('transform', 'translate(60, 35)');
	else if (answerIsCorrect && response==='no')
		feedbackBox.append('text').text(this.settings.correctNegativeResponse).attr('transform', 'translate(60, 35)');
	else if (!answerIsCorrect && response==='yes')
		feedbackBox.append('text').text(this.settings.incorrectPositiveResponse).attr('transform', 'translate(60, 35)');
	else if (!answerIsCorrect && response==='no')
		feedbackBox.append('text').text(this.settings.incorrectNegativeResponse).attr('transform', 'translate(60, 35)');
}

ControlPhase.prototype.collectData = function(response) {
	var d = new Date();
	var dataRow = new Row();

	// dataRow.subjectID = game.getSubjectID();
	dataRow.date = d.toDateString();
	dataRow.t = d.toTimeString();
	dataRow.phase = 'test';
	dataRow.phaseNum = this.phaseNum;
	dataRow.stimulusNum = this.stimuli[this.currentStimulus].stimulusNum;
	dataRow.userRocks = null;
	dataRow.userAction = response;
	dataRow.userCorrect = response===this.answers[this.currentStimulus];

	console.log(dataRow);
	this.events.data(dataRow);
}
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
	this.stimuli = stimuli.stimuli;

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

TestPhase.prototype.start = function() {
	this.board.initElements();

	this.setupNoButton();
	this.setupYesButton();

	this.currentStimulus = 0;
	this.currentStateSatisfiesCategory = false;

	this.stimuli = tools.shuffle(this.stimuli);

	if (this.settings.rockZone1ContentType === 'code') {
		this.collection.extendCollection(this.stimuli[this.currentStimulus]);
		this.setupRocks();
	} else {
		this.clearImage();
		this.setupImage(this.board.positions[0][1], this.stimuli[this.currentStimulus]);
	}

	this.events.start();
}

TestPhase.prototype.setupNoButton = function() {
	var button = d3.select('#button0');
	button.select('text').text(this.settings.button1Text).attr('transform', 'translate(75, -10)');
	button.on('click', this.clickNo.bind(this));
}

TestPhase.prototype.clickNo = function() {
	this.responseGiven("no");
}

TestPhase.prototype.setupYesButton = function() {
	var button = d3.select('#button1');
	button.select('text').text(this.settings.button2Text).attr('transform', 'translate(120, -10)');
	button.on('click', this.clickYes.bind(this));
}

TestPhase.prototype.clickYes = function() {
	this.responseGiven("yes");
}

TestPhase.prototype.createPhaseTwoRockGroupSelection = function(rock) {
	var board = d3.select('#board');
	var d = rock.getData();
	var rockGroup = board.append('g')
										.datum(d)
										.attr('id', rock.getID()+'group');
	return rockGroup;
}

TestPhase.prototype.createPhaseTwoRockSelection = function(rock, group) {
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

TestPhase.prototype.setupRocks = function() {
	var rocks = this.collection.getRocks();
	for (var i=0; i<rocks.length; i++) {
		var rock = rocks[i];
		var groupSelection = this.createPhaseTwoRockGroupSelection(rock);
		var rockSelection = this.createPhaseTwoRockSelection(rock, groupSelection);
		rock.setGroupSelection(groupSelection);
		rock.setRockSelection(rockSelection);
	}
}

TestPhase.prototype.responseGiven = function(response) {
	var phase = this;
	this.collectData(response);
	phase.currentStimulus++;
	phase.collection.clearCollection();
	if (phase.currentStimulus<phase.stimuli.length) {
		if (this.settings.rockZone1ContentType === 'code') {
			phase.collection.extendCollection(phase.stimuli[phase.currentStimulus]);
			phase.setupRocks();
		} else {
			this.clearImage();
			this.setupImage(this.board.positions[0][1], this.stimuli[this.currentStimulus]);
		}
	} else {
		phase.teardown();
		phase.events.end(phase.phaseNum);
	}
}

TestPhase.prototype.collectData = function(response) {
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
	dataRow.userCorrect = response===this.stimuli[this.currentStimulus].answer;

	console.log(dataRow);
	this.events.data(dataRow);
}
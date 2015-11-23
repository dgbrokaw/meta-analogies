// The InteractionPhase is a board containing one (or two) workspaces that
// will react to whether the contents of that workspace contains elements
// that are arranged according to a specified ruleset.  The elements are rocks
// that are initialized in the reactive workspace as well as others outside of
// the workspace that can be freely used.

// See the list of default settings for settings that can be customized.
// "Category" is the name of the category with which the workspace will be evaluated.

var InteractionPhase = function(stimuli, settings) {
	this.initSettings(settings);

	this.board = new Board(this.settings.boardArrangement, this.settings);

	this.initRockSettings(stimuli);

	this.category = new categories[stimuli.category](this.settings);
}
asGamePhase.call(InteractionPhase);

phases['interaction'] = InteractionPhase;

InteractionPhase.defaultSettings = {
	boardArrangement: [ ['margin']
										,	['bench', 'rockZone']
									 	, ['button', 'margin', 'button', 'margin', 'button'] ]
	// boardArrangement: [ ['bench', 'rockZone']
	// 								 	, ['button', 'button'] ]

, rockZone1ContentType: 'code' // 'png' // this setting does nothing currently, it's always code

, correctTextResponse: 'This is a Tog!'
, incorrectTextResponse: 'This is not a Tog.'

, button0Text: 'Back'
, button1Text: 'Refresh'
, button2Text: 'Next'
}

InteractionPhase.prototype.initSettings = function(settings) {
	var settings = settings || {};

  var defaults = tools.deepCopy(phases.defaultSettings);
  defaults = tools.extend(defaults, InteractionPhase.defaultSettings || {});

	this.settings = tools.extend(defaults, settings);
}

InteractionPhase.prototype.initRockSettings = function(stimuli) {
	this.benchRocks = stimuli.benchRocks;
	this.stimuli = stimuli.stimuli;

	var temp = this.settings;
	temp.smallRockDimension = temp.baseRockDimension;
	temp.mediumRockDimension = temp.baseRockDimension * temp.mediumSizeMultiplier;
	temp.largeRockDimension = temp.baseRockDimension * temp.largeSizeMultiplier;

	this.collection = new RockCollection(this.settings);

	// this.stimuli = this.stimuli.map(this.parseRockCode);

	for (var i=0; i<this.stimuli.length; i++) {
		// var stimulus = this.stimuli[i];
		var stimulus = this.stimuli[i].rocks;
		for (var j=0; j<stimulus.length; j++) {
			var rock = stimulus[j];
			rock.x += this.board.positions[1][1][0]; // [1][1] is the location of the rock zone it the board arrangement
			rock.y += this.board.positions[1][1][1];
		}
	}

	this.selectedRock = null;
}

InteractionPhase.prototype.start = function(stimuli, settings) {
	this.board.initElements();

	this.setupBackButton();
	this.setupRefreshButton();
	this.setupNextButton();

	this.currentStimulus = 0;
	this.currentStateSatisfiesCategory = false;

	this.stimuli = shuffle(this.stimuli);
	// this.collection.extendCollection(this.stimuli[this.currentStimulus]);
	this.collection.extendCollection(this.benchRocks);
	this.collection.extendCollection(this.stimuli[this.currentStimulus].rocks);
	this.setupRocks();

	this.events.start();
}

InteractionPhase.prototype.setupBackButton = function() {
	var button = d3.select('#button0');
	button.select('text').text(this.settings.button0Text);
	button.on('click', this.clickBack.bind(this));
}

InteractionPhase.prototype.clickBack = function() {
	if (this.currentStimulus <= 0) return;
	if (this.currentStimulus === this.stimuli.length-1)
		d3.select('#button2').select('text').text('Next')
	this.collectPhaseOneData('back');
	this.collection.clearCollection();
	this.currentStimulus--;
	// this.collection.extendCollection(this.stimuli[this.currentStimulus]);
	this.collection.extendCollection(this.benchRocks);
	this.collection.extendCollection(this.stimuli[this.currentStimulus].rocks);
	this.setupRocks();
	this.displayUserFeedback();
	this.collectPhaseOneData('start');
}

InteractionPhase.prototype.setupRefreshButton = function() {
	var button = d3.select('#button1');
	button.select('text').text(this.settings.button1Text);
	button.on('click', this.clickRefresh.bind(this));
}

InteractionPhase.prototype.clickRefresh = function() {
	this.collectPhaseOneData('refresh')
	this.collection.clearCollection();
	// this.collection.extendCollection(this.stimuli[this.currentStimulus]);
	this.collection.extendCollection(this.benchRocks);
	this.collection.extendCollection(this.stimuli[this.currentStimulus].rocks);
	this.setupRocks();
	this.displayUserFeedback();
}

InteractionPhase.prototype.setupNextButton = function() {
	var button = d3.select('#button2');
	button.select('text').text(this.settings.button2Text);
	button.on('click', this.clickNext.bind(this));
}

InteractionPhase.prototype.clickNext = function() {
	// if (this.currentStateSatisfiesCategory && this.currentStimulus<trainStimuli.length-1) {
	if (this.currentStimulus<this.stimuli.length-1) {
		this.collectPhaseOneData('next');
		this.collection.clearCollection();
		this.currentStimulus++;
		// this.collection.extendCollection(this.stimuli[this.currentStimulus]);
		this.collection.extendCollection(this.benchRocks);
		this.collection.extendCollection(this.stimuli[this.currentStimulus].rocks);
		this.setupRocks();
		this.displayUserFeedback();
		this.collectPhaseOneData('start');

		if (this.currentStimulus === this.stimuli.length-1) {
			 d3.select('#button2').select('text').text('Done');
		}
	// } else if (this.currentStateSatisfiesCategory) {
	} else {
		var confirmed = confirm('Are you sure?');
		if (confirmed) {
			this.collectPhaseOneData('next');
			this.collection.clearCollection();
			this.teardown();
			this.events.end(this.phaseNum);
		}
	}
}

InteractionPhase.prototype.setupRockDrag = function() {
	var rockDrag = d3.behavior.drag()
	    	.origin(function(d) { return d; })
	    	.on('dragstart', this.rockDragstart.bind(this))
	    	.on('drag', this.rockDragmove.bind(this))
	    	.on('dragend', this.rockDragend.bind(this));
	return rockDrag;
}

InteractionPhase.prototype.setupResizeDrag = function() {
	var resizeDrag = d3.behavior.drag()
				.origin(function(d) { return d; })
				.on('dragstart', this.resizeDragstart.bind(this))
				.on('drag', this.resizeDragmove.bind(this))
				.on('dragend', this.resizeDragend.bind(this));
	return resizeDrag;
}

InteractionPhase.prototype.createRockGroupSelection = function(rock) {
	var board = d3.select('#board');
	var d = rock.getData();
	var rockGroup = board.append('g')
										.datum(d)
										.attr('id', rock.getID()+'group');
	return rockGroup;
}

InteractionPhase.prototype.createRockSelection = function(rock, group, disallowDrag) {
	var phase = this;
	if (!rock.getData().w) {
		console.log(rock.getData())
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
	if (!disallowDrag) r.call(phase.rockDrag);
  return r;
}

InteractionPhase.prototype.createHandleSelection = function(rock, group) {
	var phase = this;
	var h = group.append('rect')
						.attr('id', rock.getID()+'handle')
						.attr('x', function(d) { return d.x+d.w*4/5 })
						.attr('y', function(d) { return d.y+d.h*4/5 })
						.attr('width', function(d) { return d.w*1/5 })
						.attr('height', function(d) { return d.h*1/5 })
						.style('fill', function(d) { return phase.settings.rockColors[d.c] })
						.style('fill-opacity', 0)
						.attr('cursor', 'nwse-resize')
    				.call(phase.resizeDrag);
  return h;
}

InteractionPhase.prototype.setupRocks = function() {
	var rocks = this.collection.getRocks();

	this.rockDrag = this.setupRockDrag();
	this.resizeDrag = this.setupResizeDrag();

	for (var i=0; i<rocks.length; i++) {
		var rock = rocks[i];
		var groupSelection = this.createRockGroupSelection(rock);
		var rockSelection = this.createRockSelection(rock, groupSelection);
		var handleSelection = this.createHandleSelection(rock, groupSelection);
		rock.setGroupSelection(groupSelection);
		rock.setRockSelection(rockSelection);
		rock.setHandleSelection(handleSelection);
		groupSelection.on('dblclick', this.dblclickRock.bind(this))
	}
	this.displayUserFeedback();
}

// InteractionPhase.prototype.setupStimuli() {
// 	var rocks = controlCollection.getRocks();
// 	for (var i=0; i<rocks.length; i++) {
// 		var rock = rocks[i];
// 		var groupSelection = createRockGroupSelection(rock);
// 		var rockSelection = createRockSelection(rock, groupSelection, true);
// 		rock.setGroupSelection(groupSelection);
// 		rock.setRockSelection(rockSelection);
// 	}
// 	displayUserFeedback();
// }

InteractionPhase.prototype.dblclickRock = function(d) {
	var rock = this.collection.getRockByID(d.id);
	this.changeRockColor(rock);
	this.displayUserFeedback();
	this.collectPhaseOneData('color');
}

InteractionPhase.prototype.changeRockColor = function(rock) {
	rock.color = (rock.color+1)%3;
	rock.getRockSelection().style('fill', this.settings.rockColors[rock.color]);
	rock.getHandleSelection().style('fill', this.settings.rockColors[rock.color]);
}

InteractionPhase.prototype.rockDragstart = function(d) {
	var rock_sel = d3.select('#'+d.id);
	this.draggedRock = this.collection.getRockBySelection(rock_sel);
  this.firstUpdate = true;
}

InteractionPhase.prototype.rockDragmove = function(d) {
	if (this.firstUpdate) {
  	firstUpdate = false;
  	d.c = this.draggedRock.color;
	}
	d.x = d3.event.x;
	d.y = d3.event.y;
	this.draggedRock.getRockSelection()
		.attr('x', function(d) { return d.x })
		.attr('y', function(d) { return d.y });
	this.draggedRock.getHandleSelection()
		.attr('x', function(d) { return d.x+d.w*4/5 })
		.attr('y', function(d) { return d.y+d.h*4/5 });
	this.draggedRock.setXY(d.x, d.y);
	this.displayUserFeedback();
}

InteractionPhase.prototype.rockDragend = function(d) {
	this.slideToNonOverlappingPosition(this.draggedRock, d);
	this.displayUserFeedback();
	this.collectPhaseOneData('drag');
}

InteractionPhase.prototype.slideToNonOverlappingPosition = function(draggedRock, data) {
	var slideDirection;
	var overlappingRock
	if (overlappingRock = this.overlappingAnotherRock(draggedRock)) {
		slideDirection = this.slideRockInDirection(draggedRock, data, overlappingRock, slideDirection);
	}
}

InteractionPhase.prototype.overlappingAnotherRock = function(draggedRock) {
	for (var i=0; i<this.collection.numberOfRocks(); i++) {
		var rock = this.collection.rocks[i];
		if (draggedRock.ID!==rock.ID && rectOverlap(draggedRock, rock)) return rock;
	}
	return false;
}

InteractionPhase.prototype.slideRockInDirection = function(draggedRock, data, overlappingRock, slideDirection) {
	var direction = slideDirection;
	slideStat = this.findDirectionAndDistance(draggedRock, overlappingRock, direction);

	var transition;
	switch (slideStat.direction) {
		case 'up':
			var newY = draggedRock.y - slideStat.distance-1;
			data.y = newY;
			transition = draggedRock.getRockSelection()
				.transition()
				.duration(500)
				.ease('exp')
				.attr('y', function(d) { return d.y });
			break;
		case 'right':
			var newX = draggedRock.x + slideStat.distance+1;
			data.x = newX;
			transition = draggedRock.getRockSelection()
				.transition()
				.duration(500)
				.ease('exp')
				.attr('x', function(d) { return d.x });
			break;
		case 'down':
			var newY = draggedRock.y + slideStat.distance+1;
			data.y = newY;
			transition = draggedRock.getRockSelection()
				.transition()
				.duration(500)
				.ease('exp')
				.attr('y', function(d) { return d.y });
			break;
		case 'left':
			var newX = draggedRock.x - slideStat.distance-1;
			data.x = newX;
			transition = draggedRock.getRockSelection()
				.transition()
				.duration(500)
				.ease('exp')
				.attr('x', function(d) { return d.x });
			break;
	}
	draggedRock.setXY(data.x, data.y);

	var overlappingRock2 = this.overlappingAnotherRock(draggedRock);
	var phase = this;
	if (overlappingRock2) {
		setTimeout(function() {
			phase.slideRockInDirection(draggedRock, data, overlappingRock2, slideStat.direction);
		}, 500);
	}

	return direction;
}

InteractionPhase.prototype.findDirectionAndDistance = function(draggedRock, overlappingRock, direction) {
	var stats = {};
	var upDiff = draggedRock.y+draggedRock.height - overlappingRock.y
	   ,leftDiff = draggedRock.x+draggedRock.width - overlappingRock.x
	   ,downDiff = overlappingRock.y+overlappingRock.height - draggedRock.y
	   ,rightDiff = overlappingRock.x+overlappingRock.width - draggedRock.x;
	if (direction) {
		stats.direction = direction;
		switch (direction) {
			case 'up': stats.distance = upDiff; break;
			case 'left': stats.distance = leftDiff; break;
			case 'down': stats.distance = downDiff; break;
			case 'right': stats.distance = rightDiff; break;
		}
	} else {
		var smallestDiff = Math.min(upDiff, Math.min(leftDiff, Math.min(downDiff, rightDiff)));
		stats.distance = smallestDiff
		switch (smallestDiff) {
			case upDiff: stats.direction = 'up'; break;
			case leftDiff: stats.direction = 'left'; break;
			case downDiff: stats.direction = 'down'; break;
			case rightDiff: stats.direction = 'right'; break;
		}
	}
	return stats;
}

InteractionPhase.prototype.resizeDragstart = function(d) {
	this.resizeBox = {};
	var rock_sel = d3.select('#'+d.id);
	var rock = this.collection.getRockBySelection(rock_sel);
	this.resizeBox.rock = rock;
	this.resizeBox.box = this.appendResizeBox(rock);
	this.resizeBox.handle = rock.handle;
	this.resizeBox.handleCoor = [d.x+d.w*4/5, d.y+d.h*4/5];
	this.resizeBox.otherSizes = this.getOtherSizes(rock.size);
	this.resizeBox.offset = 0;
}

InteractionPhase.prototype.resizeDragmove = function(d) {
	var diffX = d3.event.x - d.x
	   ,diffY = d3.event.y - d.y;
	var diff = diffX > diffY ? diffX : diffY;
	this.resizeBox.offset = diff;
	this.resizeBox.handle
		.attr('x', this.resizeBox.handleCoor[0]+this.resizeBox.offset)
		.attr('y', this.resizeBox.handleCoor[1]+this.resizeBox.offset);
	this.resizeBox.box
		.attr('width', this.resizeBox.width+this.resizeBox.offset)
		.attr('height', this.resizeBox.height+this.resizeBox.offset);
	if (!this.resizeBox.previewBox1) {
		this.appendPreviewBoxes(this.resizeBox.rock);
	}
	var newSize;
	if (newSize = this.resizeBoxInRangeOfOtherSize()) {
		this.collection.setRockSize(this.resizeBox.rock, newSize.size);
		d.w = this.resizeBox.rock.dimension;
		d.h = this.resizeBox.rock.dimension;
		this.resizeBox.rock.getRockSelection()
			.attr('width', function(d) { return d.w })
			.attr('height', function(d) { return d.h });
		this.displayUserFeedback();
		this.collectPhaseOneData('resize');
		this.clearPreviewBoxes();
		this.resizeBox.otherSizes = this.getOtherSizes(this.resizeBox.rock.size);
		this.appendPreviewBoxes(this.resizeBox.rock);
		this.resizeBox.offset = 0;
	}
}

InteractionPhase.prototype.resizeDragend = function(d) {
	this.clearPreviewBoxes();
	this.resizeBox.box.remove();
	this.resizeBox.rock.getHandleSelection()
		.attr('x', function(d) { return d.x+d.w*4/5 })
		.attr('y', function(d) { return d.y+d.h*4/5 })
		.attr('width', function(d) { return d.w*1/5 })
		.attr('height', function(d) { return d.h*1/5 });
	delete this.resizeBox;
}

InteractionPhase.prototype.appendResizeBox = function(rock) {
	this.resizeBox.width = rock.dimension;
	this.resizeBox.height = rock.dimension;
	var box = d3.select('#board').append('rect')
		.attr('id', 'resizeBox')
		.attr('x', rock.x)
		.attr('y', rock.y)
		.attr('width', rock.dimension)
		.attr('height', rock.dimension)
		.attr({'stroke-width': 1, 'stroke': 'black'})
		.style({fill: 'none'});
	return box;
}

InteractionPhase.prototype.appendPreviewBoxes = function(rock) {
	var board = d3.select('#board');
	var otherSizes = this.resizeBox.otherSizes;
	var box1 = board.append('rect')
		.attr({x: rock.x, y: rock.y
		      ,width: otherSizes[0].width, height: otherSizes[0].height})
		.attr({'stroke-width': 1, 'stroke': 'black', opacity: 0.5})
		.style({fill: 'none'});
	var box2 = board.append('rect')
		.attr({x: rock.x, y: rock.y
					,width: otherSizes[1].width, height: otherSizes[1].height})
		.attr({'stroke-width': 1, 'stroke': 'black', opacity: 0.5})
		.style({fill: 'none'});
	this.resizeBox.previewBox1 = box1;
	this.resizeBox.previewBox2 = box2;
}

InteractionPhase.prototype.clearPreviewBoxes = function() {
	if (this.resizeBox.previewBox1) {
		this.resizeBox.previewBox1.remove();
		delete this.resizeBox.previewBox1;
	}
	if (this.resizeBox.previewBox2) {
		this.resizeBox.previewBox2.remove();
		delete this.resizeBox.previewBox2;
	}
}

InteractionPhase.prototype.getOtherSizes = function(size) {
	var small = this.getSizeDimensions('small')
	   ,medium = this.getSizeDimensions('medium')
	   ,large = this.getSizeDimensions('large');
	switch (size) {
		case 'small':
			return [medium, large];
		case 'medium':
			return [small, large];
		case 'large':
			return [small, medium];
	}
}

InteractionPhase.prototype.getSizeDimensions = function(size) {
	switch (size) {
		case 'small':
			return {size: 'small', width: this.settings.smallRockDimension, height: this.settings.smallRockDimension};
		case 'medium':
			return {size: 'medium', width: this.settings.mediumRockDimension, height: this.settings.mediumRockDimension};
		case 'large':
			return {size: 'large', width: this.settings.largeRockDimension, height: this.settings.largeRockDimension};
	}
}

InteractionPhase.prototype.resizeBoxInRangeOfOtherSize = function() {
	var width = this.resizeBox.width+this.resizeBox.offset;
	var halfBorderThickness = 3;
	for (var i=0; i<this.resizeBox.otherSizes.length; i++) {
		if (aboutEqual(width, this.resizeBox.otherSizes[i].width, 3))
			return this.resizeBox.otherSizes[i];
	}
	return false
}

InteractionPhase.prototype.displayUserFeedback = function() {
	this.checkUserWindow();
}

InteractionPhase.prototype.checkUserWindow = function() {
	if (this.category.windowSatisfiesCategory('#rockZone0', this.collection)) {
		this.board.setRockZoneStrokeColor('#rockZone0', this.board.settings.correctColor)
		d3.select('#feedback').remove();
		d3.select('#board').insert('text', '#rockZone0')
			.attr('id', 'feedback')
			.attr('x', this.board.positions[0][0][0])
			.attr('y', this.board.positions[0][0][1])
			.text(this.settings.correctTextResponse)
			.style({'font-size': '200%'});
		this.currentStateSatisfiesCategory = true;
		this.board.setButtonColor('#button1', this.board.settings.activeButtonColor);
	} else {
		this.board.setRockZoneStrokeColor('#rockZone0', this.board.settings.incorrectColor);
		d3.select('#feedback').remove();
		d3.select('#board').insert('text', '#rockZone0')
			.attr('id', 'feedback')
			.attr('x', this.board.positions[0][0][0])
			.attr('y', this.board.positions[0][0][1])
			.text(this.settings.incorrectTextResponse);
		this.currentStateSatisfiesCategory = false;
		this.board.setButtonColor('#button1', this.board.settings.inactiveButtonColor);
	}
}

InteractionPhase.prototype.collectPhaseOneData = function(action) {
	// if (action==='color') {
	// 	// to change color, you dblclick, which has the side-effect of two drag events.  discard those extra two rows of data.
	// 	game.deleteLastRow();
	// 	game.deleteLastRow();
	// }
	var d = new Date();
	var dataRow = new Row();

	// dataRow.subjectID = game.getSubjectID();
	dataRow.date = d.toDateString();
	dataRow.t = d.toTimeString();
	dataRow.phase = 'interactive';
	dataRow.phaseNum = this.phaseNum;
	dataRow.stimulusNum = this.stimuli[this.currentStimulus].stimulusNum;
	dataRow.userRocks = codifyUserRockData(this.category.getRocksWithinWindow('#rockZone0', this.collection));
	dataRow.userAction = action;
	dataRow.userCorrect = this.currentStateSatisfiesCategory;

	console.log(dataRow);
	this.events.data(dataRow);
	// game.addRow(dataRow);
}

function codifyUserRockData(rocks) {
	var code = '';
	rocks.forEach(function(rock) {
		code += 'size:' + rock.size + ',' + (rock.borderColor ? 'border,' : '') + 'color:' + rock.color + ',location:(' + rock.x + ',' + rock.y + ');'
	})
	return code;
}

function getURLParameter(name) {
	var val = RegExp(name + '=' + '(.+?)(&|$)').exec(window.location.search);
	return val ? decodeURIComponent(val[1]) : null;
}

function aboutEqual(val1, val2, give) {
	return val1 < val2 + give && val1 > val2 - give;
}

function shuffle(o) {
  o = o.slice();
  for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
  return o;
}
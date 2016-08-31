// The InteractionPhase is a board containing a workspace that
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
	boardArrangement: [ ['margin', 'margin'] // text feedback is placed in the position of the first margin
	                  , ['margin', 'margin'] // text feedback is placed in the position of the first margin
										,	['bench', 'rockZone', 'bench', 'bench', 'bench'] // space on the right is for guidance text
										, ['button', 'margin', 'margin'] ] // space on the right is to push the button to the left

	// simple arrangement:
	// boardArrangement: [ ['bench', 'rockZone']
	// 								 	, ['button', 'button'] ]

, rockZone1ContentType: 'code' // 'png' // this setting does nothing currently, it's always 'code'

, correctTextResponse: ['The display now contains a togging situation!', 'Can you find a new way to break the togging situation?']
, incorrectTextResponse: ['The display now does NOT contain a togging situation...', 'Can you find a new way to make a togging situation?']

, buttonWidth: 600
, buttonText: 'new'

, timeLimit: 7*60
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
		var stimulus = this.stimuli[i].rocks;
		for (var j=0; j<stimulus.length; j++) {
			var rock = stimulus[j];
			rock.x += this.board.positions[2][1][0]; // [2][1] is the location of the rock zone it the board arrangement
			rock.y += this.board.positions[2][1][1];
		}
	}

	this.selectedRock = null;
}

InteractionPhase.prototype.start = function(stimuli, settings) {
	this.board.initElements();

	this.currentStimulus = 0;
	this.currentStateSatisfiesCategory = false;

	this.stimuli = shuffle(this.stimuli);
	this.collection.extendCollection(this.benchRocks);
	this.collection.extendCollection(this.stimuli[this.currentStimulus].rocks);
	this.setupRocks();

	this.setupNewButton();
	this.setupTimer();
	this.setupGuidanceText();

	this.dataQueue = [];
	this.t1 = Date.now();
	this.events.start();
}

InteractionPhase.prototype.setupNewButton = function() {
	var button = d3.select('#button0');
	button.select('text').text(this.settings.buttonText);
	button.on('click', this.clickNew.bind(this));
}

InteractionPhase.prototype.clickNew = function() {
	this.collectPhaseOneData('new');
	this.collection.clearCollection();
	this.currentStimulus = (this.currentStimulus + 1) % this.stimuli.length;
	this.collection.extendCollection(this.benchRocks);
	this.collection.extendCollection(this.stimuli[this.currentStimulus].rocks);
	this.setupRocks();
	this.displayUserFeedback();
	this.collectPhaseOneData('start');
}

InteractionPhase.prototype.setupTimer = function() {
	this.timeRemaining = this.settings.timeLimit;

	var timer = d3.select('#board').append('text')
		.attr('id', 'timer')
		.style({ 'stroke': 'none'
	         , 'font-family': 'sans-serif'
	         , 'font-style': 'bold'
	         , 'font-size': 16 })
		.attr({x: 8, y: 20})
		.text('Time Remaining: ' + this.formatTime(this.timeRemaining));

	var timer_interval_id = setInterval((function() {
		timer.text('Time Remaining: ' + this.formatTime(this.timeRemaining));
		this.timeRemaining--;
		if (this.timeRemaining <= 0) {
			this.endPhaseOne()
			clearInterval(timer_interval_id);
		}
	}).bind(this), 1000);
}

InteractionPhase.prototype.formatTime = function(tot_secs) {
	var mins = ~~(tot_secs / 60)
    , secs = tot_secs % 60;
  return "" + mins + ":" + (secs < 10 ? "0" : "") + secs;
}

InteractionPhase.prototype.setupGuidanceText = function() {
	var x = this.board.positions[2][4][0];

	var text = d3.select('#board').append('text')
		.attr({x: this.board.positions[2][4][0], y: this.board.positions[2][4][1]})
		.style({'font-size': '100%', 'stroke': 'none', 'font-family': 'sans-serif'})

	text.append('tspan').attr({x: x-80, dy: 0}).style({'text-decoration': 'underline', 'font-weight': 'bold', 'text-anchor': 'middle', 'font-size': '64px'}).text('Ways to explore');
	text.append('tspan').attr({x: x-320, dy: 100}).style({'text-anchor': 'start', 'font-size': '32px'}).text('MOVE A BLOCK (click and drag a block)');
	text.append('tspan').attr({x: x-320, dy: 80}).style({'text-anchor': 'start', 'font-size': '32px'}).text('CHANGE A COLOR (double-click a block)');
	text.append('tspan').attr({x: x-320, dy: 80}).style({'text-anchor': 'start', 'font-size': '32px'}).text('CHANGE A SIZE (stretch/shrink a block by');
	text.append('tspan').attr({x: x-300, dy: 40}).style({'text-anchor': 'start', 'font-size': '32px'}).text('dragging from lower right corner)');
	text.append('tspan').attr({x: x-320, dy: 80}).style({'text-anchor': 'start', 'font-size': '32px'}).text('ADD/REMOVE (drag one or more blocks');
	text.append('tspan').attr({x: x-300, dy: 40}).style({'text-anchor': 'start', 'font-size': '32px'}).text('in/out of the exploration area)');
	text.append('tspan').attr({x: x-320, dy: 80}).style({'text-anchor': 'start', 'font-size': '32px'}).text('NEW (click button to get a new Tog to');
	text.append('tspan').attr({x: x-300, dy: 40}).style({'text-anchor': 'start', 'font-size': '32px'}).text('explore)');
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
	var text_line1_position = [this.board.positions[0][0][0], this.board.positions[0][0][1]]
	  , text_line2_position = [this.board.positions[1][0][0], this.board.positions[1][0][1]];

	if (this.category.windowSatisfiesCategory('#rockZone0', this.collection)) {
		this.currentStateSatisfiesCategory = true;

		this.board.setRockZoneStrokeColor('#rockZone0', this.board.settings.correctColor);
		this.board.setButtonColor('#button1', this.board.settings.activeButtonColor);

		d3.selectAll('.feedback').remove();
		this.displayTextFeedback(this.settings.correctTextResponse[0], text_line1_position);
		this.displayTextFeedback(this.settings.correctTextResponse[1], text_line2_position);
	} else {
		this.currentStateSatisfiesCategory = false;

		this.board.setRockZoneStrokeColor('#rockZone0', this.board.settings.incorrectColor);
		this.board.setButtonColor('#button1', this.board.settings.inactiveButtonColor);

		d3.selectAll('.feedback').remove();
		this.displayTextFeedback(this.settings.incorrectTextResponse[0], text_line1_position);
		this.displayTextFeedback(this.settings.incorrectTextResponse[1], text_line2_position);
	}
}

InteractionPhase.prototype.displayTextFeedback = function(text, position) {
	d3.select('#board').insert('text', '#rockZone0')
		.classed('feedback', true)
		.attr('x', position[0])
		.attr('y', position[1])
		.text(text)
		.style({'font-size': '200%', 'text-anchor': 'middle', 'stroke': 'none', 'font-family': 'sans-serif'});
}

// InteractionPhase.prototype.collectPhaseOneData = function(action) {
// 	var dataRow = new Row();
//
// 	// dataRow.subjectID = game.getSubjectID();
//
// 	dataRow.phase = 'interactive';
// 	dataRow.trialNum = this.currentStimulus;
//
// 	dataRow.stimIndex = this.stimuli[this.currentStimulus].stimulusNum;
//
// 	dataRow.rocks = codifyUserRockData(this.category.getRocksWithinWindow('#rockZone0', this.collection));
// 	dataRow.action = action;
// 	dataRow.accuracy = this.currentStateSatisfiesCategory;
// 	dataRow.reaction = Date.now() - this.t1;
// 	dataRow.timeRemaining = this.timeRemaining;
// 	console.log(dataRow.reaction);
//
// 	// console.log(dataRow);
// 	this.events.data(dataRow);
//
// 	this.t1 = Date.now();
// }

InteractionPhase.prototype.collectPhaseOneData = function(action) {
	var dataRow = new Row();

	// dataRow.subjectID = game.getSubjectID();

	dataRow.phase = 'interactive';
	dataRow.trialNum = this.currentStimulus;

	dataRow.stimIndex = this.stimuli[this.currentStimulus].stimulusNum;

	dataRow.rocks = codifyUserRockData(this.category.getRocksWithinWindow('#rockZone0', this.collection));
	dataRow.action = action;
	dataRow.accuracy = this.currentStateSatisfiesCategory;
	dataRow.reaction = Date.now() - this.t1;
	dataRow.timeRemaining = this.timeRemaining;

	// console.log(dataRow);
	// this.events.data(dataRow);

	this.dataQueue.push(dataRow);

	this.t1 = Date.now();
}

InteractionPhase.prototype.collapseDoubleClicks = function(data) {
	var unqueued = [];
	for (var i=0; i<data.length; i++) {
		var datum = data[i];
		if (datum.action === 'color') {
			var drag2 = unqueued.pop(), drag1 = unqueued.pop();
			datum.reaction += drag1.reaction + drag2.reaction;
		}
		unqueued.push(datum);
	}
	return unqueued;
}

InteractionPhase.prototype.exportData = function(data) {
	data.forEach(function(datum) { this.events.data(datum) }, this);
}

InteractionPhase.prototype.endPhaseOne = function() {
	this.exportData(this.collapseDoubleClicks(this.dataQueue));
	this.collection.clearCollection();
	this.teardown();
	this.events.end(this.phaseNum);
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

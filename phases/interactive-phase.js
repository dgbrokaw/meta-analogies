// The InteractivePhase is a board containing one (or two) workspaces that
// will react to whether the contents of that workspace contains elements
// that are arranged according to a specified ruleset.  The elements are rocks
// that are initialized in the reactive workspace as well as others outside of
// the workspace that can be freely used.

// See the list of default settings for settings that can be customized.
// "Category" is the name of the category with which the workspace will be evaluated.

var InteractivePhase = function(stimuli, settings) {
	asGamePhase.call(this);

	this.events = d3.dispatch('start', 'data', 'end');

	this.category = categories[stimuli.category];

	this.benchRocks = stimuli.benchRocks;
	this.stimuli = stimuli.stimuli;

	this.initializeSettings(settings);
	this.calculateElementPositions();

	this.currentStimuli = 0;
	this.currentStateSatisfiesCategory = false;

	this.collection = new RockCollection();
}

phases.InteractivePhase = InteractivePhase;

InteractivePhase.prototype.calculateElementPositions = function() {
	var temp = this.settings

	temp.boardHeight = temp.rockZoneMargin + temp.rockZoneHeight + temp.benchWidth;
	temp.boardWidth = temp.benchWidth + temp.rockZoneWidth + temp.rockZoneMargin;

	temp.rockZoneX = temp.benchWidth;
	temp.rockZoneY = temp.rockZoneMargin;

	temp.buttonHeight = temp.benchWidth*1/2;
	temp.buttonWidth = temp.boardWidth*1/4;
	temp.button1CX = temp.boardWidth*1/3;
	temp.button1CY = temp.rockZoneY + temp.rockZoneHeight + temp.rockZoneMargin/2;
	temp.button2CX = temp.boardWidth*2/3;
	temp.button2CY = temp.button1Y;

	temp.smallRockDimension = temp.baseRockDimension;
	temp.mediumRockDimension = temp.baseRockDimension * temp.mediumSizeMultiplier;
	temp.largeRockDimension = temp.backRockDimension * temp.largeSizeMultiplier;

	this.stimuli.forEach(function(stimulus) {
		stimulus.forEach(function(rock) {
			rock.x += temp.rockZoneX; rock.y += temp.rockZoneY
		})
	});
}

InteractivePhase.prototype.start = function() {
	this.setupBoard();
	this.setupRockZone();
	this.setupButton1('Refresh');
	this.setupButton2('Next');
	this.setupNextButtonListener();
	this.setupRefreshButtonListener();

	this.stimuli = shuffle(this.stimuli);
	this.collection.extendCollection(this.benchRocks);
	this.collection.extendCollection(this.stimuli[this.currentStimuli]);
	this.setupRocks();

	this.events.start();
}

InteractivePhase

var currentExample = 0;

var selectedRock = null;
var correct = false;

function setCorrect() {
	correct = true;
}

function setIncorrect() {
	correct = false;
}

var showCorrect = function(zoneID) {
	d3.select(zoneID)
	  .attr('stroke', correctColor);
}

var showIncorrect = function(zoneID) {
	d3.select(zoneID)
	  .attr('stroke', incorrectColor);
}

var showNeutral = function(zoneID) {
	d3.select(zoneID)
		.attr('stroke', 'rgb(112,112,112)');
}

function setupBoard() {
	var svg = d3.select('body').append('svg')
		.attr('id', 'board')
		.attr('width', boardWidth)
		.attr('height', boardHeight)
		.classed('noselect', true);
		//.style({ display:'block', margin:'auto', padding:'0' });

	svg.append('rect')
	   .style('fill', boardColor)
	   .attr({width: '100%', height: '100%', 'stroke-width':'3', stroke:'rgb(0, 0, 0)'})
	   .classed('noselect', true);

	return svg;
}

// function setupControlRockZone() {
// 	d3.select('#board').append('rect')
// 		 .attr('id', 'controlZone')
// 	   .style('fill', rockZoneColor)
// 	   .attr({width: controlRockZoneWidth, height: controlRockZoneHeight, 'stroke-width': '6', stroke: correctColor})
// 	   .attr({x: controlRockZoneX, y: controlRockZoneY})
// 	   .classed('noselect', true);
// }

function setupUserRockZone() {
	d3.select('#board').append('rect')
		 .attr('id', 'userZone')
	   .style('fill', rockZoneColor)
	   .attr({width: userRockZoneWidth, height: userRockZoneHeight, 'stroke-width': '6', stroke: incorrectColor})
	   .attr({x: userRockZoneX, y: userRockZoneY})
	   .classed('noselect', true);
	console.log(userRockZoneX);
}

function setupRefreshButton() {
	var board = d3.select('#board');
	var button = board.append('g')
				.attr('id', 'refreshButton');
	button.append('ellipse')
		.attr('id', 'refreshButtonRect')
		.style({fill: activatedButtonColor})
		.attr({cx: refreshButtonCX, cy: refreshButtonCY, rx: buttonWidth, ry: buttonHeight});
	button.append('text')
		.style({fill: 'rgb(240,240,240)', stroke: 'none', 'font-family': 'sans-serif', 'font-style':'bold', 'font-size': 32})
		.attr({x: refreshButtonCX-buttonWidth*2/8, y: refreshButtonCY+buttonHeight/5})
		.text("Refresh");
}

function clickRefresh() {
	collectPhaseOneData('refresh')
	collection.clearCollection();
	// collection.extendCollection(rockSetupData);
	collection.extendCollection(trainStimuli[currentExample].rocks);
	collection.extendCollection(benchRockData);
	setupRocks();
	displayUserFeedback();
}

function setupRefreshButtonListener() {
	var button = d3.select('#refreshButton');
	button.on('click', clickRefresh);
}

function setupNextButton() {
	var board = d3.select('#board');
	var button = board.append('g')
				.attr('id', 'nextButton');
  button.append('ellipse')
		.attr('id', 'nextButtonRect')
		.style({fill: buttonPushedColor})
		.attr({cx: nextButtonCX, cy: nextButtonCY, rx: buttonWidth, ry: buttonHeight});
	button.append('text')
		.style({fill: 'black', stroke: 'none', 'font-family': 'sans-serif', 'font-style': 'bold', 'font-size': 32})
		.attr({x: nextButtonCX-buttonWidth*3/7, y: nextButtonCY+buttonHeight/5})
		//.attr({x: nextButtonX+10, y: nextButtonY+15})
		.text("Next example");
}

function clickNext() {
	if (correct && currentExample<trainStimuli.length-1) {
		collectPhaseOneData('next');
		collection.clearCollection();
		// controlCollection.clearCollection();
		currentExample++;
		// collection.extendCollection(rockSetupData);
		collection.extendCollection(benchRockData);
		collection.extendCollection(trainStimuli[currentExample].rocks);
		// controlCollection.extendCollection(trainStimuli[currentExample].rocks);
		setupRocks();
		// setupStimuli();
		displayUserFeedback();
		collectPhaseOneData('start');
		// setIncorrect();
	} else if (correct) {
		collectPhaseOneData('next');
		collection.clearCollection();
		teardownPhaseOne();
		displayTestingInstructions();
		// initializePhaseTwo();
	}
}

function setupNextButtonListener() {
	var button = d3.select('#nextButton');
	button.on('click', clickNext);
}

var activateNextButton = function() {
	d3.select('#nextButtonRect').style({fill: activatedButtonColor});
}

var deactivateNextButton = function() {
	d3.select('#nextButtonRect').style("fill", buttonPushedColor);
}

function setupRockDrag() {
	var rockDrag = d3.behavior.drag()
	    	.origin(function(d) { return d; })
	    	.on('dragstart', rockDragstart)
	    	.on('drag', rockDragmove)
	    	.on('dragend', rockDragend);
	return rockDrag;
}

function setupResizeDrag() {
	var resizeDrag = d3.behavior.drag()
				.origin(function(d) { return d; })
				.on('dragstart', resizeDragstart)
				.on('drag', resizeDragmove)
				.on('dragend', resizeDragend);
	return resizeDrag;
}

var rockDrag = setupRockDrag();
var resizeDrag = setupResizeDrag();

function createRockGroupSelection(rock) {
	var board = d3.select('#board');
	var d = rock.getData();
	var rockGroup = board.append('g')
										.datum(d)
										.attr('id', rock.getID()+'group');
	return rockGroup;
}

function createRockSelection(rock, group, disallowDrag) {
	var r = group.append('rect')
						.attr('id', rock.getID())
						.attr('x', function(d) { return d.x })
						.attr('y', function(d) { return d.y })
						.attr('width', function(d) { return d.w })
						.attr('height', function(d) { return d.h })
						.style('fill', function(d) { return rockColors[d.c] })
		    		.attr({'stroke-width': 3, 'stroke': (rock.borderColor ? rock.borderColor : 'black'), 'opacity': 1})
		    		.style('fill-opacity', 0.75);
	if (!disallowDrag) r.call(rockDrag);
  return r;
}

function createHandleSelection(rock, group) {
	var h = group.append('rect')
						.attr('id', rock.getID()+'handle')
						.attr('x', function(d) { return d.x+d.w*4/5 })
						.attr('y', function(d) { return d.y+d.h*4/5 })
						.attr('width', function(d) { return d.w*1/5 })
						.attr('height', function(d) { return d.h*1/5 })
						.style('fill', function(d) { return rockColors[d.c] })
						.style('fill-opacity', 0)
						.attr('cursor', 'nwse-resize')
    				.call(resizeDrag);
  return h;
}

function setupRocks() {
	var rocks = collection.getRocks();
	for (var i=0; i<rocks.length; i++) {
		var rock = rocks[i];
		var groupSelection = createRockGroupSelection(rock);
		var rockSelection = createRockSelection(rock, groupSelection);
		var handleSelection = createHandleSelection(rock, groupSelection);
		rock.setGroupSelection(groupSelection);
		rock.setRockSelection(rockSelection);
		rock.setHandleSelection(handleSelection);
		groupSelection.on('dblclick', dblclickRock)
	}
	displayUserFeedback();
}

// function setupStimuli() {
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

var dblclickRock = function() {
	var rock = collection.getRockByElement(this);
	changeRockColor(rock);
	displayUserFeedback();
	// double-clicks end up recording two drag events, which are meaningless data.  here we remove those.
	game.record.push();
	game.record.push();
	collectPhaseOneData('color');
}

function changeRockColor(rock) {
	rock.color = (rock.color+1)%3;
	rock.getRockSelection().style('fill', rockColors[rock.color]);
	rock.getHandleSelection().style('fill', rockColors[rock.color]);
}

var draggedRock = null;
var firstUpdate = true;

function rockDragstart(d) {
	var rock_sel = d3.select(this);
	draggedRock = collection.getRockBySelection(rock_sel);
  firstUpdate = true;
}

function rockDragmove(d) {
	if (firstUpdate) {
  	firstUpdate = false;
  	d.c = draggedRock.color;
	}
	d.x = d3.event.x;
	d.y = d3.event.y;
	draggedRock.getRockSelection()
		.attr('x', function(d) { return d.x })
		.attr('y', function(d) { return d.y });
	draggedRock.getHandleSelection()
		.attr('x', function(d) { return d.x+d.w*4/5 })
		.attr('y', function(d) { return d.y+d.h*4/5 });
	draggedRock.setXY(d.x, d.y);
	displayUserFeedback();
}

function rockDragend(d) {
	slideToNonOverlappingPosition(draggedRock, d);
	displayUserFeedback();
	collectPhaseOneData('drag');
}

function slideToNonOverlappingPosition(draggedRock, data) {
	var slideDirection;
	var overlappingRock
	if (overlappingRock = overlappingAnotherRock(draggedRock)) {
		slideDirection = slideRockInDirection(draggedRock, data, overlappingRock, slideDirection);
	}
}

function overlappingAnotherRock(draggedRock) {
	for (var i=0; i<collection.numberOfRocks(); i++) {
		var rock = collection.rocks[i];
		if (draggedRock.ID!==rock.ID && rectOverlap(draggedRock, rock)) return rock;
	}
	return false;
}

function slideRockInDirection(draggedRock, data, overlappingRock, slideDirection) {
	var direction = slideDirection;
	slideStat = findDirectionAndDistance(draggedRock, overlappingRock, direction);

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

	var overlappingRock2 = overlappingAnotherRock(draggedRock);
	if (overlappingRock2) {
		setTimeout(function() {
			slideRockInDirection(draggedRock, data, overlappingRock2, slideStat.direction);
		}, 500);
	}

	return direction;
}

function findDirectionAndDistance(draggedRock, overlappingRock, direction) {
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

var resizeBox = {};

function resizeDragstart(d) {
	var handle_sel = d3.select(this);
	var rock = collection.getRockBySelection(handle_sel);
	resizeBox.rock = rock;
	resizeBox.box = appendResizeBox(rock);
	resizeBox.handle = handle_sel;
	resizeBox.handleCoor = [d.x+d.w*4/5, d.y+d.h*4/5];
	resizeBox.otherSizes = getOtherSizes(rock.type);
	resizeBox.offset = 0;
}

function resizeDragmove(d) {
	var diffX = d3.event.x - d.x
	   ,diffY = d3.event.y - d.y;
	var diff = diffX > diffY ? diffX : diffY;
	resizeBox.offset = diff;
	resizeBox.handle
		.attr('x', resizeBox.handleCoor[0]+resizeBox.offset)
		.attr('y', resizeBox.handleCoor[1]+resizeBox.offset);
	resizeBox.box
		.attr('width', resizeBox.width+resizeBox.offset)
		.attr('height', resizeBox.height+resizeBox.offset);
	if (!resizeBox.previewBox1) {
		appendPreviewBoxes(resizeBox.rock);
	}
	var newSize;
	if (newSize = resizeBoxInRangeOfOtherSize()) {
		resizeBox.rock.type = newSize.type;
		resizeBox.rock.updateSize();
		d.w = resizeBox.rock.width;
		d.h = resizeBox.rock.height;
		resizeBox.rock.getRockSelection()
			.attr('width', function(d) { return d.w })
			.attr('height', function(d) { return d.h });
		displayUserFeedback();
		collectPhaseOneData('resize');
		clearPreviewBoxes();
		resizeBox.otherSizes = getOtherSizes(resizeBox.rock.type);
		appendPreviewBoxes(resizeBox.rock);
		resizeBox.offset = 0;
	}
}

function resizeDragend(d) {
	clearPreviewBoxes();
	resizeBox.box.remove();
	resizeBox.rock.getHandleSelection()
		.attr('x', function(d) { return d.x+d.w*4/5 })
		.attr('y', function(d) { return d.y+d.h*4/5 })
		.attr('width', function(d) { return d.w*1/5 })
		.attr('height', function(d) { return d.h*1/5 });
	delete resizeBox.rock;
	delete resizeBox.box;
	delete resizeBox.handle;
	delete resizeBox.handleCoor;
	delete resizeBox.otherSizes;
	delete resizeBox.offset;
	delete resizeBox.width;
	delete resizeBox.height;
}

function appendResizeBox(rock) {
	resizeBox.width = rock.width;
	resizeBox.height = rock.height;
	var box = d3.select('#board').append('rect')
		.attr('id', 'resizeBox')
		.attr('x', rock.x)
		.attr('y', rock.y)
		.attr('width', rock.width)
		.attr('height', rock.height)
		.attr({'stroke-width': 1, 'stroke': 'black'})
		.style({fill: 'none'});
	return box;
}

function appendPreviewBoxes(rock) {
	var board = d3.select('#board');
	otherSizes = resizeBox.otherSizes;
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
	resizeBox.previewBox1 = box1;
	resizeBox.previewBox2 = box2;
}

function clearPreviewBoxes() {
	if (resizeBox.previewBox1) {
		resizeBox.previewBox1.remove();
		delete resizeBox.previewBox1;
	}
	if (resizeBox.previewBox2) {
		resizeBox.previewBox2.remove();
		delete resizeBox.previewBox2;
	}
}

function getOtherSizes(size) {
	var small = getSizeDimensions('small')
	   ,medium = getSizeDimensions('medium')
	   ,large = getSizeDimensions('large');
	switch (size) {
		case 'small':
			return [medium, large];
		case 'medium':
			return [small, large];
		case 'large':
			return [small, medium];
	}
}

function getSizeDimensions(size) {
	switch (size) {
		case 'small':
			return {type: 'small', width: smallRockWidth, height: smallRockHeight};
		case 'medium':
			return {type: 'medium', width: mediumRockWidth, height: mediumRockHeight};
		case 'large':
			return {type: 'large', width: largeRockWidth, height: largeRockHeight};
	}
}

function resizeBoxInRangeOfOtherSize() {
	var width = resizeBox.width+resizeBox.offset;
	var halfBorderThickness = 3;
	for (var i=0; i<resizeBox.otherSizes.length; i++) {
		if (aboutEqual(width, resizeBox.otherSizes[i].width, 3))
			return resizeBox.otherSizes[i];
	}
	return false
}

function displayUserFeedback() {
	// checkControlWindow();
	checkUserWindow();
}

// function checkControlWindow() {
// 	//if (controlWindowSatisfiesSupportCategory()) {
//   if (controlWindowSatisfiesSandwichCategory()) {
// 		showCorrect('#controlZone');
// 	} else {
// 		showIncorrect('#controlZone');
// 	}
// }

function checkUserWindow() {
	//if (userWindowSatisfiesSupportCategory()) {
	if (userWindowSatisfiesSandwichCategory()) {
		showCorrect('#userZone');
		setCorrect();
		activateNextButton();
	} else {
		showIncorrect('#userZone');
		setIncorrect();
		deactivateNextButton();
	}
}

function collectPhaseOneData(action) {
	if (action==='color') {
		// to change color, you dblclick, which has the side-effect of two drag events.  discard those extra two rows of data.
		game.deleteLastRow();
		game.deleteLastRow();
	}
	var d = new Date();
	var dataRow = new Row();

	dataRow.subjectID = game.getSubjectID();
	dataRow.date = d.toDateString();
	dataRow.t = d.toTimeString();
	dataRow.phase = 'train';
	dataRow.stimulusNum = trainStimuli[currentExample].stimulusNum;
	dataRow.userRocks = codifyUserRockData(getRocksWithinUserZoneWindow());
	dataRow.userAction = action;
	dataRow.userCorrect = correct;

	console.log(dataRow);
	game.addRow(dataRow);
}

function saveData(data) {
	// using the FileSaver.js to save the game to file
	// (should contain all user and test data)

	var csv = d3.csv.format(data);
	var blob = new Blob([csv], {type: 'text/csv'});
	var fileName = ''
		+	(new Date()).toDateString().replace(/ /g, "-")
		+ 'subject' + game.getSubjectID()
		+ '.csv';
	saveAs(blob, fileName);
}

function codifyUserRockData(rocks) {
	var code = '';
	rocks.forEach(function(rock) {
		code += 'size:' + rock.type + ',' + (rock.borderColor ? 'bordered,' : '') + 'color:' + rock.color + ',location:(' + rock.x + ',' + rock.y + ');'
	})
	return code;
}

function getURLParameter(name) {
	var val = RegExp(name + '=' + '(.+?)(&|$)').exec(window.location.search);
	return val ? decodeURIComponent(val[1]) : null;
}

// function getControlRockZoneDimensions() {
// 	return {width: getURLParameter('width1'), height: getURLParameter('height1')};
// }

// function getUserRockZoneDimensions(controlRockZoneDimensions) {
// 	var width = getURLParameter('width2')
// 	   ,height = getURLParameter('height2');
// 	if (!width) width = controlRockZoneDimensions.width;
// 	if (!height) height = controlRockZoneDimensions.height;
// 	return {width: width, height: height};
// }

// function getMaximumNumberOfObjects() {
// 	return parseInt(getURLParameter('maxObjects'));
// }

function calculateBoardDimensions(controlRockZoneDimensions, userRockZoneDimensions) {
	if (controlRockZoneDimensions.height) {
		controlRockZoneHeight = parseInt(controlRockZoneDimensions.height);
	}
	if (controlRockZoneDimensions.width) {
		controlRockZoneWidth = parseInt(controlRockZoneDimensions.width);
	}
	if (userRockZoneDimensions.height) {
		userRockZoneHeight = parseInt(userRockZoneDimensions.height);
	}
	if (userRockZoneDimensions.width) {
		userRockZoneWidth = parseInt(userRockZoneDimensions.width);
	}
	// benchWidth = (controlRockZoneWidth+userRockZoneWidth)/2;

	largestRockZoneHeight = (controlRockZoneHeight > userRockZoneHeight ? controlRockZoneHeight : userRockZoneHeight)
	boardHeight = largestRockZoneHeight + rockZoneMargin*4
	boardWidth = rockZoneMargin + controlRockZoneWidth + rockZoneMargin + userRockZoneWidth + benchWidth
	controlRockZoneX = userRockZoneX + userRockZoneWidth + rockZoneMargin
	buttonWidth = boardWidth*6/10*1/4
	refreshButtonCX = boardWidth*1/3
	refreshButtonCY = controlRockZoneY+largestRockZoneHeight+(boardHeight-controlRockZoneY-largestRockZoneHeight)/2
	nextButtonCX = boardWidth*2/3
	nextButtonCY = controlRockZoneY+largestRockZoneHeight+(boardHeight-controlRockZoneY-largestRockZoneHeight)/2
}

function initializePhaseOne() {
	// var controlRockZoneDimensions = getControlRockZoneDimensions();
	// var userRockZoneDimensions = getUserRockZoneDimensions(controlRockZoneDimensions);
	// var maximumNumberOfObjects = getMaximumNumberOfObjects();
	// calculateBoardDimensions(controlRockZoneDimensions, userRockZoneDimensions);
	setupBoard();
	setupUserRockZone();
	// setupControlRockZone();
	setupRefreshButton();
	setupNextButton();
	setupNextButtonListener();
	setupRefreshButtonListener();

	trainStimuli = shuffle(trainStimuli);

	// collection.extendCollection(rockSetupData);
	collection.extendCollection(trainStimuli[currentExample].rocks);
	// controlCollection.extendCollection(stimuli.data[currentExample]);
	// controlCollection.extendCollection(trainStimuli[currentExample].rocks);

	var benchRocks = benchRockData;
	// if (maximumNumberOfObjects < benchRocks.length)
	// 	benchRocks = benchRocks.slice(0, maximumNumberOfObjects);
	collection.extendCollection(benchRocks);
	setupRocks();
	// setupStimuli();
}

function shuffle(o) {
  o = o.slice();
  for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
  return o;
}

function teardownPhaseOne() {
	d3.select('#board').remove();
}
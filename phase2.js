var currentTest = 0;

function setupPhaseTwoBoard() {
	var svg = d3.select('body').append('svg')
		.attr('id', 'board')
		.attr('width', boardWidth)
		.attr('height', boardHeight)
		.classed('noselect', true);

	svg.append('rect')
	   .style('fill', boardColor)
	   .attr({width: '100%', height: '100%', 'stroke-width':'3', stroke:'rgb(0, 0, 0)'})
	   .classed('noselect', true);

	return svg;
}

function setupTestRockZone() {
	d3.select('#board').append('rect')
		 .attr('id', 'testZone')
	   .style('fill', rockZoneColor)
	   .attr({width: rockZoneWidth, height: rockZoneHeight, 'stroke-width': '6', stroke: activatedButtonColor})
	   .attr({x: testRockZoneX, y: testRockZoneY})
	   .classed('noselect', true);
}

function setupNoButton() {
	var board = d3.select('#board');
	var button = board.append('g')
				.attr('id', 'noButton');
	button.append('ellipse')
		.attr('id', 'noButtonRect')
		.style({fill: incorrectColor})
		.attr({cx: noButtonCX, cy: noButtonCY, rx: buttonWidth, ry: buttonHeight});
	button.append('text')
		.style({fill: 'rgb(240,240,240)', stroke: 'none', 'font-family': 'sans-serif', 'font-style':'bold', 'font-size': 32})
		.attr({x: noButtonCX-buttonWidth*1/8, y: noButtonCY+buttonHeight/5})
		.text("No");
}

function clickNo() {
	responseGiven("no");
}

function setupNoButtonListener() {
	var button = d3.select('#noButton');
	button.on('click', clickNo);
}

function setupYesButton() {
	var board = d3.select('#board');
	var button = board.append('g')
				.attr('id', 'yesButton');
  button.append('ellipse')
		.attr('id', 'yesButtonRect')
		.style({fill: correctColor})
		.attr({cx: yesButtonCX, cy: yesButtonCY, rx: buttonWidth, ry: buttonHeight});
	button.append('text')
		.style({fill: 'black', stroke: 'none', 'font-family': 'sans-serif', 'font-style': 'bold', 'font-size': 32})
		.attr({x: yesButtonCX-buttonWidth*1/8, y: yesButtonCY+buttonHeight/5})
		.text("Yes");
}

function clickYes() {
	responseGiven("yes");
}

function setupYesButtonListener() {
	var button = d3.select('#yesButton');
	button.on('click', clickYes);
}

function createPhaseTwoRockGroupSelection(rock) {
	var board = d3.select('#board');
	var d = rock.getData();
	var rockGroup = board.append('g')
										.datum(d)
										.attr('id', rock.getID()+'group');
	return rockGroup;
}

function createPhaseTwoRockSelection(rock, group) {
	var r = group.append('rect')
						.attr('id', rock.getID())
						.attr('x', function(d) { return d.x })
						.attr('y', function(d) { return d.y })
						.attr('width', function(d) { return d.w })
						.attr('height', function(d) { return d.h })
						.style('fill', function(d) { return rockColors[d.c] })
						.attr({'stroke-width': 3, 'stroke': (rock.borderColor ? rock.borderColor : 'black'), 'opacity': 1})
		    		.style('fill-opacity', 0.75);
  return r;
}

function setupPhaseTwoRocks() {
	var rocks = collection.getRocks();
	for (var i=0; i<rocks.length; i++) {
		var rock = rocks[i];
		var groupSelection = createPhaseTwoRockGroupSelection(rock);
		var rockSelection = createPhaseTwoRockSelection(rock, groupSelection);
		rock.setGroupSelection(groupSelection);
		rock.setRockSelection(rockSelection);
	}
}

function responseGiven(response) {
	collectPhaseTwoData(response);
	currentTest++;
	collection.clearCollection();
	if (currentTest<testStimuli.length) {
		collection.extendCollection(testStimuli[currentTest].rocks);
		setupPhaseTwoRocks();
	} else {
		saveData(game.record);
		teardownPhaseTwo();
		displayPostExperimentText();
	}
}

function collectPhaseTwoData(response) {
	var d = new Date();
	var dataRow = new Row();

	dataRow.subjectID = game.getSubjectID();
	dataRow.date = d.toDateString();
	dataRow.t = d.toTimeString();
	dataRow.phase = 'test';
	dataRow.stimulusNum = testStimuli[currentTest].stimulusNum;
	dataRow.userRocks = null;
	dataRow.userAction = response;
	dataRow.userCorrect = response===testStimuli[currentTest].answer;

	console.log(dataRow);
	game.addRow(dataRow);
}

function getTestRockZoneDimensions() {
	return {width: getURLParameter('width'), height: getURLParameter('height')};
}

function calculateTestBoardDimensions(rockZoneDimensions) {
	if (rockZoneDimensions.width) {
		rockZoneWidth = parseInt(rockZoneDimensions.width);
	}
	if (rockZoneDimensions.height) {
		rockZoneHeight = parseInt(rockZoneDimensions.height);
	}

	boardWidth = 1500//rockZoneWidth + rockZoneMargin*2;
	boardHeight = rockZoneHeight + rockZoneMargin*4;

	testRockZoneX = (boardWidth-rockZoneWidth)/2
}

function initializePhaseTwo() {
	var rockZoneDimensions = getTestRockZoneDimensions();
	calculateTestBoardDimensions(rockZoneDimensions);
	setupPhaseTwoBoard();
	setupTestRockZone();
	setupNoButton();
	setupNoButtonListener();
	setupYesButton();
	setupYesButtonListener();

	testStimuli = shuffle(testStimuli);

	collection.extendCollection(testStimuli[currentTest].rocks);
	setupPhaseTwoRocks();
}

function teardownPhaseTwo() {
	d3.select('#board').remove();
}
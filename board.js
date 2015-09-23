// have element size definitions in default settings

// have a board class which is instantiated with a matrix of strings

// the board class creates an svg with all the elements in the positions specified in the matrix
// the row with the largest width will be positioned so the elements are adjacent
// rows with smaller total widths will have their elements spaced evenly inside the empty space

var Board = function(contents, settings) {
	this.initSettings(settings);
	this.contents = contents || [];
	if (this.contents) this.calculateElementPositions(contents);
}

Board.defaultSettings = {
	// reactive workspaces
	rockZoneHeight: 550
, rockZoneWidth: 550
  // space used for extra rocks (empty space)
, benchHeight: 550
, benchWidth: 300
  // buttons are ellipses
, buttonHeight: 100
, buttonWidth: 200
  // empty space
, marginHeight: 50
, marginWidth: 50

//   // determines whether every rock zone will have a text box at the top to
//   // give text feedback
// , descriptiveWorkspaces: false
, rockZoneFillType: 'code' // 'png'

, boardColor: 'white'
, rockZoneColor: 'linen'

, activeButtonColor: 'rgb(150,150,200)'
, inactiveButtonColor: 'rgb(25,25,50)'

, correctColor: 'rgb(0,255,0)'
, incorrectColor: 'rgb(255,0,0)'
, neutralColor: 'rgb(112,112,112)'
}

Board.prototype.initSettings = function(settings) {
	var settings = settings || {}
  	, defaults = tools.deepCopy(Board.defaultSettings);
	this.settings = tools.extend(defaults, settings);
}

// determine which row has the greatest width, that is the board width (all rows automatically have a margin on the left and right)
// determine the sum of heights of all rows, that is the board height (the top and bottom of the board automatically have a margin, and all rows have margins in between them)
// to determine the positions of each element
//   if the row is the row with the greatest width, the positions are immediately adjacent to each other (i.e. start at 0 and the position of the next element is the total width of all previous elements)
//   else, take the total width of elements in that row, subtract from board width to find the margin width between each element, start at 0 and the position of each element is the total width of all previous elements plus the additional margins
Board.prototype.initElements = function(contents) {
	var contents = contents || this.contents
	  , positions = this.positions || this.calculateElementPositions(contents);
	this.setupElements(contents, positions);
}

Board.prototype.calculateRowWidths = function(contents) {
	var widths = []
	  , greatestWidth = 0;
	for (var i=0; i<contents.length; i++) {
		var width = this.calculateRowWidth(contents[i]);
		widths.push(width);
		if (width > greatestWidth) greatestWidth = width;
	}
	return {rowWidths: widths, greatestWidth: greatestWidth}
}

Board.prototype.calculateRowWidth = function(row) {
	var width = this.settings.marginWidth*2;
	for (var i=0; i<row.length; i++) {
		width += this.settings[row[i]+'Width'];
	}
	return width;
}

Board.prototype.calculateRowHeights = function(contents) {
	var heights = []
	  , totalHeight = 0;
	for (var i=0; i<contents.length; i++) {
		var rowHeight = this.calculateRowHeight(contents[i])
		heights.push(rowHeight);
		totalHeight += rowHeight;
	}
	totalHeight += (contents.length + 1) * this.settings.marginHeight; // rows will be separated by margins
	return {rowHeights: heights, totalHeight: totalHeight};
}

Board.prototype.calculateRowHeight = function(row) {
	var rowHeight = 0;
	for (var i=0; i<row.length; i++) {
		var height = this.settings[row[i]+'Height'];
		if (height > rowHeight) rowHeight = height;
	}
	return rowHeight;
}

Board.prototype.calculateElementPositions = function(contents) {
	var positions = [];

	var widths = this.calculateRowWidths(contents)
	  , rowWidths = widths.rowWidths
	  , boardWidth = widths.greatestWidth;
	var heights = this.calculateRowHeights(contents)
	  , rowHeights = heights.rowHeights
	  , boardHeight = heights.totalHeight;

	var currentYPos = this.settings.marginHeight;
	for (var i=0; i<contents.length; i++) {
		var row = contents[i]
		  , rowPositions = [];
		var rowWidth = rowWidths[i]
		  , rowHeight = rowHeights[i];
		var innerRowMargin = (boardWidth - rowWidth)/(row.length + 1); // will be zero if this is the row with the greatest width

		var currentXPos = this.settings.marginWidth + innerRowMargin;
		for (var j=0; j<row.length; j++) {
			var element = row[j]
			  , elementWidth = this.settings[element+'Width']
			  , elementHeight = this.settings[element+'Height'];
			var xPos, yPos;

			xPos = currentXPos;
			currentXPos += this.settings[element+'Width'] + innerRowMargin;

			yPos = currentYPos;
			if (elementHeight < rowHeight) yPos += (rowHeight - elementHeight)/2 // if an element is not as tall as the row, center it in the middle

			rowPositions.push([xPos, yPos]);
		}
		currentYPos += rowHeight + this.settings.marginHeight;

		positions.push(rowPositions);
	}

	this.settings.boardWidth = boardWidth;
	this.settings.boardHeight = boardHeight;
	this.positions = positions;

	return positions;
}

Board.prototype.setupElements = function(contents, positions) {
	this.setupBoard();

	var indices = {rockZone: 0, button: 0}; // indeces used to number element IDs
	for (var i=0; i<contents.length; i++) {
		var row = contents[i]
		  , rowPositions = positions[i];
		for (var j=0; j<row.length; j++) {
			this.setupElement(row[j], rowPositions[j], indices);
		}
	}
}

Board.prototype.setupBoard = function() {
	var svg = d3.select('body').append('svg')
		.attr('id', 'board')
		.attr('width', this.settings.boardWidth)
		.attr('height', this.settings.boardHeight)
		.classed('noselect', true);

	svg.append('rect')
    .style('fill', this.settings.boardColor)
    .attr({width: '100%', height: '100%', 'stroke-width':'3', stroke:'rgb(0, 0, 0)'})
    .classed('noselect', true);

	return svg;
}

Board.prototype.setupElement = function(element, position, indices) {
	switch (element) {
		case 'rockZone':
			this.setupRockZone(position, indices.rockZone);
			indices.rockZone++;
			break;
		case 'button':
			this.setupButton(position, indices.button);
			indices.button++;
			break;
		// benches and margins are just empty space and so nothing is actually created
	}
}

Board.prototype.setupRockZone = function(position, IDIndex) {
	d3.select('#board').append('rect')
	  .attr('id', 'rockZone'+IDIndex)
    .style('fill', this.settings.rockZoneColor)
    .attr({width: this.settings.rockZoneWidth, height: this.settings.rockZoneHeight, 'stroke-width': '6', stroke: this.settings.incorrectColor})
    .attr({x: position[0], y: position[1]})
    .classed('noselect', true);
}

Board.prototype.setupButton = function(position, IDIndex) {
	var board = d3.select('#board');
	var button = board.append('g')
				.attr('id', 'button'+IDIndex);
	button.append('ellipse')
		.attr('id', 'button'+IDIndex+'Ellipse')
		.style({fill: this.settings.activeButtonColor})
		.attr({cx: position[0]+(this.settings.buttonWidth/2), cy: position[1]+(this.settings.buttonHeight/2), rx: this.settings.buttonWidth/2, ry: this.settings.buttonHeight/2});
	button.append('text')
		.style({fill: 'rgb(240,240,240)', stroke: 'none', 'font-family': 'sans-serif', 'font-style':'bold', 'font-size': 32})
		.attr({x: position[0]+this.settings.buttonWidth/4, y: position[1]+this.settings.buttonHeight*3/5})
		.text("Button");
}

Board.prototype.setButtonColor = function(buttonID, color) {
	d3.select(buttonID).style({fill: color});
}

Board.prototype.setRockZoneStrokeColor = function(rockZoneID, color) {
	d3.select(rockZoneID).attr('stroke', color);
}
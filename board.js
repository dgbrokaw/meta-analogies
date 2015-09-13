// have element size definitions in default settings

// have a board class which is instantiated with a matrix of strings

// the board class creates an svg with all the elements in the positions specified in the matrix
// the row with the largest width will be positioned so the elements are adjacent
// rows with smaller total widths will have their elements spaced evenly inside the empty space

var Board = function(contents, settings) {
	this.initSettings(settings);
	this.initElements(contents);
}

Board.defaultSettings = {
	// reactive workspaces
	rockZoneHeight: 550
, rockZoneWidth: 550
  // space used for extra rocks
, benchHeight: 550
, benchWidth: 300
  // buttons are ellipses
, buttonHeight: 66
, buttonWidth: 100
  // empty space
, marginHeight: 50
, marginWidth: 50

  // determines whether every rock zone will have a text box at the top to
  // give text feedback
, reactiveWorkspaces: true

, boardColor: 'white'
, rockZoneColor: 'linen'

, activeButtonColor: 'rgb(150,150,200)'
, inactiveButtonColor: 'rgb(25,25,50)'

, correctColor: 'rgb(0,255,0)'
, incorrectColor: 'rgb(255,0,0)'
}

Board.prototype.initializeSettings = function(settings) {
	var settings = settings || {}
  	, defaults = tools.deepCopy(phases.defaultSettings);
	this.settings = tools.extend(defaults, settings);
}

Board.prototype.initElements = function(contents) {
	for (var i=0; i<contents.length; i++) {
		var row = contents[i];
		var width = 0
		  , maxHeight = 0;
		for (var j=0; j<row.length; j++) {
			width += this.settings[row[j]+'Width'];
			var height = this.settings[row[j]+'Height'];
			if (height > maxHeight) maxHeight = height;
		}
	}
}

Board.prototype.findGreatestWidth = function(contents) {
	var greatestWidth = 0
	  , rowWithGreatestWidth;
	for (var i=0; i<contents.length; i++) {
		var row = contents[i]
		  , width = 0;
		for (var j=0; j<row.length; j++) {
			width += this.settings[row[j]+'Width'];
		}
		if (width > greatestWidth) {
			greatestWidth = width;
			rowWithGreatestWidth = i;
		}
	}
	return {greatestWidth: greatestWidth, row: rowWithGreatestWidth}
}

Board.prototype.calculateBoardHeight = function(contents) {
	var boardHeight = 0;
	for (var i=0; i<contents.length; i++) {
		var row = contents[i]
		  , rowHeight = 0;
		for (var j=0; j<row.length; j++) {
			var height = this.settings[row[j]+'Height'];
			if (height > rowHeight) rowHeight = height;
		}
		boardHeight += rowHeight;
	}
	boardHeight += (contents.length - 1) * this.settings.marginHeight;
}

Board.prototype.calculateElementPositions = function(contents) {
	var boardWidth = 0
	  , boardHeight = 0
	  , positions = [];
	for (var i=0; i<contents.length; i++) {
		var row = contents[i];
		var width = 0
		  , maxHeight = 0;
		for (var j=0; j<row.length; j++) {
			width += this.settings[row[j]+'Width'];
			var height = this.settings[row[j]+'Height'];
			if (height > maxHeight) maxHeight = height;
		}
	}
}

// determine which row has the greatest width, that is the board width
// determine the sum of heights of all rows including margins between rows, that is the board height
// to determine the positions of each element
//   if the row is the row with the greatest width, the positions are immediately adjacent to each other (i.e. start at 0 and the position of the next element is the total width of all previous elements)
//   else, take the total width of elements in that row, subtract from board width to find the margin width between each element, start at 0 and the position of each element is the total width of all previous elements plus the additional margins
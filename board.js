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
, margin: 50

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

}
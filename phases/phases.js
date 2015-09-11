var phases = {};

phases.defaultSettings = {
	subjectID: null

, rockZoneHeight: 550
, rockZoneWidth: 550
  // space used for extra rocks
, benchWidth: 300
  // empty space around rock zones
, rockZoneMargin: 50

  // the smallest rocks will be of this size in height and width
  // the medium and large rock sizes will be scaled to this number
, baseRockDimension: 30
, mediumSizeMultiplier: 2
, largeSizeMultiplier: 3

, boardColor: 'white'
, rockZoneColor: 'linen'
, correctColor: 'rgb(0,255,0)'
, incorrectColor: 'rgb(255,0,0)'
, activatedButtonColor: 'rgb(150,150,200)'
, rockColors: [ 'rgb(25,5,5)'
              , 'rgb(140,150,140)'
              , 'rgb(240,240,255)' ]
};

// phase must be instantiated before running these functions
var asGamePhase = function() {

	this.prototype.initializeSettings = function(settings) {
		var settings = settings || {}
	  	, defaults = tools.deepCopy(phases.defaultSettings);
		this.settings = tools.extend(defaults, settings);
	}

	this.prototype.setupBoard = function() {
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

	this.prototype.setupRockZone = function() {
		d3.select('#board').append('rect')
		  .attr('id', 'userZone')
	    .style('fill', this.settings.rockZoneColor)
	    .attr({width: this.settings.rockZoneWidth, height: this.settings.rockZoneHeight, 'stroke-width': '6', stroke: incorrectColor})
	    .attr({x: this.settings.rockZoneX, y: this.settings.rockZoneY})
	    .classed('noselect', true);
	}

	this.prototype.setupButton1 = function(buttonText) {
		var board = d3.select('#board');
		var button = board.append('g')
					.attr('id', 'button1');
		button.append('ellipse')
			.attr('id', 'button1Rect')
			.style({fill: this.settings.activatedButtonColor})
			.attr({cx: this.settings.button1CX, cy: this.settings.button1CY, rx: this.settings.buttonWidth, ry: this.settings.buttonHeight});
		button.append('text')
			.style({fill: 'rgb(240,240,240)', stroke: 'none', 'font-family': 'sans-serif', 'font-style':'bold', 'font-size': 32})
			.attr({x: refreshButtonCX-buttonWidth*2/8, y: refreshButtonCY+buttonHeight/5})
			.text("Refresh");
	}

}
var phases = {};

phases.defaultSettings = {
	subjectID: null

  // the smallest rocks will be of this size in height and width
  // the medium and large rock sizes will be scaled to this number
, baseRockDimension: 30
, mediumSizeMultiplier: 2
, largeSizeMultiplier: 3

, rockColors: [ 'rgb(25,5,5)'
              , 'rgb(140,150,140)'
              , 'rgb(240,240,255)' ]
};

// phase must be instantiated before running these functions
var asGamePhase = function() {

	this.prototype.events = d3.dispatch('start', 'data', 'end');

	this.prototype.teardown = function() {
		d3.select('#board').remove();
	}

}
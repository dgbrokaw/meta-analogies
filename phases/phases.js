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

	this.prototype.parseRockCode = function(code) {
		var data = [];
		var rocks = code.split(';');
		for (var i=0; i<rocks.length; i++) {
			if (rocks[i].length === 0) continue;
			var rock = {};
			var attributes = rocks[i].split(',');
			for (var j=0; j<attributes.length; j++) {
				var parts = attributes[j].split(':');
				if (!parts[1]) {
					rock[parts[0]] = true;
				} else if (parts[0] === 'location') {
					var coordinates = [parts[1].substring(1), attributes[++j].substring(0, attributes[j].length-1)];
					rock['x'] = +(coordinates[0]);
					rock['y'] = +(coordinates[1]);
				} else {
					rock[parts[0]] = parts[1];
				}
			}
			data.push(rock);
		}
		return data;
	}

	// rockZoneID = '#rockZone0'
	// stimulus = this.stimuli[this.currentStimulus]
	this.prototype.setupImage = function(position, stimulus) {
		var board = d3.select('#board');
		board.append('svg')
			.attr('id', 'stimulusImage')
			.attr('x', position[0])
			.attr('y', position[1])
			.attr('width', this.board.settings.rockZoneWidth)
			.attr('height', this.board.settings.rockZoneHeight).append('svg:image')
			.attr('x', '3px') // should be half the stroke width
			.attr('y', '3px')
			.attr('width', '550px')
			.attr('height', '550px')
			// .attr('width', '50px')
			// .attr('height', '50px')
			.attr('xlink:href', stimulus);
	}

	this.prototype.clearImage = function() {
		d3.select('#stimulusImage').remove();
	}

	this.prototype.teardown = function() {
		d3.select('#board').remove();
	}

	this.prototype.getRocksWithinWindow = function(rockZoneID, collection) {
		var allRocks = collection.getRocks();
		var rocksWithinWindow = [];
		var windowRect = {};
		var rockZone = d3.select(rockZoneID);
		windowRect.x1 = rockZone.attr('x'), windowRect.y1 = rockZone.attr('y')
	 ,windowRect.x2 = windowRect.x1+rockZone.attr('width'), windowRect.y2 = windowRect.y1+rockZone.attr('height');
		for (var i=0; i<allRocks.length; i++) {
			var rock = allRocks[i], rockRect = {};
			rockRect.x1 = rock.x, rockRect.y1 = rock.y, rockRect.x2 = rock.x+rock.dimension, rockRect.y2 = rock.y+rock.dimension;
			if (this.rockRectIsWithinWindowRect(rockRect, windowRect)) {
				rocksWithinWindow.push(rock);
			}
		}
		return rocksWithinWindow;
	}

	this.prototype.rockRectIsWithinWindowRect = function(rockRect, windowRect) {
		return (windowRect.x1<rockRect.x1
				 && windowRect.y1<rockRect.y1
				 && rockRect.x2<windowRect.x2
				 && rockRect.y2<windowRect.y2);
	}

}

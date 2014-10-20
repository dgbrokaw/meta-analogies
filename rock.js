var idCount = 0;

var Rock = function(type) {
	this.ID = 'rock' + idCount++;
	this.type = type;
	this.color = 0;

	this.x = null;
	this.y = null;
	this.width = null;
	this.height = null;

	this.svgg = null;
}

Rock.prototype.getID = function() {
	return this.ID;
}

Rock.prototype.setXY = function(x, y) {
	this.x = x;
	this.y = y;
}

Rock.prototype.updateSize = function() {
	if (this.type==='small') {
		this.width = smallRockWidth;
		this.height = smallRockHeight;
	} else if (this.type==='medium') {
		this.width = mediumRockWidth;
		this.height = mediumRockHeight;
	} else {
		this.width = largeRockWidth;
		this.height = largeRockHeight;
	}
}

// should not need this function after resize handle is implemented
Rock.prototype.rotateSize = function() {
	if (this.type==='small') {
		this.type = 'medium';
		this.width = mediumRockWidth;
		this.height = mediumRockHeight;
	} else if (this.type==='medium') {
		this.type = 'large';
		this.width = largeRockWidth;
		this.height = largeRockHeight;
	} else {
		this.type = 'small';
		this.width = smallRockWidth;
		this.height = smallRockHeight;
	}
}

Rock.prototype.rotateColor = function() {
	this.color = (this.color+1)%3;
}

Rock.prototype.setSVG = function(svg) {
	this.svgg = svg;
}

Rock.prototype.getSVG = function() {
	return this.svgg;
}

Rock.prototype.getData = function() {
	return {id: this.ID
		     ,type: this.type
		     ,color: this.color
		     ,x: this.x
		     ,y: this.y
		     ,w: this.width
		     ,h: this.height};
}

var RockCollection = function() {
	this.rocks = [];
}

RockCollection.prototype.extendCollection = function(data) {
	for (var i=0; i<data.length; i++) {
		var datum = data[i];
		var rock = new Rock(datum.type);
		rock.setXY(datum.x, datum.y);
		rock.updateSize();
		this.rocks.push(rock);
	}
}

RockCollection.prototype.numberOfRocks = function() {
	return this.rocks.length;
}

RockCollection.prototype.getRocks = function() {
	return this.rocks;
}

RockCollection.prototype.getCollectionData = function() {
	var data = []
	for (var i=0; i<this.rocks.length; i++) {
		data.push(this.rocks[i].getData());
	}
	return data;
}

RockCollection.prototype.getRockBySVG = function(svg) {
	var svg = svg[0];
	var rocks = this.getRocks();
	for (var i=0; i<rocks.length; i++) {
		if (svg == rocks[i].getSVG()) return rocks[i];
	}
	throw 'Attempted to find non-existant rock by svg.'
}

RockCollection.prototype.removeRock = function(rock) {
	this.rocks.splice(this.rocks.indexOf(rock), 1);
}

RockCollection.prototype.clearCollection = function() {
	for (var i=0; i<this.rocks.length; i++) {
		this.rocks[i].getSVG().remove();
	}
	this.rocks = [];
}
var idCount = 0;

var Rock = function(size) {
	this.ID = 'rock' + idCount++;
	this.size = size;
	this.color = 0;

	this.x = null;
	this.y = null;
	this.dimension = null;

	this.group = null;
	this.rock = null;
	// this.svgg = null;
	this.handle = null;
}

Rock.prototype.getID = function() {
	return this.ID;
}

Rock.prototype.setXY = function(x, y) {
	this.x = x;
	this.y = y;
	// console.log('x: '+ this.x + ', y: ' + this.y);
}

// Rock.prototype.updateSize = function() {
// 	if (this.type==='small') {
// 		this.width = smallRockWidth;
// 		this.height = smallRockHeight;
// 	} else if (this.type==='medium') {
// 		this.width = mediumRockWidth;
// 		this.height = mediumRockHeight;
// 	} else {
// 		this.width = largeRockWidth;
// 		this.height = largeRockHeight;
// 	}
// }

Rock.prototype.rotateColor = function() {
	this.color = (this.color+1)%3;
}

Rock.prototype.setGroupSelection = function(selection) {
	this.group = selection;
}

Rock.prototype.getGroupSelection = function() {
	return this.group;
}

Rock.prototype.setRockSelection = function(selection) {
	this.rock = selection;
}

Rock.prototype.getRockSelection = function() {
	return this.rock;
}

Rock.prototype.setHandleSelection = function(selection) {
	this.handle = selection;
}

Rock.prototype.getHandleSelection = function() {
	return this.handle;
}

// Rock.prototype.getData = function() {
// 	return {id: this.ID
// 		     ,type: this.type
// 		     ,color: this.color
// 		     ,x: this.x
// 		     ,y: this.y
// 		     ,w: this.width
// 		     ,h: this.height};
// }

Rock.prototype.getData = function() {
	return {id: this.ID
				 ,x: this.x
		     ,y: this.y
		     ,w: this.dimension
		     ,h: this.dimension
		     ,c: this.color};
}

var RockCollection = function(settings) {
	this.rocks = [];
	this.settings = tools.deepCopy(settings);
}

RockCollection.prototype.extendCollection = function(data) {
	for (var i=0; i<data.length; i++) {
		var datum = data[i];
		var rock = new Rock(datum.size);
		rock.setXY(datum.x, datum.y);
		this.setRockSize(rock, rock.size);
		rock.borderColor = datum.border ? 'darkturquoise' : false;
		this.rocks.push(rock);
		if (datum.color) rock.color = datum.color;
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

RockCollection.prototype.setRockSize = function(rock, size) {
	rock.size = size;
	switch (size) {
		case 'small':
			rock.dimension = this.settings.smallRockDimension;
			break;
		case 'medium':
			rock.dimension = this.settings.mediumRockDimension;
			break;
		case 'large':
			rock.dimension = this.settings.largeRockDimension;
			break;
	}
}

RockCollection.prototype.getRockByElement = function(el) {
	var searchID = el.getAttribute('id');
	for (var i=0; i<this.rocks.length; i++) {
		if (searchID === this.rocks[i].getID() ||
			  searchID === this.rocks[i].getID()+'group' ||
			  searchID === this.rocks[i].getID()+'handle')
			return this.rocks[i];
	}
	return null;
}

RockCollection.prototype.getRockBySelection = function(selection) {
	for (var i=0; i<this.rocks.length; i++) {
		if (selection[0][0].outerHTML === this.rocks[i].getGroupSelection()[0][0].outerHTML ||
				selection[0][0].outerHTML === this.rocks[i].getRockSelection()[0][0].outerHTML ||
				selection[0][0].outerHTML === this.rocks[i].getHandleSelection()[0][0].outerHTML)
			return this.rocks[i];
	}
	return null;
}

RockCollection.prototype.getRockByID = function(id) {
	var rocks = this.getRocks();
	for (var i=0; i<rocks.length; i++) {
		if (rocks[i].ID === id) return rocks[i];
	}
	throw 'Attempted to find non-existant rock by id.';
}

RockCollection.prototype.getRockBySVG = function(svg) {
	var svg = svg[0];
	var rocks = this.getRocks();
	for (var i=0; i<rocks.length; i++) {
		if (svg == rocks[i].getSVG()) return rocks[i];
	}
	throw 'Attempted to find non-existant rock by svg.';
}

RockCollection.prototype.getRockByHandle = function(svg) {
	var svg = svg[0];
	var rocks = this.getRocks();
	for (var i=0; i<rocks.length; i++) {
		if (svg == rocks[i].getHandle()) return rocks[i];
	}
	throw 'Handle does not correspond to any rock.';
}

RockCollection.prototype.removeRock = function(rock) {
	this.rocks.splice(this.rocks.indexOf(rock), 1);
}

RockCollection.prototype.clearCollection = function() {
	for (var i=0; i<this.rocks.length; i++) {
		this.rocks[i].getGroupSelection().remove();
	}
	this.rocks = [];
}
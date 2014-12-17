var rocks;

var controlWindowSatisfiesSandwichCategory = function() {
	rocks = getRocksWithinControlZoneWindow();
	for (var i=0; i<rocks.length; i++) {
		if (rockSatisfiesSandwichCategory(i)) return true;
	}
	return false;
}

var userWindowSatisfiesSandwichCategory = function() {
	rocks = getRocksWithinUserZoneWindow();
	for (var i=0; i<rocks.length; i++) {
		if (rockSatisfiesSandwichCategory(i)) return true;
	}
	return false;
}

var getRocksWithinControlZoneWindow = function() {
	var allRocks = collection.getRocks();
	var rocksWithinWindow = [];
	var windowSpace = {};
	windowSpace.x1 = controlRockZoneX, windowSpace.y1 = controlRockZoneY
 ,windowSpace.x2 = controlRockZoneX+rockZoneWidth, windowSpace.y2 = controlRockZoneY+rockZoneHeight;
	for (var i=0; i<allRocks.length; i++) {
		var rock = allRocks[i], rockSpace = {};
		rockSpace.x1 = rock.x, rockSpace.y1 = rock.y, rockSpace.x2 = rock.x+rock.width, rockSpace.y2 = rock.y+rock.height;
		if (rockSpaceIsWithinWindowSpace(rockSpace, windowSpace)) {
			rocksWithinWindow.push(rock);
		}
	}
	return rocksWithinWindow;
}

var getRocksWithinUserZoneWindow = function() {
	var allRocks = collection.getRocks();
	var rocksWithinWindow = [];
	var windowSpace = {};
	windowSpace.x1 = userRockZoneX, windowSpace.y1 = userRockZoneY
 ,windowSpace.x2 = userRockZoneX+rockZoneWidth, windowSpace.y2 = userRockZoneY+rockZoneHeight;
	for (var i=0; i<allRocks.length; i++) {
		var rock = allRocks[i], rockSpace = {};
		rockSpace.x1 = rock.x, rockSpace.y1 = rock.y, rockSpace.x2 = rock.x+rock.width, rockSpace.y2 = rock.y+rock.height;
		if (rockSpaceIsWithinWindowSpace(rockSpace, windowSpace)) {
			rocksWithinWindow.push(rock);
		}
	}
	return rocksWithinWindow;
}

var rockSatisfiesSandwichCategory = function(rockIDX) {
	var satisfies = false;
	var A = rocks[rockIDX]
	   ,A_box = getCornersOf(A);
	for (var i=0; i<rocks.length; i++) {
		if (i!==rockIDX) {
			var B = rocks[i]
			   ,B_box = getCornersOf(B);
			if (areIdentical(A, B) && enoughSpaceBetween(A_box, B_box)) {
				var rocksInBetween = findRocksBetween(A, B, A_box, B_box);
				if (rocksInBetween.length>0) {
					satisfies = true;
				}
			}
		}
	}
	return satisfies;
}

function areIdentical(A, B) {
	return A.type===B.type && A.color===B.color;
}

function enoughSpaceBetween(A, B) {
	var vertically_separated = (A.bottomLeft.y < B.topLeft.y);
	var horizontally_separated = (A.topRight.x < B.topLeft.x);
	if (vertically_separated && A.bottomLeft.y - B.topLeft.y < -smallRockHeight) return true;
	if (horizontally_separated && B.topLeft.x - A.topRight.x > smallRockWidth) return true;
	return false;
}

// Returns a list of rocks between the rocks A and B if all of them share a property with rock A.
// If any of them does not share a property with A, then an empty list is returned.
function findRocksBetween(A, B, A_box, B_box) {
	var rs = [];
	for (var i=0; i<rocks.length; i++) {
		var C = rocks[i];
		if (C.ID!=A.ID && C.ID!=B.ID) {
			if (!rectOverlap(A, C) && !rectOverlap(B, C) && CIsBetweenAAndB(C, A_box, B_box)) {
				if (CSharesAPropertyWithA(C, A)) {
					rs.push(C);
				} else {
					return [];
				}
			}
		}
	}
	return rs;
}

function CIsBetweenAAndB(C, A_box, B_box) {
	var lineSet1 = getTopLeftBottomRightLineSet(A_box, B_box)
	   ,lineSet2 = getBottomLeftTopRightLineSet(A_box, B_box);
	var lineSet;
	if (A_box.topLeft.x===B_box.topLeft.x || A_box.topLeft.y===B_box.topLeft.y) {
		lineSet = lineSet1;
	} else {
		lineSet = getWidestArea(lineSet1, lineSet2);
	}
	return inBetween(getCenterOf(C), lineSet);
}

function CSharesAPropertyWithA(C, A) {
	return C.type===A.type || C.color===A.color;
}

function getTopLeftBottomRightLineSet(A_box, B_box) {
	var leftLine = {p1: A_box.topLeft, p2: B_box.topLeft}
	   ,rightLine = {p1: A_box.bottomRight, p2: B_box.bottomRight};
	return {left: leftLine, right: rightLine};
}

function getBottomLeftTopRightLineSet(A_box, B_box) {
	var leftLine = {p1: A_box.bottomLeft, p2: B_box.bottomLeft}
	   ,rightLine = {p1: A_box.topRight, p2: B_box.topRight};
	return {left: leftLine, right: rightLine};
}

function getWidestArea(lines1, lines2) {
	if (inBetween(lines2.left.p1, lines1)) return lines1;
	return lines2;
}

function inBetween(P, lines) {
	var side1 = getSign(getSide(P, lines.left))
	    side2 = getSign(getSide(P, lines.right));
	return side1===-1 && side2===1;
}

function getSide(P, line) {
	return (line.p2.x-line.p1.x)*(P.y-line.p1.y) - (line.p2.y-line.p1.y)*(P.x-line.p1.x);
}

function getSign(num) {
	if (num<0) return -1;
	if (num>0) return 1;
	if (num===0) return 0;
}

function getCornersOf(A) {
	var topLeft = {x: A.x, y: A.y}
	   ,topRight = {x: A.x+A.width, y: A.y}
	   ,bottomLeft = {x: A.x, y: A.y+A.height}
	   ,bottomRight = {x: A.x+A.width, y: A.y+A.height};
	return {topLeft: topLeft, topRight: topRight, bottomLeft: bottomLeft, bottomRight: bottomRight};
}

function getCenterOf(A) {
	var centerX = (A.x+A.x+A.width)/2
	   ,centerY = (A.y+A.y+A.height)/2;
	return {x: centerX, y: centerY};
}

function rectOverlap(A, B) {
	var xOverlap = valueInRange(A.x, B.x, B.x + B.width) ||
								 valueInRange(B.x, A.x, A.x + A.width);

	var yOverlap = valueInRange(A.y, B.y, B.y + B.height) ||
	               valueInRange(B.y, A.y, A.y + A.height);

	return xOverlap && yOverlap;
}

var valueInRange = function(value, range1, range2) {
	return range1 < value && value < range2;
}
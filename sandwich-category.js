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
	var allRocks = controlCollection.getRocks();
	var rocksWithinWindow = [];
	var windowSpace = {};
	windowSpace.x1 = controlRockZoneX, windowSpace.y1 = controlRockZoneY
 ,windowSpace.x2 = controlRockZoneX+controlRockZoneWidth, windowSpace.y2 = controlRockZoneY+controlRockZoneHeight;
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
 ,windowSpace.x2 = userRockZoneX+userRockZoneWidth, windowSpace.y2 = userRockZoneY+userRockZoneHeight;
	for (var i=0; i<allRocks.length; i++) {
		var rock = allRocks[i], rockSpace = {};
		rockSpace.x1 = rock.x, rockSpace.y1 = rock.y, rockSpace.x2 = rock.x+rock.width, rockSpace.y2 = rock.y+rock.height;
		if (rockSpaceIsWithinWindowSpace(rockSpace, windowSpace)) {
			rocksWithinWindow.push(rock);
		}
	}
	return rocksWithinWindow;
}

function rockSpaceIsWithinWindowSpace(rockSpace, windowSpace) {
	return (windowSpace.x1<rockSpace.x1
			 && windowSpace.y1<rockSpace.y1
			 && rockSpace.x2<windowSpace.x2
			 && rockSpace.y2<windowSpace.y2);
}

// I go by rocks, and see if that rock (plus other rocks) satisfies the category.
// But instead, I should find 'rock chains' and see if any of them satisfy the category.
// The rock chain has to be an isolated chain and satisfy the specifications.

// var rockSatisfiesSandwichCategory = function(rockIDX) {
// 	var satisfies = false;
// 	var A = rocks[rockIDX]
// 	   ,A_box = getCornersOf(A);
// 	for (var i=0; i<rocks.length; i++) {
// 		if (i!==rockIDX) {
// 			var B = rocks[i]
// 			   ,B_box = getCornersOf(B);
// 			if (areIdentical(A, B) && enoughSpaceBetween(A_box, B_box) && notOnExtremeDiagonal(A, B)) {
// 				var rocksInBetween = findRocksBetween(A, B, A_box, B_box);
// 				if (rocksInBetween.length>0 && wellSpaced(A, rocksInBetween, B)) {
// 					satisfies = true;
// 				}
// 			}
// 		}
// 	}
// 	return satisfies;
// }

var rockSatisfiesSandwichCategory = function(rockIDX) {
	var satisfies = false;
	var A = rocks[rockIDX]
	   ,A_box = getCornersOf(A);
	for (var i=0; i<rocks.length; i++) {
		if (i!==rockIDX) {
			var B = rocks[i]
			   ,B_box = getCornersOf(B);
			if (areIdentical(A, B) && enoughSpaceBetween(A_box, B_box) && notOnExtremeDiagonal(A, B) && A.borderColor && B.borderColor && A.borderColor===B.borderColor) {
				var rocksInRegion = findRocksInRegion(A, B, A_box, B_box);
				if (rocksInRegion.length>0)
					satisfies = containsSandwich(A, rocksInRegion, B);
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

// return false if the vector AB's angle between either the x or y unit vectors is not within 10 degrees (0.174532925 radians).
function notOnExtremeDiagonal(A, B) {
	var AB = getVectorBetweenRocks(A, B);
	var ABVerticalAngle = getAngleToYUnitVector(AB);
	var ABHorizontalAngle = getAngleToXUnitVector(AB);
	if (ABVerticalAngle > 0.174532925 && ABVerticalAngle < 2.96705972859 && ABHorizontalAngle > 0.174532925 && ABHorizontalAngle < 2.96705972859) return false;
	return true;
}

function getVectorBetweenRocks(A, B) {
	var ACenter = getCenterOf(A)
	   ,BCenter = getCenterOf(B);
	var AB = {x: BCenter.x - ACenter.x, y: BCenter.y - ACenter.y};
	return AB;
}

function getAngleToYUnitVector(v) {
	var dotProductWithYUnitVector = v.y;
	var magnitude = Math.pow(Math.pow(v.x,2)+Math.pow(v.y,2), 1/2);
	var cosineAngle = dotProductWithYUnitVector/magnitude;
	var angle = Math.acos(cosineAngle);
	return angle;
}

function getAngleToXUnitVector(v) {
	var dotProductWithXUnitVector = v.x;
	var magnitude = Math.pow(Math.pow(v.x,2)+Math.pow(v.y,2), 1/2);
	var cosineAngle = dotProductWithXUnitVector/magnitude;
	var angle = Math.acos(cosineAngle);
	return angle;
}

// Returns a list of rocks between the rocks A and B if all of them share a property with rock A.
// If any of them does not share a property with A, then an empty list is returned.
// If the shortest distance from one "bookend" to the first between-rock is greater than the size of a large rock, the empty list is return
function findRocksBetween(A, B, A_box, B_box) {
	var rs = [];
	var closestDistanceToA = null;
	var closestDistanceToB = null;
	for (var i=0; i<rocks.length; i++) {
		var C = rocks[i];
		if (C.ID!=A.ID && C.ID!=B.ID) {
			if (!rectOverlap(A, C) && !rectOverlap(B, C) && CIsBetweenAAndB(C, A_box, B_box)) {
				if (CSharesAPropertyWithA(C, A)) {
					rs.push(C);
					var distanceFromAToC = distanceBetweenRocks(A, C)
					   ,distanceFromBToC = distanceBetweenRocks(B, C);
					if (!closestDistanceToA || distanceFromAToC < closestDistanceToA) closestDistanceToA = distanceFromAToC;
					if (!closestDistanceToB || distanceFromBToC < closestDistanceToB) closestDistanceToB = distanceFromBToC;
				} else {
					return [];
				}
			}
		}
	}
	if (closestDistanceToA > largeRockHeight || closestDistanceToB > largeRockHeight) return [];
	return rs;
}

// function wellSpaced(b1, rocks, b2) {
// 	var allRocks = [b1].concat(rocks).concat([b2]);
// 	for (var i=0; i<rocks.length; i++) {
// 		if (!nearTwoOtherRocks(rocks[i], allRocks)) return false;
// 	}
// 	return true;
// }

// function nearTwoOtherRocks(rock, rocks) {
// 	var closeRock1
// 	   ,closeRock2;
// 	for (var i=0; i<rocks.length; i++) {
// 		var r = rocks[i]
// 		   ,d = distanceBetweenRocks(rock, r);
// 		if (r.ID!=rock.ID) {
// 			if (!closeRock1 && !closeRock2) closeRock1 = {rock: r, dist: d};
// 			else if (closeRock1 && !closeRock2 && r.ID!=closeRock1.rock.ID) closeRock2 = {rock: r, dist: d};
// 			else if (closeRock1 && closeRock2 && r.ID!=closeRock1.rock.ID && r.ID!=closeRock2.rock.ID) {
// 				if (closeRock1.dist<d && d<closeRock2.dist) closeRock2 = {rock: r, dist: d};
// 				else if (closeRock2.dist<d && d<closeRock1.dist) closeRock1 = {rock: r, dist: d};
// 				else if (d<closeRock1.dist && d<closeRock2.dist && closeRock1.dist<closeRock2.dist) closeRock2 = {rock: r, dist: d};
// 				else if (d<closeRock1.dist && d<closeRock2.dist && closeRock2.dist<closeRock1.dist) closeRock1 = {rock: r, dist: d};
// 			}
// 		}
// 	}
// 	return closeRock1 && closeRock2 && closeRock1.dist<=largeRockHeight && closeRock2.dist<=largeRockHeight;
// }

function findRocksInRegion(A, B, A_box, B_box) {
	var rocksInRegion = [];
	for (var i=0; i<rocks.length; i++) {
		var C = rocks[i];
		if (C.ID!=A.ID && C.ID!=B.ID) {
			if (!rectOverlap(A, C) && !rectOverlap(B, C) && CIsInRegionOfAAndB(C, A_box, B_box)) {
				if (CIsBetweenAAndB(C, A_box, B_box)) {
					if (CSharesAPropertyWithA(C, A)) {
						rocksInRegion.push(C);
					} else {
						return [];
					}
				}
			}
		}
	}
	return rocksInRegion;
}

// returns true if the average empty space in the sandwich is less than or equal to the height of a large rock
// function containsSandwich(A, rocks, B) {
// 	var vertical_arrangement = (B.y-(A.y+A.height))>(B.x-(A.x+A.width));
// 	var emptySpace = vertical_arrangement ? B.y-(A.y+A.height) : B.x-(A.x+A.width)
// 	var number_of_empty_spaces = rocks.length+1;
//   return emptySpace/number_of_empty_spaces<=largeRockHeight
// }

function containsSandwich(A, rocks, B) {
	var vertical_arrangement = (B.y-(A.y+A.height))>(B.x-(A.x+A.width));
	var orderedRocks = [];
	while (rocks.length>0) {
		var most_left;
		for (var i=0; i<rocks.length; i++) {
			if (!most_left) most_left = rocks[i];
			else {
				if (vertical_arrangement && rocks[i].y < most_left.y) most_left = rocks[i];
				else if (rocks[i].x < most_left.x) most_left = rocks[i];
			}
		}
		orderedRocks.push(most_left);
		rocks.splice(rocks.indexOf(most_left), 1);
	}
	for (var i=-1; i<orderedRocks.length; i++) {
		if (i===-1 && distanceBetweenRocks(A, orderedRocks[0])>largeRockHeight) return false;
		else if (i===orderedRocks.length-1 && distanceBetweenRocks(orderedRocks[i], B)>largeRockHeight) return false;
		else if (i>=0 && i<orderedRocks.length-1) {
			if (distanceBetweenRocks(orderedRocks[i], orderedRocks[i+1])>largeRockHeight) return false;
		}
	}
	return true;
}

function distanceBetweenRocks(A, B) {
	var ACenter = [A.x+A.width/2, A.y+A.height/2]
	   ,BCenter = [B.x+B.width/2, B.y+B.height/2];
	var t1 = Math.pow(BCenter[0]-ACenter[0], 2)
	   ,t2 = Math.pow(BCenter[1]-ACenter[1], 2);
	return Math.pow(t1+t2, 1/2) - A.height/2 - B.height/2;
}

function CIsInRegionOfAAndB(C, A_box, B_box) {
	var lineSet1 = getTopLeftBottomRightLineSet(A_box, B_box)
	   ,lineSet2 = getBottomLeftTopRightLineSet(A_box, B_box);
	var lineSet;
	var cCenter = getCenterOf(C);
	if (A_box.topLeft.x===B_box.topLeft.x || A_box.topLeft.y===B_box.topLeft.y) {
		lineSet = lineSet1;
	} else {
		lineSet = getWidestArea(lineSet1, lineSet2);
	}
	return inBetween(cCenter, lineSet);
}

function CIsBetweenAAndB(C, A_box, B_box) {
	var lineSet1 = getTopLeftBottomRightLineSet(A_box, B_box)
	   ,lineSet2 = getBottomLeftTopRightLineSet(A_box, B_box);
	var lineSet;
	var cCenter = getCenterOf(C);
	if (A_box.topLeft.x===B_box.topLeft.x || A_box.topLeft.y===B_box.topLeft.y) {
		lineSet = lineSet1;
	} else {
		lineSet = getWidestArea(lineSet1, lineSet2);
	}
	return inBetween(cCenter, lineSet) && ((A_box.topRight.x < cCenter.x && cCenter.x < B_box.topLeft.x)
		                                     || (A_box.bottomLeft.y < cCenter.y && cCenter.y < B_box.topLeft.y));
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
	return range1 <= value && value <= range2;
}
var rocks;

var controlWindowSatisfiesSupportCategory = function() {
	rocks = getRocksWithinControlZoneWindow();
	for (var i=0; i<rocks.length; i++) {
		if (rockSatisfiesSupportCategory(i)) return true;
	}
	return false;
}

var userWindowSatisfiesSupportCategory = function() {
	rocks = getRocksWithinUserZoneWindow();
	for (var i=0; i<rocks.length; i++) {
		if (rockSatisfiesSupportCategory(i)) return true;
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

function rockSpaceIsWithinWindowSpace(rockSpace, windowSpace) {
	return (windowSpace.x1<rockSpace.x1
			 && windowSpace.y1<rockSpace.y1
			 && rockSpace.x2<windowSpace.x2
			 && rockSpace.y2<windowSpace.y2);
}

var rockSatisfiesSupportCategory = function(rockIDX) {
	var A = rocks[rockIDX]
	for (var i=0; i<rocks.length; i++) {
		for (var j=0; j<rocks.length; j++) {
			if (i!==j && i!==rockIDX && j!==rockIDX) {
				var B = rocks[i], C = rocks[j];
				if (runChecks(A, B, C)) return true;
			}
		}
	}
	return false;
}

var runChecks = function(A, B, C) {
	// console.log('A:', A);
	var test1 = ABottomTouchesBAndCTops(A, B, C)
	   ,test2 = BIsCenterLeftOfA(A, B)
	   ,test3 = CIsCenterRightOfA(A, C);
	// console.log('test1', test1);
	// console.log('test2', test2);
	// console.log('test3', test3);
	return test1 && test2 && test3;
}

function aboutEqual(val1, val2, give) {
	return val1 < val2 + give && val1 > val2 - give;
}

function ABottomTouchesBAndCTops(A, B, C) {
	var halfBorderThickness = 3;
	var ABottomBTop = aboutEqual(A.y + A.height, B.y, halfBorderThickness)
	   ,ABottomCTop = aboutEqual(A.y + A.height, C.y, halfBorderThickness)
	   ,AAndBHorizontallyAligned = A.x + A.width > B.x - halfBorderThickness
												  		&& A.x < B.x + B.width + halfBorderThickness
		 ,AAndCHorizontallyAligned = A.x + A.width > C.x - halfBorderThickness
												  		&& A.x < C.x + C.width + halfBorderThickness;
	var ABottomBTopTouch = ABottomBTop && AAndBHorizontallyAligned
	   ,ABottomCTopTouch = ABottomCTop && AAndCHorizontallyAligned;

	return ABottomBTopTouch && ABottomCTopTouch;
}

var BIsCenterLeftOfA = function(A, B) {
	var ACenter = (A.x + A.x + A.width)/2;
	var ALeft = A.x;
	var BCenter = (B.x + B.x + B.width)/2;
	var BRight = B.x + B.width;

	return BCenter < ACenter && BRight > ALeft;
}

var CIsCenterRightOfA = function(A, C) {
	var ACenter = (A.x + A.x + A.width)/2;
	var ARight = A.x + A.width;
	var CCenter = (C.x + C.x + C.width)/2;
	var CLeft = C.x;

	return CCenter > ACenter && CLeft < ARight;
}

var rectOverlap = function(A, B) {
	var xOverlap = valueInRange(A.x, B.x, B.x + B.width) ||
								 valueInRange(B.x, A.x, A.x + A.width);

	var yOverlap = valueInRange(A.y, B.y, B.y + B.height) ||
	               valueInRange(B.y, A.y, A.y + A.height);

	return xOverlap && yOverlap;
}

var valueInRange = function(value, range1, range2) {
	return range1 < value && value < range2;
}
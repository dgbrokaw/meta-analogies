var rocks;

var windowSatisfiesSupportCategory = function(collection) {
	//if (collection.numberOfRocks() !== 3) return false;
	rocks = collection.getRocks();
	for (var i=0; i<rocks.length; i++) {
		if (rockSatisfiesSupportCategory(i)) return true;
	}
	return false;
}

// var rockSatisfiesSupportCategory = function(rockIDX) {
// 	var A = rocks[rockIDX]
// 	   ,B = rocks[(rockIDX+1)%3]
// 	   ,C = rocks[(rockIDX+2)%3];

// 	return runChecks(A, B, C) || runChecks(A, C, B);
// }

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
	console.log('A:', A);
	var test1 = ATouchesBAndATouchesC(A, B, C)
	var test2 = AIsAboveBAndC(A, B, C)
	var test3 = BIsCenterLeftOfA(A, B)
	var test4 = CIsCenterRightOfA(A, C);
	console.log('test1', test1);
	console.log('test2', test2);
	console.log('test3', test3);
	console.log('test4', test4);
	return test1 && test2 && test3 && test4;
}

var ATouchesBAndATouchesC = function(A, B, C) {
	return rectTouch(A, B) && rectTouch(A, C);
}

var rectTouch = function(A, B) {
	var halfBorderThickness = 3;
	var ABottomBTop = aboutEqual(A.y + A.height, B.y, halfBorderThickness);
	var ARightBLeft = aboutEqual(A.x + A.width, B.x, halfBorderThickness);
	var ATopBBottom = aboutEqual(A.y, B.y + B.height, halfBorderThickness);
	var ALeftBRight = aboutEqual(A.x, B.x + B.width, halfBorderThickness);
	var verticallyAligned = A.y + A.height > B.y - halfBorderThickness
													&& A.y < B.y + B.height + halfBorderThickness;
	var horizontallyAligned = A.x + A.width > B.x - halfBorderThickness
												  && A.x < B.x + B.width + halfBorderThickness;
	var topBottomTouch = ABottomBTop && horizontallyAligned;
	var bottomTopTouch = ATopBBottom && horizontallyAligned;
	var rightLeftTouch = ARightBLeft && verticallyAligned;
	var leftRightTouch = ALeftBRight && verticallyAligned;

	return topBottomTouch || bottomTopTouch || rightLeftTouch || leftRightTouch;
}

var aboutEqual = function(val1, val2, give) {
	return val1 < val2 + give && val1 > val2 - give;
}

var AIsAboveBAndC = function(A, B, C) {
	return A.y < B.y && A.y < C.y;
}

var BIsCenterLeftOfA = function(A, B) {
	var ACenter = (A.x + A.x + A.width)/2;
	var BCenter = (B.x + B.x + B.width)/2;

	return BCenter < ACenter && BCenter > A.x;
}

var CIsCenterRightOfA = function(A, C) {
	var ACenter = (A.x + A.x + A.width)/2;
	var CCenter = (C.x + C.x + C.width)/2;

	return CCenter > ACenter && CCenter < A.x + A.width;
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
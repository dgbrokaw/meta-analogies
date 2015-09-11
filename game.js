var Game = function(subjectID) {
	this.subjectID = subjectID ? subjectID : null;
	//this.stimuli = stimuli;

	this.record = [];
}

Game.prototype.setSubjectID = function(ID) {
	this.subjectID = ID;
}

Game.prototype.createAndSetSubjectID = function() {
	this.subjectID = uid().slice(1, 6);
}

Game.prototype.getSubjectID = function() {
	return this.subjectID;
}

Game.prototype.setCondition = function(condition) {
  this.condition = condition;
}

Game.prototype.addRow = function(data) {
	this.record.push(data);
}

Game.prototype.deleteLastRow = function() {
	this.record.pop();
}

var Row = function() {
  this.subjectID;

  this.date;
  this.t;

  this.stimulusNum;
  this.stimulus;
  this.userRocks;
  this.userAction;
  this.categorySatisfied;
}

function uid() {
  var b32 = 0x100000000, f = 0xf, b = []
  str = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];
  var i = 0;
  var r = Math.random()*b32;
  b[i++] = str[r & f];
  b[i++] = str[r>>>4 & f];
  b[i++] = str[r>>>8 & f];
  b[i++] = str[r>>>12 & f];
  b[i++] = str[r>>>16 & f];
  b[i++] = str[r>>>20 & f];
  b[i++] = str[r>>>24 & f];
  b[i++] = str[r>>>28 & f];
  r = Math.random()*b32;
  b[i++] = str[r & f];
  b[i++] = str[r>>>4 & f];
  b[i++] = str[r>>>8 & f];
  b[i++] = str[r>>>12 & f];
  b[i++] = str[r>>>16 & f];
  b[i++] = str[r>>>20 & f];
  b[i++] = str[r>>>24 & f];
  b[i++] = str[r>>>28 & f];
  return "_" + b.join("");
}
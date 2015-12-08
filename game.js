var Game = function(subjectID, track, settings) {
	this.subjectID = subjectID ? subjectID : null;
  this.condition = track.condition;

  this.phases = this.setupPhases(track.track, settings);

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

Game.prototype.setupPhases = function(track, settings) {
  var self = this;
  var instantiatedPhases = [];
  track.forEach(function(phase, idx) {
    var instantiatedPhase = new phases[phase[0]](phase[1], settings || {});
    instantiatedPhase.phaseNum = idx;
    instantiatedPhase.events
      .on('start', function() { console.log('Phase', phase, 'has started') })
      .on('data', self.addRow.bind(self))
      .on('end', self.phaseEnd.bind(self));
    instantiatedPhases.push(instantiatedPhase);
  })
  return instantiatedPhases;
}

Game.prototype.startGame = function() {
  this.phases[0].start();
}

Game.prototype.addRow = function(data) {
  data.subjectID = this.subjectID;
  data.condition = this.condition;
	this.record.push(data);
}

// Game.prototype.phaseEnd = function(phaseNum) {
//   if (phaseNum+1 < this.phases.length) {
//     this.phases[phaseNum+1].start();
//   } else {
//     this.saveData(this.record);
//   }
// }

Game.prototype.phaseEnd = function(phaseNum) {
  if (this.record.length) {
    this.saveData(this.record, phaseNum);
    this.record = [];
  }
  if (phaseNum+1 < this.phases.length) {
    this.phases[phaseNum+1].start();
  }
}

Game.prototype.saveData = function(data, phaseNum) {
  // using the FileSaver.js to save the game to file
  // (should contain all user and test data)

  var csv = d3.csv.format(data);
  var blob = new Blob([csv], {type: 'text/csv'});
  var fileName = ''
    + (new Date()).toDateString().replace(/ /g, "-")
    + 'subject' + this.getSubjectID()
    + 'phase' + phaseNum
    + '.csv';
  saveAs(blob, fileName);
}

Game.prototype.setCondition = function(condition) {
  this.condition = condition;
}

Game.prototype.deleteLastRow = function() {
	this.record.pop();
}

var Row = function() {
  // this.subjectID;

  // this.date;
  // this.t;

  // this.stimulusNum;
  // this.stimulus;
  // this.userRocks;
  // this.userAction;
  // this.categorySatisfied;
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
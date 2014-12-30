var Game = function(subjectID) {
	this.subjectID = subjectID ? subjectID : null;
	//this.stimuli = stimuli;

	this.record = [];
}

Game.prototype.setSubjectID = function(ID) {
	this.subjectID = ID;
}

Game.prototype.getSubjectID = function() {
	return this.subjectID;
}

Game.prototype.addRow = function(data) {
	this.record.push(data);
}


var Stimuli = function() {
	this.set = [];
	this.currentStimulus = -1;
}

Stimuli.prototype.addStimuli = function(folder, stimuli, areTogs) {
	for (var i=0; i<stimuli.length; i++) {
		var file = 'stimuli/' + folder + '/' + stimuli[i]
		  , code = stimuli[i].slice(0, stimuli[i].length-4);

		var stimulusDescription = this.decodeStimulus(code);
		var stimulus = { file: file
									 , code: code
									 , description: stimulusDescription
			           	 , answer: stimulusDescription.type !== '7' };

		this.set.push(stimulus);
	}
}

Stimuli.prototype.shuffle = function() {
	this.set = tools.shuffle(this.set);
}

Stimuli.prototype.getCurrentStimulus = function() {
	return this.set[this.currentStimulus];
}

Stimuli.prototype.getNextStimulus = function() {
	this.currentStimulus++;
	return this.currentStimulus < this.set.length ? this.set[this.currentStimulus] : false;
}

Stimuli.prototype.decodeStimulus = function(code) {
	var description = {};

	var parts = code.split('-');

	description.stimIndex = parts[0];
	description.stimLength = parts[1];
	description.anchorColor = this.convertColor(parts[2]);
	description.anchorSize = this.convertSize(parts[3]);
	description.book1Color = this.convertColor(parts[4]);
	description.book2Color = this.convertColor(parts[5]);
	description.book1Size = this.convertSize(parts[6]);
	description.book2Size = this.convertSize(parts[7]);
	description.orientation = parts[8] === 'h' ? 'horizontal' : 'vertical';
	description.type = parts[9];

	return description;
}

Stimuli.prototype.convertColor = function(colorCode) {
	switch (colorCode) {
		case 'b':
			return 'black';
		case 'g':
			return 'green';
		case 'w':
			return 'white';
		default:
			return '-'
	}
}

Stimuli.prototype.convertSize = function(sizeCode) {
	switch (sizeCode) {
		case 'l':
			return 'large';
		case 'm':
			return 'medium';
		case 's':
			return 'small';
		default:
			return '-';
	}
}

var trainingTogs = [
	'15-4-b-s-b-b-s-s-h-0.PNG'
, '27-4-g-l-g-g-s-s-v-1.PNG'
, '34-4-g-m-g-g-m-m-v-0.PNG'
, '54-4-w-l-w-w-l-l-v-0.PNG'
, '62-4-b-m-b-b-m-l-v-1.PNG'
, '95-4-w-s-w-w-s-l-h-1.PNG'
, '123-4-g-s-b-g-s-s-h-2.PNG'
, '161-4-b-l-g-g-l-l-h-2.PNG'
, '180-4-w-l-w-g-l-l-v-2.PNG'
, '193-4-b-m-w-b-m-l-v-3.PNG'
, '209-4-w-m-b-w-m-l-v-3.PNG'
, '214-4-g-s-g-w-l-s-v-3.PNG'
, '221-3-b-l-b--s--h-1.png'
, '239-3-g-m-g--s--v-1.png'
, '255-3-w-s-w--m--v-1.png'
, '259-3-g-l-b--l--h-2.png'
, '267-3-b-m-g--m--h-2.png'
, '270-3-w-s-g--s--h-2.png'
, '297-3-g-m-g--m--h-0.png'
, '304-3-b-s-b--s--v-0.png'
, '308-3-w-l-w--l--v-0.png'
];

var trainingContrasts = [
	'311-3--------7.png'
, '312-3--------7.png'
, '313-3--------7.png'
, '314-3--------7.png'
, '315-3--------7.png'
, '316-3--------7.png'
, '317-3--------7.png'
, '318-3--------7.png'
, '319-3--------7.png'
, '557-4--------7.png'
, '558-4--------7.png'
, '559-4--------7.png'
, '560-4--------7.png'
, '561-4--------7.png'
, '562-4--------7.png'
, '563-4--------7.png'
, '564-4--------7.png'
, '565-4--------7.png'
, '566-4--------7.png'
, '567-4--------7.png'
, '568-4--------7.png'
];

var testTogs = [
	'109-4-b-s-g-g-s-s-v-2.PNG'
, '11-4-b-m-b-b-m-m-h-0.PNG'
, '144-4-g-m-b-g-m-m-v-2.PNG'
, '151-4-g-m-w-w-m-m-v-2.PNG'
, '165-4-b-l-w-w-l-l-h-2.PNG'
, '17-4-b-l-b-b-m-m-v-1.PNG'
, '188-4-g-s-b-g-s-m-v-3.PNG'
, '200-4-w-l-w-g-s-l-h-3.PNG'
, '215-4-b-l-g-b-l-m-v-3.PNG'
, '217-4-w-m-w-g-s-m-h-3.PNG'
, '225-3-g-l-g--s--h-1.png'
, '222-3-b-l-b--m--h-1.png'
, '228-3-g-l-g--m--v-1.png'
, '23-4-g-l-g-g-s-s-v-1.PNG'
, '232-3-w-l-w--m--v-1.png'
, '236-3-b-m-b--l--v-1.png'
, '238-3-g-m-g--l--h-1.png'
, '245-3-b-s-b--m--h-1.png'
, '25-4-g-s-g-g-s-s-h-0.PNG'
, '257-3-w-l-b--l--h-2.png'
, '260-3-g-l-w--l--h-2.png'
, '262-3-b-l-w--l--h-2.png'
, '271-3-g-s-b--s--h-2.png'
, '273-3-b-s-g--s--h-2.png'
, '282-3-w-m-g--m--v-2.png'
, '286-3-b-m-w--m--v-2.png'
, '294-3-g-s-g--s--h-0.png'
, '298-3-b-m-b--m--h-0.png'
, '299-3-w-l-w--l--h-0.png'
, '305-3-w-m-w--m--v-0.png'
, '306-3-g-m-g--m--v-0.png'
, '307-3-b-m-b--m--v-0.png'
, '310-3-b-l-b--l--v-0.png'
, '4-4-b-m-b-b-m-m-v-0.PNG'
, '44-4-w-s-w-w-s-s-h-0.PNG'
, '65-4-b-l-b-b-m-s-h-1.PNG'
, '81-4-g-s-g-g-l-m-h-1.PNG'
];

var testContrasts = [
	'320-3--------7.png'
, '321-3--------7.png'
, '322-3--------7.png'
, '323-3--------7.png'
, '324-3--------7.png'
, '325-3--------7.png'
, '326-3--------7.png'
, '327-3--------7.png'
, '328-3--------7.png'
, '329-3--------7.png'
, '330-3--------7.png'
, '331-3--------7.png'
, '332-3--------7.png'
, '333-3--------7.png'
, '334-3--------7.png'
, '335-3--------7.png'
, '336-3--------7.png'
, '337-3--------7.png'
, '338-3--------7.png'
, '339-3--------7.png'
, '340-3--------7.png'
, '569-4--------7.png'
, '570-4--------7.png'
, '571-4--------7.png'
, '572-4--------7.png'
, '573-4--------7.png'
, '574-4--------7.png'
, '575-4--------7.png'
, '576-4--------7.png'
, '577-4--------7.png'
, '578-4--------7.png'
, '579-4--------7.png'
, '580-4--------7.png'
, '581-4--------7.png'
, '582-4--------7.png'
, '583-4--------7.png'
, '584-4--------7.png'
];

var trainingStimuli = new Stimuli();
trainingStimuli.addStimuli('training', trainingTogs, true);
trainingStimuli.addStimuli('training', trainingContrasts, false);

var testStimuli = new Stimuli();
testStimuli.addStimuli('test', testTogs, true);
testStimuli.addStimuli('test', testContrasts, false);
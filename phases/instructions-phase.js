var InstructionsPhase = function(instructions) {
	this.instructionsType = instructions.type;
	this.instructions = instructions.instructions;

	this.events = d3.dispatch('start', 'data', 'end');
}

phases['instruction'] = InstructionsPhase;

InstructionsPhase.prototype.start = function() {
	var phase = this;
	this.events.start();
	this.setupInstructions();
	d3.select('#advance')
		.on('click', function() {
			d3.select('#instructions').remove();
			phase.events.end(phase.phaseNum);
		})
}

InstructionsPhase.prototype.setupInstructions = function() {
	var div = d3.select('body').append('div')
		.attr('id', 'instructions');

	if (this.instructionsType === 'message') {
		this.instructions.forEach(function(instruction) {
			div.append('p').text(instruction);
		});
	} else {
		div.append('img')
			.attr('x', '300px')
			.attr('y', '300px')
			// .attr('width', '100%')
			// .attr('height', '100%')
			.attr('src', this.instructions);
	}

	div.append('div').attr('id', 'advanceButtonDiv').append('button')
		.attr('id', 'advance')
		.style({'margin-top': '2%', 'margin-left': '2%', 'width': '30%', 'height': '4%', 'float': 'right'})
		.text('Next');
}
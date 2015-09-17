var ConditionPhase = function() {
	this.events = d3.dispatch('end');
}

phases['condition'] = ConditionPhase;

ConditionPhase.prototype.start = function() {
	var phase = this;
	this.setupRequest();
}

// ConditionPhase.prototype.setupRequest = function() {
// 	var div = d3.select('body').append('div')
// 							.attr('id', 'instructions');
// 	div.append('input')
// }

ConditionPhase.prototype.setupRequest = function() {
	var phase = this;
	var conditionRequestHTML = "" +
		"<div id='instructions' style='margin-left:45%;margin-top:10%'>" +
			"<form name='subjectIDs'>" +
				"<p>Subject ID: <input type='text' name='SubjectID' value='1'><br>" +
					"Condition: <input type='text' name='Condition' value='1'><br><br>" +
					"<input type='Button' id='enter' value='Enter'>" +
		 		"</p>" +
		 	"</form>" +
		"</div>";

	d3.select('body').html(conditionRequestHTML);

	d3.select('#enter').on('click', function() {
		phase.submitCondition(this.form);
	});
}

ConditionPhase.prototype.submitCondition = function(form) {
	var settings = { subjectID: form.SubjectID.value
	               , condition: form.Condition.value };
	d3.select('#instructions').remove();
	this.events.end(settings);
}

// function submitCondition(form) {
// 	var settings = { subjectID: form.SubjectID.value
// 	               , condition: form.Condition.value };
// 	d3.select('#instructions').remove();
// 	phase.events.end(settings);
// }
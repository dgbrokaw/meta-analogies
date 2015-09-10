function displayConditionRequest() {
	d3.select('body').html(conditionRequestHTML);
}

function teardownConditionRequest() {
	d3.select('#request').remove();
}

function submitCondition(form) {
	game.setSubjectID(form.SubjectID.value);
	game.setCondition(form.Condition.value);
	teardownConditionRequest();
	displayTrainingInstructions();
}

var conditionRequestHTML = "" +
	"<div id='instructions' style='margin-left:45%;margin-top:10%'>" +
		"<form name='subjectIDs'>" +
			"<p>Subject ID: <input type='text' name='SubjectID' value='1'><br>" +
				"Condition: <input type='text' name='Condition' value='1'><br><br>" +
				"<input type='Button' value='Enter' onClick='submitCondition(this.form)'>" +
	 		"</p>" +
	 	"</form>" +
	"</div>";
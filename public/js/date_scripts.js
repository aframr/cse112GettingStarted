/**
 * Checks if date is valid.
 * @param {string} date - the date inputted
 */
function isValidDate(date) { // (mm/dd/yyyy)
	//console.log(date + "\n");
	var match = date.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
	if (match == null) {
		return false;
	}
	var validDate = [31,28,31,30,31,30,31,31,30,31,30,31];
	var parsed_date = date.split("/");
	var year = match[3];
	var month = match[1];
	var day = match[2];
	console.log(month + "/" + day + "/" + year);
	//var year = parseInt(parsed_date[2]);
	//var month = parseInt(parsed_date[0]);
	//var day = parseInt(parsed_date[1]);
	if (year < 0 || day <= 0 || month <= 0 || month > 12)
		return false;
	if (year%4 == 0)
		validDate[1] = 29;
	if(day <= validDate[month-1])
		return true;
	return false;
}
function isValidDateRet(date){
	var ret = isValidDate(date);
	document.getElementsByName('output1')[0].value= ret;
}

/**
 * Converts date format to 'dd/mm/yyyy'
 * @param {string} date - Takes the date with format of 'mm/dd/yy' and converts to format 'dd/mm/yyyy'
 */
function formatDate(date) { // input is mm/dd/yyyy || mm-dd-yyyy to output dd/mm/yyyy || dd-mm-yyyy
	if (!isValidDate(date)) {
		return "Invalid Date";
	}
	var match = date.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
	var year = match[3];
	var month = match[1];
	var day = match[2];
	var newDate = day + "/" + month + "/" + year;
	return newDate;
}

function formatDateRet(date) {
	var ret = formatDate(date);
	document.getElementsByName('output2')[0].value= newDate;
}



// this is necessary for mocha to recognize these functions via require
if (typeof module !== 'undefined' && module.exports != null) {
	    exports.isValidDate = isValidDate;
	    exports.formatDate = formatDate;
}

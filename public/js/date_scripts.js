function is_valid_date(date) { // (mm/dd/yyyy)
	//console.log(date + "\n");
	var match = date.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
	if (match == null) {
		return false;
	}
	var valid_date = [31,28,31,30,31,30,31,31,30,31,30,31];
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
		valid_date[1] = 29;
	if(day <= valid_date[month-1])
		return true;
	return false;
}

function format_date(date) { // input is mm/dd/yyyy || mm-dd-yyyy to output dd/mm/yyyy || dd-mm-yyyy
	var match = date.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
	var year = match[3];
	var month = match[1];
	var day = match[2];
	var new_date = day + "/" + month + "/" + year;
	return new_date;
}

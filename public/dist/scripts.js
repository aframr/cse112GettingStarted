/**
 * Checks if date is valid, i.e. of general format mm/dd/yyyy, with (m)onth and
 * (d)ay being either single or double digit, and '/' replaceable with '-', and
 * of valid numeric value
 * @param {String} date - the date string inputted
 * @return {Boolean} - true if valid date, false if invalid date
 */
function isValidDate(date) { // (mm/dd/yyyy)
  let match = null;
  if (!(typeof (date) === 'string')) {
    return false;
  }

  match = date.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);

  if (match == null) {
    match = date.match(/^(\d{1,2})-(\d{1,2})-(\d{4})$/);
    if (match == null) {
      return false;
    }
  }

  const validDate = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const year = match[3];
  const month = match[1];
  const day = match[2];

  if (year < 0 || day <= 0 || month <= 0 || month > 12) {
    return false;
  }

  if (year % 4 === 0) {
    if (year % 100 !== 0) {
      validDate[1] = 29;
    } else if (year % 100 === 0 && year % 400 === 0) {
      validDate[1] = 29;
    }
  }

  if (day <= validDate[month - 1]) {
    return true;
  }
  return false;
}

/**
 * Converts date format to 'dd/mm/yyyy' from mm/dd/yyyy, '/' replaceable
 * with '-' and (m)onth and (d)ay permissible as single or double digit
 * @param {string} date - the date string inputted
 */
function formatDate(date) { // input is mm/dd/yyyy || mm-dd-yyyy to output dd/mm/yyyy || dd-mm-yyyy
  if (!(typeof (date) === 'string')) {
    return 'Invalid Date';
  }
  if (!isValidDate(date)) {
    return 'Invalid Date';
  }
  const match = date.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/);
  const year = match[3];
  const month = match[1];
  const day = match[2];
  const newDate = `${day}/${month}/${year}`;
  return newDate;
}

// this is necessary for mocha to recognize these functions via require
if (typeof (module) !== 'undefined' && module.exports !== null) {
  exports.isValidDate = isValidDate;
  exports.formatDate = formatDate;
}

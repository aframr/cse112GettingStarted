const assert = require('assert');
var scripts = require('../public/js/date_scripts.js');

describe('isValidDate():', function() {
	describe('regex tests:', function() {
		it('improper formats', function() {
			assert.equal(false, scripts.isValidDate("03 15 2017"));
			assert.equal(false, scripts.isValidDate("03152017"));
			assert.equal(false, scripts.isValidDate("03-15-2017-00"));
			assert.equal(false, scripts.isValidDate("/03/15/2017"));
			assert.equal(false, scripts.isValidDate("03/15//2017"));
			assert.equal(false, scripts.isValidDate("3-1/2014"));
			assert.equal(false, scripts.isValidDate("3/23-2015"));
		});
		it('proper formats', function() {
			assert.equal(true, scripts.isValidDate("03/15/2017"));
			assert.equal(true, scripts.isValidDate("3/1/2017"));
			assert.equal(true, scripts.isValidDate("3-1-2017"));
			assert.equal(true, scripts.isValidDate("03-01-2017"));
		});
	});
	describe('valid date values:', function() {
		it('valid year values', function() {
			assert.equal(false, scripts.isValidDate("03/15/-2017"));
			assert.equal(true, scripts.isValidDate("3/1/2017"));
		});
		it('valid month values', function() {
			assert.equal(false, scripts.isValidDate("13/15/2017"));
			assert.equal(false, scripts.isValidDate("00/01/2017"));
			assert.equal(false, scripts.isValidDate("0/01/2017"));
			assert.equal(false, scripts.isValidDate("-1/01/2017"));
			assert.equal(true, scripts.isValidDate("12/01/2017"));
			assert.equal(true, scripts.isValidDate("1/01/2017"));
		});
		it('valid day values', function() {
			assert.equal(false, scripts.isValidDate("03/0/2017"));
			assert.equal(false, scripts.isValidDate("03/32/2017"));
			assert.equal(false, scripts.isValidDate("3/-1/2017"));
			assert.equal(true, scripts.isValidDate("03/14/2017"));
		});
	});
	describe('corner cases:', function() {
		it('leap years', function() {
			assert.equal(false, scripts.isValidDate("02/29/2015"));
			assert.equal(false, scripts.isValidDate("02/29/2009"));
			// divisible by 100
			assert.equal(false, scripts.isValidDate("02/29/1800"));
			assert.equal(false, scripts.isValidDate("02/29/2100"));
			// divisible by 400
			assert.equal(true, scripts.isValidDate("02/29/2000"));
			assert.equal(true, scripts.isValidDate("02/29/2400"));
			assert.equal(true, scripts.isValidDate("02/29/2012"));
			assert.equal(true, scripts.isValidDate("02/29/2016"));
		});
	});
});

describe('formatDate():', function() {
	it('proper validDate connection', function() {
		assert.equal("Invalid Date", scripts.formatDate("99/99/2017"));
	});
	it('format tests', function() {
		assert.equal("15/03/2017", scripts.formatDate("03/15/2017"));
		assert.equal("01/02/2017", scripts.formatDate("02-01-2017"));
	});
});


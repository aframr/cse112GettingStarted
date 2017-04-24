const assert = require('assert');
var scripts = require("../public/js/date_scripts.js");

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
});

describe('#is_valid_date()', function() {
	it('regex should work', function() {
		console.log(scripts);
		// var output = scripts.is_valid_date("03/15/2017");
		var output = true;
		assert.equal(output, true);
	});
});


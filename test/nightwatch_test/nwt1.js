module.exports = {
  'test https://lucky13-cse112-getting-started.herokuapp.com' : function (browser) {
    browser
      .url('https://lucky13-cse112-getting-started.herokuapp.com')
      .waitForElementVisible('body', 1000)
      .setValue('#d1', '05/06/2015')
      .click('#validateButton')
      .pause(1000)
      .assert.visible('#checkmark')
      .click('#formatButton')
      .pause(1000)
      .assert.valueContains('#output2', '06/05/2015')
      .end();
  }
};

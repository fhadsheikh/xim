'use strict';

describe('Filter: trim', function () {

  // load the filter's module
  beforeEach(module('fatsApp'));

  // initialize a new instance of the filter before each test
  var trim;
  beforeEach(inject(function ($filter) {
    trim = $filter('trim');
  }));

  it('should return the input prefixed with "trim filter:"', function () {
    var text = 'angularjs';
    expect(trim(text)).toBe('trim filter: ' + text);
  });

});

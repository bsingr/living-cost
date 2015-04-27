'use strict';
var assert = require('assert'),
    Map = require('../lib/map').Map;
describe('Map', function(){
  it('has 3 points', function(){
    var t = new Map();
    assert.deepEqual(t.vector(0), [0,0]);
    assert.deepEqual(t.vector(1), [0,0]);
  });
});

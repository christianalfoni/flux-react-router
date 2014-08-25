/** @jsx React.DOM */
var expect = require('chai').expect;

describe('utils', function() {
  describe('removeEmptyInArray', function () {
    it('should remove empty strings in array', function () {
      var utils = require('../app/utils.js');
      expect(utils.removeEmptyInArray(['', ''])).to.eql([]);
      expect(utils.removeEmptyInArray(['foo', ''])).to.eql(['foo']);
      expect(utils.removeEmptyInArray(['foo', 'bar'])).to.eql(['foo', 'bar']);
      expect(utils.removeEmptyInArray([null, ''])).to.eql([]);
      expect(utils.removeEmptyInArray([0, ''])).to.eql([0]);
    });
  });
  describe('match', function () {
    it('should match routes by delimiter /', function() {
      var utils = require('../app/utils.js');
      expect(utils.match('/', '/')).to.equal(true);
      expect(utils.match('/posts', '/posts')).to.equal(true);
      expect(utils.match('/', '/foo')).to.equal(false);
      expect(utils.match('/posts', '/users')).to.equal(false);
    });
    it('should match * to any route', function () {
      var utils = require('../app/utils.js');
      expect(utils.match('/', '*')).to.equal(true);
      expect(utils.match('/posts', '*')).to.equal(true);
      expect(utils.match('/foo/bar', '*')).to.equal(true);
    });
  });
  describe('getParams', function () {
    it('should return empty object of no params found', function () {
     var utils = require('../app/utils.js');
     expect(utils.getParams('/', '/')).to.eql({});   
   });
    it('should return params if defined on route', function () {
     var utils = require('../app/utils.js');
     expect(utils.getParams('/posts/1', '/posts/{id}')).to.eql({id: '1'});
     expect(utils.getParams('/posts/1/create', '/posts/{id}/{action}')).to.eql({id: '1', action: 'create'});
    });
  });
});

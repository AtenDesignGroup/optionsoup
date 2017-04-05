const mocha = require('mocha');
const should = require('should');
const optionsoup = require('../index');

describe('optionsoup', function() {
  describe('parse', function() {
    it('handles single property', function() {
      let pieces = optionsoup.parse('part');
      should(pieces).have.length(1);
      should(pieces[0]).eql('part');
    });
    it('handles multiple properties', function() {
      let pieces = optionsoup.parse('part.part2');
      should(pieces).have.length(2);
      should(pieces[0]).eql('part');
      should(pieces[1]).eql('part2');
    });
    it('handles arrays', function() {
      let pieces = optionsoup.parse('part[0]');
      should(pieces).have.length(1);
      should(pieces[0]).eql({name: 'part', index: 0});
    });
  });

  describe('get', function() {
    it('finds existing property', function () {
      let obj = {'option': 123}
      should(optionsoup.get(obj, 'option')).eql(123);
    });
    it('does not find missing property', function () {
      let obj = {'option': 123}
      should(optionsoup.get(obj, 'thing')).is.false;
    });
    it('uses default value', function () {
      let obj = {'option': 123}
      should(optionsoup.get(obj, 'thing', 234)).eql(234);
    });
    it('handles nested options', function () {
      let obj = {'options': {'thing': 234}}
      should(optionsoup.get(obj, 'options.thing')).eql(234);
    });
    it('handles nested options with default options', function () {
      let obj = {'options': {'thing': 234}}
      should(optionsoup.get(obj, 'options.something', 123)).eql(123);
    });
    it('handles arrays', function () {
      let obj = {'option': [123]}
      should(optionsoup.get(obj, 'option[0]')).eql(123);
    });
    it('handles arrays with default value', function () {
      let obj = {'option': [123]}
      should(optionsoup.get(obj, 'option[10]', 234)).eql(234);
    });
    it('handles null', function () {
      let obj = {'option': null}
      should(optionsoup.get(obj, 'option.thing')).is.false;
    });
    it('handles null with arrays', function () {
      let obj = {'option': null}
      should(optionsoup.get(obj, 'option[0]')).is.false;
    });
  });
});

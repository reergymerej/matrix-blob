import { expect } from 'chai';
import app from '../src';

describe('isValidMatrix', () => {
  it('should return false if not an Array', () => {
    const matrix = 1;
    const result = app.isValidMatrix(matrix);
    expect(result).to.equal(false);
  });

  it('should return false if rows inequal in length', () => {
    const matrix = [
      [1, 1],
      [1, 1],
      [1, 1, 1],
    ];
    const result = app.isValidMatrix(matrix);
    expect(result).to.equal(false);
  });

  it('should return true for a valid matrix', () => {
    const matrix = [
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
    ];
    const result = app.isValidMatrix(matrix);
    expect(result).to.equal(true);
  });
});

describe('find', () => {
  describe('bad params', () => {
    it('should throw when missing matrix', () => {
      const fn = () => { app.find() };
      expect(fn).to.throw('matrix is required');
    });

    it('should throw for invalid matrix', () => {
      const fn = () => { app.find(1) };
      expect(fn).to.throw('invalid matrix');
    });

    it('should throw when missing comparator', () => {
      const fn = () => { app.find([]) };
      expect(fn).to.throw('comparator is required');
    });

    it('should throw for invalid comparator', () => {
      const fn = () => { app.find([], true) };
      expect(fn).to.throw('invalid comparator');
    });
  });

  describe('blob', () => {
    it('scenario a', () => {
      const matrix = [[]];
      const comparator = () => {};
      const expected = [];
      const result = app.find(matrix, comparator);
      expect(result).to.eql(expected);
    });

    xit('scenario b', () => {
      const matrix = [
        [0, 0, 0, 0],
        [0, 1, 1, 0],
      ];
      const comparator = () => {};
      const expected = [
        // blob
        [
          [1, 1],
          [1, 2],
        ],
      ];
      const result = app.find(matrix, comparator);
      expect(result).to.eql(expected);
    });
  });
});

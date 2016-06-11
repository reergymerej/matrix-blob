import { expect } from 'chai';
import app from '../src';

describe('find', () => {
  describe('bad params', () => {
    it('should throw when missing matrix', () => {
      const fn = () => { app.find() };
      expect(fn).to.throw('matrix is required');
    });

    it('should throw for invalid matrix', () => {
      const fn = () => { app.find(1, () => {}) };
      expect(fn).to.throw();
    });

    it('should throw when missing evaluator', () => {
      const fn = () => { app.find([]) };
      expect(fn).to.throw('evaluator is required');
    });

    it('should throw for invalid evaluator', () => {
      const fn = () => { app.find([], true) };
      expect(fn).to.throw('invalid evaluator');
    });
  });

  describe('blob', () => {
    it('scenario a', () => {
      const matrix = [[]];
      const evaluator = () => {};
      const expected = [];
      const result = app.find(matrix, evaluator);
      expect(result).to.eql(expected);
    });

    it('scenario b', () => {
      const matrix = [
        [0, 0, 0, 0],
        [0, 1, 1, 0],
      ];
      const evaluator = (value) => { return value === 1 };
      const expected = [
        // blob
        [
          [1, 1],
          [1, 2],
        ],
      ];
      const result = app.find(matrix, evaluator);
      expect(result).to.eql(expected);
    });
  });
});

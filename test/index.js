import { expect } from 'chai';
import app from '../src';
// import Matrix from '../src/Matrix';

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
      const a = [[]];
      const evaluator = () => {};
      const expected = [];
      const result = app.find(a, evaluator);
      expect(result).to.eql(expected);
    });

    it('scenario b', () => {
      const b = [
        [0, 0, 0, 0],
        [0, 1, 1, 0],
      ];
      const evaluator = (value) => { return value === 1 };
      const expected = [
        [
          [1, 1],
          [1, 2],
        ],
      ];
      const result = app.find(b, evaluator);
      expect(result).to.eql(expected);
    });

    it('scenario c', () => {
      const evaluator = (value) => { return value === 1 };
      const c = [
        [0, 1, 1, 0],
        [1, 0, 0, 0],
        [1, 1, 1, 0],
      ];
      const expected = [
        // blob
        [
          [0, 1],
          [0, 2],
        ],

        [
          [1, 0],
          [2, 0],
          [2, 1],
          [2, 2],
        ],
      ];
      const result = app.find(c, evaluator);
      expect(result[0]).to.eql(expected[0]);
      expect(result[1]).to.eql(expected[1]);
    });

    it('scenario d', () => {
      const evaluator = (value) => { return value === 1 };
      const d = [
        [0, 1, 1, 1],
        [1, 0, 0, 1],
        [1, 1, 1, 1],
      ];
      const expected = [
        // blob
        [
          [0, 1],
          [0, 2],
          [0, 3],
          [1, 0],
          [1, 3],
          [2, 0],
          [2, 1],
          [2, 2],
          [2, 3],
        ],
      ];
      const result = app.find(d, evaluator);
      expect(result[0]).to.eql(expected[0]);
      expect(result.length).to.equal(1);
    });

    it('scenario e', () => {
      const evaluator = (value) => { return value === 1 };
      const d = [
        [0, 0, 1],
        [0, 0, 0],
        [0, 0, 1],
        [0, 1, 1],
      ];
      const blob1 = [
        [0, 2],
      ];
      const blob2 = [
        [2, 2],
        [3, 1],
        [3, 2],
      ];
      const result = app.find(d, evaluator);
      expect(result[0]).to.eql(blob1);
      expect(result[1]).to.eql(blob2);
      expect(result.length).to.equal(2);
    });

    it('should work for any value', () => {
      const Y = 666;
      const evaluator = (value) => {
        return value === Y;
      };
      const d = [
        [Y, Y, 0, Y], // 0
        [0, Y, Y, Y], // 1
      ];
      const blob1 = [0, 1, 3, 5, 6, 7];
      const result = app.find(d, evaluator, true);
      expect(result[0]).to.eql(blob1);
      expect(result.length).to.equal(1);
    });
  });

  describe('find with indices option', () => {
    it('should return indices instead of coords', () => {
      const matrix = [
        [0, 0, 0, 0],
        [0, 1, 1, 0],
      ];
      const evaluator = (value) => { return value === 1 };
      const expected = [
        [ 5, 6 ],
      ];
      const result = app.find(matrix, evaluator, true);
      expect(result).to.eql(expected);
    });
  });
});

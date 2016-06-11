import { expect } from 'chai';
import app from '../src';
import Matrix from '../src/Matrix';

const a = [[]];
const b = [
  [0, 0, 0, 0],
  [0, 1, 1, 0],
];


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
      // console.log(Matrix.print(a));
      const evaluator = () => {};
      const expected = [];
      const result = app.find(a, evaluator);
      expect(result).to.eql(expected);
    });

    it('scenario b', () => {
      // console.log(Matrix.print(b));
      const evaluator = (value) => { return value === 1 };
      const expected = [
        // blob
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

    it.only('scenario d', () => {
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
  });
});

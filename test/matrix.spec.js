import { expect } from 'chai';
import Matrix from '../src/Matrix';

describe('Matrix', () => {
  describe('construction', () => {
    it('should throw if rows not an Array', () => {
      const rows = 1;
      const fn = () => new Matrix(rows);
      expect(fn).to.throw('rows should be an Array');
    });

    it('should throw if any invalid rows', () => {
      const rows = [
        [1, 1],
        '11',
        [1, 1],
      ];
      const fn = () => new Matrix(rows);
      expect(fn).to.throw('invalid row');
    });

    it('should throw if rows inequal in length', () => {
      const rows = [
        [1, 1],
        [1, 1],
        [1, 1, 1],
      ];
      const fn = () => new Matrix(rows);
      expect(fn).to.throw('inequal rows');
    });
  });

  describe('getting points', () => {
    it('should have a value', () => {
      const rows = [
        [1, 2],
        [3, 4],
      ];
      const matrix = new Matrix(rows);
      const point = matrix.point(1, 0);
      expect(point.value).to.equal(3);
    });

    it('should have the unique index', () => {
      const rows = [
        [1, 2],
        [3, 4],
      ];
      const matrix = new Matrix(rows);
      const point = matrix.point(1, 1);
      expect(point.index).to.equal(3);
    });

    describe('east', () => {
      it('should have value if present ', () => {
        const rows = [
          [1, 2],
          [3, 4],
        ];
        const matrix = new Matrix(rows);
        const point = matrix.point(0, 0);
        expect(point.east.value).to.equal(2);
      });

      it('should be undefined if it does not exist', () => {
        const rows = [
          [1, 2],
          [3, 4],
        ];
        const matrix = new Matrix(rows);
        const point = matrix.point(0, 1);
        expect(point.east).to.be.undefined;
      });
    });

    describe('south', () => {
      it('should have value if present ', () => {
        const rows = [
          [1, 2],
          [3, 4],
        ];
        const matrix = new Matrix(rows);
        const point = matrix.point(0, 0);
        expect(point.south.value).to.equal(3);
      });

      it('should be undefined if it does not exist', () => {
        const rows = [
          [1, 2],
          [3, 4],
        ];
        const matrix = new Matrix(rows);
        const point = matrix.point(1, 1);
        expect(point.south).to.be.undefined;
      });

    });

    it('should return the correct value', () => {
      const rows = [
        [1, 2],
        [3, 4],
      ];
      const matrix = new Matrix(rows);
      const point = matrix.point(0, 0);
      expect(point.east.value).to.equal(2);
      expect(point.south.value).to.equal(3);
    });
  });

  describe('getCoordsFromIndex', () => {
    it('should return an array of [row, column] when valid', () => {
      const rows = [
        [1, 2],
        [3, 4],
      ];
      const matrix = new Matrix(rows);
      expect(matrix.getCoordsFromIndex(0)).to.eql([0, 0]);
      expect(matrix.getCoordsFromIndex(1)).to.eql([0, 1]);
      expect(matrix.getCoordsFromIndex(2)).to.eql([1, 0]);
      expect(matrix.getCoordsFromIndex(3)).to.eql([1, 1]);
    });

    it('should should throw when invalid', () => {
      const rows = [
        [1, 2],
        [3, 4],
      ];
      const matrix = new Matrix(rows);
      expect(() => matrix.getCoordsFromIndex(4)).to.throw('out of range');
      expect(() => matrix.getCoordsFromIndex(-1)).to.throw('out of range');
    });
  });
});

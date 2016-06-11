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
});

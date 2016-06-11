import { expect } from 'chai';
import app from '../src';

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

  describe('blobs', () => {
    it('should return nothing', () => {
      const matrix = [0, 0, 0, 0];
      const comparator = () => {};
      const expected = [];
      const result = app.find(matrix, comparator);
      expect(result).to.eql(expected);
    });
  });
});

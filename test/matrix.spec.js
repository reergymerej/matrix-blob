import { expect } from 'chai';
import Matrix from '../src/Matrix';

describe('Matrix', () => {
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

  it('should return a Matrix for valid rows', () => {
    const rows = [
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
    ];
    const result = new Matrix(rows);
    expect(result instanceof Matrix).to.equal(true);
  });
});

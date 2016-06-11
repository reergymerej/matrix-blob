import { expect } from 'chai';
import app from '../src';

describe('find', () => {
  it('should return nothing', () => {
    const matrix = [0, 0, 0, 0];
    const expected = [];
    const result = app.find(matrix);
    expect(result).to.eql(expected);
  });
});

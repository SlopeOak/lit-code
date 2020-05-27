import { addNewLines } from '../../../src/features/addNewLines/add-newlines';

describe('add-newlines', () => {
  describe('with headers', () => {
    it('should return false when the line is a header', () => {
      expect(addNewLines('# This is a header', 'This is a paragraph')).toBe(false);
    });  
  });

  describe('with undefined inputs', () => {
    it('should return false when the second line is undefined', () => {
      expect(addNewLines('This is a paragraph', undefined)).toBe(false);
    });
  
    it('should return false when the first line is undefined', () => {
      expect(addNewLines(undefined, 'This is a paragraph')).toBe(false);
    });
  });
  
  it('should return true if the line needs to be spaced out', () => {
    expect(addNewLines('This is a test paragraph', 'This is another paragraph')).toBe(true);
  });

});